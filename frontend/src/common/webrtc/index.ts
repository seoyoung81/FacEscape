import { OpenVidu } from "openvidu-browser";
import { useState, useEffect } from "react";
import { getToken } from "./service";
import {
  WebRTCStreamEvent,
  WebRTCRemoteMember,
  RoomMember,
} from "./utils/types";
import { Session, Publisher, Subscriber } from "openvidu-browser";
import Swal from "sweetalert2";

export function useOpenVidu() {
  const [roomId, setRoomId] = useState<string>();
  const [client, setClient] = useState<RoomMember>();
  const [session, setSession] = useState<Session>();
  const [publisher, setPublisher] = useState<Publisher>();
  const [remoteMembers, setRemoteMembers] = useState<WebRTCRemoteMember[]>([]);

  const handleChangeRoomId = (id: string) => {
    setRoomId(() => id);
  };

  const handleChangeClient = (client: RoomMember) => {
    setClient(() => client);
  };

  useEffect(() => {
    if (roomId) {
      initSession();
    }
  }, [roomId]);

  useEffect(() => {
    if (session) {
      session.on(WebRTCStreamEvent.streamCreated, (event) => {
        const subscriber = session.subscribe(event.stream, undefined);
        const newRemoteMember: WebRTCRemoteMember = {
          stream: subscriber,
          member: JSON.parse(event.stream.connection.data).clientData,
        };
        setRemoteMembers((prev) => [...prev, newRemoteMember]);
      });

      session.on(WebRTCStreamEvent.streamDestroyed, (event) => {
        setRemoteMembers((prev) => {
          for (let i = 0; i < prev.length; ++i) {
            if (prev[i].stream === event.stream.streamManager) {
              prev.splice(i, 1);
              break;
            }
          }
          return [...prev];
        });
      });

      session.on(WebRTCStreamEvent.exception, (exception) => {});
    }
  }, [session]);

  useEffect(() => {
    if (publisher) {
      setAudioState(sessionStorage.getItem("micControl") === "true");
      setVideoState(sessionStorage.getItem("cameraControl") === "true");
    }
  }, [publisher]);

  useEffect(() => {
    if (session && client) {
      joinSession();
    }
  }, [session, client]);

  const initSession = () => {
    const openViduInstance = new OpenVidu();
    openViduInstance.enableProdMode();
    setSession(() => openViduInstance.initSession());
  };

  const joinSession = async () => {
    const openViduInstance = new OpenVidu();
    openViduInstance.enableProdMode();

    try {
      const token = await getToken(roomId as string);
      await (session as Session).connect(token, { clientData: client });

      const publisher = openViduInstance.initPublisher(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: "640x480",
        frameRate: 30,
        insertMode: "APPEND",
        mirror: false,
      });

      await (session as Session).publish(publisher);
      setPublisher(() => publisher);
    } catch (e) {
      console.log(e);
      Swal.fire({
        title: "만료된 방입니다.",
        confirmButtonColor: "#3479AD",
        confirmButtonText: "확인",
        width: "550px",
      }).then(() => {
        window.location.href = "/";
      });
    }
  };

  const leaveSession = () => {
    if (session) {
      setVideoState(false);
      setAudioState(false);
      session.disconnect();
    }
  };

  const setVideoState = (isActive: boolean) => {
    if (publisher) {
      publisher.publishVideo(isActive);
      setPublisher(publisher);
    }
  };

  const setAudioState = (isActive: boolean) => {
    if (publisher) {
      publisher.publishAudio(isActive);
      setPublisher(publisher);
    }
  };

  return [
    {
      client,
      publisher,
      remoteMembers,
      handleChangeRoomId,
      handleChangeClient,
      joinSession,
      leaveSession,
      setVideoState,
      setAudioState,
    },
  ];
}
