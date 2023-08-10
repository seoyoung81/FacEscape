import ControlIcon from '../Common/ControlIcon';
import styles from './BeforeEnter.module.css';
import { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNickName } from '../../store/nickNameSlice';
import { authInstance } from '../../services/api';
import Swal from 'sweetalert2';

const InputNickname: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const [defaultNickName, setDefaultNickName] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newNickName: string = event.target.value;
        setValue(newNickName);
        dispatch(setNickName(newNickName));
    };

    const handleClick = () => {
        if (value.length > 8) {
            Swal.fire({
                title: '닉네임을 8자 이하로 입력해주세요.',
                confirmButtonColor: '#3479AD',
                confirmButtonText: '확인',
                width: '550px'
              });
        } else {
            navigate('/waiting');
            setNickName("");
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    };

    const fetchData = async () => {
        try {
            const { data } = await authInstance.get('/member')
            setDefaultNickName(data.nickname);   
        } catch(error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles['chat-layout']}>
            <div>
                <ControlIcon openVidu={undefined} />
            </div>
            <div className={styles['input-container']}>
                <input 
                    type="text" 
                    className={styles['nickname-input']}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    defaultValue={sessionStorage.getItem('accessToken') ? defaultNickName : ""}
                    placeholder={sessionStorage.getItem('accessToken') ? '' : '닉네임을 입력하세요.'}
                />
                <button className={styles['enter-btn']} onClick={handleClick}>입장</button>
            </div>
        </div>
    );
}

export default InputNickname;
