'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import Selector from '@/components/blocks/categorySelector';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  FundraiserSchemaType,
  CreatorSchemaType,
  FundraiserSchema
} from '@/lib/types';
import { generateRandomId } from '@/lib/utils';
import Cookies from 'js-cookie';
// const formSchema = z.object({
//   title: z
//     .string()
//     .min(1, {
//       message:
//         'name must be at least 1 character long, between 10 and 20 characters recommended'
//     })
//     .max(50, { message: 'The name should have less than 50 characters' }),

//   category: z.string().min(1, { message: 'Category is required.' }),

//   startDate: z
//     .string()
//     .date()
//     .refine(
//       (date) => {
//         return new Date(date) > new Date(Date.now());
//       },
//       { message: 'The start date is invalid' }
//     ),

//   endDate: z
//     .string()
//     .date()
//     .refine(
//       (date) => {
//         return new Date(date) > new Date(Date.now());
//       },
//       { message: 'The end date is invalid' }
//     ),

//   description: z.string(),
//   goalAmount: z.string().default('0'),
//   raisedAmount: z.string().default('0')
// });

type formSchema = Pick<
  FundraiserSchemaType,
  | 'title'
  | 'startDate'
  | 'endDate'
  | 'category'
  | 'description'
  | 'goalAmount'
  | 'raisedAmount'
  | 'customThankYouMessage'
>;

export default function AddFundraiser() {
  const form = useForm<formSchema>({
    resolver: zodResolver(z.any()),
    defaultValues: {
      title: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      category: 'Education',
      description: '',
      goalAmount: '0',
      raisedAmount: '0',
      customThankYouMessage: ''
    }
  });

  async function onSubmit(e: formSchema) {
    const id = generateRandomId(5);
    const createdAt = new Date().toISOString();
    const updatedAt = null;
    const status = 'active';
    const creator = JSON.parse(
      Cookies.get('user') || '{}'
    ) as unknown as CreatorSchemaType;
    const getFormData = { ...e, id, createdAt, updatedAt, status, creator };

    delete creator.token;
    const formData = new FormData();

    formData.append('fundraiserData', JSON.stringify(getFormData));

    const response = await fetch('/api/data/create/fundraiser/', {
      method: 'POST',
      body: formData
    });

    const responseToText = await response.json();

    console.log(responseToText);
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
                  {/* <Input placeholder="education" {...field} /> */}
                  <Selector
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="category"
                    placeholder="Select a category"
                  />
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
                  <div>
                    <textarea {...field} rows={10} cols={100} />
                  </div>
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
           <FormField
            control={form.control}
            name="customThankYouMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Thank You Message</FormLabel>
                <FormControl>
                  <div>
                    <textarea {...field} rows={10} cols={100} />
                  </div>
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
