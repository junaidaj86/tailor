// customer-shirt-columns.ts
"use client"
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type CustomerShirtData = {
  customerId: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  shirtId: string;
  // Add other properties you want to display from both models here
};

export const columns: ColumnDef<CustomerShirtData>[] = [
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
    accessorKey: "shirtId",
    header: "Shirt ID",
  },
  // Add other columns for properties from both models here
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
