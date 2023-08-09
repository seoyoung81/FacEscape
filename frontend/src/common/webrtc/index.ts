import { OpenVidu, Device } from "openvidu-browser";
import { useState, useEffect } from 'react';
import { getToken } from "./service"
import { WebRTCStreamEvent } from "./utils/types"
import { Session, Publisher, Subscriber } from "openvidu-browser";

export function useOpenVidu () {

    const [roomId, setRoomId] = useState<string>();
    const [nickname, setNickname] = useState<string>('Participant' + Math.floor(Math.random() * 100));
    const [session, setSession] = useState<Session>();
    const [publisher, setPublisher] = useState<Publisher>();
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [currentVideoDevice, setCurrentVideoDevice] = useState<Device>();

    const handleChangeRoomId = (id: string) => {
        setRoomId(()=>id);
    }

    const handleChangeMemberNickname = (nickname: string) => {
        setNickname(()=>nickname);
    }

    useEffect(()=>{
        if(roomId) {
            initSession();
        }
    }, [roomId]);

    useEffect(()=>{
        if(session) {
            session.on(WebRTCStreamEvent.streamCreated, (event)=>{
                const subscriber = session.subscribe(event.stream, undefined);
                setSubscribers((prev)=>[...prev, subscriber]);
            });

            session.on(WebRTCStreamEvent.streamDestroyed, (event)=>{
                setSubscribers((prev)=>{
                    const idx = prev.indexOf(event.stream.streamManager as Subscriber, 0);

                    if(idx > -1) prev.splice(idx, 1);
                    return [...prev];
                });
            });

            session.on(WebRTCStreamEvent.exception, (exception)=>{
            });

            joinSession();
        }
    }, [session])

    const initSession = () => {
        const openViduInstance = new OpenVidu();
        openViduInstance.enableProdMode();
        setSession(()=>openViduInstance.initSession());
    }

    const joinSession = async () => {
        const openViduInstance = new OpenVidu();
        openViduInstance.enableProdMode();

        try {
            const token = await getToken(roomId as string);
            await (session as Session).connect(token, { clientData: nickname });

            const publisher = openViduInstance.initPublisher(undefined, {
                audioSource: undefined, 
                videoSource: undefined,
                publishAudio: true, 
                publishVideo: true,
                resolution: '640x480',
                frameRate: 30, 
                insertMode: 'APPEND',
                mirror: false
            });

            await (session as Session).publish(publisher);
            const devices = await openViduInstance.getDevices();
            const videoDevices = devices.filter(device => device.kind === "videoinput");
            const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
            const device = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

            setCurrentVideoDevice(()=>device);
            setPublisher(()=>publisher);
        } catch(e) {
            console.warn(e);
        }           
    }   

    const leaveSession = () => {
        if(session) {
            session.disconnect();
        }

        setSession(()=>undefined);
        setSubscribers(()=>[]);
        setRoomId(()=>'');
        setNickname(()=>'Participant' + Math.floor(Math.random() * 100));
        setPublisher(()=>undefined);
    }

    return [{ publisher, subscribers, handleChangeRoomId, handleChangeMemberNickname, joinSession, leaveSession }];
}; 