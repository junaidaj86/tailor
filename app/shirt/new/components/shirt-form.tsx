'use client'
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/use-cart";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShirtFormProps, Shirt, Customer } from "@/types";
import ImageUpload from "@/components/ui/image-upload";

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
  images: z.object({ url: z.string() }).array(),
  quantity: z.number(),
});


export const ShirtForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const title = "Shirt Form";
  const description = "Enter customer and shirt details";
  const toastMessage = "Shirt details saved.";
  const action = "Save Shirt";
  const [currentPage, setCurrentPage] = useState(1);

  const fitOptions = ["Slim Fit", "Regulat Fit"];
  const sleevesOptions = ["Full Sleves", "Half Sleves"];
  const collarOptions = ["Pointed Collar", "Cutway Collar", "PoiBindnted Collar", "BOW Collar"]
  const placketOptions = ["Cover Placket", "front Placket", "inside Placket"];
  const cuffOptions = ["Regular", "Double"];
  const pocketOptions = ["Chest", "Inside", "No Pocket"]
  const cart = useCart();


  const customerForm = useForm<Customer>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });



  const shirtForm = useForm<Shirt>({
    resolver: zodResolver(shirtSchema),
    defaultValues: {
      length: 0,
      neck: 0,
      waist: 0,
      sleeves: "",
      sleevesLength: 0,
      cuff: "",
      cuffSize: 0,
      chestSize: 0,
      shoulder: 0,
      notes: "",
      fit: "",
      collar: "",
      placket: "",
      seat: "",
      pocket: "",
      images: [],
      quantity: 0,
    },
  });

  const handleNextPage = () => {
    if (currentPage === 1) {
      setCurrentPage(2);
    } else if (currentPage === 2) {
      setCurrentPage(3);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage === 3) {
      setCurrentPage(2);
    } else if (currentPage === 2) {
      setCurrentPage(1);
    }
  };

  const onSubmit = async (values: { customer: Customer; shirt: Shirt }) => {
    try {
      console.log("Form values:", values.shirt.images);

      // Handle form submission here
      // For example, create/update the customer and shirt records
      // and show a success message

      setLoading(true);
      cart.addShirt(values.shirt);
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
            <div style={{ display: currentPage === 4 ? "block" : "none" }}>

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
              <Button className="ml-auto" onClick={handleNextPage} disabled={loading}>
                next
              </Button>
            </div>
            <div style={{ display: currentPage === 1 ? "block" : "none" }}>
              {/* Shirt Info */}
              <FormField
            control={shirtForm.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map(
                      (image) => image.url
                    )}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([
                        ...field.value,
                        { url },
                      ])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter(
                          (current) =>
                            current.url !== url
                        ),
                      ])
                    }
                  />
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

                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={
                                field.value
                              }
                              placeholder="Select a fit"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {fitOptions.map(
                            (item) => (
                              <SelectItem
                                key={
                                  item
                                }
                                value={
                                  item
                                }
                              >
                                {
                                  item
                                }
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
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
                    <FormLabel>sleeves</FormLabel>
                    <FormControl>
                      



                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={
                                field.value
                              }
                              placeholder="Select a fit"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sleevesOptions.map(
                            (item) => (
                              <SelectItem
                                key={
                                  item
                                }
                                value={
                                  item
                                }
                              >
                                {
                                  item
                                }
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
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
                    <FormLabel>Collar</FormLabel>
                    <FormControl>
                    <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={
                                field.value
                              }
                              placeholder="Select a fit"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {collarOptions.map(
                            (item) => (
                              <SelectItem
                                key={
                                  item
                                }
                                value={
                                  item
                                }
                              >
                                {
                                  item
                                }
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={shirtForm.control}
                name="pocket"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pocket</FormLabel>
                    <FormControl>
                    <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={
                                field.value
                              }
                              placeholder="Select a fit"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {pocketOptions.map(
                            (item) => (
                              <SelectItem
                                key={
                                  item
                                }
                                value={
                                  item
                                }
                              >
                                {
                                  item
                                }
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
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
                    <FormLabel>Cuff</FormLabel>
                    <FormControl>
                    <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={
                                field.value
                              }
                              placeholder="Select a fit"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cuffOptions.map(
                            (item) => (
                              <SelectItem
                                key={
                                  item
                                }
                                value={
                                  item
                                }
                              >
                                {
                                  item
                                }
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
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
                    <FormLabel>placket</FormLabel>
                    <FormControl>
                    <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={
                                field.value
                              }
                              placeholder="Select a fit"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {placketOptions.map(
                            (item) => (
                              <SelectItem
                                key={
                                  item
                                }
                                value={
                                  item
                                }
                              >
                                {
                                  item
                                }
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex mt-4 justify-between">
                {/* <Button onClick={handlePreviousPage} disabled={loading}>
                  Previous
                </Button> */}
                <Button onClick={handleNextPage} disabled={loading}>
                  Next
                </Button>
              </div>
            </div>
            <div style={{ display: currentPage === 2 ? "block" : "none" }}>
              <FormField
                control={shirtForm.control}
                name="shoulder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shoulder</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={loading} placeholder="cuff" {...field} />
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
                    <FormLabel>neck</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={loading} placeholder="cuffSize length" {...field} />
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
                    <FormLabel>waist</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={loading} placeholder="chestSize size" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={shirtForm.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>length</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={loading} placeholder="shoulder size" {...field} />
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
                    <FormLabel>chest_size </FormLabel>
                    <FormControl>
                      <Input type="number" disabled={loading} placeholder="notes length" {...field} />
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
                    <FormLabel>sleves_length </FormLabel>
                    <FormControl>
                      <Input type="number" disabled={loading} placeholder="collar " {...field} />
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
                    <FormLabel>cuff_size</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={loading} placeholder="placket length" {...field} />
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
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={loading} placeholder="seat size" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex mt-4 justify-between">
                <Button onClick={handlePreviousPage} disabled={loading}>
                  Previous
                </Button>
                <Button className="ml-auto" type="submit" disabled={loading}>
                  {action}
                </Button>
              </div>
            </div>

          </div>

        </form>
      </Form>
    </>
  );
};
