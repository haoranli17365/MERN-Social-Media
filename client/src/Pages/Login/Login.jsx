import React, { useState,useContext ,useRef } from 'react';
import './Login.css';
import Signup from '../../Pages/Signup/Signup';
import { loginCall } from '../../apiCall';
import { AuthContext } from '../../Context/AuthContext';
import Loading from '../../Components/Loading/Loading';

const Login = ( props ) => {
    // switch for login and signup
    const [signup, setSignup] = useState(props.signup);
    const signup_handle = () => {
        setSignup(!signup);
    }
    // use Context API for log in state management
    const {user, isFetching, error, dispatch} = useContext(AuthContext)
    // get user input from the form tag
    const email = useRef();
    const password = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        loginCall({email: email.current.value, password: password.current.value}, dispatch);
    };


  return (
    <div className='login-container'>
        <div className="login-bg-container">
            <svg className='login-bg-img-top' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill=" #4267b2" fill-opacity="1" d="M0,256L30,261.3C60,267,120,277,180,250.7C240,224,300,160,360,144C420,128,480,160,540,181.3C600,203,660,213,720,192C780,171,840,117,900,128C960,139,1020,213,1080,218.7C1140,224,1200,160,1260,144C1320,128,1380,160,1410,176L1440,192L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path>
            </svg>
            <svg className='login-bg-img-bottom' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill=" #4267b2" fill-opacity="1" d="M0,256L30,224C60,192,120,128,180,128C240,128,300,192,360,224C420,256,480,256,540,218.7C600,181,660,107,720,80C780,53,840,75,900,106.7C960,139,1020,181,1080,176C1140,171,1200,117,1260,96C1320,75,1380,85,1410,90.7L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
            </svg>
        </div>
        <div className="login-wrapper">
            <div className="login-left">
                <h3 className="login-logo">Feetbook</h3>
                <span className="login-desc">Here, Connect the world!</span>
            </div>

            <div className="login-right">
                {
                    signup ? <Signup signup_handle={signup_handle}/>
                    :
                    <form className="login-box" onSubmit={handleSubmit}>
                        <h4 className="login-title">Log In</h4>
                        <input type="email" placeholder='Email' className="login-input" ref={email} required/>
                        <input type="password" placeholder='Password' className="login-input" minLength="6" ref={password} required />
                        <div className='login-button-group'>
                            <button type='submit' className="login-button" disabled={isFetching}>
                                {isFetching ? <Loading />: "Log In"}
                            </button>
                            <span className="login-forgot">Forget Password?</span>
                            <button className="login-register" onClick={signup_handle} disabled={isFetching}>
                                Create New Account
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>
        
    </div>
  )
}

export default Login