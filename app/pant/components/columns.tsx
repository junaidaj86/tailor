// customer-pant-columns.ts
"use client"
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type CustomerPantData = {
  customerId: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  pantId: string;
  // Add other properties you want to display from both models here
};

export const columns: ColumnDef<CustomerPantData>[] = [
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "customerAddress",
    header: "Customer Address",
  },
  {
    accessorKey: "customerPhone",
    header: "Customer Phone",
  },
  {
    accessorKey: "customerEmail",
    header: "Customer Email",
  },
  {
    accessorKey: "pantId",
    header: "Pant ID",
  },
  // Add other columns for properties from both models here
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
