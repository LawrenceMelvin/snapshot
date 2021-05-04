import { Button } from '@material-ui/core';
import React from 'react';
import {login} from "./features/appSlice"
import "./Login.css";
import {useDispatch} from 'react-redux';
import img from "./snapchat__image1.JPG";
import { auth, provider } from './firebase';

function Login() {
    const dispatch = useDispatch();
    const singin = () =>{
        auth.signInWithPopup(provider)
        .then(result => {
            dispatch(
                login({
                username: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid
            })
        );
        })
        .catch((error) => alert(error.message));
    };
    return (
        <div className="login">
            <div className="login__container">
                <img src={img} alt=""/>
                <Button variant="outlined" onClick={singin}>Sing in</Button>
            </div>
            
        </div>
    )
}

export default Login
