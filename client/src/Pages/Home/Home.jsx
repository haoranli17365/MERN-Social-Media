import React from 'react';
import NavBar from '../../Components/NavBar/NavBar'
import RightBar from '../../Components/RightBar/RightBar';
import SideBar from '../../Components/SideBar/SideBar';
import Feed from '../../Components/Feed/Feed';
import './Home.css';
const Home = () => {
  return (
    <>
        <NavBar />
        <div className='home-container'>
          <SideBar />
          <Feed />
          <RightBar />
        </div>
    </>
  )
}

export default Home