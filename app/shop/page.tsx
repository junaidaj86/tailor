import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { ShopColumn } from "./components/columns"
import { ShopClient } from "./components/client";

const ShopPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const shops = await prismadb.shop.findMany();

  const formattedShops: ShopColumn[] = shops.map((item) => ({
    id: item.id.toString(),
    name: item.name,
    address: item.address,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      xsdasdasdfa
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ShopClient data={formattedShops} />
      </div>
    </div>
  );
};

export default ShopPage;
