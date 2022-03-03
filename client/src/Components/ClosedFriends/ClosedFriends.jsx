import React from 'react';
import './ClosedFriends.css';

const ClosedFriends = (props) => {
  const PF = "https://mern-feetbook.herokuapp.com/images/";
  
  return (
    <li className="sidebar-friend">
        <img src={props.user.profilePicture ? PF+props.user.profilePicture: `${PF}person/default-avatar.png`} alt="" className="sidebar-friendimg" />
        <span className="sidebar-friendname">{props.user.username}</span>
    </li>
  )
}

export default ClosedFriends;