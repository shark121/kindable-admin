import { NextRequest, NextResponse } from 'next/server';


export  async function GET(req:NextRequest, context:{data:string[]}) {
    const data = await fetch("http://localhost:5000/users")
    const dataToJson = await data.json()

    return NextResponse.json({data:dataToJson})
}