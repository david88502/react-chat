import React, {useState,useRef} from 'react'
import {collection, addDoc,
        query, orderBy,limitToLast, serverTimestamp} from 'firebase/firestore'

import {useCollection } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage'
import {BiSend} from 'react-icons/bi'
export default function ChatRoom(props) {
    return (
        <>
            <section>
            <main>
            {
                value && value.docs.map(doc => <ChatMessage key={doc.id} {...doc.data()} auth={auth}/>)
            }
            <span ref={messagesEndRef}/>
            </main>
            </section>
            <div>
                <input 
                    value={sending? '':formValue} 
                    onChange={e=>setFormValue(e.target.value)}
                    disabled={sending}
                />
                <button onClick={e=>handleSendMessage(e)} disabled={formValue===''}>
                    <BiSend size="1em"/>
                </button>
            </div>
        </>
    )
}
