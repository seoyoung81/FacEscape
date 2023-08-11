import styles from './MainPageComponent.module.css'
import { useNavigate } from 'react-router-dom'
import { useSocketRooms } from '../../../common/socket'
import { useEffect } from 'react';

const NewGame :React.FC = () => {
    const navigate = useNavigate();
    const [{roomId, createRoom}] = useSocketRooms();

    const handleClick = () => {
        createRoom();
    }

    useEffect(()=>{
        if(roomId) {
            navigate(`/before?rid=${roomId}`);
        }
    }, [roomId]);
    
    return (
        <div className={styles.conatiner}>
            <button
                className={styles['new-game-btn']}
                onClick={handleClick}
            >
                새 게임 만들기
            </button>
        </div>
    )
}

export default NewGame;