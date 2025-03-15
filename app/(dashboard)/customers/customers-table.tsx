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
import { DonorSchemaType, FundraiserSchemaType, UserInfo } from '@/lib/types';
import Cookies from 'js-cookie';
import NotFound from 'not-found';

export default function CustomerTable({
  customers,
  setFundraisers,
  fundraisers,
  fundraiser,
  setFundraiser
}: {
  customers?: DonorSchemaType[];

  setFundraisers?: React.Dispatch<
    React.SetStateAction<FundraiserSchemaType[] | undefined>
  >;

  fundraisers?: FundraiserSchemaType[];

  fundraiser?: FundraiserSchemaType;

  setFundraiser?: React.Dispatch<
    React.SetStateAction<FundraiserSchemaType | undefined>
  >;
}) {
  const [donors, setDonors] = useState<DonorSchemaType[]>([]);

  console.log(customers, 'customers from table');

  useEffect(() => {
    if (customers) {
      setDonors(customers);
      return;
    }

    const userInfo = JSON.parse(Cookies.get('user') || '{}') as UserInfo;

    if (!userInfo) return;

    fetch(`/api/data/read/donors/${userInfo.uid}`)
      .then((res) => res.json())
      .then(
        (data: {
          donors: DonorSchemaType[];
          fundraisers: FundraiserSchemaType[];
        }) => {
          data && setDonors(data.donors);
          data && setFundraiser && setFundraiser(data.fundraisers[0]);
          data && setFundraisers && setFundraisers(data.fundraisers);

          console.log(data);
        }
      );
  }, []);

  useEffect(() => {
    const userInfo = JSON.parse(Cookies.get('user') || '{}') as UserInfo;

    fundraiser &&
      fetch(`/api/data/read/donors/${userInfo.uid}/${fundraiser.id}`)
        .then((res) => res.json())
        .then(
          (data: {
            donors: DonorSchemaType[];
            fundraisers: FundraiserSchemaType[];
          }) => {
            data && setDonors(data.donors);
            console.log(data, fundraiser.id, 'donors ...');
            // data && setFundraisers && setFundraisers(data.fundraisers);

            console.log(data);
          }
        );
  }, [fundraiser]);


  if(!customers && !donors) return <NotFound/>
  

  if (customers && fundraiser)
    return (
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead>Name</TableHead> */}
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Total Donations</TableHead>
            {/* <TableHead>Default Payment Method</TableHead> */}
            {/* <TableHead>Created At</TableHead> */}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((donor: DonorSchemaType) => (
            <Customer customer={donor} key={donor.id} fundraiser={fundraiser} />
          ))}
        </TableBody>
      </Table>
    );

  return (
    donors &&
    fundraiser && (
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead>Name</TableHead> */}
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Total Donations</TableHead>
            {/* <TableHead>Default Payment Method</TableHead> */}
            {/* <TableHead>Created At</TableHead> */}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donors.map((donor: DonorSchemaType) => (
            <Customer customer={donor} key={donor.id} fundraiser={fundraiser} />
          ))}
        </TableBody>
      </Table>
    )
  );
}
