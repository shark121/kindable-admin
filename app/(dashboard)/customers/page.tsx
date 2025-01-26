
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
// import {use} from "react"
import { Suspense } from 'react';
import CustomerTable from './customers-table';

export default function CustomersPage() {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Card>
      <CardHeader>
        <CardTitle>Donors</CardTitle>
        <CardDescription>View all donors and donations.</CardDescription>
      </CardHeader>
      <CardContent>
        <CustomerTable />
      </CardContent>
    </Card>
    </Suspense>
  );
}
