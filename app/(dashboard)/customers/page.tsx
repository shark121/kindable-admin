'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
// import {use} from "react"
import { Suspense, useEffect, useState } from 'react';
import CustomerTable from './customers-table';
import { FundraiserSchemaType } from '@/lib/types';
import FundraiserSelector from '@/components/blocks/fundraiserSelector';

export default function CustomersPage() {
  const [fundraisersState, setFundraisersState] = useState<FundraiserSchemaType[] | undefined>();
  const [fundraiser, setFundraiser] = useState<FundraiserSchemaType>();


  useEffect(()=>{
    console.log(fundraiser, 'fundraiser stuff');
  },[fundraiser])

  // console.log(fundraisersState, 'fundraisers from customers page');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Card>
        <CardHeader>
          <CardTitle>Donors</CardTitle>
          <CardDescription>View all donors and donations.</CardDescription>
          <FundraiserSelector
            fundraisers={fundraisersState}
            searchDomain={fundraisersState ? fundraisersState[0].title : ''}
            setSearchDomain={setFundraiser}
          />
        </CardHeader>
        <CardContent>
          <CustomerTable
            fundraiser={fundraiser}
            setFundraiser={setFundraiser}
            fundraisers={fundraisersState}
            setFundraisers={setFundraisersState}
          />
        </CardContent>
      </Card>
    </Suspense>
  );
}
