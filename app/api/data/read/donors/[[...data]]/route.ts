import { NextRequest, NextResponse } from 'next/server';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore';
import { database } from 'app/firebase.config';

const donorsCollection = collection(database, 'donors');
const usersCollection = collection(database, 'users');

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ data: string[] }> }
) {
  const params = await context.params;

  console.log(params, 'params');

  const userFundraisers = (
    await getDoc(doc(usersCollection, params.data[0]))
  ).data()?.fundraisers;

  const fundraiserIds = Object.keys(userFundraisers);

  // console.log(fundraiserIds);

  const getDonors =
    params.data.length === 1
      ? (await getDoc(doc(donorsCollection, fundraiserIds[0]))).data()
      : (await getDoc(doc(donorsCollection, params.data[1]))).data();
  
  const donors =  params.data[2] ? getDonors && getDonors[params.data[2]]   : Object.values(getDonors || {})

  // params.data[2] ?? donors = getDonors?.[params.data[2]]  

  console.log(donors);

  return NextResponse.json({ donors, fundraisers: Object.values(userFundraisers) });
}
