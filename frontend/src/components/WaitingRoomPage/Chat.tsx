import ControlIcon from "../Common/ControlIcon";
import styles from './WaitingRoom.module.css';
import { useState, ChangeEvent } from 'react';
import StartBtn from "./StartBtn";

const Chat: React.FC = () => {
    const [value, setValue] = useState<string>("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    const handleClick = () => {
        console.log(value);
        setValue("");
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handleClick();
        }
      };
    return (
        <div className={styles['chat-layout']}>
            <div>
                <ControlIcon />
            </div>
            <div className={styles['input-container']}>
                <input 
                    type="text" 
                    placeholder='채팅을 입력하세요'
                    className={styles['chat-input']}
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                />
                <button className={styles['enter-btn']} onClick={handleClick}>전송</button>
            </div>
            <div>
                <StartBtn />
            </div>
        

        </div>
    )
};

export default Chat;

