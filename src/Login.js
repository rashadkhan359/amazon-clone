import React, { useState } from 'react'
import './Login.css';
import {Link, useNavigate} from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import {auth} from './firebase';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

//  ----Use for 2nd type of register process 
//   const createUser = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

  const signIn = async (e) => {
    e.preventDefault();
    //some fancy firebase login...
    await signInWithEmailAndPassword(auth, email, password).then( auth => {
        navigate('/');
    }).catch(error => alert(error.message));
  }

  const register = async (e) => {
    e.preventDefault();  //stops page from submitting
    //do some fancy firebase registration
    await createUserWithEmailAndPassword(auth, email, password).then((auth) => {
        console.log(auth);
        //We are saying navigate to home page after authentication is successfull
        if(auth){
            navigate('/');
        }
    }).catch(error => alert(error.message))

    //Other-Way to do is this
    // try{
    //     await createUser(email, password);
    // }catch(e){
    //     console.log(e.message);
    // }

  }
  return (
    <div className="login">
        <Link to='/'>
        <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt=""/>
        </Link>
        <div className="login__TopContainer">
            <h1>Sign in</h1>
            <form>
                <h5>Email</h5>
                <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/>

                <h5>Password</h5>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>

                <button type='submit' onClick={signIn} className="login__signInButton">Sign In</button>
            </form>
            <p>
                By signing in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy-Notice, our Cookies Notice and our Interest-Based Ads Notice. 
            </p>
        </div>
        <div className="login__BottomContainer">
            <div className="login__BottomContainerTop">
                {/* <div className="login__separater"></div> */}
                    <p>New to Amazon?</p>
                    {/* <div className="login__separater"></div> */}
            </div>       
            <button onClick={register} className="login__registerButton">Create your Fake Amazon Account</button>
        </div>
    </div>
  )
}

export default Login