import styles from './WaitingRoom.module.css';
import { StreamManager } from "openvidu-browser";
import { useRef, useEffect } from 'react';

type VideoProps = {
    streamManager: StreamManager,
}

const Video = ({streamManager}: VideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(()=>{
        if(streamManager && videoRef.current) {
            streamManager.addVideoElement(videoRef.current);
        }
    });

    return (
        <video className={styles.box} ref={videoRef} />
    )
};

export default Video;