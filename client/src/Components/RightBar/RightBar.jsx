import React,{ useState, useEffect, useContext } from 'react';
import './RightBar.css';
import Online from '../Online/Online';
import { Users } from '../../dummyData';
import {axiosInstance} from '../../config';
import { AuthContext } from '../../Context/AuthContext';
import {Link} from 'react-router-dom';
import { AddRounded, EditRounded, RemoveRounded } from '@mui/icons-material';
import Modal from '../ModelBox/ModelBox';
const RightBar = ( props ) => {
  const PF = "https://mern-feetbook.herokuapp.com/images/";
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);

  // fetch Connection list
  useEffect(() => {
    const getFriends = async () => {
      try{
        const friendList = await axiosInstance.get(`/api/users/friends/${props.user?._id}`);
        setFriends(friendList.data)
      }catch(err){
        console.log(err)
      }
    };
    getFriends();
  }, [props.user]);
  
  // handle Follow button text
  const [followed, setFollowed] = useState(currentUser.followings.includes(props.user?._id));
  useEffect(() => {
    setFollowed(currentUser.followings.includes(props.user?._id))
  }, [currentUser, props.user?._id])
  
  // fetch the follow status
  const handleFollow = async () => {
    try{
      if (followed) {
        await axiosInstance.put(`/api/users/${props.user._id}/unfollow`, {userId: currentUser._id});
        dispatch({type: "UNFOLLOW", payload: props.user?._id})
      }else{
        await axiosInstance.put(`/api/users/${props.user._id}/follow`, {userId: currentUser._id});
        dispatch({type: "FOLLOW", payload: props.user._id})
      }
    }catch(err){
      console.log(err);
    }
    setFollowed(!followed);
  };

  // handle model box pop up
  const [edit, setEdit] = useState(false)

  const handleEditWindow = () => {
    setEdit(!edit)
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthday-container">
          <img src="assets/gift.png" alt="" className="birthday-img" />
          <span className="birthday-text"><b>Pola Foster</b> and <b>3 other friends</b> have birthday today.</span>
        </div>
        <img className='rightbar-ad' src="/assets/ad.png" alt="" />
        <h4 className="rightbar-title">Online Friends</h4>
        <ul className="rightbar-friendlist">
          {Users.map((u) => (<Online key={u.id} user={u}/>))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      {/* if the profile is not current user's, show follow button  */}
      {props.user.username !== currentUser.username && (
        <button className="rightbar-follow-button" onClick={handleFollow}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <RemoveRounded className='rightbar-follow-button-icon'/> : <AddRounded className='rightbar-follow-button-icon' />}
        </button>
      )}
      {/* if the profile is current user's show edit button  */}
      {props.user.username === currentUser.username && (
        <button className="rightbar-follow-button" onClick={handleEditWindow}>
          Edit Profile
          <EditRounded sx={{ fontSize: 25 }} className='rightbar-follow-button-icon'/>
        </button>
      )}
        {/* modal box: for updating the disc, city, from, relationship */}
        <Modal show={edit} handleClose={handleEditWindow} user={currentUser}/>

        <h4 className='rightbar-title'>User Information</h4>
        <div className="rightbar-info">
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">City: </span>
            <span className="rightbar-info-value">{props.user.city}</span>
          </div>
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">From: </span>
            <span className="rightbar-info-value">{props.user.from}</span>
          </div>
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">Relationship: </span>
            <span className="rightbar-info-value">{props.user.relationship === 1? "Married":
             props.user.relationship === 2? "Single":"Unrevealed"}</span>
          </div>
        </div>
        <h4 className="rightbar-title">User Followings</h4>
        <div className="rightbar-followings">
          {friends.map( friend => (
            <Link key={friend._id} to={`/profile/${friend.username}`} style={{textDecoration: 'none'}}>
              <div className="rightbar-following">
                <img src={friend.profilePicture ?PF+friend.profilePicture: `${PF}person/default-avatar.png`} alt="" className="rightbar-following-img" />
                <span className="rightbar-following-name">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  }
  return (
    <div className='rightbar-container'>
      <div className="rightbar-wrapper">
        {props.user ? <ProfileRightbar />:<HomeRightbar />}
      </div>
    </div>
  )
}

export default RightBar;