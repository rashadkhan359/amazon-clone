import './App.css';
import React, { useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import {auth} from "./firebase";
import {useStateValue} from './StateProvider';

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once when the app component loads...
    //as soon as the app loads we attach this listener. It is always listening, if we login it refires this code, if we logout it refires this code.
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>>', authUser);

      if(authUser){
        //the user just logged in / the user was logged in ----helps when page refreshed
        
        //the dispatch will shoot the the user info to the data layer.
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else{
        //the user logged out.
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])
  
  return (
    //BEM
    <Router>
    <div className="App">
      <Routes>
        <Route path="/login" element={<><Login/></>}/>
        <Route path="/checkout" element={<><Header/><Checkout/></>}/>
        <Route path="/" element={<><Header/><Home/></>}/>
      </Routes>  
    </div>
    </Router>
  );
}

export default App;
