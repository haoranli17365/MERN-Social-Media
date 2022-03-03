import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Chat from './Pages/Chat/Chat';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';


function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* if log in fail, show sign up page.  */}
        <Route path="/" element={user?<Home/>:<Navigate replace to="/login"/>}/>
        {/* if already logged in, redirect to home, else render sign in page. */}
        <Route path='/login' element={user ? <Navigate replace to="/"/>:<Login signup={false}/>}/>
        <Route path="/profile/:username" element={<Profile/>} />
        <Route path="/signup" element={user ? <Navigate replace to="/"/>:<Login signup={true}/>} />
        <Route path="/chat" element={user ? <Chat/>:<Navigate replace to='/'/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
