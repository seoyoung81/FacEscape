import styles from './WaitingRoomPage.module.css';
import NickName from '../components/WaitingRoomPage/NickName';
import Code from '../components/WaitingRoomPage/Code';
import Camera from '../components/WaitingRoomPage/Camera';
import Chat from '../components/WaitingRoomPage/Chat';
import Inventory from '../components/WaitingRoomPage/Inventory';



const WaitingRoomPage: React.FC = () => {
    return (
        <div className={styles['waitingroom-container']}>
            <div>
                <div className={styles['top-container']}>
                    <NickName />
                    <Code />
                    <Inventory />
                </div>
            
                <div className={styles['camera-container']}>
                    <Camera />
                </div>
                <div className={styles['chat-container']}>
                    <Chat />
                </div>
            </div>
        </div>
    )
}

export default WaitingRoomPage;