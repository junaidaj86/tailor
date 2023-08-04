import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth/next"
import { options } from '@/app/api/auth/[...nextauth]/options';
import { NextResponse } from 'next/server';

interface storeRequestBody{
    shopName: string,
    address: string
}


export  async function POST(request: Request){
    const session = await getServerSession(options);
    if (!session) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
    const body: storeRequestBody = await request.json();
    console.log("asdsad"+ JSON.stringify(prismadb.shop))
    console.log("body = "+JSON.stringify(body, undefined,2))
    if(body?.shopName != null && body?.address != null){
        const shop = await  prismadb.shop.create({
            data:{
                name: body.shopName,
                address: body.address,
            }
        }); 
        return new NextResponse(JSON.stringify(shop));
    }else{
        console.log("Bad request: require both  shopName and Address");
        return new NextResponse(null);
    }

}


export  async function GET(){
 
        const shops = await  prismadb.shop.findMany(); 
        return new Response(JSON.stringify(shops));
   

}