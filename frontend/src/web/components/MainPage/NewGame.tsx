import styles from './MainPageComponent.module.css'
import { useSocketRooms } from '../../../common/socket'
import { useEffect } from 'react';

const NewGame :React.FC = () => {
    const [{roomId, createRoom}] = useSocketRooms();
    const token = sessionStorage.getItem("accessToken")||"";

    const handleClick = () => {
        console.log(token);
        createRoom(token);
    }

    useEffect(()=>{
        if(roomId) {
            window.location.href = `/before?rid=${roomId}`;
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