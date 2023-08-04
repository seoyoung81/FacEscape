import styles from './WaitingRoom.module.css';
import { useNavigate } from 'react-router-dom';

const StartBtn: React.FC = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate('/game');
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