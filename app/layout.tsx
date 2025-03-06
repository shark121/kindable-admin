'use client';
import './globals.css';
// import { Analytics } from '@vercel/analytics/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from "app/firebase.config"
import { storeUserInfo } from '@/lib/auth';
import {SearchProvider} from "../components/context/searchContext"

onAuthStateChanged(auth, async (user) => {

  console.log("auth")

  const userDoesNotExist = Cookies.get("user") === null || Cookies.get("user") === undefined;
  
  console.log(user, "user from layout............")
  try {
    userDoesNotExist && user && user.emailVerified && await storeUserInfo(user);
  } catch (e) {
    console.log(e);
  }
})


export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // "use client"

  const userCookie = Cookies.get('user');

  // console.log(userCookie)

  useEffect(()=>{
    // console.log(window.location.pathname)
    const shouldNavigate =  !userCookie && (window.location.pathname !== '/login')

      if (shouldNavigate) {
        window.location.href = '/login';
        console.log('not user');
      }

  },[])



  return (
    <html lang="en">
      <Head>
        <title></title>
        <meta name="" content="" />
      </Head>
      <body className="flex min-h-screen w-full flex-col text-gray-800">
        <SearchProvider>
        {children}
        </SearchProvider>
        </body>
      {/* <Analytics /> */}
    </html>
  );
}
