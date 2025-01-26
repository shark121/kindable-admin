import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from '@/components/ui/table';
import { DonorSchemaType } from "@/lib/types"
import Donation from 'images/svg/donate';
import {User2Icon} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
  } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Customer({customer}:{customer: DonorSchemaType}){ 
  return (
    <TableRow>
      {/* <TableCell className="hidden sm:table-cell">
        <User2Icon size={64} />
      </TableCell> */}
      <TableCell className="font-medium">{customer.email}</TableCell>
      <TableCell className="hidden md:table-cell">{`${customer.phoneNumber ?? "N/A"}`}</TableCell>
      <TableCell className="hidden md:table-cell">
        {customer.Donations ? customer.Donations?.map((donation) => donation.amount).reduce((a, b) => a + b, 0) : 0} 
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {customer.defaultPaymentMethod ??  "N/A"} 
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {customer.createdAt}
        </TableCell>
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={()=>{}}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
