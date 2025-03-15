import { collection, getDoc, doc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';
import { database } from 'app/firebase.config';

const statsRef = collection(database, 'statistics');

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ data: string[] }> }
) {
  const [userId] = (await context.params).data;

  const getStats = (await getDoc(doc(statsRef, userId))).data()

  const stats =  getStats &&  Object.values(getStats) || {}

  return NextResponse.json({ stats});

}
