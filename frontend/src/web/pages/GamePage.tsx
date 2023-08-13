import { useEffect, useRef } from "react";
import { createGame } from "../../game";

const GamePage = () => {
  /**
   *  게임 페이지는 현재 접속중인 사용자들의 정보를 모두 가지고 있어야한다.
   *  게임 페이지는 현재 접속중인 모든 유저들의 rtc정보를 가지고 있어야한다. 
   *  게임 페이지는 웹소캣을 통해 멀티 플레이 게임을 지원해야한다.
   *  phaser와, 외부 시스템은 event를 통해 통신이 가능하다. 
   */

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    if(canvasRef.current) {
      createGame(canvasRef.current);
    }
  }, [canvasRef])
  return (
    <div id="game" style={{display: 'flex', width:'100vw', height:'100vh', background:"black"}}>
      <canvas ref={canvasRef} style={{display:'flex'}} width="100%" height="100%"/>
    </div>
  );
};

export default GamePage;