import { NextRequest, NextResponse } from 'next/server';
import {getDoc, doc, collection, getDocs} from "firebase/firestore"
import {database} from "app/firebase.config"


const fundraiserCollection = collection(database, "donors")


export async function GET(
  req: NextRequest,
  context: { params: Promise<{ data: string[] }> }
) {
  const params = await context.params;
  const response =
    params.data === undefined || params.data.length === 0
      ? (await getDocs(fundraiserCollection)).docs.map(doc => doc.data())
      : (await getDoc(doc(fundraiserCollection, params.data[0]))).data();
      // : await fetch(`http://localhost:5000/fundraisers/${params.data[0]}`);
  
  console.log(response)
  return NextResponse.json(response);
}
