import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth/next"
import { options } from '@/app/api/auth/[...nextauth]/options';
import { NextResponse } from 'next/server';

interface storeRequestBody{
    shopName: string,
    address: string
}


export async function PATCH(
    request: Request,
    { params }: { params: { shopId: string } }
    ) {
    const session = await getServerSession(options);
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
  
    const body: storeRequestBody = await request.json();
    console.log("asdsad" + JSON.stringify(prismadb.shop));
    console.log("body = " + JSON.stringify(body, undefined, 2));
  
    // Make sure both shopName and address are provided in the request body
    if (body?.shopName != null && body?.address != null) {
      
      // Check if the shop with the given ID exists
      const existingShop = await prismadb.shop.findUnique({
        where: { id: Number(params.shopId) },
      });
  
      if (existingShop) {
        // Update the existing shop
        const updatedShop = await prismadb.shop.update({
          where: { id: Number(params.shopId) },
          data: {
            name: body.shopName,
            address: body.address,
          },
        });
  
        return new NextResponse(JSON.stringify(updatedShop));
      } else {
        console.log("Shop not found with ID:", params.shopId);
        return new NextResponse(null);
      }
    } else {
      console.log("Bad request: require both shopName and Address");
      return new NextResponse(null);
    }
  }
  


  export async function DELETE(
    request: Request,
    { params }: { params: { shopId: string } }
    ) {
    const session = await getServerSession(options);
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    const shopId = params.shopId;    
    // Check if the shop with the given ID exists
    const existingShop = await prismadb.shop.findUnique({
      where: { id: Number(shopId) },
    });
    if (existingShop) {
      // Delete the existing shop
      const deletedShop = await prismadb.shop.delete({
        where: { id: Number(shopId) },
      });
      return new NextResponse(JSON.stringify(deletedShop));
    } else {
      console.log("Shop not found with ID:", shopId);
      return new NextResponse(null);
    }
  }



  