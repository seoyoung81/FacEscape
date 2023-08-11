import styles from './WaitingRoomPage.module.css';
import NickName from '../components/WaitingRoomPage/NickName';
import Code from '../components/WaitingRoomPage/Code';
import Video from '../components/WaitingRoomPage/Video';
import Chat from '../components/WaitingRoomPage/Chat';
import Inventory from '../components/WaitingRoomPage/Inventory';

import { useState, useEffect } from "react"
import { useOpenVidu } from "../../common/webrtc"
import ControlIcon from "../components/Common/ControlIcon"
import Swal from 'sweetalert2';

const WaitingRoomPage: React.FC = () => {

    const [openVidu] = useOpenVidu();
    const [roomId, setRoomId] = useState<string>(new URLSearchParams(window.location.search).get("rid") || "");
    const [audioControl, setAudioControl] = useState<boolean>(sessionStorage.getItem("audioControl")==="true");
    const [videoControl, setVideoControl] = useState<boolean>(sessionStorage.getItem("videoControl")==="true");

    const toggleAudio = () => {
        setAudioControl((prev)=>{
            const isActive = !prev;
            sessionStorage.setItem("audioControl", isActive.toString());
            openVidu.setAudioState(isActive);
            return isActive;
        });
    }

    const toggleVideo = () => {
        setVideoControl((prev)=>{
            const isActive = !prev;
            sessionStorage.setItem("videoControl", isActive.toString());
            openVidu.setVideoState(isActive);
            return isActive;
        });
    }

    const renderEmptySpace = ()=>{
        const render = [];
        for(let i=0; i<5-openVidu.subscribers.length; ++i) {
            render.push(<Video streamManager={undefined} key={i+10}/>);
        }
        return render;
    }

    useEffect(()=>{
        if(!roomId) {
            Swal.fire({
                title: '비정상적인 접근입니다.',
                confirmButtonColor: '#3479AD',
                confirmButtonText: '확인',
                width: '550px'
            }).then(()=>{
                window.location.href="/";
            });
        }
    }, [])

    useEffect(() => {
        openVidu.setAudioState(audioControl);
        openVidu.setVideoState(videoControl);

        const leaveSession = openVidu.leaveSession
        window.addEventListener('beforeunload', leaveSession);
        return () => {
            window.removeEventListener('beforeunload', leaveSession);
        };
    }, [openVidu]);

    useEffect(()=>{
        if(roomId) {
            openVidu.handleChangeRoomId(roomId);
        }
    }, [roomId]);

    return (
        <div className={styles['waitingroom-container']}>
            <div>
                <div className={styles['top-container']}>
                    <NickName />
                    <Code roomId={roomId} />
                    <Inventory />
                </div>
            
                <div className={styles['camera-container']}>
                    <div className={styles['box-container']}>
                        { openVidu.publisher && <Video streamManager={openVidu.publisher} /> }
                        { openVidu.subscribers.map((subscriber, i)=><Video streamManager={subscriber} key={i}/>) }

                        { !openVidu.publisher && <Video streamManager={undefined} /> }
                        { renderEmptySpace() }
                    </div>
                </div>

                <div className={styles['action-container']}>
                    <ControlIcon audioIsActive={ audioControl } 
                                videoIsActive={ videoControl }
                                toggleAudio={ toggleAudio }
                                toggleVideo={ toggleVideo }/>
                    <Chat />
                </div>
            </div>
        </div>
    )
}

export default WaitingRoomPage;