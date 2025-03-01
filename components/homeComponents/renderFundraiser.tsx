import { FundraiserSchemaType } from '@/lib/types';
import { Progress } from "@/components/ui/progress"


export default function RenderFundraiser({fundraiser}:{fundraiser: FundraiserSchemaType}) {
    const progressValue =(Number(fundraiser.raisedAmount)/Number(fundraiser.goalAmount))*100
  return (
    <div className=''>
      <div>{fundraiser.title}</div>
      <Progress value={progressValue} />
    </div>
  );
}
