import flipHorizontal from "./flipHorizontal";
import flipVertical from "./flipVertical";
import convertToGrayscale from "./convertToGray";
import { useState } from 'react';
import { authInstance } from "../../services/api";
import Swal from "sweetalert2";

const snapShot = (videoRef: React.RefObject<HTMLVideoElement>, setImageUrl: React.Dispatch<React.SetStateAction<string>>) => {
      // 화면 캡쳐  
  const handleDownload = ():void => {
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
      // 좌우 반전
      // ctx.save();
      // flipHorizontal(ctx, width, height, true);
      // ctx.drawImage(video, x, y, width, height, 0, 0, width, height);
      // flipHorizontal(ctx, width, height, false);
      // ctx.restore();

      // 흑백 효과
      // ctx.drawImage(video, x, y, width, height, 0, 0, width, height);
      // convertToGrayscale(ctx, width, height)

      // 상하 반전
    //   ctx.save();
    //   flipVertical(ctx, width, height, true);
    //   ctx.drawImage(video, x, y, width, height, 0, 0, width, height);
    //   flipVertical(ctx, width, height, false);
    //   ctx.restore();
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
      ctx.clip();
      ctx.drawImage(video, x, y, width, height, 0, 0, width, height);
      ctx.restore();

      canvas.toBlob((blob) => {
        if (blob !== null) {
            const url = URL.createObjectURL(blob);
            const img = new Image();
        
            img.onload = () => {
            setImageUrl(url);
          Swal.fire({
            title: '사진을 사용하시겠습니까?',
            showCancelButton: true,
            confirmButtonColor: '#3479AD',
            cancelButtonColor: '#DB7500',
            confirmButtonText: '확인',
            cancelButtonText: '다시찍기',
            html: `<img src="${url}" alt="" style="width: 100%; max-height: 250px; object-fit: contain;">`
        }).then(async(result) => {
            if (result.isConfirmed) {
              // 사진 url 넘기기
              console.log(url); // 이미지 URL 출력
              try {
                await authInstance.post('/member/image', {
                  imageUrl: url
                })
                
              } catch (error) {
                console.log('이미지 전송 실패', error);
              }
              
            }
          
        })
        }
        img.src = url;
        console.log(url);
      }});
    }
  };
  return handleDownload
}

export default snapShot;