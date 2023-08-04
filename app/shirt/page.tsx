import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CustomerShirtData } from "./components/columns"
import { ShirtClient } from "./components/client";

const ShopPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const shirts = await prismadb.shirt.findMany({
    include: {
      customer: true, // Include the associated Customer data
    },
  });

  const formattedShops: CustomerShirtData[] = shirts.map((item) => ({
    shirtId: item.id.toString(),
    customerName: item.customer!.name, // Use non-null assertion here
    customerAddress: item.customer!.address, // Use non-null assertion here
    customerPhone: item.customer!.phone, // Use non-null assertion here
    customerEmail: item.customer!.email, // Use non-null assertion here
    customerId: item.customer!.id.toString(), // Use non-null assertion here
  }));

  return (
    <div className="flex-col">
      xsdasdasdfa
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ShirtClient data={formattedShops} />
      </div>
    </div>
  );
};

export default ShopPage;
