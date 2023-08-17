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
  const token = sessionStorage.getItem("accessToken") || "";

  useEffect(() => {
    if (canvasRef.current && useSocket.socket) {
      const game = createGame(canvasRef.current);
      setGame(() => game);
    }
  }, [canvasRef, useSocket.socket]);

  useEffect(() => {
    if (game && useSocket.socket && useSocket.client) {
      // event 중복 등록 방지
      game.events.removeAllListeners();
      useSocket.socket.removeAllListeners();

      // 이미 event가 등록되어 있는지 확인 후 event 등록
      if (!game.events.listeners(STAGE_EVENT.SET_PLAYER_ID).length) {
        game.events.addListener(
          STAGE_EVENT.SET_PLAYER_ID,
          (sceneKey: string) => {
            console.log(`set player id: ${useSocket.client?.id}`);
            const selectedScene = game.scene.getScene(sceneKey);
            selectedScene.events.emit(STAGE_EVENT.SET_PLAYER_ID_SUCCESS, {
              id: useSocket.client?.id,
            });
          }
        );
      }

      if (!game.events.listeners(STAGE_EVENT.SELECT).length) {
        game.events.addListener(STAGE_EVENT.SELECT, (stageName: string) => {
          if (useSocket.roomInfo?.hostId === useSocket.client?.id) {
            useSocket.emitGameEvent(STAGE_EVENT.SELECT, {
              roomId: useSocket.roomId,
              id: useSocket.client?.id,
              stageName: stageName,
            });
            useSocket.emitGameEvent("getMembersInfo",{roomId: useSocket.roomId});
          } else {
            Swal.fire({
              title: "방장이 스테이지를 선택 할 수 있습니다!",
              confirmButtonColor: '#3479AD',
              confirmButtonText: '확인',
              width: '500px'
          })
          }
        });
      }

      useSocket.socket.on("updateMembersInfo", (data)=>{
        useSocket.updateMemberInfos(data);
      });

      useSocket.socket.on("cannonShoot", (data)=>{
        game.scene
          .getScene(data.sceneKey)
          .events.emit("cannonShoot");
      });

      useSocket.socket.on(STAGE_EVENT.SELECT_SUCCESS, (sceneKey: any) => {
        const selectScene = game.scene.scenes[0];
        selectScene.events.emit(STAGE_EVENT.SELECT_SUCCESS, sceneKey);
        
        console.log(useSocket.roomInfo?.members);
      });

      if (!game.events.listeners(STAGE_EVENT.CREATE_PLAYER).length) {
        game.events.addListener(
          STAGE_EVENT.CREATE_PLAYER,
          (playerData: any) => {
            console.log(`creating player: ${playerData.id}`);
            useSocket.emitGameEvent(STAGE_EVENT.CREATE_PLAYER, {
              roomId: useSocket.roomId,
              id: playerData.id,
              x: playerData.x,
              y: playerData.y,
              sceneKey: playerData.sceneKey,
            });
          }
        );
      }

      useSocket.socket.on(
        STAGE_EVENT.CREATE_PLAYER_SUCCESS,
        (playerData: any) => {
          console.log(`player create success:${playerData.id}`);
          game.scene
            .getScene(playerData.sceneKey)
            .events.emit(STAGE_EVENT.CREATE_PLAYER_SUCCESS, playerData);
        }
      );

      if (!game.events.listeners(STAGE_EVENT.UPDATE_PLAYER).length) {
        game.events.addListener(
          STAGE_EVENT.UPDATE_PLAYER,
          (playerData: any) => {
            // console.log("update player listener 등록");
            useSocket.emitGameEvent(STAGE_EVENT.UPDATE_PLAYER, {
              roomId: useSocket.roomId,
              id: playerData.id,
              x: playerData.x,
              y: playerData.y,
              sceneKey: playerData.sceneKey,
            });
          }
        );
      }

      useSocket.socket.on(
        STAGE_EVENT.UPDATE_PLAYER_SUCCESS,
        (playerData: any) => {
          game.scene
            .getScene(playerData.sceneKey)
            .events.emit(STAGE_EVENT.UPDATE_PLAYER_SUCCESS, playerData);
        }
      );

      if (!game.events.listeners(STAGE_EVENT.PICKED_KEY).length) {
        game.events.addListener(STAGE_EVENT.PICKED_KEY, (data: any) => {
          useSocket.emitGameEvent(STAGE_EVENT.PICKED_KEY, {
            roomId: useSocket.roomId,
            sceneKey: data.sceneKey,
            id: data.id,
          });
          console.log(`emitted key picker :${data.id}`);
        });
      }

      useSocket.socket.on(STAGE_EVENT.PICKED_KEY_SUCCESS, (data: any) => {
        game.scene
          .getScene(data.sceneKey)
          .events.emit(STAGE_EVENT.PICKED_KEY_SUCCESS, data);
      });

      game.events.addListener(
        "getClearInfo",
        (playerId: number, stageNumber: number) => {
          useSocket.emitGameEvent("getClearInfo", {
            roomId: useSocket.roomId,
            stageNumber: stageNumber,
          });
        }
        
      );
      game.events.addListener(
        "stageClear",
        async (membersArray:any, startTime: number, stageNumber: number) => {
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, "0");
          const day = String(now.getDate()).padStart(2, "0");
          const hours = String(now.getHours()).padStart(2, "0");
          const minutes = String(now.getMinutes()).padStart(2, "0");
          const seconds = String(now.getSeconds()).padStart(2, "0");

          const clearDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          const clearTime = Math.floor((now.getTime() - startTime) / 1000);

          await defaultInstance.post("/game-record", {
            members: membersArray,
            clearDate: clearDate,
            clearTime: clearTime,
            stage: stageNumber,
          });
          useSocket.emitGameEvent("stageClear", {
            roomId: useSocket.roomId,
            stageNumber: stageNumber,
          });
        }
      );

      useSocket.socket!.on(
        "returnClearInfo",
        (membersArray: any, startTime: number, stageNumber: number) => {
          game.events.emit("stageClear", membersArray, startTime, stageNumber);
        }
      );

      useSocket.socket.on("stageClearSuccess", (stageNumber: number) => {
        const selectScene = game.scene.scenes[stageNumber];
        selectScene.events.emit("stageClearSuccess");
      });

      useSocket.socket!.on(
        STAGE_EVENT.UPDATE_PLAYER_SUCCESS,
        (playerData: any) => {
          game.events.emit(STAGE_EVENT.UPDATE_PLAYER_SUCCESS, playerData);
        }
      );
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

  useEffect(() => {
    if (connectionFlag) {
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
