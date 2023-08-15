import { useState, useEffect, useRef } from 'react';
import styles from './BeforeEnter.module.css';
import Swal from 'sweetalert2';

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

  // 화면 캡쳐
  const [imageUrl, setImageUrl] = useState<string>("");
  const handleDownload = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const x = 210; 
    const y = 110; 
    const width = 230; 
    const height = 290; 

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(video, x, y, width, height, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (blob !== null) {
          setImageUrl(URL.createObjectURL(blob));
          Swal.fire({
            title: '사진을 사용하시겠습니까?',
            showCancelButton: true,
            confirmButtonColor: '#3479AD',
            cancelButtonColor: '#DB7500',
            confirmButtonText: '확인',
            cancelButtonText: '다시찍기',
            html: `<img src="${imageUrl}" alt="" style="width: 100%; max-height: 250px; object-fit: contain;">`
        }).then(result => {
            if (result.isConfirmed) {
              // 사진 url 넘기기
              console.log(imageUrl); // 이미지 URL 출력
            }
          
        })
        }
      });
    }
  };
  return (
    <div>
        <div className={styles['video-check']}>
            <video ref={videoRef} className={styles.video} autoPlay muted playsInline />
            <audio ref={audioRef} autoPlay muted playsInline />
            <div className={styles.overlay}>
                <div className={styles.face} ></div>
                <p className={styles.alert}>원 안에 얼굴을 맞춰주세요
                  <button onClick={handleDownload}>다운로드</button>
                </p>
            </div>
        </div>
    </div>
    );
}

export default VideoCheck;
