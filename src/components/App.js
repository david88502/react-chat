import {initializeApp} from 'firebase/app'
import { getFirestore, collection, addDoc,
  query, orderBy,limitToLast, serverTimestamp } from 'firebase/firestore'
import { getAuth,GoogleAuthProvider
      } from 'firebase/auth'

import { useAuthState} from 'react-firebase-hooks/auth';
import {useCollection } from 'react-firebase-hooks/firestore';
import { useState, useRef } from 'react';
import '../css/app.css'
import SignIn from './SignIn'
import SignOut from './SignOut'

import ChatMessage from './ChatMessage'
import {BiSend} from 'react-icons/bi'


const firebaseConfig = {
  apiKey: "AIzaSyAd32TuYwHsTKARaUCBxrgU_PhiyZeZXhk",
  authDomain: "chat-app-2396d.firebaseapp.com",
  projectId: "chat-app-2396d",
  storageBucket: "chat-app-2396d.appspot.com",
  messagingSenderId: "443771424604",
  appId: "1:443771424604:web:394ea97fad18688a597b99",
  measurementId: "G-MR4BMP11E0"
}
initializeApp(firebaseConfig)


const auth = getAuth()
const db = getFirestore()
const provider = new GoogleAuthProvider()



function App() {

  const [user] = useAuthState(auth);
  
  const [formValue, setFormValue] =  useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef()

  const colRef = collection(db,'messages')
  const q = query(colRef, orderBy('timestamp','asc'), limitToLast(20))
  const [value] = useCollection(q)

  async function handleSendMessage(e){
    e.preventDefault()
    if (formValue !== '' && user){
        setSending(true)
        await addDoc(colRef,{
            text: formValue,
            timestamp:serverTimestamp(),
            uid: user.uid, 
            photoURL: user.photoURL,
        })
        messagesEndRef.current.scrollIntoView()
        setSending(false)
        setFormValue('')
    }
}

  return (
    <div className='app'>
      <header>
        <div className='app__title-container'>
          <p className='title blue'>R</p>
          <p className='title red'>e</p>
          <p className='title yellow'>a</p>
          <p className='title blue'>c</p>
          <p className='title green'>t</p>
          <p className='title grey title-chat'>Chat</p>
        </div>
        <SignOut auth={auth} />
      </header>
      <section>
      <main>
        {user? value && value.docs.map(doc => <ChatMessage key={doc.id} {...doc.data()} auth={auth}/>)
        : 
        <SignIn auth={auth} provider={provider}/>
        }
        <span ref={messagesEndRef}></span>
      </main>
 
      <div className='chat-form' >
          <input 
            className='chat-form__input' 
            value={sending? 'Sending ......':formValue} 
            onChange={e=>setFormValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(e)
              }
            }}
          />
          <button className='chat-form__button' onClick={e=>handleSendMessage(e)} disabled={formValue==='' || user === null}>
            <BiSend size="3.5vh"/>
          </button>
        </div>
        </section>
    </div>
  )
}

export default App
