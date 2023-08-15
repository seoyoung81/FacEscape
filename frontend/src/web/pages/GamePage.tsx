import { useState, useEffect, useRef } from "react";
import { createGame } from "../../game";
import { useSocketRooms } from "../../common/socket";
import { useOpenVidu } from "../../common/webrtc";
import { STAGE_EVENT } from "../../game/event";

import Phaser from "phaser";
import Swal from "sweetalert2";
import { defaultInstance } from "../services/api";

const GamePage = () => {
  const [roomId] = useState<string>(
    new URLSearchParams(window.location.search).get("rid") || ""
  );
  const [useSocket] = useSocketRooms();
  const [openVidu] = useOpenVidu();
  const [connectionFlag, setConntectionFlag] = useState<boolean>(false);
  const [game, setGame] = useState<Phaser.Game>();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const token = sessionStorage.getItem("accessToken")||"";

  useEffect(() => {
    if (canvasRef.current && useSocket.socket) {
      const game = createGame(canvasRef.current);
      setGame(() => game);
    }
  }, [canvasRef, useSocket.socket]);

  useEffect(() => {
    if (game && useSocket.socket && useSocket.client) {
      game.events.removeListener(STAGE_EVENT.SELECT);
      useSocket.socket.removeListener(STAGE_EVENT.SELECT_SUCCESS);

      game.events.addListener(STAGE_EVENT.SET_PLAYER_ID, () => {
        game.events.emit(
          STAGE_EVENT.SET_PLAYER_ID_SUCCESS,
          openVidu.client?.id
        );
      });

      game.events.addListener(STAGE_EVENT.SELECT, (stageName: string) => {
        useSocket.emitGameEvent(STAGE_EVENT.SELECT, {
          roomId: useSocket.roomId,
          id: openVidu.client?.id,
          stageName: stageName,
        });
      });

      useSocket.socket.on(STAGE_EVENT.SELECT_SUCCESS, (data: any) => {
        const selectScene = game.scene.scenes[0];
        selectScene.events.emit(STAGE_EVENT.SELECT_SUCCESS, data);
      });

      game.events.addListener(STAGE_EVENT.CREATE_PLAYER, (playerData: any) => {
        useSocket.emitGameEvent(STAGE_EVENT.CREATE_PLAYER, { playerData });
      });

      useSocket.socket.on(
        STAGE_EVENT.CREATE_PLAYER_SUCCESS,
        (playerData: any) => {
          game.events.emit(STAGE_EVENT.CREATE_PLAYER_SUCCESS, playerData);
        }
      );

      game.events.addListener(STAGE_EVENT.UPDATE_PLAYER, (playerData: any) => {
        useSocket.emitGameEvent(STAGE_EVENT.UPDATE_PLAYER, playerData);
      });

      useSocket.socket.on(
        STAGE_EVENT.UPDATE_PLAYER_SUCCESS,
        (playerData: any) => {
          game.events.emit(STAGE_EVENT.UPDATE_PLAYER_SUCCESS, playerData);
        }
      );

      game.events.addListener("getClearTime", (playerID: number, stageNumber: number) => {
        //if (useSocket.roomInfo?.hostId === playerID) {
          useSocket.emitGameEvent("getClearTime", {
            roomId: useSocket.roomId,
            stageNumber: stageNumber
          });
        //}
      });

      useSocket.socket.on("returnClearTime", (startTime: number, stageNumber: number) => {
        game.events.emit("stageClear", startTime, stageNumber);
      });

      game.events.addListener("stageClear", async (startTime: number, stageNumber: number) => {
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, '0');
          const day = String(now.getDate()).padStart(2, '0');
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const seconds = String(now.getSeconds()).padStart(2, '0');
      
          const clearDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          const clearTime = Math.floor((now.getTime() - startTime) / 1000);
          
          await defaultInstance.post(
            '/game-record',
            {
              members: useSocket.roomInfo?.members,
              clearDate: clearDate,
              clearTime: clearTime,
              stage: stageNumber
            }
          )
          useSocket.emitGameEvent("stageClear", {
            roomId: useSocket.roomId,
            stageNumber: stageNumber
          });
        }
      );

      useSocket.socket.on("stageClearSuccess", (stageNumber: number) => {
        console.log(stageNumber);
        const selectScene = game.scene.scenes[stageNumber];
        selectScene.events.emit("stageClearSuccess");
      });
    }
  }, [game, useSocket.socket, useSocket.client]);

  useEffect(() => {
    if (!roomId) {
      Swal.fire({
        title: "비정상적인 접근입니다.",
        confirmButtonColor: "#3479AD",
        confirmButtonText: "확인",
        width: "550px",
      }).then(() => {
        window.location.href = "/";
      });
    }
  }, []);
  
  useEffect(()=>{
      if(connectionFlag) {
          useSocket.joinRoom(roomId, token);
      }
  }, [connectionFlag]);

  useEffect(() => {
    setConntectionFlag(roomId !== undefined && useSocket.socket !== undefined);
  }, [roomId, useSocket.socket]);

  useEffect(() => {
    const leaveSession = openVidu.leaveSession;
    window.addEventListener("beforeunload", leaveSession);
    return () => {
      window.removeEventListener("beforeunload", leaveSession);
    };
  }, [openVidu]);

  useEffect(() => {
    if (roomId) {
      openVidu.handleChangeRoomId(roomId);
    }
  }, [roomId]);

  useEffect(() => {
    if (useSocket.client) {
      openVidu.handleChangeClient(useSocket.client);
    }
  }, [useSocket.client]);

  useEffect(() => {
    if (useSocket.isKick) {
      openVidu.leaveSession();
      Swal.fire({
        title: "다른 클라이언트에서 접속하여<br/> 접속이 종료됩니다.",
        confirmButtonColor: "#3479AD",
        confirmButtonText: "확인",
        width: "550px",
      }).then(() => {
        window.location.href = "/";
      });
    }
  }, [useSocket.isKick, openVidu]);

  return (
    <div
      id="game"
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        background: "black",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "flex" }}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default GamePage;