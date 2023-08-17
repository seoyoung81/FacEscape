import flipHorizontal from "./flipHorizontal";
import flipVertical from "./flipVertical";
import convertToGrayscale from "./convertToGray";
import React from "react";
import { useEffect, useState } from 'react';
import { authInstance } from "../../services/api";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const SnapShot = (videoRef: React.RefObject<HTMLVideoElement>, setImageUrl: React.Dispatch<React.SetStateAction<string>>) => {
  const [videoEffectId, setVideoEffectId] = useState<number>(0);
  const render = useSelector((state: RootState) => state.iconRender);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const { data } = await authInstance.get('/member/item/equipped')
            const videoEffect = data.items.find((item: any) => item.itemType === "화면효과");
            if (videoEffect) {
              setVideoEffectId(videoEffect.itemId);
            }
        } 
        catch (error) {
            console.log(error);
        }
    };
    fetchData();
}, [render]);

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
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
      ctx.clip();
      ctx.drawImage(video, x, y, width, height, 0, 0, width, height);

      // 흑백 효과
      if (videoEffectId === 8){
        convertToGrayscale(ctx, width, height);
      }

      // 좌우 반전
      else if (videoEffectId === 9){
        ctx.save();
        flipHorizontal(ctx, width, height, true);
        ctx.drawImage(video, x, y, width, height, 0, 0, width, height);
        flipHorizontal(ctx, width, height, false);
      }

      // 상하 반전
      else if (videoEffectId === 10){
          ctx.save();
          flipVertical(ctx, width, height, true);
          ctx.drawImage(video, x, y, width, height, 0, 0, width, height);
          flipVertical(ctx, width, height, false);
          ctx.restore();
      }

      ctx.restore();
      
      canvas.toBlob((blob) => {
        if (blob !== null) {
            const dataURL = canvas.toDataURL("image/png", 0.5);
            if (dataURL) {
              setImageUrl(`url(${dataURL})`);
              Swal.fire({
                title: '사진을 사용하시겠습니까?',
                showCancelButton: true,
                confirmButtonColor: '#3479AD',
                cancelButtonColor: '#DB7500',
                confirmButtonText: '확인',
                cancelButtonText: '다시찍기',
                html: `<img src=${dataURL} alt="" style="width: 100%; max-height: 250px; object-fit: contain;">`
              }).then(async(result) => {
                if (result.isConfirmed) {
                  sessionStorage.setItem("imageUrl", dataURL);        
            }
            }
        )}
      
      }});
    }
  };
  return { handleDownload, videoEffectId };
}

export default SnapShot;