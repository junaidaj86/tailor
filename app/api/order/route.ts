import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth/next"
import { options } from '@/app/api/auth/[...nextauth]/options';
import { NextResponse } from 'next/server';
import { Customer, Pant, Shirt } from "@/types";




export  async function POST(request: Request){
    const session = await getServerSession(options);
    if (!session) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
      const { customer, shirts, pants } = await request.json() as {
        customer: Customer;
        shirts: Shirt[];
        pants: Pant[];
      };
  
    console.log("body = "+JSON.stringify(customer, undefined,2))
    console.log("body = "+JSON.stringify(shirts, undefined,2))
    console.log("body = "+JSON.stringify(pants, undefined,2))

    if(customer != null && shirts != null){

        let customerId: number;

    // Check if customer exists by their ID
    if (customer) {
        const existingCustomer = await prismadb.customer.findFirst({
            where: { 
              OR: [
                { email: customer.email },
                { phone: customer.phone }
              ]
            },
          });

      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        // Customer ID provided but not found, handle error or create new customer
        return new NextResponse("Customer not found", { status: 404 });
      }
    } else {
      // Customer ID not provided, create a new customer
      const createdCustomer = await prismadb.customer.create({
        data: {
            name: "New Customer Name", // Replace with actual name
            email: "newcustomer@example.com", // Replace with actual email
            phone: "1234567890", // Replace with actual phone
            address: "123 Main Street, City", // Replace with actual address
          },
      });

      customerId = createdCustomer.id;
    }

        const authenticatedUser = session.user.email;
        const shop = await prismadb.user.findFirst({
            where: { email: authenticatedUser },
          });
          if (!shop) {
            return new NextResponse("no shop found");
          }

          
          const upsertedShirts = await Promise.all(shirts.map(async shirt => {
            return prismadb.shirt.create({
              data: {
                length: shirt.length,
                neck: shirt.neck,
                sleeves: shirt.sleeves,
                sleevesLength: shirt.sleevesLength,
                cuff: shirt.cuff,
                cuffSize: shirt.cuffSize,
                chestSize: shirt.chestSize,
                shoulder: shirt.shoulder,
                notes: shirt.notes,
                fit: shirt.fit,
                collar: shirt.collar,
                placket: shirt.placket,
                seat: shirt.seat,
                // ... Other properties
              },
            });
          }));
          
          const upsertedPants = await Promise.all(pants.map(async pant => {
            return prismadb.pant.create({
              data: {
                hip: "12",
                rise: "12",
                inseam:     "String",
                opening:    "String",
                outseam:    "String",
                braise:     "String",
                fraise:     "String",
                knee :      "String",
               waist: "asa",
              },
            });
          }));
          
          // Create a new order
          const createdOrder = await prismadb.order.create({
            data: {
              customerId: customerId,
              shopId: Number(shop.id),
              orderStatus: "Pending",
              orderItem: {
                create: [
                  ...upsertedShirts.map(shirt => ({
                    quantity: shirt.quantity,
                    shirt: { connect: { id: shirt.id } },
                  })),
                  ...upsertedPants.map(pant => ({
                    quantity: pant.quantity,
                    pant: { connect: { id: pant.id } },
                  })),
                ],
              },
            },
          });
        return new NextResponse(JSON.stringify(shop));
    }else{
        console.log("Bad request: require both  shopName and Address");
        return new NextResponse(null);
    }

}