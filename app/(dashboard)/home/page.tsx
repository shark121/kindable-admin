import LineChart from '@/components/charts/lineChart';
import RenderFundraiser from '@/components/homeComponents/renderFundraiser';
import { FundraiserSchemaType } from '@/lib/types';
import { data } from 'autoprefixer';
import { use } from 'react';

import { Suspense } from 'react';

// Create a separate component for the data fetching part
async function EventsList() {
  const eventsData = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/data/read/fundraisers`);
  const eventsDataToJson = await eventsData.json();

  return (
    <div className="flex flex-col gap-4 w-full ">
      {eventsDataToJson.map((el: FundraiserSchemaType, index: number) => {
        if (el.status == 'active')
          return (
            <div key={index} className='flex'>
              {/* <div>{el.title}</div> */}
            <RenderFundraiser fundraiser={el}/>
            </div>
          );
      })}
      <div></div>
    </div>
  );
}

// Create a loading component
function EventsLoading() {
  return <div>Loading events...</div>;
}

export default function Home() {
  return (
    <div className="h-full w-full">
      <LineChart />
      <Suspense fallback={<EventsLoading />}>
        <EventsList />
      </Suspense>
    </div>
  );
}
