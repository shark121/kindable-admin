import { data } from 'autoprefixer';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ data: string[] }> }
) {
  const params = await context.params;

  //   console.log(params.data[0], "params data")

  const response =
    params.data.length === 0
      ? await fetch('http://localhost:5000/fundraisers')
      : await fetch(
          `http://localhost:5000/fundraisers/${params.data[0]}`
        );

  //   console.log(await response.json(), "response data")

  return NextResponse.json(await response.json());
}
