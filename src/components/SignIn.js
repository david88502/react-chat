import React from 'react'; 
import {  signInWithPopup } from "firebase/auth";



export default function SignIn({auth, provider}) {
    function handleSignIn(){
        signInWithPopup(auth, provider)

    }
    return (
        <div className='sign-in'>
            <button className='sign-in__button' onClick={()=>handleSignIn()}>Sign in with Google</button>
        </div>
     
    )
}
