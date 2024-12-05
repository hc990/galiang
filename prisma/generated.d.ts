/* eslint-disable */
import type { Prisma, authors, bookcode, books, captcha, movies, sessions, User, Todo } from "/Users/huangchong/Documents/workspace/galiang/node_modules/@prisma/client";
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
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "todos";
        ListRelations: "todos";
        Relations: {
            todos: {
                Shape: Todo[];
                Name: "Todo";
                Nullable: false;
            };
        };
    };
    Todo: {
        Name: "Todo";
        Shape: Todo;
        Include: Prisma.TodoInclude;
        Select: Prisma.TodoSelect;
        OrderBy: Prisma.TodoOrderByWithRelationInput;
        WhereUnique: Prisma.TodoWhereUniqueInput;
        Where: Prisma.TodoWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
}