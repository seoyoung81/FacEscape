import styles from './WaitingRoom.module.css';
import { useState, ChangeEvent, useEffect } from 'react';
import SpeechBubble from "./SpeechBubble";

const Chat: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const [text, setText] = useState<string>("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    const handleClick = () => {
        setText(value);
        setValue("");
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handleClick();
        }
      };

    useEffect(() => {
    }, [value])

    return (
        <>
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
            <span className={styles['bubble-position']}>
                <SpeechBubble text={text} align="right" />
            </span>
        </>
    )
};

export default Chat;

