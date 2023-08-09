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
                subscribers.push(subscriber);
                const newSubscribers = [...subscribers];
                setSubscribers(()=>newSubscribers);
            });

            session.on(WebRTCStreamEvent.streamDestroyed, (event)=>{
                const prevSubscribers = subscribers;
                const idx = prevSubscribers.indexOf(event.stream.streamManager as Subscriber, 0);
                console.warn("나갈때 버금 ㅜㄴ제")

                if(idx > -1) {
                    const newSubscribers = [...subscribers.splice(idx, 1)];
                    setSubscribers(()=>newSubscribers);
                }
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
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '640x480', // The resolution of your video
                frameRate: 30, // The frame rate of your video
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