import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { DonorSchemaType } from '@/lib/types';
import { User2Icon, UserX2Icon } from 'lucide-react';
export default async function CustomerPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  console.log(id, 'id');
  const donor = (await (
    await fetch(`http://localhost:3000/api/data/read/donors/${id}`)
  ).json()) as unknown as DonorSchemaType;

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex items-center gap-7">
        <div className="w-[10.1rem] h-[10.1rem] rounded-full bg-gray-800">
          <User2Icon
            className="h-[10em] w-[10rem] rounded-full "
            color="white"
          />
        </div>
        <div>
          <div className="text-[1.5rem] ">{donor.email}</div>
          <div className=''>{donor.name}</div>
          <div className=''>{donor.phoneNumber}</div>
          <div className=''>{donor.phoneNumber}</div>


        </div>
      </div>
      <Table>
        <TableCaption>A list of {donor.name}'s recent donations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donor.Donations &&
            donor.Donations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell className="font-medium">
                  {donation.fundraiserTitle}
                </TableCell>
                <TableCell>{donation.paymentMethod}</TableCell>
                <TableCell>{donation.createdAt}</TableCell>
                <TableCell className="text-right">{donation.amount}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">${donor.Donations?.reduce((curr, acc)=> curr + acc.amount, 0) ?? 0}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
