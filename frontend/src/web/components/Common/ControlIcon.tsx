import styles from '../BeforeEnterPage/BeforeEnter.module.css';
import { useState, useEffect } from 'react';

import { 
    BsFillMicFill, 
    BsFillMicMuteFill,
    BsFillCameraVideoFill,
    BsFillCameraVideoOffFill
} from 'react-icons/bs';

type OpenViduProps = {
    audioIsActive: boolean,
    videoIsActive: boolean,
    toggleAudio: any,
    toggleVideo: any,
}

const ControlIcon = ({audioIsActive, videoIsActive, toggleAudio, toggleVideo}: OpenViduProps) => {

    return (
        <div className={styles.icon}>

            <div className={styles["icon-cursor"]}>
                {videoIsActive ? 
                    <BsFillCameraVideoFill size={80} onClick={toggleVideo} /> 
                    : 
                    <BsFillCameraVideoOffFill size={80} onClick={toggleVideo} />
                }
            </div>
            <div className={styles["icon-cursor"]}>
                {audioIsActive ? 
                    <BsFillMicFill size={80} onClick={toggleAudio} /> 
                    : 
                    <BsFillMicMuteFill size={80} onClick={toggleAudio} />
                }
            </div>
        </div>
    )
}

export default ControlIcon;