import React from 'react';
import './Online.css';
const Online = (props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightbar-friend">
        <div className="rightbar-profile-img-container">
            <img src={PF+props.user.profilePicture} alt="" className="rightbar-profile-img" />
            <span className="rightbar-online"></span>
        </div>
        <span className="rightbar-username">{props.user.username}</span>   
    </li>
  )
}

export default Online;