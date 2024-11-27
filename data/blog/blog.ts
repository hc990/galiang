import { createYoga } from 'graphql-yoga'
import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
// import { DateTimeResolver } from 'graphql-scalars';
import { createServer } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type PrismaTypes from '../../prisma/generated'
import prisma from '../prisma'

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
})
builder.queryType({}),
  builder.mutationType({}),
  builder.prismaObject('authors', {
    fields: (t) => ({
      id: t.exposeID('id'),
      email: t.exposeString('email', { nullable: true }),
      name: t.exposeString('name', { nullable: true }),
    }),
  })

builder.prismaObject('movies', {
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('name'),
    content: t.exposeString('tmp_name', { nullable: true }),
    serial: t.exposeInt('serial'),
    size: t.exposeFloat('size'),
    status: t.exposeInt('status'),
  }),
})

builder.queryField('Author', (t) =>
  t.prismaField({
    type: 'authors',
    args: {
      id: t.arg.id({ required: true }),
    },
    nullable: true,
    resolve: async (query, _parent, args, _info) =>
      prisma.authors.findFirst({
        ...query,
        where: {
          id: String(args.id),
        },
      }),
  })
)

builder.queryField('Movie', (t) =>
  t.prismaField({
    type: ['movies'],
    resolve: async (query, _parent, _args, _info) =>
      prisma.movies.findMany({
        ...query,
        where: { status: 0 },
      }),
  })
)

builder.mutationField('signupUser', (t) =>
  t.prismaField({
    type: 'authors',
    args: {
      name: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.authors.create({
        ...query,
        data: {
          email: args.email,
          name: args.name,
          avatar: args.name,
          company: args.name,
          layout: args.name,
          github: args.name,
          linkedin: args.email,
          occupation: args.name,
          slug: args.email,
          twitter: args.email,
          type: args.email,
        },
      }),
  })
)

const schema = builder.toSchema()

export default createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema,
  graphqlEndpoint: '/api/graphql',
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const context = {
  prisma: prisma,
}

const yoga = createYoga({
  graphqlEndpoint: '/',
  schema: schema,
  context,
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.log(`
  🚀 Server ready at: http://localhost:4000
  ⭐️ See sample queries: http://pris.ly/e/js/graphql-sdl-first#using-the-graphql-api`)
})
