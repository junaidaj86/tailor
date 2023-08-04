import prismadb from "@/lib/prismadb";

import { ShopForm } from "./components/shop-form";

 export type Shop = {
    id: string;
    name: string;
    address: string;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
const ShopPage = async ({
  params
}: {
  params: { shopId: string }
}) => {

  const shop: Shop | null  = await prismadb.shop.findUnique({
    where: { id: Number(params.shopId) }, // Specify the ID to find the shop
  }) as (Shop | null);;

console.log("edited shop id = "+ JSON.stringify(shop, undefined,2))
  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ShopForm initialData={shop}/>
      </div>
    </div>
  );
}

export default ShopPage;
