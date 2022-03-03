import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import {axiosInstance} from '../../config';
import {format} from 'timeago.js';
import './Post.css';
import { MoreVertRounded } from '@mui/icons-material';
import PostModalBox from '../PostModalBox/PostModalBox';


const Post = (props) => {
    // environmental Source Path.
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // like count hooks.
    const [like, setLike] = useState(props.post.likes.length);
    const [isLike, setIsLike] = useState(false); // chekc if current user is already liked the post.
    
    const [user, setUser] = useState({});

    const { user: currentUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axiosInstance.get(`/api/users?userId=${props.post.userId}`);
            setUser(res.data);
        }
        fetchUser()
    }, [props.post.userId]); // render on chage of userId.

    useEffect(() => {
      setIsLike(props.post.likes.includes(currentUser._id));
    }, [currentUser._id, props.post.likes])
    
    
    // Feature: like and unlike when clicking
    const likeHandle = () => {
        try{
            axiosInstance.put(`/api/posts/${props.post._id}/like`, {userId: currentUser._id})
        }catch(err){

        }
        setLike(isLike ? like - 1:like + 1);
        setIsLike(!isLike);
    }
    
    // post editing dropdown menu
    const [edit, setEdit] = useState(false);
    const hiddenClassName = edit ? "dropdown-content display-block" : "dropdown-content display-none";
    const handlePostEdit = () => setEdit(!edit);
    // edit post pop up menu
    const [popup, setPopup] = useState(false);
    const handleEditPopup = () => {
        setPopup(!popup);
        setEdit(false); // close the edit dropdown after user click
    }
    // delete post pop up menu
    const [deletePopup, setDeletePopup] = useState(false)
    const handleDeletePopup = () => {
        setDeletePopup(!deletePopup);
        setEdit(false);
    }

    //
    const [imgfile, setImgfile] = useState(null);
    const [desc, setDesc] = useState(props.post?.desc || "")

    // update post logic and request
    const handlePostUpdate = async (e) => {
        e.preventDefault()
        
        const newEditPost = {
            userId: currentUser._id,
            desc: desc,
        }
        // if user trying to update image file.
        if (imgfile) {
            const data = new FormData();
            const fileName = Date.now() + imgfile.name;
            data.append('name', fileName);
            data.append('file', imgfile);
            newEditPost.img = fileName;
            try{
                await axiosInstance.post('/api/upload', data);
            }catch(err){    
                console.log(err);
            }
        }
        try{
            await axiosInstance.put(`/api/posts/${props.post._id}`, newEditPost);
            window.location.reload(); // reload the window so everything is updated.
        }catch(err) {
            console.log(err);
        }
    }
    // delete post logic and request
    const handlePostDelete = async () => {
        try{
            await axiosInstance.delete(`/api/posts/${props.post._id}`,{data:{userId : props.post.userId}});
        }catch(err) {
            console.log(err);
        }
    }

  return (
    <div className='post-container'>
        <div className="post-wrapper">
            <div className="post-top">
                <div className="post-top-left">
                    <Link to={`/profile/${user.username}`}>
                        <img src={user.profilePicture ? PF+user.profilePicture: `${PF}person/default-avatar.png`} alt="" className="post-profile-img" />
                    </Link>
                    <span className="post-username">{user.username}</span>
                    <span className="post-date">{format(props.post.createdAt)}</span>
                </div>
                <div className="post-top-right">
                    <MoreVertRounded className='post-top-right-icon' onClick={handlePostEdit}/>
                    {/* dropdown menu  */}
                    <div className="dropdown">
                        {/* only post owner can accesss the post editing. */}
                        { currentUser._id === props.post.userId?
                        <div className={hiddenClassName}>
                            <span onClick={handleEditPopup}>Edit Post</span>
                            <span onClick={handleDeletePopup}>Delete Post</span>
                            <span >Archieve Post</span>
                        </div>
                        :
                        <div className={hiddenClassName}>
                            <span>Archieve Post</span>
                        </div>
                        }
                        {/* edit post pop up window  */}
                        <PostModalBox handleClose={handleEditPopup} show={popup} title='Edit Post' user={currentUser}>
                            <form onSubmit={handlePostUpdate} className="popup-edit-form">
                                <div className="popup-edit-desc-container">
                                    <label htmlFor="desc">Description:</label>
                                    <textarea id='desc' className='popup-edit-desc' defaultValue={props.post?.desc} onChange={e => setDesc(e.target.value)}/>
                                </div>

                                <div className='popup-edit-img-container'>
                                    <label htmlFor='img'>Image or Video:</label>
                                    <div className="popup-edit-img-wrapper">
                                        {imgfile && (<img className='popup-edit-img' id='img' src={URL.createObjectURL(imgfile)} alt=''/>)}
                                        
                                    </div>
                                    <div className="popup-button-group">
                                        <label htmlFor='update-file' className='popup-update-file'>
                                            <span className="share-option-text">Choose Photo or Video</span>    
                                            <input style={{display: "none"}} type="file" id='update-file' accept='.png, .jpeg, .jpg' onChange={(e) => setImgfile(e.target.files[0])}/>
                                        </label>
                                        <button className='popup-submit' type='submit'>Update Post</button>
                                    </div>
                                </div>
                            </form>
                        </PostModalBox>
                        {/* delete post pop up window */}
                        <PostModalBox handleClose={handleDeletePopup} show={deletePopup} title='Delete Post' user={currentUser}>
                            <form onSubmit={handlePostDelete}>
                                <button type='submit' className='popup-delete-button'>Delete Post</button>
                            </form>
                            <p className='popup-delete-text'>Warning: Please be mindful that you cannot retrieve your post back once you delete your post.</p>
                        </PostModalBox>
                    </div>
                </div>
            </div>
            <div className="post-center">
                <span className="post-text">{props.post?.desc}</span>
                <img className="post-img" src={PF+props.post?.img} alt="" />
            </div>
            <div className="post-bottom">
                <div className="post-bottom-left">
                    <img className='like-button' src={`${PF}like.png`} onClick={likeHandle} alt="" />
                    <img className='like-button' src={`${PF}heart.png`} onClick={likeHandle} alt="" />
                    <span className="post-like-count">{like} people liked</span>
                </div>
                <div className="post-bottom-right">
                    <span className="post-comment">{props.post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post