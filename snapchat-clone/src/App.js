import React, { useEffect } from 'react';
import './App.css';
import Preview from "./Preview"
import WebcamCapture from './WebcamCapture';
import Chats from "./Chats";
import ChatView from "./ChatView";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {login, logout, selectUser } from './features/appSlice';
import Login from './Login';
import { auth } from './firebase';
import img from "./snapchat__image1.JPG";


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        })
        );
      }
      else{
        dispatch(logout());
      }
    })
  })
  return (
    <div className="app">
      <img src={img} className="snapchat__image1" onClick={() => auth.signOut()} alt=""/>
      <Router>
        {!user ? (
          <Login />
        ):(
          
          <div className="app__body">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path="/chats/view">
            <ChatView />
          </Route> 
        <Route path="/chats">
            <Chats />
          </Route> 
        <Route path="/preview">
            <Preview />
          </Route> 
          <Route exact path="/">
            <WebcamCapture />
          </Route>
        </Switch>
      </div>
        )}
      
    </Router>


    </div>
  );
}

export default App;
