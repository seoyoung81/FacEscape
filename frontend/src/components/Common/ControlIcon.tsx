import styles from '../BeforeEnterPage/BeforeEnter.module.css';

import { 
    BsFillMicFill, 
    BsFillMicMuteFill,
    BsFillCameraVideoFill,
    BsFillCameraVideoOffFill
} from 'react-icons/bs';

const ControlIcon: React.FC = () => {
    return (
        <div className={styles.icon}>
            <BsFillCameraVideoFill size={80} />
            {/* <BsFillCameraVideoOffFill /> */}
            <BsFillMicFill size={80} />
            {/* <BsFillMicMuteFill /> */}
        </div>
    )
}

export default ControlIcon;
