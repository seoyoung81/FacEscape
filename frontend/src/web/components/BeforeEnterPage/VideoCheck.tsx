import { useState, useEffect, useRef } from 'react';
import styles from './BeforeEnter.module.css';
import SnapShot from '../VideoEffect/snapShot';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../stores/store';

type VideoCheckProps = {
  videoIsActive: boolean,
  audioIsActive: boolean,
}


const VideoCheck = ({ videoIsActive, audioIsActive }: VideoCheckProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRender = useSelector((state: RootState) => state.iconRender);
  const [videoStream, setVideoStream] = useState<MediaStreamTrack|null>();
  const [audioStream, setAudioStream] = useState<MediaStreamTrack|null>();

  // 화면
  const getVideoStream = async () => {
    try {
      if (videoRef.current) {
        const streams = await navigator.mediaDevices.getUserMedia({
          video: videoIsActive
        });

        const videoStream = streams.getVideoTracks()[0];
        if(videoStream) {
          videoRef.current.srcObject = new MediaStream([videoStream]);
        }
        setVideoStream(videoStream || null);
      }
    } catch (err) {
      console.error('Error accessing camera: ', err);
    }
  };

  // 음성
  const getAudioStream = async () => {
    try {
      if (audioRef.current) {
        const streams = await navigator.mediaDevices.getUserMedia({
          audio: audioIsActive
        });

        const audioStream = streams.getAudioTracks()[0];
        if(audioStream) {
          audioRef.current.srcObject = new MediaStream([audioStream]);
        }
        setAudioStream(audioStream || null);
      }
    } catch (err) {
      console.error('Error accessing mic: ', err);
    }
  };
  
  useEffect(()=>{
    if(videoIsActive) {
      getVideoStream();
    } else {
      if(videoStream) {
        videoStream.stop();
        setVideoStream(null);
      }
    }
  }, [videoIsActive, videoRender]);

  useEffect(()=>{
    if(audioIsActive) {
      getAudioStream();
    } else {
      if(audioStream) {
        audioStream.stop();
        setAudioStream(null);
      }
    }
  }, [audioIsActive]);

  
  // 화면 캡쳐
  const [imageUrl, setImageUrl] = useState<string>("");
  const { handleDownload, videoEffectId } = SnapShot(videoRef, setImageUrl);
  SnapShot(videoRef, setImageUrl);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.className = `${styles.video} ${
        videoEffectId === 8 ? styles['grayscale'] : ''
      } ${
        videoEffectId === 9 ? styles['flip-horizontal'] : ''
      } ${
        videoEffectId === 10 ? styles['flip-vertical'] : ''
      } `;
    }
  }, [videoEffectId, videoRender]);

  return (
    <div>
        <div className={styles['video-check']}>
            <video 
              ref={videoRef} 
              className={`${styles.video}`}
              autoPlay 
              muted 
              playsInline 
            />
            <audio ref={audioRef} autoPlay muted playsInline />
            <div className={styles.overlay}>
                <div className={styles.face} ></div>
                <p className={styles.alert}>원 안에 얼굴을 맞춰주세요
                  <button onClick={handleDownload} className={styles['capture-btn']}>사진찍기</button>
                </p>
            </div>
        </div>
    </div>
    );
}

export default VideoCheck;
