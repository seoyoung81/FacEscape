import styles from './WaitingRoomPage.module.css';
import NickName from '../components/WaitingRoomPage/NickName';
import Code from '../components/WaitingRoomPage/Code';
import Video from '../components/WaitingRoomPage/Video';
import Chat from '../components/WaitingRoomPage/Chat';
import Inventory from '../components/WaitingRoomPage/Inventory';
import StartBtn from "../components/WaitingRoomPage/StartBtn";


import { useState, useEffect } from "react"
import { useOpenVidu } from "../../common/webrtc"
import { useSocketRooms } from '../../common/socket'

import ControlIcon from "../components/Common/ControlIcon"
import Swal from 'sweetalert2';

const WaitingRoomPage: React.FC = () => {

    const [useSocket] = useSocketRooms();
    const [openVidu] = useOpenVidu();
    const [connectionFlag, setConntectionFlag] = useState<boolean>(false);
    const [roomId] = useState<string>(new URLSearchParams(window.location.search).get("rid") || "");
    const [audioControl, setAudioControl] = useState<boolean>(sessionStorage.getItem("audioControl")==="true");
    const [videoControl, setVideoControl] = useState<boolean>(sessionStorage.getItem("videoControl")==="true");
    const token = sessionStorage.getItem("accessToken") || "";

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
        for(let i=0; i<5-openVidu.remoteMembers.length; ++i) {
            render.push(<Video streamManager={undefined} key={i+10}/>);
        }
        return render;
    }

    const handleClickStartBtn = () => {
        useSocket.socket?.emit("start", {id: useSocket.client?.id || "-1"});
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
    }, []);

    useEffect(()=>{
        if(connectionFlag) {
            useSocket.joinRoom(roomId, token);
        }
    }, [connectionFlag]);

    useEffect(()=>{
        setConntectionFlag(roomId!==undefined && useSocket.socket !== undefined);
    }, [roomId, useSocket.socket]);

    useEffect(() => {
        openVidu.setAudioState(audioControl);
        openVidu.setVideoState(videoControl);

        const leaveSession = openVidu.leaveSession
        window.addEventListener('beforeunload', leaveSession);
        return () => {
            window.removeEventListener('beforeunload', leaveSession);
        };
    }, [openVidu])

    useEffect(()=>{
        if(roomId) {
            openVidu.handleChangeRoomId(roomId);
        }
    }, [roomId]);

    useEffect(()=>{
        if(useSocket.client) {
            openVidu.handleChangeClient(useSocket.client);
        }
    }, [useSocket.client])

    useEffect(()=>{
        if(useSocket.isKick) {
            openVidu.leaveSession();
            Swal.fire({
                title: '다른 클라이언트에서 접속하여<br/> 접속이 종료됩니다.',
                confirmButtonColor: '#3479AD',
                confirmButtonText: '확인',
                width: '550px'
            }).then(()=>{
                window.location.href="/";
            });
        }
    }, [useSocket.isKick, openVidu])


   

    return (
        <div className={styles['waitingroom-container']}>
            <div>
                <div className={styles['top-container']}>
                    <NickName getHostNickname = { useSocket.getHostNickName }/>
                    <Code roomId={roomId} />
                    <Inventory />
                </div>
            
                <div className={styles['camera-container']}>
                    <div className={styles['box-container']}>
                        { openVidu.publisher ? <Video streamManager={openVidu.publisher} /> : <Video streamManager={undefined} /> }
                        { openVidu.remoteMembers.map((remoteMember, i)=><Video streamManager={remoteMember.stream} key={i}/>) }
                        { renderEmptySpace() }
                    </div>
                </div>

                <div className={styles['action-container']}>
                    <ControlIcon audioIsActive={ audioControl } 
                                videoIsActive={ videoControl }
                                toggleAudio={ toggleAudio }
                                toggleVideo={ toggleVideo }/>
                    <Chat />
                    <StartBtn handleClick={handleClickStartBtn} />
                </div>
            </div>
        </div>
    )
}

export default WaitingRoomPage;