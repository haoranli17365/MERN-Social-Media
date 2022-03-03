import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'
import {axiosInstance} from '../../config';
const Signup = (props) => {
  // get user input from the form tag
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useNavigate();
  const handleSubmit = async (e) => {
      e.preventDefault();
      // check password matches
      if (passwordAgain.current.value !== password.current.value) {
        passwordAgain.current.setCustomValidity("Password don't match!");
      }else {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        }
        try{
          await axiosInstance.post("/api/auths/register", user);
          history('/', {replace: true}); // redirect to sign in page.
        }catch(err) {
          console.log(err);
        }
      }
      // loginCall({email: email.current.value, password: password.current.value}, dispatch);
      console.log(email.current.value);
  };
  return (
    <>
        <form className="signup-box" onSubmit={handleSubmit}>
            <h4 className="login-title">Sign Up</h4>
            <div className='signup-input-group'>
              <input type="email" placeholder='Email' className="login-input" ref={email} required/>
              <input type="text" placeholder='Username' className='login-input' ref={username} required/>
              <input type="password" placeholder='Password' className="login-input" ref={password} required/>
              <input type="password" placeholder='Confirm Password' className="login-input" ref={passwordAgain} required/>
            </div>
            <div className='signup-button-group'>
                <button type="submit" className="signup-button">Create Account</button>
                <span className="signup-back">Already Have an Account?</span>
                <button className="signup-back-button" onClick={props.signup_handle}>
                  Log Into Your Account
                </button>
            </div>
        </form>
    </>
  )
}

export default Signup