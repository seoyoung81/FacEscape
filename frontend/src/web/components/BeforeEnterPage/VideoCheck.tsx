import { useState, useEffect, useRef } from 'react';
import styles from './BeforeEnter.module.css';

type VideoCheckProps = {
  videoIsActive: boolean,
  audioIsActive: boolean,
}

const VideoCheck = ({ videoIsActive, audioIsActive }: VideoCheckProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [videoStream, setVideoStream] = useState<MediaStreamTrack|null>();
  const [audioStream, setAudioStream] = useState<MediaStreamTrack|null>();

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
  }, [videoIsActive]);

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

  return (
    <div>
        <div className={styles['video-check']}>
            <video ref={videoRef} className={styles.video} autoPlay muted playsInline />
            <audio ref={audioRef} autoPlay muted playsInline />
            <div className={styles.overlay}>
                <div className={styles.face}></div>
                <p className={styles.alert}>원 안에 얼굴에 맞춰주세요</p>
            </div>
        </div>
    </div>
    );
}

export default VideoCheck;
