import React, {useEffect, useState} from 'react';
import {axiosInstance} from '../../config';
import './Conversation.css';
const Conversation = ({ conversation, currentUser}) => {
  // environmental Source Path.
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null)

  useEffect(() => {
    const friendId = conversation.members.find(m => m !==currentUser._id)
    const getUser = async () => {
      try{
        const res = await axiosInstance.get(`/api/users?userId=${friendId}`);
        setUser(res.data) // get target info you target user.
      }catch(err){
        console.log(err);
      }
    }
    getUser();
  }, [currentUser, conversation])
  

  return (
    <div className='conversation-container'>
        <img src={user?.profilePicture ? PF+user.profilePicture: PF+"person/default-avatar.png"} alt="" className="conversation-img" />
        <span className="conversation-name">{user?.username}</span>
    </div>
  )
}

export default Conversation