
import prisma from "@/data/prisma";
// import { currentUser, auth } from '@clerk/nextjs/server'
import { NextRequest,NextResponse } from "next/server";


export async function POST(req: Request) {
    try{
      const { 
        order_time,
        price,
        store_name,
      } = await req.json();
      if (!store_name || !price ) {
        return NextResponse.json({
          error: "Missing required fields",
          status: 400,
        });
      }
      if (store_name.length < 3) {
        return NextResponse.json({
          error: "Title must be at least 3 characters long",
          status: 400,
        });
      }
      const account = await prisma.accounts.create({
        data: {
            order_time,
            price,
            store_name,
        },
      });
      return NextResponse.json(account);
    } catch (error) {
      console.log("ERROR CREATING BOOK: ", error);
      return NextResponse.json({ error: "Error creating book", status: 500 });
    }
}

export async function GET(req: NextRequest) {
  console.info("accounts")
    try {
      const id = req.nextUrl.searchParams.get("id")
      if (id != null) {
        const accounts = await prisma.accounts.findUnique({
          where: {
            id: id  
          },
        });
        console.info("accounts")
        return NextResponse.json(accounts);
      } else {
        const accounts = (await prisma.accounts.findMany({
          orderBy: {  
            id: 'desc'
          },
        }));
        console.info("accounts")
        return NextResponse.json(accounts);
      }   
    } catch (error) {
      console.log("ERROR GETTING accounts: ", error);
      return NextResponse.json({ error: "Error getting account", status: 500 });
    }
  }