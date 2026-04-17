# Galiang

A full-stack web application for managing and browsing a personal book library, built with Next.js, TailwindCSS, Prisma, and MongoDB.

## Features

- **Book Library** — Browse, search, and download books with cover thumbnails and summaries
- **Blog** — MDX-powered blog with tag filtering, pagination, and Giscus comments
- **Authentication** — User sign-in and sign-up via Clerk
- **Store & Accounts** — Commodity and account management pages
- **Search** — KBar-powered command palette search
- **Dark/Light Theme** — System-aware theme switching
- **GraphQL API** — Powered by graphql-yoga and Pothos

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS |
| Database | MongoDB (via Prisma) |
| Auth | Clerk |
| API | GraphQL (graphql-yoga + Pothos) |
| HTTP | Axios |

## Getting Started

### Install dependencies

```bash
yarn
```

> On Windows, you may need to run `set PWD="$(pwd)"` first.

### Environment variables

Create a `.env` file at the project root and set:

```env
DATABASE_URL=mongodb://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

### Run development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
yarn build
yarn serve
```

## Configuration

| File | Purpose |
|---|---|
| `data/siteMetadata.js` | Site title, URL, social links, analytics, comments config |
| `tailwind.config.js` | Tailwind theme and plugin settings |
| `next.config.js` | Next.js config including Content Security Policy |
| `prisma/schema.prisma` | Database schema (books, users, stores, accounts, etc.) |

## Docker Deployment

Build and push the image:

```bash
docker build -t huangchong/galiang:latest .
docker push huangchong/galiang:latest
```

Run with NAS volume mounts:

```bash
docker run -d \
  -p 3000:3000 \
  --mount type=bind,source=/volume2/library/books,target=/Users/huangchong/SynologyDrive/books/ \
  --mount type=bind,source=/volume2/library/thumbnail,target=/usr/src/app/public/thumbnail \
  huangchong/galiang
```

## Project Structure

```
app/
  Main.tsx              # Home page (book carousel + list)
  blog/                 # Blog pages
  store/                # Store management
  account/              # Account management
  components/           # Shared UI components
  api/                  # API routes (books, download, search, etc.)
data/                   # Site metadata and blog content
layouts/                # Page layout templates
prisma/                 # Database schema and generated types
public/                 # Static assets and book thumbnails
```

## License

ISC
