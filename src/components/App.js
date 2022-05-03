import {initializeApp} from 'firebase/app'
import { getFirestore, collection, addDoc, doc, deleteDoc, query, orderBy, getDocs,
        limitToLast, serverTimestamp} from 'firebase/firestore'
import { getAuth,GoogleAuthProvider} from 'firebase/auth'
import { useAuthState} from 'react-firebase-hooks/auth';
import {useCollection } from 'react-firebase-hooks/firestore';
import { useState, useRef } from 'react';
import Helmet from 'react-helmet';
import SignIn from './SignIn'
import SignOut from './SignOut'
import ClearChat from './ClearChat';
import ChatMessage from './ChatMessage'
import {BiSend} from 'react-icons/bi'
import '../css/app.css'

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
  const q = query(colRef, orderBy('timestamp','asc'), limitToLast(25))

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
        messagesEndRef.current.scrollIntoView({behavior:'smooth'})
        setSending(false)
        setFormValue('')
    }
  }

  async function handleDeleteDoc(id){
    await deleteDoc(doc(db, "messages",id))
  }

  async function handleClearChat(e){
    e.preventDefault()


    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((document) => {
      handleDeleteDoc(document.id)
    })

    

  }

  return (

    <div className='app'>
        <Helmet>
          <title>React Chat</title>
          <link
            rel="icon"
            type="image/png"
            href={require('../assets/favicon.ico')}
            sizes="16x16"
          />
        </Helmet>

      <div className='header'> 
        <div className='title-container'>
          <p className='title blue'>R</p>
          <p className='title red'>e</p>
          <p className='title yellow'>a</p>
          <p className='title blue'>c</p>
          <p className='title green'>t</p>
          <p className='title grey title-word'>Chat</p>
        </div>
        { user && 
          <div className='btn-container'>
            <ClearChat 
              handleClearChat={handleClearChat}
              sending={sending}
            />
            <SignOut auth={auth} />
          </div>
        }
      </div>
      <div className='body'>
        {user? 
          value ? 
            value.docs.map(doc => <ChatMessage key={doc.id} {...doc.data()} auth={auth}/>)
          : 
            <div className='loading-text'>Loading . . . . . .</div>
        : 
        <SignIn auth={auth} provider={provider}/>
        }
        <span ref={messagesEndRef}></span>
      </div>
 
      <div className='footer' >
          <input 
            className='input' 
            value={sending? 'Sending ......':formValue} 
            disabled={sending}
            onChange={e=>setFormValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(e)
              }
            }}
          />
          <button 
            className='submit-btn' 
            onClick={e=>handleSendMessage(e)} 
            disabled={formValue==='' || user === null}
          >
            <BiSend size="2.5rem"/>
          </button>
        </div>
        

    </div>
    
  )
}

export default App

