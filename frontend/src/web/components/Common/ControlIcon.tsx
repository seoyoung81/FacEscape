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
    const [micControl, setMicControl] = useState<boolean>(true);
    const [cameraControl, setCameraControl] = useState<boolean>(true);

    const onCamera = () => {
        setCameraControl(!cameraControl);
    };

    const onMic = () => {
        setMicControl(!micControl);
    }

    useEffect(()=>{
        openVidu.setAudioState(micControl);
    }, [micControl]);

    useEffect(()=>{
        openVidu.setVideoState(cameraControl);
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