import { NextRequest, NextResponse } from 'next/server';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore';
import { database } from 'app/firebase.config';

const fundraiserCollection = collection(database, 'fundraisers');
const userCollection = collection(database, 'users');

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ data: string[] }> }
) {
  const params = await context.params;
  const response =
    params.data.length === 1
      ? Object.values(
          (await getDoc(doc(userCollection, params.data[0]))).data()
            ?.fundraisers || {}
        )
      : (await getDoc(doc(fundraiserCollection, params.data[1]))).data()

      
  console.log(response);
  return NextResponse.json(response);
}

// const fundraiserssCollection = collection(database, 'fundraisers');
// const usersCollection = collection(database, 'users');

// export async function GET(
//   req: NextRequest,
//   context: { params: Promise<{ data: string[] }> }
// ) {
//   const params = await context.params;

//   console.log(params, 'params');

//   const userFundraisers = (
//     await getDoc(doc(usersCollection, params.data[0]))
//   ).data()?.fundraisers;

//   const fundraiserIds = Object.keys(userFundraisers);

//   // console.log(fundraiserIds);

//   const getDonors =
//     params.data.length === 1
//       ? (await getDoc(doc(fundraiserssCollection, fundraiserIds[0]))).data()
//       : (await getDoc(doc(fundraiserssCollection, params.data[1]))).data();

//   const donors =  params.data[2] ? getDonors && getDonors[params.data[2]]   : Object.values(getDonors || {})

//   // params.data[2] ?? donors = getDonors?.[params.data[2]]

//   console.log(donors);

//   return NextResponse.json({ donors, fundraisers: Object.values(userFundraisers) });
// }
