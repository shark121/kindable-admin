import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { FundraiserSchemaType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import Link from 'next/link';
// import { SelectProduct } from '@/lib/db';
import { deleteProduct } from './actions';
import Donation from 'images/svg/donate';
import { products } from '@/lib/db';

export function Product({ fundraiser }: { fundraiser: FundraiserSchemaType }) {
  console.log(fundraiser);
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        {/* <Image
          alt="fundraiser image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={fundraiser.imageUrl}
          width="64"
          /> */}
        <Donation size={64} />
      </TableCell>
      <TableCell className="font-medium">{fundraiser.title}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {fundraiser.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${fundraiser.raisedAmount}`}</TableCell>
      <TableCell className="hidden md:table-cell">
        {fundraiser.goalAmount}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {/* {product.availableAt.toLocaleDateString("en-US")} */}
        {fundraiser.createdAt}
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
            <DropdownMenuItem>
              <Link
                className="w-full h-full"
                href={`/fundraisers/edit/${fundraiser.id}`}
              >
                Edit{' '}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                className="w-full h-full"
                href={`/fundraisers/view/${fundraiser.id}`}
              >
                View
              </Link>
              {/* <form action={deleteProduct}>
                <button type="submit">Delete</button>
                </form> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
