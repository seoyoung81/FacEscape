import ControlIcon from '../Common/ControlIcon';
import styles from './BeforeEnter.module.css';
import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNickName } from '../../store/nickNameSlice';

const InputNickname: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newNickName: string = event.target.value;
        setValue(newNickName);
        dispatch(setNickName(newNickName));
    }
    const handleClick = () => {
        console.log(value);
        navigate('/waiting');
        setNickName("");
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handleClick();
        }
      };
    return (
        <div className={styles['chat-layout']}>
            <div>
                <ControlIcon openVidu={undefined} />
            </div>
            <div className={styles['input-container']}>
                <input 
                    type="text" 
                    placeholder='닉네임을 입력하세요'
                    className={styles['nickname-input']}
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                />
                <button className={styles['enter-btn']} onClick={handleClick}>입장</button>
            </div>

        </div>
    )
}

export default InputNickname;
