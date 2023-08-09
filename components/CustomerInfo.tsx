'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField, FormControl, FormItem, FormLabel, FormMessage , Form} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Customer } from '@/types';
import * as z from 'zod';
import loading from '@/app/loading';

// Define the form schema for the Customer model
const customerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    address: z.string().min(1),
  });
  
  interface CustomerInfoProps {
    loading: boolean;
  }

const CustomerInfo: React.FC<CustomerInfoProps> = ({  loading}) => {
    const customerForm = useForm({
        resolver: zodResolver(customerSchema),
        defaultValues: {
          name: '',
          email: '',
          phone: '',
          address: '',
        },
      });
    
      const handleCustomerSubmit = async (data: any) => {
        // Handle customer form submission
      };
  return (
    <div style={{ display: 'block' }}>
        <Form {...customerForm}>
      <form  onSubmit={customerForm.handleSubmit(handleCustomerSubmit)}>
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
      </form>
    </Form>
    </div>
  );
};

export default CustomerInfo;
