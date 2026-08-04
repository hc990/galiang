# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn                 # install (yarn 3, packageManager pinned)
npx prisma generate  # REQUIRED before dev/build — see "Prisma client" below
yarn dev             # next dev with INIT_CWD set (needed for module resolution)
yarn build           # next build (lint + typecheck run as part of it)
yarn serve           # next start (production server)
yarn lint            # next lint --fix over pages/app/components/lib/layouts/scripts
yarn analyze         # bundle analyzer build
```

There is no test framework in this repo — no test runner, no test files.

**Never run `npm install` here.** npm rewrites `yarn.lock` into Yarn 1 format, which Yarn 3
cannot read — every later `yarn` command then dies with `galiang@workspace:.: This package
doesn't seem to be present in your lockfile`. The repo carries both lockfiles because CI installs
with yarn while the `Dockerfile` installs with npm. To refresh `package-lock.json` for the image,
use `npm install --package-lock-only` and then re-run `yarn install` to restore `yarn.lock`.

`.env` is gitignored but required for local dev and build: `DATABASE_URL` (MongoDB),
`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`.

The image does **not** contain `.env`, and `.dockerignore` excludes it so `COPY . .` cannot bake
it in. `huangchong/galiang` is a *public* Docker Hub repo, so anything in the image is readable by
anyone who pulls it. The three variables reach the container as `-e` flags on `docker run` in the
deploy job, sourced from GitHub secrets. This works only because the container runs `next dev`
(see Deployment) and compiles at runtime — if it were ever switched to a real `next build`,
`NEXT_PUBLIC_*` would have to be present at build time instead. CI passes the same three to
`yarn build` through the job's `env:` block.

Formatting/linting is enforced by husky `pre-commit` → `lint-staged` (eslint --fix + prettier).
Prettier: no semicolons, single quotes, 100 cols, plus `prettier-plugin-tailwindcss` class sorting.

## Prisma client (important)

`prisma/schema.prisma` uses the newer `prisma-client` generator with `output = "../src/generated"`.
`data/prisma.ts` imports `PrismaClient` from `src/generated/client` (a bare specifier resolved
through tsconfig `baseUrl`), so `npx prisma generate` must run before anything typechecks or
builds. The Dockerfile does this at image build time. The output is committed anyway, so
regenerating it shows up as a large diff.

The generator block sets `importFileExtension = ""`. Do not drop it. By default this generator
picks its relative-import extension from tsconfig: it emits extensionless imports only when
`module` is `commonjs` or `moduleResolution` is `bundler`, and this repo uses `module: ESNext` +
`moduleResolution: node`, so the default would be `.js`. Webpack cannot resolve `./enums.js` to
the generated `enums.ts`, and the build fails with `Module not found: Can't resolve
'./internal/class.js'` from `data/prisma.ts`. Setting tsconfig `moduleResolution` to `bundler`
would fix it too, but that changes resolution for the whole app.

`prisma` (the CLI) must stay in `dependencies`, not `devDependencies`. The Dockerfile runs
`npm install --only=production` and then `npx prisma generate`; with the CLI in devDependencies
the image has no local copy, so npx silently fetches the newest Prisma (7.x) and generates a v7
client against `@prisma/client` 6.19.3.

This generator requires Prisma **≥ 6.6**; the pinned version is 6.19.3. On 6.0.x, generate fails
with `Generator "prisma-client" failed: prisma-client: command not found`, which means the
installed Prisma is too old rather than anything being wrong with the schema.

There is no `prisma.config.ts`. Without it the CLI finds `prisma/schema.prisma` by convention and
loads `.env` itself, which is why `data/prisma.ts` does not import `dotenv` — dotenv is a
devDependency, and the Docker image installs production deps only, so importing it there would
break the container.

`data/prisma.ts` is the single client instance (globalThis singleton to survive HMR). Always
import it as `@/data/prisma`, never construct a new `PrismaClient`.

`data/testdata.ts` is dead experimental code: a standalone Pothos/graphql-yoga server importing
types from `../prisma/generated`, a path no generator produces. Nothing imports it, and it was
already broken before the client migration. It is excluded in both `tsconfig.json` and
`.eslintignore` so it cannot fail the build; delete it if the GraphQL experiment is abandoned.

`scripts/rss.mjs` and `scripts/postbuild.mjs` are dead for the same reason — `rss.mjs` imports
the `pliny` package (no longer a dependency) and `.contentlayer/generated` (contentlayer was
removed). `yarn build` no longer runs postbuild, so no `public/feed.xml` is produced. Restoring
RSS means rewriting `rss.mjs` against the MongoDB book records.

## Architecture

Next.js 15 App Router + TypeScript + Tailwind + MongoDB via Prisma. There is no `pages/`
directory (the lint script still names it). Originally forked from `tailwind-nextjs-starter-blog`,
which explains leftover blog scaffolding.

### The unusual data flow

Nothing outside `app/api/*` talks to Prisma. Both client *and* server components fetch through
`app/axios/axios.js`, an axios instance whose `baseURL` is `siteMetadata.siteUrl` — a hardcoded
LAN address in `data/siteMetadata.js`. The app therefore calls its own HTTP API over the network
even during server rendering (e.g. `app/blog/[...slug]/page.tsx`). Consequences:

- Changing host/port means editing `data/siteMetadata.js`, not just the dev command.
- SSR fails if the app cannot reach itself at `siteUrl`.
- `axios-retry` (3 attempts, exponential backoff) is configured on that instance.

`app/context/globalProvider.js` is the client-side data layer: on mount it fetches books,
accounts, commodities and stores into one context, exposed via `useGlobalState()`. Most pages read
their data from there rather than fetching themselves, so a page that renders empty usually means
the provider's fetch failed, not the page.

Provider nesting lives in `app/layout.tsx`: `ClerkProvider` → `ContextProvider` (global state) →
`ThemesProvider` (next-themes) → `SearchProvider` (KBar).

### API routes

`app/api/{blog,account,commodity,store,search,you,download}` are thin CRUD wrappers, one per
Prisma model, all sharing the same shape: `GET` branches on `searchParams` (`id`, plus
model-specific filters), `POST` creates, `PUT` updates status/comment. Two conventions to match
when adding routes:

- Errors are returned as **HTTP 200** with a `{ error, status }` body — callers cannot rely on
  status codes.
- `/api/blog` is the books endpoint. `postion=0` / `postion=1` implement cursor pagination
  (`id < cursor` desc / `id > cursor` asc); anything else (`postion=99`) means "fetch by id".

`/api/download` streams a file off the local filesystem at `siteMetadata.nas.share`, resolved from
the book's `oribookname`, with its own retry wrapper. In Docker this path is a bind-mounted NAS
share, so downloads only work where that mount exists.

### Auth

`middleware.ts` uses Clerk. Read it carefully before changing: the array is named `publicRoutes`
and the matcher `isProtectedRoute`, but the logic calls `auth.protect()` when a request *matches*
that list — so `/`, `/blog/*`, `/account/*`, `/commodity/*`, `/store/*` all **require sign-in**.
The names are inverted relative to behaviour.

### Content

Despite the README, the blog is not MDX-driven: contentlayer is removed and `app/blog/*` renders
book records from MongoDB through the templates in `layouts/` (`PostLayout` is the default;
`PostSimple`/`PostBanner` are selectable via the `layouts` map). `app/tag-data.json` is a static
tag-count file consumed by `ListLayoutWithTags`.

GraphQL (graphql-yoga + Pothos) is a dependency and `data/blog/blog.ts` contains a full schema —
entirely commented out. There is no live GraphQL endpoint.

### Path aliases

`@/data/*`, `@/layouts/*`, `@/css/*`, `@/app/*`, `@/prisma/*` (tsconfig). `baseUrl` is the repo
root, so bare specifiers like `css/prism.css` and `app/tag-data.json` also appear.

## Deployment

`.github/workflows/ci-cd.yml` on push to `main`: lint → build → build & push
`huangchong/galiang:latest` to Docker Hub → SSH to the deploy server and restart the container
with the two NAS bind mounts (`books`, `thumbnail`).

Note `Dockerfile` ends with `CMD ["npm", "start"]`, and `start` is mapped to `next dev` — the
deployed container runs the dev server. `yarn serve` is the actual production command.
