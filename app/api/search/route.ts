import prisma from "@/data/prisma";
// import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const books = (await prisma.books.findMany({
        orderBy: {  
          id: 'desc'
        },
        select: {
          name: true,
          // bookname: true,
          id: true,
        },
    }));
    return NextResponse.json(books);   
  } catch (error) {
    console.log("ERROR GETTING BOOKS: ", error);
    return NextResponse.json({ error: "Error getting book", status: 500 });
  }
}