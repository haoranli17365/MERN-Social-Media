import React, {useState, useEffect} from 'react';
import { axiosInstance } from '../../config';
import { useParams } from 'react-router';
import NavBar from '../../Components/NavBar/NavBar'
import RightBar from '../../Components/RightBar/RightBar';
import SideBar from '../../Components/SideBar/SideBar';
import Feed from '../../Components/Feed/Feed';
import './Profile.css';


const Profile = () => {
  const PF = "https://mern-feetbook.herokuapp.com/images/";
  const [user, setUser] = useState({});
  // get username from url.
  const username = useParams().username;

  useEffect(() => {
      const fetchUser = async () => {
          const res = await axiosInstance.get(`/api/users?username=${username}`);
          setUser(res.data);
      }
      fetchUser()
  }, [username]); // render on chage of userId.

  return (
    <>
        <NavBar />
        <div className='profile-container'>
          <SideBar />
          <div className="profile-right">
            <div className="profile-right-top">
                <div className="profile-cover">
                    <img src={user.coverPicture || `${PF}person/default-cover.jpg`} alt="" className="profile-cover-img" />
                    <img src={user.profilePicture ? PF+user.profilePicture: `${PF}person/default-avatar.png`} alt="" className="profile-user-img" />
                </div>
                <div className="profile-info">
                    <h4 className='profile-info-name'>{user.username}</h4>
                    <span className='profile-info-desc'>{user.desc}</span>
                </div>
            </div>
            <div className="profile-right-bottom">
                <Feed username={username}/>
                <RightBar user={user} />
            </div>
          </div>
        </div>
    </>
  )
}

export default Profile;