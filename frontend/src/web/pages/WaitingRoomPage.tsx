import styles from './WaitingRoomPage.module.css';
import NickName from '../components/WaitingRoomPage/NickName';
import Code from '../components/WaitingRoomPage/Code';
import Video from '../components/WaitingRoomPage/Video';
import Chat from '../components/WaitingRoomPage/Chat';
import Inventory from '../components/WaitingRoomPage/Inventory';

import { useState, useEffect } from "react"
import { useOpenVidu } from "../../common/webrtc"
import ControlIcon from "../components/Common/ControlIcon"

const WaitingRoomPage: React.FC = () => {

    const [openVidu] = useOpenVidu();
    const [value] = useState<string>("181815834618");
    const [micControl, setMicControl] = useState<boolean>(true);
    const [cameraControl, setCameraControl] = useState<boolean>(true);

    useEffect(() => {
        const leaveSession = openVidu.leaveSession
        window.addEventListener('beforeunload', leaveSession);
        return () => {
            window.removeEventListener('beforeunload', leaveSession);
        };
    }, [openVidu]);

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

                <div className={styles['action-container']}>
                    <ControlIcon openVidu={openVidu} />
                    <Chat />
                </div>
            </div>
        </div>
    )
}

export default WaitingRoomPage;