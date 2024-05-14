import prisma from "@/data/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req: Request) {
  try{
    const { bookname,
        createAt,
        extend,  
        name,     
        oribookname,
        serial,      
        size,     
        status,
        comment
      } = await req.json();
    if (!bookname || !extend || !serial) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }
    if (bookname.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }
    const book = await prisma.books.create({
      data: {
        bookname,
        createAt,
        extend,  
        name,       
        oribookname,
        serial,      
        size,     
        status,
        comment
      },
    });
    return NextResponse.json(book);
  } catch (error) {
    console.log("ERROR CREATING BOOK: ", error);
    return NextResponse.json({ error: "Error creating book", status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id")
    if (id != null) {
      const books = await prisma.books.findUnique({
        where: {
          id: id  
        },
      });
      return NextResponse.json(books);
    } else {
      const books = await prisma.books.findMany({});
      return NextResponse.json(books);
    }   
  } catch (error) {
    console.log("ERROR GETTING BOOKS: ", error);
    return NextResponse.json({ error: "Error getting book", status: 500 });
  }
}


export async function PUT(req: Request) {
  try {
    const { params } = await req.json(); 
    const id = params.id
    const status = params.status
    const comment = params.comment
    const book = await prisma.books.update({
      where: {  
        id,
      },
      data: {
        status,   
        comment 
      },
    });
    return NextResponse.json(book);
  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}
