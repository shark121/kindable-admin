import { UserCredential, getAdditionalUserInfo, User } from "firebase/auth";
import {setDoc, doc, collection} from "firebase/firestore"
import {database} from "../app/firebase.config"
import { UserData, UserInfo, UserInfoWithToken } from "./types";
import Cookies from "js-cookie"

export async function storeIfNewUser(userCredential: UserCredential) {
    const additionalUserInfo = getAdditionalUserInfo(userCredential);
  
    const userData: UserData = {
      accountInfo: {
        name: userCredential.user.displayName,
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        emailVerified: userCredential.user.emailVerified,
      },
      fundraisers: [],
    
    };
  
    if (additionalUserInfo && additionalUserInfo.isNewUser) {
      await setDoc(
        doc(collection(database, "users"), userCredential.user.uid),
        userData,
        { merge: true }
      );
      console.log("New user data stored.");
    }
  
    // console.log("User signed in:", userInfo);
  }


  export async function storeUserInfo(user: User): Promise<UserInfo | null> {
    try {
      console.log("Signing in...");
  
      const authToken = await user.getIdTokenResult();
      console.log("Token received:", authToken);
  
      const {
        uid,
        email,
        emailVerified,
        photoURL,
        displayName,
        phoneNumber,
      } = user;
       
      
      const userInfo: UserInfoWithToken = {
        uid,
        email,
        emailVerified,
        photoURL,
        displayName,
        phoneNumber,
        token : authToken.token,
      };
  
      Cookies.set("user", JSON.stringify(userInfo), {
        secure: true,
        sameSite: "strict",
        expires: new Date(authToken.expirationTime),
      });
  
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
  
      return userInfo;
    } catch (error) {
      console.error("Error during sign-in:", error);
      // toast({ description: "Sign-in failed. Please try again.", status: "error" });
      return null;
    }
  }