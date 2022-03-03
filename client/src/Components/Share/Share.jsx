import React, { useContext, useRef, useState } from 'react';
import './Share.css';
import { PermMediaRounded, LabelRounded, RoomRounded, EmojiEmotionsRounded, CancelRounded } from '@mui/icons-material'
import { AuthContext } from '../../Context/AuthContext';
import { axiosInstance } from '../../config';

const Share = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    // handle upload image.
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandle = async (e) =>{
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        // upload image for post if there is any file uploaded
        if(file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName);
            data.append('file', file);
            newPost.img = fileName;
            try{
                await axiosInstance.post('/api/upload', data);
            }catch(err){    
                console.log(err);
            }
        }

        try{
            await axiosInstance.post('/api/posts/', newPost);
            window.location.reload(); // reload the window so everything is updated.
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className='share-container'>
        <div className="share-wrapper">
            <div className="share-top">
                <img src={user.profilePicture ? PF+user.profilePicture: `${PF}person/default-avatar.png`} alt="" className="share-profile-img" />
                <input type="text" className="share-input" placeholder={`What's on your mind, ${user.username}?`} ref={desc}/>
            </div>
            <hr className='share-hr'/>
            {/* diplay uploaded image */}
            {file && (
                <div className="share-img-container">
                    <img className="share-img" src={URL.createObjectURL(file)} alt="" />
                    <CancelRounded className='share-img-icon' onClick={() => setFile(null)}/>
                </div>
            )}
            <form className="share-bottom" onSubmit={submitHandle}>
                <div className="share-options">
                    <label htmlFor='file' className="share-option">
                        <PermMediaRounded htmlColor='#E74C3C' className="share-option-icon"/>
                        <span className="share-option-text">Photo or Video</span>
                        <input style={{display: "none"}} type="file" id='file' accept='.png, .jpeg, .jpg' onChange={(e) => setFile(e.target.files[0])}/>
                    </label>
                    <div className="share-option">
                        <LabelRounded htmlColor='#2E86C1' className="share-option-icon"/>
                        <span className="share-option-text">Tag</span>
                    </div>
                    <div className="share-option">
                        <RoomRounded htmlColor='#1E8449' className="share-option-icon"/>
                        <span className="share-option-text">Location</span>
                    </div>
                    <div className="share-option">
                        <EmojiEmotionsRounded htmlColor='#F39C12' className="share-option-icon"/>
                        <span className="share-option-text">Feelings</span>
                    </div>
                </div>
                <button className="share-button" type='submit'>Share</button>
            </form>
        </div>
    </div>
  )
}

export default Share;