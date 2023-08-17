import { useState, useEffect,ChangeEvent } from 'react';
import Swal from 'sweetalert2';
import styles from './MainPageComponent.module.css';
import {useSocketRooms} from '../../../common/socket'

const CodeInput :React.FC = () => {
    const [codeInput, setCodeInput] = useState<string>("");
    const [{roomId, joinRoom}] = useSocketRooms();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCodeInput(event.target.value);
    }

    const token = sessionStorage.getItem("accessToken") || "";
    const handleClick = () => {

        if(!codeInput){
            Swal.fire({
                title: "입장 코드를 입력해주세요 !!!",
                confirmButtonColor: '#3479AD',
                confirmButtonText: '확인',
                width: '500px'
            });
        }
        else if(!token){
            Swal.fire({
                title: "로그인 후 이용 가능합니다 !!!",
                confirmButtonColor: '#3479AD',
                confirmButtonText: '확인',
                width: '500px'
            })
        }
        else{
            console.log(token);
            joinRoom(codeInput, token);
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handleClick();
        }
    };

    useEffect(()=>{
        if(roomId) {
            window.location.href = `/before?rid=${roomId}`;
        }
    }, [roomId])

    return (
        <div className={styles['code-container']}>
            <input 
                type="text" 
                placeholder="코드를 입력하세요" 
                className={styles['code-input']}
                value={codeInput}
                onChange={onChange}
                onKeyDown={handleKeyDown}
            />
            <button
                className={styles['code-btn']}
                onClick={handleClick}
            >
                입장
            </button>

        </div>
    )
}

export default CodeInput;
