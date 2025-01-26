'use client';

import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';
import Customer from './customer';
import { use, useState, useEffect } from 'react';
import { DonorSchemaType } from '@/lib/types';

export default function CustomerTable() {
  //   const donors = use(fetch("/api/read/donors"));
  //   const donorsJson = await donors.json();
  const [donors, setDonors] = useState<DonorSchemaType[]>([]);
  useEffect(() => {
    fetch('/api/data/read/donors')
      .then((res) => res.json())
      .then((data) => {
        setDonors(data.data);
      });
  }, []);

  return (
    donors && (
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead>Name</TableHead> */}
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Total Donations</TableHead>
            <TableHead>Default Payment Method</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donors.map((donor: DonorSchemaType) => (
            <Customer customer={donor} key={donor.id} />
          ))}
        </TableBody>
      </Table>
    )
  );
}
