/* eslint-disable */
import type { Prisma, authors, bookcode, books, captcha, movies, sessions, users } from "/Users/huangchong/Documents/workspace/tailwind-nextjs-starter-blog/node_modules/@prisma/client";
export default interface PrismaTypes {
    authors: {
        Name: "authors";
        Shape: authors;
        Include: never;
        Select: Prisma.authorsSelect;
        OrderBy: Prisma.authorsOrderByWithRelationInput;
        WhereUnique: Prisma.authorsWhereUniqueInput;
        Where: Prisma.authorsWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    bookcode: {
        Name: "bookcode";
        Shape: bookcode;
        Include: never;
        Select: Prisma.bookcodeSelect;
        OrderBy: Prisma.bookcodeOrderByWithRelationInput;
        WhereUnique: Prisma.bookcodeWhereUniqueInput;
        Where: Prisma.bookcodeWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    books: {
        Name: "books";
        Shape: books;
        Include: never;
        Select: Prisma.booksSelect;
        OrderBy: Prisma.booksOrderByWithRelationInput;
        WhereUnique: Prisma.booksWhereUniqueInput;
        Where: Prisma.booksWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    captcha: {
        Name: "captcha";
        Shape: captcha;
        Include: never;
        Select: Prisma.captchaSelect;
        OrderBy: Prisma.captchaOrderByWithRelationInput;
        WhereUnique: Prisma.captchaWhereUniqueInput;
        Where: Prisma.captchaWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    movies: {
        Name: "movies";
        Shape: movies;
        Include: never;
        Select: Prisma.moviesSelect;
        OrderBy: Prisma.moviesOrderByWithRelationInput;
        WhereUnique: Prisma.moviesWhereUniqueInput;
        Where: Prisma.moviesWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    sessions: {
        Name: "sessions";
        Shape: sessions;
        Include: never;
        Select: Prisma.sessionsSelect;
        OrderBy: Prisma.sessionsOrderByWithRelationInput;
        WhereUnique: Prisma.sessionsWhereUniqueInput;
        Where: Prisma.sessionsWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    users: {
        Name: "users";
        Shape: users;
        Include: never;
        Select: Prisma.usersSelect;
        OrderBy: Prisma.usersOrderByWithRelationInput;
        WhereUnique: Prisma.usersWhereUniqueInput;
        Where: Prisma.usersWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}