'use client'
import { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";

// Define the form schema for the Customer model
const customerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(1),
});

// Define the form schema for the Shirt model
const shirtSchema = z.object({
  length: z.string(),
  neck: z.string(),
  waist: z.string(),
  sleeves: z.string(),
  sleevesLength: z.string(),
  cuff: z.string(),
  cuffSize: z.string(),
  chestSize: z.string(),
  shoulder: z.string(),
  notes: z.string(),
  fit: z.string(),
  collar: z.string(),
  placket: z.string(),
  seat: z.string(),
});

interface ShirtFormProps {
  initialCustomerData: Customer | null;
  initialShirtData: Shirt | null;
}

export type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type Shirt = {
  length: string;
  neck: string;
  waist: string;
  sleeves: string;
  sleevesLength: string;
  cuff: string;
  cuffSize: string;
  chestSize: string;
  shoulder: string;
  notes: string;
  fit: string;
  collar: string;
  placket: string;
  seat: string;
};

export const ShirtForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const title = "Shirt Form";
  const description = "Enter customer and shirt details";
  const toastMessage = "Shirt details saved.";
  const action = "Save Shirt";

  const customerForm = useForm<Customer>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name:  "",
      email:  "",
      phone:  "",
      address:  "",
    },
  });



  const shirtForm = useForm<Shirt>({
    resolver: zodResolver(shirtSchema),
    defaultValues: {
      length:  "",
      neck:  "",
      waist:  "",
      sleeves:  "",
      sleevesLength: "",
      cuff: "",
      cuffSize:  "",
      chestSize:  "",
      shoulder:  "",
      notes:  "",
      fit:  "",
      collar:  "",
      placket:  "",
      seat:  "",
    },
  });

  const onSubmit = async (values: { customer: Customer; shirt: Shirt }) => {
    try {
      console.log("Form values:", values);

      // Handle form submission here
      // For example, create/update the customer and shirt records
      // and show a success message

      setLoading(true);

      // Uncomment the lines below if you want to submit the data via API calls
      // const customerId = await saveCustomer(values.customer);
      // const shirtId = await saveShirt(values.shirt, customerId);

      // Finish the form submission and show a success message
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
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
      <br />
      <Form {...shirtForm}>
      <form onSubmit={shirtForm.handleSubmit((shirtValues) => onSubmit({ customer: customerForm.getValues(), shirt: shirtValues }))}>
        <div className="md:grid md:grid-cols-2 gap-8">
          {/* Customer Info */}
          <FormField
            control={customerForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Customer name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={customerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Customer email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={customerForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Customer phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={customerForm.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Customer address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Shirt Info */}
          <FormField
            control={shirtForm.control}
            name="length"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shirt Length</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Shirt length" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shirtForm.control}
            name="neck"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Neck Size</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Neck size" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shirtForm.control}
            name="waist"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Waist Size</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Waist size" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shirtForm.control}
            name="sleeves"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shirt sleeves</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Shirt sleeves" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shirtForm.control}
            name="sleevesLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>sleevesLength</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="sleevesLength" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shirtForm.control}
            name="cuff"
            render={({ field }) => (
              <FormItem>
                <FormLabel>cuff</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="cuff" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shirtForm.control}
            name="cuffSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>cuffSize Length</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="cuffSize length" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shirtForm.control}
            name="chestSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>chestSize Size</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="chestSize size" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shirtForm.control}
            name="shoulder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>shoulder Size</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="shoulder size" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shirtForm.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>notes </FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="notes length" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shirtForm.control}
            name="fit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>fit </FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="fit " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shirtForm.control}
            name="collar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>collar </FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="collar " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shirtForm.control}
            name="placket"
            render={({ field }) => (
              <FormItem>
                <FormLabel>placket Length</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="placket length" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shirtForm.control}
            name="seat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>eat Size</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="seat size" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ... (Other shirt fields) */}
        </div>
        <Button className="ml-auto" type="submit" disabled={loading}>
          {action}
        </Button>
      </form>
      </Form>
    </>
  );
};
