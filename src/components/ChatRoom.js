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
            <div className='chat-room__form' >
                <input 
                    className='chat-room__input' 
                    value={sending? 'Sending ......':formValue} 
                    onChange={e=>setFormValue(e.target.value)}
                />
                <button className='chat-room__form-button' onClick={e=>handleSendMessage(e)} disabled={formValue===''}>
                    <BiSend size="3.5vh"/>
                </button>
            </div>
        </>
    )
}
