import styles from './WaitingRoom.module.css';
import { useState } from 'react';
import { MouseEventHandler } from 'react';

const Code: React.FC = () => {
    const [value, setValue] = useState<string>("18181818");
    
    const code = value;
    const onClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
        try {
            await navigator.clipboard.writeText(code);
        } catch (error) {
        }
    };

    return (
        <div className={styles['code-container']}>
            <div>
                <input 
                    type="text"
                    value={value}
                    className={styles['code']}
                    readOnly
                />
            </div>
            <button 
                className={styles['copy-btn']}
                onClick={onClick}
            >
                복사
            </button>
        </div>
    )
};

export default Code;