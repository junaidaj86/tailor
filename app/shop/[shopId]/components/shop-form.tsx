'use client'

import { useEffect } from "react";
import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
    shopName: z.string().min(2),
    address: z.string().min(1),
  });

  interface ShopFormProps {
    initialData: Shop | null;
  };

  export type Shop = {
    id: string;
    name: string;
    address: string;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date;
  };

export const ShopForm = ({ initialData }: ShopFormProps) => {
    const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title =  'Edit Shop';
  const description =  'Edit a new Shop';
  const toastMessage =  'Shop Updated.';
  const action =  'Save changes';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        shopName: initialData?.name || "",
        address: initialData?.address || "",
    },
  })

  useEffect(() => {
    if (initialData) {
      form.setValue("shopName", initialData.name); // Update shopName value
      form.setValue("address", initialData.address); // Update address value
    }
  }, [initialData]);

  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
        console.log("asasas "+ JSON.stringify(values))
        await axios.patch(`/api/shop/${params.shopId}`, values);
      router.refresh();
      router.push(`/shop`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
    
     <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

      </div>
      <Separator />
      <br/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8 w-full">

          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Shop name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Address of shop" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}

