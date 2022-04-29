import React from 'react'
import {signOut} from 'firebase/auth'
export default function SignOut({auth}) {

  function handleSignOut(){
    signOut(auth)

  }
  return auth.currentUser && (
      <button className="sign-out" onClick={() => handleSignOut()}>Sign Out</button>
    )
}
