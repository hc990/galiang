
import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from '../prisma/generated';
import prisma from './prisma'

const builder = new SchemaBuilder<{
    PrismaTypes: PrismaTypes;
  }>({
    plugins: [PrismaPlugin],
    prisma: {  
      client: prisma,
    }
  })

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),  
      },
      resolve: (parent, { name }) => `hello, ${name+'fdfd' || 'World'}`,
    }),
  }),
});

const yoga = createYoga({
  schema: builder.toSchema(),
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log('Visit http://localhost:4000/graphql');
});