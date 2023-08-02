import styles from '../BeforeEnterPage/BeforeEnter.module.css';
import { useState } from 'react';

import { 
    BsFillMicFill, 
    BsFillMicMuteFill,
    BsFillCameraVideoFill,
    BsFillCameraVideoOffFill
} from 'react-icons/bs';

const ControlIcon: React.FC = () => {
    const [micControl, setMicControl] = useState<boolean>(true);
    const [cameraControl, setCameraControl] = useState<boolean>(true);

    const onCamera = () => {
        setCameraControl(!cameraControl);
    };

    const onMic = () => {
        setMicControl(!micControl);
    }
    return (
        <div className={styles.icon}>
            {cameraControl ? 
                <BsFillCameraVideoFill size={80} onClick={onCamera} /> 
                : 
                <BsFillCameraVideoOffFill size={80} onClick={onCamera} />
            }
            {micControl ? 
                <BsFillMicFill size={80} onClick={onMic} /> 
                : 
                <BsFillMicMuteFill size={80} onClick={onMic} />
            }
            
        </div>
    )
}

export default ControlIcon;
