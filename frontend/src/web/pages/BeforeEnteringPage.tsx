import styles from './BeforeEnteringPage.module.css';
import VideoCheck from '../components/BeforeEnterPage/VideoCheck';
import InputNickname from '../components/BeforeEnterPage/InputNickname';
import ControlIcon from '../components/Common/ControlIcon';
import { useState, useEffect } from 'react';

const BeforeEnteringPage: React.FC = () => {

    const [audioControl, setAudioControl] = useState<boolean>(true);
    const [videoControl, setVideoControl] = useState<boolean>(true);
    const [roomId] = useState<string>(new URLSearchParams(window.location.search).get("rid") || "");
    const token = sessionStorage.getItem("accessToken")||"";
    
    useEffect(()=>{
        sessionStorage.setItem("audioControl", "true");
        sessionStorage.setItem("videoControl", "true");
    }, [])

    const toggleAudio = () => {
        setAudioControl((prev)=>{
            const isActive = !prev;
            sessionStorage.setItem("audioControl", isActive.toString());
            return isActive;
        });
    }

    const toggleVideo = () => {
        setVideoControl((prev)=>{
            const isActive = !prev;
            sessionStorage.setItem("videoControl", isActive.toString());
            return isActive;
        });
    }

    return (
        <div className={styles['enter-container']}>
            <div>
                <div className={styles.phrases}>입장 전 테스트</div>
                <div className={styles['control-container']}>
                    <VideoCheck videoIsActive={ videoControl } audioIsActive={ audioControl }/>

                    <div className={styles['action-container']}>
                        <ControlIcon audioIsActive={ audioControl } videoIsActive = { videoControl } toggleAudio={ toggleAudio } toggleVideo={ toggleVideo }/>
                        <InputNickname roomId={roomId} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeforeEnteringPage;