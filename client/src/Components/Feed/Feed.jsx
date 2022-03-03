import React, {useState, useEffect, useContext} from 'react';
import { AuthContext } from '../../Context/AuthContext';
import "./Feed.css";
import Share from '../Share/Share';
import Post from '../Post/Post';
import {axiosInstance} from '../../config';


const Feed = (props) => {
  const [posts, setPosts] = useState([]);
  const { user }  = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      const res = props.username ? 
      await axiosInstance.get(`/api/posts/profile/${props.username}`):
      await axiosInstance.get(`/api/posts/timeline/${user._id}`)
      setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    }
    fetchData()
  }, [props.username, user._id]); // render only once.
  
  return (
    <div className='feed-container'>
      <div className='feed-wrapper'>
        {(!props.username || props.username === user.username) && <Share />}
        { posts.map((post) => {
          return <Post key={post._id} post={post}/>
        })}
      </div>
    </div>
  )
}

export default Feed;