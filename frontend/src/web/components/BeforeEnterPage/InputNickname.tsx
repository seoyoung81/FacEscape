import styles from './BeforeEnter.module.css';
import { useState, ChangeEvent, useEffect } from 'react';
import { authInstance } from '../../services/api';
import { memberService } from '../../services/member'
import Swal from 'sweetalert2';

type InputNickNameProps = {
    roomId: string
}

const InputNickname = ({roomId}: InputNickNameProps) => {

    const [memberId, setMemberId] = useState<number>(-1);
    const [gameNickname, setGameNickname] = useState<string>("");
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newNickName: string = event.target.value;
        setGameNickname(newNickName);
    };

    const handleClick = async () => {
        if (gameNickname.length < 1 || gameNickname.length > 8) {
            Swal.fire({
                title: '닉네임을 1자 이상, 8자 이하로 <br/> 입력해주세요.',
                confirmButtonColor: '#3479AD',
                confirmButtonText: '확인',
                width: '550px'
            });
        } else {
            await memberService.updateInGameMemberInfo(memberId, gameNickname);
            window.location.href = `/waiting?rid=${roomId}`;
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
            setMemberId(data.id);
            setGameNickname(data.nickname);
        } catch(error) {
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className={styles['input-container']}>
                <input 
                    type="text" 
                    className={styles['nickname-input']}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    value={ gameNickname }
                    placeholder={ '닉네임을 입력하세요.' }
                />
                <button className={styles['enter-btn']} onClick={handleClick}>입장</button>
            </div>
        </>
    );
}

export default InputNickname;
