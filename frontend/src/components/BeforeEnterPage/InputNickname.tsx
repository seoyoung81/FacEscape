import styles from './BeforeEnter.module.css';
import { useState, ChangeEvent } from 'react';

import { 
    BsFillMicFill, 
    BsFillMicMuteFill,
    BsFillCameraVideoFill,
    BsFillCameraVideoOffFill
} from 'react-icons/bs';

const InputNickname: React.FC = () => {
    const [nickName, setNickName] = useState<string>("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNickName(event.target.value);
    }
    const handleClick = () => {
        console.log(nickName);
        setNickName("");
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handleClick();
        }
      };
    return (
        <div className={styles['chat-layout']}>
            <div className={styles.icon}>
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
                    value={nickName}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                />
                <button className={styles['enter-btn']} onClick={handleClick}>입장</button>
            </div>

        </div>
    )
}

export default InputNickname;
