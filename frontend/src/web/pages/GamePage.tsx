import { useEffect, useRef } from "react";
import { createGame } from "../../game";

const GameTestPage = () => {

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

export default GameTestPage;