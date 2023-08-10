import prismadb from "@/lib/prismadb";
import { CustomerPantData } from "./components/columns"
import { PantClient } from "./components/client";

const ShopPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const pants = await prismadb.pant.findMany({
    include: {
      customer: true, // Include the associated Customer data
    },
  });

  const formattedShops: CustomerPantData[] = pants.map((item) => ({
    pantId: item.id.toString(),
    customerName: item.customer!.name, // Use non-null assertion here
    customerAddress: item.customer!.address, // Use non-null assertion here
    customerPhone: item.customer!.phone, // Use non-null assertion here
    customerEmail: item.customer!.email, // Use non-null assertion here
    customerId: item.customer!.id.toString(), // Use non-null assertion here
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PantClient data={formattedShops} />
      </div>
    </div>
  );
};

export default ShopPage;
