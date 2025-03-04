import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FundraiserSchemaType } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import Donation from 'images/svg/donate';
import { Edit2Icon } from 'lucide-react';
import Link from 'next/link';

export default async function View({ params }: { params: { id: string } }) {
  const { id: param } = params;
  console.log(param, 'parameter');

  const fundraiser = (await (
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/data/read/fundraisers/${param}`)
  ).json()) as FundraiserSchemaType;

  console.log(fundraiser);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="text-[2rem] font-bold">{fundraiser.title}</div>
          <Badge variant="outline" className="font-bold h-[20px]">
            active
          </Badge>
        </div>
        <Link href={`/fundraisers/edit/${fundraiser.id}`} className="hover:opacity-80 flex">
          Edit <Edit2Icon size={25} />
        </Link>
      </div>
      <div className="flex gap-6 items-center">
        <Donation size={150} />
        <div className="w-[60%]">
          <Progress
            value={
              (Number(fundraiser.raisedAmount) / Number(fundraiser.goalAmount)) *
              100
            }
          />
          <div className="flex justify-between">
            <div>${fundraiser.raisedAmount}</div>
            <div>${fundraiser.goalAmount}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="text-xs">Category</div>
          <div>{fundraiser.category}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-xs">Description</div>
          <ScrollArea className="w-[70%] h-[200px]">
            {fundraiser.description}
          </ScrollArea>
        </div>
        <div className="flex flex-col">
          <div className="text-xs">Date Created</div>
          <div>{new Date(fundraiser.createdAt).toDateString()}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-xs">Start Date</div>
          <div>{new Date(fundraiser.start_date).toDateString()}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-xs">End Date</div>
          <div>{new Date(fundraiser.end_date).toDateString()}</div>
        </div>
      </div>
    </div>
  );
}