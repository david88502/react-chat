import React from 'react'

export default function ClearChat({handleClearChat,sending}) {
    return (
        <button 
            className="clear-chat" 
            onClick={(e) => handleClearChat(e)}
            disabled={sending}
        >
            Clear Chat
        </button>
    )
}
