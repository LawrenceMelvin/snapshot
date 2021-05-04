import React, {useRef} from "react";
import { useCallback } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from "react-redux";
import {setCameraImage} from "./features/cameraSlice.js"
import { useHistory } from "react-router-dom";
import "./WebcamCapture.css";

 

const videoConstraints = {
    width: 1400,
    height: 600,
    position: 'absolute',
    facingMode: "user"
};


function WebcamCapture() {
    const webcamRef  = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const capture = useCallback( () => {
            const imageSrc = webcamRef.current.getScreenshot();
            dispatch(setCameraImage(imageSrc));
            history.push("./preview")
        },[webcamRef],
    );
    return (
        <div className="webcamCapture">
           <Webcam
           audio={false}
           height = {videoConstraints.height}
           ref = {webcamRef}
           screenshotFormat = "image/jpeg"
           width = {videoConstraints.width}
           postion = {videoConstraints.postion}
           videoConstraints = {videoConstraints}
           /> 

           <RadioButtonUncheckedIcon 
           className = "webcamCapture__button"
           onClick = {capture}
           />
           
        </div>
    )
}

export default WebcamCapture
