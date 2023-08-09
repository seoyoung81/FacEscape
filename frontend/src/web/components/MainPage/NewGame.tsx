import styles from './MainPageComponent.module.css'
import { useNavigate } from 'react-router-dom'
import {useSocketRooms } from '../../../common/socket'

const NewGame :React.FC = () => {
    const navigate = useNavigate();
    const [{createRoom}] = useSocketRooms();

    const handleClick = () => {
        /**
         * 서버로 방 생성 요청
         * 성공시 createRoom에서
         * 세션스토리지에 roomId저장
         */
        createRoom();

        navigate('/before');
    }
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