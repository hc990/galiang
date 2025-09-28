
import prisma from "@/data/prisma";
import moment from "moment";
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: Request) {
  await auth.protect();
  try {
    const {
      order_time,
      price,
      store_id,
      store_name,
      channel,
      comm_type,
      comm_id,
      comm_name,
      comm_num,
      comm_unit,
      // status  ,
      // createTime,  
      // modifyTime
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
        store_id,
        store_name,
        channel,
        comm_type,
        comm_name,
        comm_num,
        comm_unit,
        status: 0,
        createTime: new Date(),
        modifyTime: new Date(),
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
    const store_id = req.nextUrl.searchParams.get("store_id")
    const start_time = req.nextUrl.searchParams.get("start_time")
    const end_time = req.nextUrl.searchParams.get("end_time")
    if (id != null) {
      const accounts = await prisma.accounts.findUnique({
        where: {
          id: id
        },
      });
      return NextResponse.json(accounts);
    } else {
      if (store_id != null && start_time != null && end_time != null) {
        const accounts = (await prisma.accounts.findMany({
          where: {
            store_id: store_id,
            order_time: { gte: moment(start_time).toDate(), lte: moment(end_time).toDate() },
            status: 0
          },
          orderBy: {
            order_time: 'desc'
          },
        }));
        return NextResponse.json(accounts);
      } else {
        const accounts = (await prisma.accounts.findMany({
          where: {
            status: 0
          },
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

export async function PUT(req: Request) {
  try {
    const { params } = await req.json();
    const id = params.id
    const status = params.status
    const account = await prisma.accounts.update({
      where: {
        id,
      },
      data: {
        status
      },
    });
    return NextResponse.json(account);
  } catch (error) {
    console.log("ERROR UPDATING ACCOUNT: ", error);
    return NextResponse.json({ error: "Error updating account", status: 500 });
  }
}