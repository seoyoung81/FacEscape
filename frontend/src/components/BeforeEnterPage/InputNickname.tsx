import styles from './BeforeEnter.module.css';
import { 
    BsFillMicFill, 
    BsFillMicMuteFill,
    BsFillCameraVideoFill,
    BsFillCameraVideoOffFill
} from 'react-icons/bs';

const InputNickname: React.FC = () => {
    return (
        <div className={styles['chat-layout']}>
            <div>
                <BsFillCameraVideoFill size={80} />
                {/* <BsFillCameraVideoOffFill /> */}
                <BsFillMicFill size={80} />
                {/* <BsFillMicMuteFill /> */}
            </div>
            <div className={styles['input-container']}>
                <input 
                    type="text" 
                    placeholder='닉네임을 입력하세요'
                    className={styles['nickname-input']}
                />
                <button className={styles['enter-btn']}>입장</button>
            </div>

        </div>
    )
}

export default InputNickname;