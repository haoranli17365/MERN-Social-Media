import React, {useState, useEffect, useContext} from 'react';
import "./SideBar.css";
import { RssFeedRounded, QuestionAnswerRounded, VideoLibraryRounded, GroupsRounded, BookmarksRounded, LiveHelpRounded, WorkRounded, TheaterComedyRounded, SchoolRounded  } from '@mui/icons-material'
import { axiosInstance } from '../../config';
import { Link } from 'react-router-dom';
import ClosedFriends from '../ClosedFriends/ClosedFriends';
import { AuthContext } from '../../Context/AuthContext';

const SideBar = () => {
    const [friends, setFriends] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const getFriends = async () => {
          try{
            const friendList = await axiosInstance.get(`/api/users/friends/${user._id}`);
            setFriends(friendList.data)
          }catch(err){
            console.log(err)
          }
        };
        getFriends();
    }, [user]);

  return (
    <div className='sidebar-container'>
        <div className='sidebar-wrapper'>
            <ul className='sidebar-list'>
                <Link to='/' style={{ textDecoration: 'none' }} className='sidebar-listitem'>
                    <RssFeedRounded className='sidebar-icon'/>
                    <span className='sidebar-itemname'>Feed</span>
                </Link>
                <Link to='/chat' style={{ textDecoration: 'none' }} className='sidebar-listitem'>
                    <QuestionAnswerRounded className='sidebar-icon'/>
                    <span className='sidebar-itemname'>Chats</span>
                </Link>
                <li className='sidebar-listitem'>
                    <VideoLibraryRounded className='sidebar-icon'/>
                    <span className='sidebar-itemname'>Videos</span>
                </li>
                <li className='sidebar-listitem'>
                    <GroupsRounded className='sidebar-icon'/>
                    <span className='sidebar-itemname'>Groups</span>
                </li>
                <li className='sidebar-listitem'>
                    <BookmarksRounded className='sidebar-icon'/>
                    <span className='sidebar-itemname'>Bookmarks</span>
                </li>
                <li className='sidebar-listitem'>
                    <LiveHelpRounded className='sidebar-icon'/>
                    <span className='sidebar-itemname'>Questions</span>
                </li>
                <li className='sidebar-listitem'>
                    <WorkRounded className='sidebar-icon'/>
                    <span className='sidebar-itemname'>Jobs</span>
                </li>
                <li className='sidebar-listitem'>
                    <TheaterComedyRounded className='sidebar-icon'/>
                    <span className='sidebar-itemname'>Events</span>
                </li>
                <li className='sidebar-listitem'>
                    <SchoolRounded className='sidebar-icon'/>
                    <span className='sidebar-itemname'>Courses</span>
                </li>
            </ul>
            <button className='sidebar-button'>Show More</button>
            <hr className='sidebar-hr'/>
            <ul className="sidebar-friendlist">
                {friends.map((friend) => {
                    return (
                        <Link to={`/profile/${friend.username}`} key={friend._id} style={{textDecoration: 'none'}}>
                            <ClosedFriends user={friend}/>
                        </Link>
                    )
                })}
            </ul>
        </div>

    </div>
  )
}

export default SideBar;