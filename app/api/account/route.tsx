
import prisma from "@/data/prisma";
// import { currentUser, auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const {
      order_time,
      price,
      store_name,
      channel,
      comm_type,
      comm_num,
      comm_unit
    } = await req.json();
    // if (!store_name || !price ) {
    //   return NextResponse.json({
    //     error: "Missing required fields",
    //     status: 400,
    //   });
    // }
    // if (store_name.length < 3) {
    //   return NextResponse.json({
    //     error: "Title must be at least 3 characters long",
    //     status: 400,
    //   });
    // }            
    const account = await prisma.accounts.create({
      data: {
        order_time,
        price,
        store_name,
        channel,
        comm_type,
        comm_num,
        comm_unit
      },
    });
    return NextResponse.json(account);
  } catch (error) {
    console.log("ERROR CREATING ACCOUNT: ", error);
    return NextResponse.json({ error: "Error creating account", status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id")
    const store_name = req.nextUrl.searchParams.get("store_name")
    console.info(store_name)
    if (id != null) {
      const accounts = await prisma.accounts.findUnique({
        where: {
          id: id
        },
      });
      return NextResponse.json(accounts);
    } else {
      if (store_name != null) {
        const accounts = (await prisma.accounts.findMany({
          where: {
            store_name: parseInt(store_name)
          },
          orderBy: {
            id: 'desc'
          },
        }));
        return NextResponse.json(accounts);
      } else {
        const accounts = (await prisma.accounts.findMany({
          orderBy: {
            id: 'desc'
          },
        }));
        return NextResponse.json(accounts);
      }

    }
  } catch (error) {
    console.log("ERROR GETTING accounts: ", error);
    return NextResponse.json({ error: "Error getting account", status: 500 });
  }
}