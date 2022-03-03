import React from 'react'
import './ChatOnline.css'
const ChatOnline = () => {
  return (
    <div className='online-container'>
        <div className="online-friends">
            <div className="online-img-container">
                <img className='online-img' src="/assets/person/8.jpeg" alt="" />
                <div className="online-badge"></div>
            </div>
            <span className="online-name">Christia Regile</span>
        </div>
    </div>
  )
}

export default ChatOnline