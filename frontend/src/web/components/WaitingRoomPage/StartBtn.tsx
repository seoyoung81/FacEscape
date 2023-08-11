import styles from './WaitingRoom.module.css';

const StartBtn: React.FC = () => {
    const onClick = () => {
        window.location.href = '/gametest'
    }
    
    return (
        <div>
            <button 
                className={styles['start-btn']}
                onClick={onClick}
            >START</button>
        </div>
    )
};

export default StartBtn;