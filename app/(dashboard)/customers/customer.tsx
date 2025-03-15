// "use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from '@/components/ui/table';
import { DonorSchemaType, FundraiserSchemaType } from '@/lib/types';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { UserInfo } from '@/lib/types';

export default function Customer({ customer, fundraiser }: { customer: DonorSchemaType, fundraiser: FundraiserSchemaType }) {


  return (
    <TableRow>
      {/* <TableCell className="hidden sm:table-cell">
        <User2Icon size={64} />
      </TableCell> */}
      <TableCell className="font-medium">{customer.email}</TableCell>
      <TableCell className="hidden md:table-cell">{`${customer.phoneNumber ?? 'N/A'}`}</TableCell>
      <TableCell className="hidden md:table-cell">
        {customer.Donations
          ? customer.Donations?.map((donation) => donation.amount).reduce(
              (a, b) => a + b,
              0
            )
          : 0}
      </TableCell>
      {/* <TableCell className="hidden md:table-cell">
        {customer.defaultPaymentMethod ??  "N/A"} 
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {customer.createdAt}
        </TableCell> */}
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/customers/${fundraiser.id}/${customer.id}`} className="w-full h-full">
                View
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <form action={()=>{}}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
