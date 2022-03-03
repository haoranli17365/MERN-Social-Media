import React from 'react';
import './PostModalBox.css';
import { CloseRounded } from '@mui/icons-material';


const PostModalBox = ({handleClose, show, user, title, children}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
        <section className="modal-wrapper">
            <div className="modal-header">
                <h3> {title} </h3>
                <span onClick={handleClose} className="modal-close">
                    <CloseRounded />
                </span>
            </div>
            <hr/>
            {/* pop up content section  */}
            <div className="modal-content">
                {children}
            </div>
        </section>
    </div>
  )
}

export default PostModalBox