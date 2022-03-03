import React, {useState, useEffect, useContext, useRef} from 'react';
import './Chat.css';
import Navbar from '../../Components/NavBar/NavBar'
import Conversation from '../../Components/Conversation/Conversation';
import Message from '../../Components/Message/Message';
import ChatOnline from '../../Components/ChatOnline/ChatOnline';
import { AuthContext } from '../../Context/AuthContext';
import { axiosInstance } from '../../config';

const Chat = () => {

    const { user } = useContext(AuthContext)
    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('');
    const scrollRef = useRef();

    useEffect(() => {
      const getConversations = async () => {
            try{
              const res = await axiosInstance.get(`/api/conversations/${user._id}`)
              setConversation(res.data);
            }catch(err){
                console.log(err);
            }
      }
      getConversations()
    }, [user._id])
    

    useEffect(() => {
      const getMessages = async () => {
          try{
            const res = await axiosInstance.get(`/api/messages/${currentChat?._id}`);
            setMessages(res.data);
          }catch(err){
              console.log(err)
          }
      }
      getMessages();
    }, [currentChat]);
    
    // handle user message sending request.
    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };
        try {
            const res = await axiosInstance.post('/api/messages', message);
            setMessages([...messages, res.data]);
            setNewMessage("")
        }catch(err) {
            console.log(err)
        }
    }
    // auto scrolling when new message.
    useEffect(() => {
      scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])
    

  return (
    <>
        <Navbar />
        <div className='chat-container'>
            
            <div className="chat-menu">
                <div className="chat-menu-wrapper">
                    <input type="text" className="chat-menu-input" placeholder='Search for friends...'/>
                    {conversation.map(conv => (
                        <div className="" onClick={() => setCurrentChat(conv)}>
                            <Conversation key={conv._id} conversation={conv} currentUser={user}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chat-box">
                {currentChat ? 
                <div className="chat-box-wrapper">
                    <div className="chat-box-top">
                        { messages.map(m => (
                            <div ref={scrollRef}>
                                <Message key={m._id} messages={m} own={m.sender === user._id}/>
                            </div>
                        ))}
                        
                    </div>
                    <div className="chat-box-bottom">
                        <textarea className="chat-box-input" 
                            placeholder='Type message here...' 
                            value={newMessage} 
                            onChange={(e) => setNewMessage(e.target.value)}></textarea>
                        <button className="chat-box-button" onClick={handleSend}>Send</button>
                    </div>
                </div>
                :
                <span className='chat-box-no-conv'>Open a Conversation to Start Chat</span>
                }
            </div>
            <div className="chat-online">
                <div className="chat-online-wrapper">
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                </div>
            </div>
        </div>
    </>
  )
}

export default Chat;