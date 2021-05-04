import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {resetCameraImage, selectCameraImage} from "./features/cameraSlice"
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuid } from "uuid";
import firebase from "firebase";
import {storage} from "./firebase";
import {db} from "./firebase";
import "./Preview.css";
import { selectUser } from './features/appSlice';
function Preview() {
    const cameraImage = useSelector(selectCameraImage);
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    useEffect(() => {
        if(!cameraImage){
            history.replace("/")
        }
    }, [cameraImage, history])

    const closePreview = () => {
        dispatch(resetCameraImage());
    };
    const sentPost = () => {
        const id = uuid();
        const uploadTask = storage
            .ref(`posts/${id}`)
            .putString(cameraImage, "data_url");

        uploadTask.on('state_changed', null, 
        (error) => {
            // Error function
            console.log(error); 
        },
        () => {
            // Complete function
            storage
                .ref('posts')
                .child(id)
                .getDownloadURL()
                .then((url) => {
                    db.collection('posts').add({
                        imageUrl: url,
                        username: user.username,
                        read: false,
                        profilePic:user.profilePic,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    });
                    history.replace("/chats");
                });
            }
        );
    };
    return (
        <div className="preview">
            <CloseIcon className="preview__close"  onClick={closePreview} />
            
            <div className='preview__toolbarRight'>
                <TextFieldsIcon />
                <CreateIcon />
                <MusicNoteIcon />
                <TimerIcon/>

            </div>
            <img src={cameraImage} alt=""/>
            <div onClick={sentPost} className="preview__footer">
                <h4><b>Send</b></h4>
                <SendIcon className="preview__sentIcon"/>
            </div>
             
        </div>
    )
}

export default Preview
