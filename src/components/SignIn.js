import React from 'react'; 
import {  signInWithPopup } from "firebase/auth";



export default function SignIn({auth, provider}) {
    function handleSignIn(){
        signInWithPopup(auth, provider)

    }
    return (
        <button className='btn btn-sign-in' onClick={()=>handleSignIn()}>Sign in with Google</button>
    )
}
