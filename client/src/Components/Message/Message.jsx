import React from 'react'
import './Message.css';
import { format } from 'timeago.js';
const Message = ({ messages, own }) => {
  console.log(messages)
  return (
    <div className={own ? 'message-container own':'message-container'}>
        <div className={own ? 'message-top own': 'message-top' }>
            <img src="/assets/person/6.jpeg" alt="" className='message-img'/>
            <p className='message-text'>{messages?.text}</p>
        </div>
        <div className="message-bottom">
            {format(messages?.createdAt)}
        </div>
    </div>
  )
}

export default Message