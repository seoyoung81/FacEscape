import styles from './WaitingRoom.module.css';
import { MouseEventHandler } from 'react';

type CodeProps = {
    roomId: string
};

const Code = ({ roomId }: CodeProps) => {
    const onClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
        try {
            await navigator.clipboard.writeText(roomId);
        } catch (error) {
        }
    };

    return (
        <div className={styles['code-container']}>
            <div>
                <input 
                    type="text"
                    value={roomId}
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