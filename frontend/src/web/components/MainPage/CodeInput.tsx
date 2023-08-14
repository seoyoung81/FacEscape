import { useState, useEffect,ChangeEvent } from 'react';
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
        if(codeInput){
            console.log(token);
            joinRoom(codeInput, token);
        }
        else{
            alert("입장 코드를 입력해주세요!");
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
