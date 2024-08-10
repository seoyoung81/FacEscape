import { useState, useEffect, useRef } from "react";
import { createGame } from "../../game";
import { useSocketRooms } from "../../common/socket";
import { useOpenVidu } from "../../common/webrtc";
import { STAGE_EVENT } from "../../game/event";

import Phaser from "phaser";
import Swal from "sweetalert2";
import { defaultInstance } from "../services/api";

const GamePage = () => {
<<<<<<< HEAD
  const [roomId] = useState<string>(new URLSearchParams(window.location.search).get("rid") || "");
=======
  const [roomId] = useState<string>(
    new URLSearchParams(window.location.search).get("rid") || ""
  );
>>>>>>> frontend
  const [useSocket] = useSocketRooms();
  const [openVidu] = useOpenVidu();
  const [connectionFlag, setConntectionFlag] = useState<boolean>(false);
  const [game, setGame] = useState<Phaser.Game>();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const token = sessionStorage.getItem("accessToken") || "";

  useEffect(() => {
<<<<<<< HEAD
    if (canvasRef.current && useSocket.socket) {
      const game = createGame(canvasRef.current);
      setGame(() => game);
    }
  }, [canvasRef, useSocket.socket]);
=======
    if (canvasRef.current && useSocket.socket && openVidu.publisher && openVidu.remoteMembers && openVidu.remoteMembers.length === 2) {
      const game = createGame(canvasRef.current);
      setGame(() => game);
    }
  }, [canvasRef, useSocket.socket, openVidu.publisher, openVidu.remoteMembers]);
>>>>>>> frontend

  useEffect(() => {
    if (game && useSocket.socket && useSocket.client) {
      // event 중복 등록 방지
      game.events.removeAllListeners();
      useSocket.socket.removeAllListeners();

      // 이미 event가 등록되어 있는지 확인 후 event 등록
      if (!game.events.listeners(STAGE_EVENT.SET_PLAYER_ID).length) {
<<<<<<< HEAD
        game.events.addListener(STAGE_EVENT.SET_PLAYER_ID, (sceneKey: string) => {
          const selectedScene = game.scene.getScene(sceneKey);
          selectedScene.events.emit(
            STAGE_EVENT.SET_PLAYER_ID_SUCCESS,
            {
              id: useSocket.client?.id,
            },
            openVidu.remoteMembers
          );
        });
=======
        game.events.addListener(
          STAGE_EVENT.SET_PLAYER_ID,
          (sceneKey: string) => {
            const selectedScene = game.scene.getScene(sceneKey);
            selectedScene.events.emit(
              STAGE_EVENT.SET_PLAYER_ID_SUCCESS,
              {
                id: useSocket.client?.id,
              },
              openVidu.remoteMembers
            );
          }
        );
>>>>>>> frontend
      }

      if (!game.events.listeners(STAGE_EVENT.SELECT).length) {
        game.events.addListener(STAGE_EVENT.SELECT, (stageName: string) => {
          if (useSocket.roomInfo?.hostId === useSocket.client?.id) {
            useSocket.emitGameEvent(STAGE_EVENT.SELECT, {
              roomId: useSocket.roomId,
              id: useSocket.client?.id,
              stageName: stageName,
            });
          } else {
            Swal.fire({
              title: "방장이 스테이지를 선택 할 수 있습니다!",
              confirmButtonColor: "#3479AD",
              confirmButtonText: "확인",
              width: "500px",
            });
          }
        });
      }

      useSocket.socket.on("cannonShoot", (data) => {
        game.scene.getScene(data.sceneKey).events.emit("cannonShoot");
      });

<<<<<<< HEAD
      useSocket.socket.on(STAGE_EVENT.SELECT_SUCCESS, (sceneKey: any, userStartPos: any) => {
        const selectScene = game.scene.scenes[0];
        selectScene.events.emit(STAGE_EVENT.SELECT_SUCCESS, sceneKey, userStartPos);
      });
=======
      useSocket.socket.on(
        STAGE_EVENT.SELECT_SUCCESS,
        (sceneKey: any, userStartPos: any) => {
          const selectScene = game.scene.scenes[0];
          selectScene.events.emit(
            STAGE_EVENT.SELECT_SUCCESS,
            sceneKey,
            userStartPos
          );
        }
      );
>>>>>>> frontend

      if (!game.events.listeners(STAGE_EVENT.CREATE_PLAYER).length) {
        game.events.addListener(STAGE_EVENT.CREATE_PLAYER, (playerData: any) => {
          useSocket.emitGameEvent(STAGE_EVENT.CREATE_PLAYER, {
            roomId: useSocket.roomId,
            id: playerData.id,
            x: playerData.x,
            y: playerData.y,
            sceneKey: playerData.sceneKey,
          });
        });
      }

      useSocket.socket.on(STAGE_EVENT.CREATE_PLAYER_SUCCESS, (playerData: any) => {
<<<<<<< HEAD
        game.scene
          .getScene(playerData.sceneKey)
          .events.emit(STAGE_EVENT.CREATE_PLAYER_SUCCESS, playerData);
      });

      if (!game.events.listeners(STAGE_EVENT.UPDATE_PLAYER).length) {
        game.events.addListener(STAGE_EVENT.UPDATE_PLAYER, (playerData: any) => {
          useSocket.emitGameEvent(STAGE_EVENT.UPDATE_PLAYER, {
            roomId: useSocket.roomId,
            id: playerData.id,
            x: playerData.x,
            y: playerData.y,
            sceneKey: playerData.sceneKey,
          });
        });
      }

      useSocket.socket.on(STAGE_EVENT.UPDATE_PLAYER_SUCCESS, (playerData: any) => {
        game.scene
          .getScene(playerData.sceneKey)
          .events.emit(STAGE_EVENT.UPDATE_PLAYER_SUCCESS, playerData);
      });
=======
        console.log(`player create success:${playerData.id}`);
        
        const remoteMember = openVidu.remoteMembers.filter(remote=>remote.member.id === playerData.id)[0];
        console.log(remoteMember);

        game.scene
          .getScene(playerData.sceneKey)
          .events.emit(STAGE_EVENT.CREATE_PLAYER_SUCCESS, {
            ...playerData,
            remote: remoteMember
          });
      });

      if (!game.events.listeners(STAGE_EVENT.UPDATE_PLAYER).length) {
        game.events.addListener(
          STAGE_EVENT.UPDATE_PLAYER,
          (playerData: any) => {
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
        (data: any, playersData: any) => {
          game.scene
            .getScene(data.sceneKey)
            .events.emit(STAGE_EVENT.UPDATE_PLAYER_SUCCESS, playersData, openVidu.remoteMembers);
        }
      );
>>>>>>> frontend

      if (!game.events.listeners(STAGE_EVENT.PICKED_KEY).length) {
        game.events.addListener(STAGE_EVENT.PICKED_KEY, (data: any) => {
          useSocket.emitGameEvent(STAGE_EVENT.PICKED_KEY, {
            roomId: useSocket.roomId,
            sceneKey: data.sceneKey,
            id: data.id,
          });
        });
      }

      useSocket.socket.on(STAGE_EVENT.PICKED_KEY_SUCCESS, (data: any) => {
<<<<<<< HEAD
        game.scene.getScene(data.sceneKey).events.emit(STAGE_EVENT.PICKED_KEY_SUCCESS, data);
=======
        game.scene
          .getScene(data.sceneKey)
          .events.emit(STAGE_EVENT.PICKED_KEY_SUCCESS, data);
>>>>>>> frontend
      });

      game.events.addListener(
        "getClearInfo",
        (stageNumber: number) => {
          useSocket.emitGameEvent("getClearInfo", {
            roomId: useSocket.roomId,
            stageNumber: stageNumber,
          });
        }
<<<<<<< HEAD
        
      );
      game.events.addListener(
        "stageClear",
        async (membersArray:any, startTime: number, stageNumber: number) => {
=======
      );

      game.events.addListener("creatVideoObj",(data: any)=>{
        game.scene.getScene(data.sceneKey).events.emit("insertVideo", {stream: openVidu.publisher});
      });

      game.events.addListener(
        "stageClear",
        async (membersArray: any, startTime: number, stageNumber: number) => {
>>>>>>> frontend
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

<<<<<<< HEAD
      useSocket.socket!.on(STAGE_EVENT.UPDATE_PLAYER_SUCCESS, (playerData: any) => {
        game.events.emit(STAGE_EVENT.UPDATE_PLAYER_SUCCESS, playerData);
      });
=======
      useSocket.socket!.on(
        STAGE_EVENT.UPDATE_PLAYER_SUCCESS,
        (playerData: any) => {
          game.events.emit(STAGE_EVENT.UPDATE_PLAYER_SUCCESS, playerData);
        }
      );
>>>>>>> frontend
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
<<<<<<< HEAD
=======
    openVidu.setAudioState(sessionStorage.getItem("audioControl")==="true");
    openVidu.setVideoState(sessionStorage.getItem("videoControl")==="true");
>>>>>>> frontend
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
<<<<<<< HEAD
      <canvas ref={canvasRef} style={{ display: "flex" }} width="100%" height="100%" />
=======
      <canvas
        ref={canvasRef}
        style={{ display: "flex" }}
        width="100%"
        height="100%"
      />
>>>>>>> frontend
    </div>
  );
};

export default GamePage;
