import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import './NavBar.css';
import { SearchRounded, PersonRounded, ChatRounded, NotificationsRounded } from '@mui/icons-material';


const NavBar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);

  return (
    <div className="navbar-container">
        {/* left side of the nav-bar */}
        <div className="navbar-left">
            <Link to='/' style={{textDecoration: "none"}}>
                <span className='navbar-logo'>Feetbook</span>
            </Link>
        </div>
        {/* center of teh nav-bar */}
        <div className='navbar-center'>
            <div className='search-bar'>
                <SearchRounded className='search-icon'/>
                <input className='search-input' placeholder='Search for people, posts and more...' />
            </div>
        </div>
        {/* right side of the nav-bar */}
        <div className='navbar-right'>
            <div className='navbar-links'>
                <a href="/" className='navbar-link'>Home</a>
                <a href="/#" className='navbar-link'>Timeline</a>
            </div>  
            <div className='navbar-icons'>
                <div className='navbar-icon-group'>
                    <PersonRounded className="navbar-icon"/>
                    <span className='navbar-icon-badge'>1</span>
                </div>
                <Link to='/chat'>
                    <div className='navbar-icon-group'>
                        <ChatRounded className="navbar-icon" />
                        <span className='navbar-icon-badge'>2</span>
                    </div>
                </Link>
                
                <div className='navbar-icon-group'>
                    <NotificationsRounded styles="font-size: small;" className="navbar-icon" />
                    <span className='navbar-icon-badge'>1</span>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img className='navbar-user-img' src={user.profilePicture ? PF+user.profilePicture: `${PF}person/default-avatar.png`} alt='user-avatar'/>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default NavBar;