import { CloseRounded } from '@mui/icons-material';
import React, { useState } from 'react';
import './ModelBox.css';
import {axiosInstance} from '../../config';

const ModelBox = ({handleClose, show, user}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    // get radio button value
    const [relation, setRelation] = useState(user?.relationship ? user.relationship:2)
    // get city, from and desc
    const [city, setCity] = useState(user?.city?user.city:"");
    const [from, setFrom] = useState(user?.from?user.from:"");
    const [desc, setDesc] = useState(user?.desc?user.desc:"");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log(city, from, desc, relation, user._id)
            await axiosInstance.put(`/api/users/${user._id}`, {
                userId: user._id, 
                city: city,
                from: from,
                relationship: relation,
                desc: desc
            });
            handleClose(!show);
            window.location.reload();
        }catch(err) {
            console.log(err);
        }
    }

  return (
    <div className={showHideClassName}>
        <section className="modal-wrapper">
            <div className="modal-header">
                <h3> Edit Profile </h3>
                <span onClick={handleClose} className="modal-close">
                    <CloseRounded />
                </span>
            </div>
            <hr/>
            <div className="modal-content">
                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="modal-input-container">
                        <label for="city" className="modal-label">City:</label>
                        <input id='city' type="text" defaultValue={city} className='modal-input' onChange={e => setCity(e.target.value)}/>
                        
                    </div>
                    <div className="modal-input-container">
                        <label for="from" className="modal-label">From:</label>
                        <input id='from' type="text" defaultValue={from} className='modal-input' onChange={e => setFrom(e.target.value)}/>
                    </div>
                    <label className="modal-label">
                        Relationship    
                        <div className='modal-input-relation-container' onChange={e => setRelation(parseInt(e.target.value))}>
                            <div>
                                <input className='modal-input-relation' type="radio" id="Married" name="form" value={1}/>
                                <label className='modal-input-label' for="Married">Married</label><br/>
                            </div>
                            <div>
                                <input className='modal-input-relation' type="radio" id="Single" name="form" value={2}/>
                                <label className='modal-input-label' for="Single">Single</label><br/>
                            </div>
                            <div>
                                <input className='modal-input-relation' type="radio" id="Unrevealed" name="form" value={3}/>
                                <label className='modal-input-label' for="Unrevealed">Unrevealed</label>
                            </div>
                        </div>
                        
                    </label>
                    <label for="desc" className="modal-label modal-label-textarea">
                        Description:
                        <textarea id='desc' defaultValue={desc} className='modal-textarea' onChange={e => setDesc(e.target.value)}/>
                    </label>
                    <button className='modal-submit' type='submit'>Submit</button>
                </form>
            </div>
            
        </section>
    </div>
  )
}

export default ModelBox;