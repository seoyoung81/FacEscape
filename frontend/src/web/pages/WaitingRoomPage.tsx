import styles from './WaitingRoomPage.module.css';
import NickName from '../components/WaitingRoomPage/NickName';
import Code from '../components/WaitingRoomPage/Code';
import Video from '../components/WaitingRoomPage/Video';
import Chat from '../components/WaitingRoomPage/Chat';
import Inventory from '../components/WaitingRoomPage/Inventory';

import { useState, useEffect } from "react"
import { useOpenVidu } from "../../common/webrtc"

const WaitingRoomPage: React.FC = () => {

    const [openVidu] = useOpenVidu();
    const [value, setValue] = useState<string>("qwertyuiop12345");

    useEffect(()=>{
        openVidu.handleChangeSessionId(value);
        openVidu.joinSession();
    }, [value]);

    return (
        <div className={styles['waitingroom-container']}>
            <div>
                <div className={styles['top-container']}>
                    <NickName />
                    <Code />
                    <Inventory />
                </div>
            
                <div className={styles['camera-container']}>
                    <div className={styles['box-container']}>
                        { openVidu.webRTCState.publisher && <Video streamManager={openVidu.webRTCState.publisher} /> }
                        { openVidu.webRTCState.subscribers.map(subscriber=><Video streamManager={subscriber}/>) }
                    </div>
                </div>
                <div className={styles['chat-container']}>
                    <Chat />
                </div>
            </div>
        </div>
    )
}

export default WaitingRoomPage;