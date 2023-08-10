import styles from './BeforeEnter.module.css';
import { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNickName } from '../../store/nickNameSlice';
import ControlIcon from '../Common/ControlIcon';

const InputNickname: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const [defaultNickName, setDefaultNickName] = useState<string | null | readonly string[]>("");
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

    useEffect(() => {

        if (sessionStorage.getItem('accessToken')) {
            setDefaultNickName("회원가입 된 유저임");
        } else {
            setDefaultNickName("");
        }
    }, [])
    

    return (
        <div className={styles['chat-layout']}>
            <div>
                <ControlIcon />
            </div>
            <div className={styles['input-container']}>
                <input 
                    type="text" 
                    className={styles['nickname-input']}
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    defaultValue={defaultNickName ? defaultNickName : ""}
                />
                <button className={styles['enter-btn']} onClick={handleClick}>입장</button>
            </div>

        </div>
    )
}

export default InputNickname;
