import styles from './MainPageComponent.module.css'
import { useSocketRooms } from '../../../common/socket'
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const NewGame :React.FC = () => {
    const [{roomId, createRoom}] = useSocketRooms();
    const token = sessionStorage.getItem("accessToken")||"";

    const handleClick = () => {
        if(!token){
            Swal.fire({
                title: "로그인 후 이용 가능합니다 !!!",
                confirmButtonColor: '#3479AD',
                confirmButtonText: '확인',
                width: '500px'
            });
        }
        else{
            console.log(token);
            createRoom(token);
        }
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