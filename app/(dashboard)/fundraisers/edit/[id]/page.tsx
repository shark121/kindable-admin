'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useEffect } from 'react';
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
import {
  FundraiserSchemaType,
  FundraiserSchema,
  CreatorSchemaType
} from '@/lib/types';
import Selector from '@/components/blocks/categorySelector';
import Cookies from 'js-cookie';
import { set } from 'date-fns';
import { UploadIcon } from 'lucide-react';

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
//   raisedAmount: z.string().default('0'),
//   imageUrl: z.string().optional(),
//   creator: z.object({
//     id: z.string(),
//     name: z.string(),
//     email: z.string(),
//     imageUrl: z.string().optional()
//   }),
//   status: z.enum(['active', 'closed']).default('active')
// });

export default function AddFundraiser({
  params, searchParams
}: {
  params: Promise<{ id: string }>,
  searchParams: Promise<{ x_dk: string }>
}) {
  const [creator, setCreator] = useState<CreatorSchemaType | null>(null);
  const [id, setId] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  type formSchema = Pick<
    FundraiserSchemaType,
    | 'title'
    | 'status'
    | 'startDate'
    | 'endDate'
    | 'category'
    | 'description'
    | 'goalAmount'
    | 'raisedAmount'
    | "customThankYouMessage"
  >;

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
      status: 'active',
      customThankYouMessage: ''
    }
  });

  useEffect(() => {
    (async () => {
      const eventID = (await params).id;
      console.log(eventID, 'eventID');
      setId(eventID);
      const eventData = localStorage.getItem(eventID);
       
      const sp = await searchParams
      const uid = sp['x_dk'] ?? ''

      if (eventData === null) {
        await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/data/read/fundraisers/${uid}/${eventID}`
        ).then(async (res) => {
          const data = await res.json();

          form.setValue('category', data.category);
          form.setValue('description', data.description);
          form.setValue('goalAmount', String(data.goalAmount));
          form.setValue('raisedAmount', String(data.raisedAmount));
          form.setValue(
            'startDate',
            new Date(data.startDate).toISOString().slice(0, 10)
          );
          form.setValue(
            'endDate',
            new Date(data.endDate).toISOString().slice(0, 10)
          );
          form.setValue('title', data.title);
          form.setValue("customThankYouMessage", data.customThankYouMessage);

          setCreator(data.creator);
          setCreatedAt(data.createdAt);
        });
      }
    })();
  }, []);

  async function onSubmit(e: formSchema) {
    const updatedAt = new Date().toISOString();
    const creator = JSON.parse(
      Cookies.get('user') || '{}'
    ) as unknown as CreatorSchemaType;
    const getFormData = { ...e, id, updatedAt, createdAt,  creator };

    console.log(getFormData);
    delete creator.token;
    const formData = new FormData();

    formData.append('fundraiserData', JSON.stringify(getFormData));

    const response = await fetch('/api/data/create/fundraiser/', {
      method: 'PUT',
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
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input placeholder="active" {...field} />
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
                  {/* <Input placeholder="education" {...field} />
                   */}
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
