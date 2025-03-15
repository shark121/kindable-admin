'use client';

// i tried my best  use server components man, I am not wise enough to do that yet

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
import { User2Icon } from 'lucide-react';
import { useEffect } from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';

export default function CustomerPage({
  params
}: {
  params: Promise<{ data: string[] }>;
}) {
  const [donorState, setDonorState] = useState<DonorSchemaType | undefined>();


  useEffect(() => {
    (async () => {

      const userInfo = JSON.parse(Cookies.get('user') || '{}') as {
        uid: string;
      };

      if (!userInfo) return;

      const id = (await params).data[1];
      const fundraiserId = (await params).data[0];

      const donor = (await (
        await fetch(`/api/data/read/donors/${userInfo.uid}/${fundraiserId}/${id}`)
      ).json()) as unknown as {donors : DonorSchemaType};


      console.log(donor, 'donor');
      setDonorState(donor.donors);
    })();
  }, []);

  return (
    donorState && (
      <div className="w-full h-full flex flex-col gap-4">
        <div className="flex items-center gap-7">
          <div className="w-[10.1rem] h-[10.1rem] rounded-full bg-gray-800">
            <User2Icon
              className="h-[10em] w-[10rem] rounded-full "
              color="white"
            />
          </div>
          <div>
            <div className="text-[1.5rem] ">{donorState.email?.replace("_",".")}</div>
            <div className="">{donorState.name}</div>
            <div className="">{donorState.phoneNumber}</div>
            <div className="">{donorState.phoneNumber}</div>
          </div>
        </div>
        <Table>
          <TableCaption>
            A list of {donorState.name}'s recent donations.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donorState.Donations &&
              donorState.Donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">
                    {donation.title}
                  </TableCell>
                  <TableCell>{donation.paymentMethod}</TableCell>
                  <TableCell>{donation.createdAt}</TableCell>
                  <TableCell className="text-right">
                    {donation.amount}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                $
                {donorState.Donations?.reduce(
                  (curr, acc) => curr + acc.amount,
                  0
                ) ?? 0}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  );
}
