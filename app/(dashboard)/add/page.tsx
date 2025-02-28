'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { on } from 'events';
import { FundraiserSchemaType, FundraiserSchema, CreatorSchemaType } from '@/lib/types';
import { generateRandomId } from '@/lib/utils';

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message:
        'name must be at least 1 character long, between 10 and 20 characters recommended'
    })
    .max(50, { message: 'The name should have less than 50 characters' }),

  category: z.string().min(1, { message: 'Category is required.' }),

  startDate: z
    .string()
    .date()
    .refine(
      (date) => {
        return new Date(date) > new Date(Date.now());
      },
      { message: 'The start date is invalid' }
    ),

  endDate: z
    .string()
    .date()
    .refine(
      (date) => {
        return new Date(date) > new Date(Date.now());
      },
      { message: 'The end date is invalid' }
    ),

  description: z.string(),
  goalAmount: z.string().default('0'),
  raisedAmount: z.string().default('0')
});

export default function AddFundraiser() {
  const form = useForm<
    Pick<
      FundraiserSchemaType,
      | 'title'
      | 'startDate'
      | 'endDate'
      | 'category'
      | 'description'
      | 'goalAmount'
      | 'raisedAmount'
    >
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      category: 'education',
      description: '',
      goalAmount: '0',
      raisedAmount: '0'
    }
  });

  function onSubmit(e: z.infer<typeof formSchema>) {
    const fundraiserId = generateRandomId(5); 
    const createdAt = new Date().toISOString();
    const status = 'active';
    const creator = sessionStorage.getItem('user') as unknown as  CreatorSchemaType;
    const formData  = {...e} 
  }

  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8 min-w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" w-full items-center flex justify-between flex-wrap gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="w-[20rem]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="w-[20rem]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="education" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="This is a description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="goalAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Goal Amount</FormLabel>
                <FormControl>
                  <Input type="number" {...field} min={0} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="raisedAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raised Amount</FormLabel>
                <FormControl>
                  <Input type="number" {...field} min={0} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
