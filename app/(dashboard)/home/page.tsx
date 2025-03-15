import Chart from '@/components/charts/lineChart';
import RenderFundraiser from '@/components/homeComponents/renderFundraiser';
import { FundraiserSchemaType, StatisticsSchemaType } from '@/lib/types';


export default async function Home({searchParams}:{searchParams:any}) {

      
  const qparams =  await  searchParams
  console.log(qparams["x_dk"], 'qparams');
  const uid = qparams["x_dk"] ?? ""
  
  const eventsData = uid && await fetch(`${process.env.NEXT_PUBLIC_URL}/api/data/read/statistics/${uid}`, {
    // cache:""
  });

  const eventsDataToJson = await eventsData.json() as {stats : StatisticsSchemaType[]};

  console.log(eventsDataToJson, 'eventsDataToJson');

  return (
    <div className="h-full w-full">
      <Chart data={eventsDataToJson.stats.reverse()} />
    </div>
  );
}
