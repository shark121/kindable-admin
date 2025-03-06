import { NextRequest, NextResponse } from 'next/server';
import { runTransaction, doc, collection } from 'firebase/firestore';
import { FundraiserSchemaType, CreatorSchemaType } from '@/lib/types';
import { database } from 'app/firebase.config';

const userCollection = collection(database, 'users');
const fundraisersCollection = collection(database, 'fundraisers');

type fundraiserUploadType = FundraiserSchemaType & {
  creator: CreatorSchemaType;
};

async function addFundraiser(fundraiserUploadData: fundraiserUploadType) {
  await runTransaction(database, async (transaction) => {
    const userDocRef = doc(userCollection, fundraiserUploadData.creator.uid);

    transaction.set(
      doc(fundraisersCollection, fundraiserUploadData.id),
      fundraiserUploadData
    );

    delete (fundraiserUploadData as any).creator;

    transaction.update(userDocRef, {
      [`fundraisers.${fundraiserUploadData.id}`]: { ...fundraiserUploadData }
    });
  });
}

export async function POST(req: NextRequest) {
  const requestData = (await req.formData()).get(
    'fundraiserData'
  ) as unknown as string;
  const requestDataToJSON = JSON.parse(requestData) as fundraiserUploadType;
  console.log(requestDataToJSON);
  const uploadResponse = await addFundraiser(requestDataToJSON);

  return NextResponse.json('success');
}

export async function PUT(req: NextRequest) {
  const requestData = (await req.formData()).get(
    'fundraiserData'
  ) as unknown as string;
  const requestDataToJSON = JSON.parse(requestData) as fundraiserUploadType;
  console.log(requestDataToJSON);
  const uploadResponse = await addFundraiser(requestDataToJSON);

  return NextResponse.json('update success');
}
