import React from 'react'

export default function ChatMessage(props) {

    const {text, uid, photoURL, auth} = props

    const messageClass = uid === auth.currentUser.uid? 'sent': 'received'
    return (
        <div className={`msg-container ${messageClass}`}>
            <img className="profile-pic" src={photoURL} alt=""/>
            <p className='msg'>{text}</p>
        </div>
    )
}
