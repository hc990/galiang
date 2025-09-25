import prisma from "@/data/prisma";
// import { currentUser, auth } from '@clerk/nextjs/server'
import { NextRequest,NextResponse } from "next/server";


export async function POST(req: Request) {
  try{
    const { 
        bookname,
        createAt,
        extend,  
        name,     
        oribookname,
        serial,      
        size,     
        status,  
        comment
      } = await req.json();
    if (!bookname || !extend ) {
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
    const limit = req.nextUrl.searchParams.get("limit")
    if (id != null) {
      const books = await prisma.books.findMany({
        where: {
          id: { lt: id }
        },
        orderBy: {  
          id: 'desc'
        },
        take: 5
      });
      return NextResponse.json(books);
    } else {
      const books = (await prisma.books.findMany({
        orderBy: {  
          id: 'desc'
        },
        // take: parseInt(limit?limit:'18') 
      }));
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
    console.log("ERROR UPDATING BOOK: ", error);
    return NextResponse.json({ error: "Error updating book", status: 500 });
  }
}
