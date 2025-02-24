import prisma from "@/data/prisma";
import { NextRequest,NextResponse } from "next/server";


export async function POST(req: Request) {
  try{
    const {  
        createAt,
        name,  
        comment,
        serial,
        tmp_name,
        status,
        size
      } = await req.json();
    if (!name) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }
    if (name.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }
    const movie = await prisma.movies.create({
      data: {
        createAt,
        name,       
        comment,
        serial,
        tmp_name,
        status,
        size,
      },
    });
    return NextResponse.json(movie);
  } catch (error) {
    console.log("ERROR CREATING BOOK: ", error);
    return NextResponse.json({ error: "Error creating book", status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id")
    if (id != null) {
      const movies = await prisma.movies.findUnique({
        where: {
          id: id  
        },
      }); 
      return NextResponse.json(movies);
    } else {
      const movies = (await prisma.movies.findMany({
        orderBy: {  
          id: 'desc'  
        },
      }));
      return NextResponse.json(movies);
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
    const movie = await prisma.movies.update({
      where: {  
        id,
      },
      data: {
        status,   
        comment
      },
    });
    return NextResponse.json(movie);
  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}
