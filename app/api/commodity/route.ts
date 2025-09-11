import prisma from "@/data/prisma";
import moment from "moment";
// import { currentUser, auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const {
      name,
      type,
      status,
      description,
      createTime,
      modifyTime,
    } = await req.json();
    if (!name) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      })
    }
    if (name.length < 2) {
      return NextResponse.json({
        error: "Title must be at least 2 characters long",
        status: 400,
      });
    }
    const commodity = await prisma.commodity.create({
      data: {
        name,
        channel:1,
        type,
        status: 0,
        description: description ? description : '',
        createTime: new Date(),
        modifyTime: new Date(),
      },
    });
    return NextResponse.json(commodity);
  } catch (error) {
    console.log("ERROR CREATING commodity: ", error);
    return NextResponse.json({ error: "Error creating commodity", status: 500 });
  }
}


export async function GET(req: NextRequest) {
  try {
    
    const id = req.nextUrl.searchParams.get("id")
    const type = req.nextUrl.searchParams.get("type")
    const name = req.nextUrl.searchParams.get("name")
    const start_time = req.nextUrl.searchParams.get("start_time")
    const end_time = req.nextUrl.searchParams.get("end_time")
    if (id != null) {
      const commodities = await prisma.commodity.findUnique({
        where: {
          id: id
        },
      });
      return NextResponse.json(commodities);
    } else {
      if (start_time != null && end_time != null) {
        const accounts = (await prisma.commodity.findMany({
          where: {   
            type: type? parseInt(type): {gte: 0, lte:99},
            createTime: {gte: moment(start_time).toDate(), lte:moment(end_time).toDate()},
            status: 0,
            ...(name && { name: { contains: name, mode: 'insensitive' } }), // 添加模糊查询
          },
          orderBy: {
            createTime: 'desc'
          },
        }));
        return NextResponse.json(accounts);
      } else {
        const commodities = (await prisma.commodity.findMany({
          where: {
            status: 0
          },
          orderBy: {
            id: 'desc'
          },
        }));
        return NextResponse.json(commodities);
      }
    }
  } catch (error) {
    console.log("ERROR GETTING commodities: ", error);
    return NextResponse.json({ error: "Error getting commodities", status: 500 });
  }
}



// export async function GET(req: NextRequest) {
//   try {
//     const id = req.nextUrl.searchParams.get("id")
//     const limit = req.nextUrl.searchParams.get("limit")
//     if (id != null) {
//       const commodities = await prisma.commodity.findUnique({
//         where: {
//           id: id
//         },
//       });
//       return NextResponse.json(commodities);
//     } else {
//       const commodities = (await prisma.commodity.findMany({
//         orderBy: {
//           id: 'desc'
//         },
//         take: parseInt(limit ? limit : '18')
//       }));
//       return NextResponse.json(commodities);
//     }
//   } catch (error) {
//     console.log("ERROR GETTING commodities: ", error);
//     return NextResponse.json({ error: "Error getting commodity", status: 500 });
//   }
// }


export async function PUT(req: Request) {
  try {
    const { params } = await req.json();
    const id = params.id
    const status = params.status
    const description = params.description
    const commodity = await prisma.commodity.update({
      where: {
        id,
      },
      data: {
        status,
        description
      },
    });
    return NextResponse.json(commodity);
  } catch (error) {
    console.log("ERROR UPDATING commodity: ", error);
    return NextResponse.json({ error: "Error updating commodity", status: 500 });
  }
}
