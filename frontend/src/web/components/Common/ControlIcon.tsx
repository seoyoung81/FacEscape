import styles from '../BeforeEnterPage/BeforeEnter.module.css';
import { useState, useEffect } from 'react';

import { 
    BsFillMicFill, 
    BsFillMicMuteFill,
    BsFillCameraVideoFill,
    BsFillCameraVideoOffFill
} from 'react-icons/bs';

type OpenViduProps = {
    openVidu: any
}

const ControlIcon = ({openVidu}: OpenViduProps) => {
    const [micControl, setMicControl] = useState<boolean>(sessionStorage.getItem("micControl")==="true");
    const [cameraControl, setCameraControl] = useState<boolean>(sessionStorage.getItem("cameraControl")==="true");

    const onCamera = () => {
        setCameraControl(!cameraControl);
    };

    const onMic = () => {
        setMicControl(!micControl);
    }

    useEffect(()=>{
        if(openVidu) {
            openVidu.setAudioState(micControl);
        }
        sessionStorage.setItem("micControl", micControl.toString());
    }, [micControl]);

    useEffect(()=>{
        if(openVidu) {
            openVidu.setVideoState(cameraControl);
        }
        sessionStorage.setItem("cameraControl", cameraControl.toString());
    }, [cameraControl]);

    return (
        <div className={styles.icon}>

            <div className={styles["icon-cursor"]}>
                {cameraControl ? 
                    <BsFillCameraVideoFill size={80} onClick={onCamera} /> 
                    : 
                    <BsFillCameraVideoOffFill size={80} onClick={onCamera} />
                }
            </div>
            <div className={styles["icon-cursor"]}>
                {micControl ? 
                    <BsFillMicFill size={80} onClick={onMic} /> 
                    : 
                    <BsFillMicMuteFill size={80} onClick={onMic} />
                }
            </div>
        </div>
    )
}

export default ControlIcon;