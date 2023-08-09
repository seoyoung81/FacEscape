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
    const [value] = useState<string>("181815834618");

    useEffect(()=>{
        openVidu.handleChangeRoomId(value);
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
                        { openVidu.publisher && <Video streamManager={openVidu.publisher} /> }
                        { openVidu.subscribers.map((subscriber, i)=><Video streamManager={subscriber} key={i}/>) }
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