import LineChart from '@/components/charts/lineChart';
import RenderProgress from '@/components/homeComponents/renderProgress';
import { FundraiserSchemaType } from '@/lib/types';
import { data } from 'autoprefixer';
import { use } from 'react';

import { Suspense } from 'react';

// Create a separate component for the data fetching part
async function EventsList() {
  const eventsData = await fetch('http://localhost:5000/fundraisers');
  const eventsDataToJson = await eventsData.json();

  return (
    <div className="flex">
      {eventsDataToJson.map((el: FundraiserSchemaType, index: number) => {
        if (el.status == 'active')
          return (
            <div key={index} className='flex flex-col'>
              <div>{el.title}</div>
            <RenderProgress fundraiser={el}/>
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
