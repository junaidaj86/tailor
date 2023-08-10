"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, CustomerPantData } from "./columns";

interface PantsClientProps {
  data: CustomerPantData[];
}

export const PantClient: React.FC<PantsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Pant (${data.length})`} description="Manage Pant" />
        <Button onClick={() => router.push(`/pant/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      {/* <Heading title="API" description="API Calls for Categories" />
      <Separator />
      <ApiList entityName="shops" entityIdName="shopId" /> */}
    </>
  );
};
