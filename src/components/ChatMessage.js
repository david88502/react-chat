import React from 'react'

export default function ChatMessage(props) {

    const {text, uid, photoURL, auth} = props

    const messageClass = uid === auth.currentUser.uid? 'sent': 'received'
    return (
        <div className={`chat-message ${messageClass}`}>
            <img src={photoURL} alt=""/>
            <p>{text}</p>
        </div>
    )
}
