import { useEffect, useRef } from 'react';
import styles from './BeforeEnter.module.css';

const CONSTRAINTS = { video: true };

const VideoCheck: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const startVideo = async () => {
    try {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Error accessing camera: ', err);
    }
  };

  useEffect(() => {
    startVideo();
  }, []);

  return (
    <div>
        <div className={styles['video-check']}>
            <video ref={videoRef} className={styles.video} autoPlay muted playsInline />
            <div className={styles.overlay}>
                <div className={styles.face}></div>
                <p className={styles.alert}>원 안에 얼굴에 맞춰주세요</p>
            </div>
        </div>
    </div>
    );
}

export default VideoCheck;

