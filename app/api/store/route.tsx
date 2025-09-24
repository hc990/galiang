
import prisma from "@/data/prisma";
import moment from "moment";
// import { currentUser, auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const {
      name,
      type,
      address,
      modifyTime,
      employee,
      status,
      createTime,
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
    const store = await prisma.stores.create({
      data: {
        name,
        type,
        address,
        employee,  
        status,
        createTime: new Date(),
        modifyTime: new Date(),
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("ERROR CREATING store: ", error);
    return NextResponse.json({ error: "Error creating store", status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id")
    const name = req.nextUrl.searchParams.get("name")
    const start_time = req.nextUrl.searchParams.get("start_time")
    const end_time = req.nextUrl.searchParams.get("end_time")
    if (id != null) {
      const store = await prisma.stores.findUnique({
        where: {
          id: id
        },
      });
      return NextResponse.json(store);
    } else {
      if (name != null && start_time != null && end_time != null) {
        const stores = (await prisma.stores.findMany({
          where: {
            name: name,
            createTime: { gte: moment(start_time).toDate(), lte: moment(end_time).toDate() },
            // status: 0
          },
          orderBy: {
            createTime: 'desc'
          },
        }));
        return NextResponse.json(stores);
      } else {
        const stores = (await prisma.stores.findMany({
          // where: {
          //   status: 0
          // },
          orderBy: {
            id: 'desc'
          },
        }));
        return NextResponse.json(stores);
      }

    }
  } catch (error) {
    console.log("ERROR GETTING stores: ", error);
    return NextResponse.json({ error: "Error getting store", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { params } = await req.json();
    const id = params.id
    const status = params.status
    const store = await prisma.stores.update({
      where: {
        id,
      },
      data: {
        status
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("ERROR UPDATING store: ", error);
    return NextResponse.json({ error: "Error updating store", status: 500 });
  }
}