import { OpenVidu, Device } from "openvidu-browser";
import { useState } from 'react';
import { WebRTCState } from "./utils/types";
import { getToken } from "./service"
import { WebRTCStreamEvent } from "./utils/types"

export function useOpenVidu() {

    const [webRTCState, setWebRTCState] = useState<WebRTCState>({
        mySessionId: "",
        myUserName: "",
        session: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: [],
    });

    const [currentVideoDevice, setCurrentVideoDevice] = useState<Device>();

    const [ov, setOV] = useState<OpenVidu|null>(null);
    
    const handleChangeSessionId = (id: string) => {
        setWebRTCState({
            ...webRTCState,
            mySessionId: id
        })
    }

    const handleChangeUserName = (userName: string) => {
        setWebRTCState({
            ...webRTCState,
            myUserName: userName
        })
    }

    const joinSession = () => {
        const openViduInstance = new OpenVidu();
        setOV(openViduInstance);

        const session = openViduInstance.initSession();
        session.on(WebRTCStreamEvent.streamCreated, (event)=>{
            const subscriber = session.subscribe(event.stream, undefined);
            const subscribers = [...webRTCState.subscribers, subscriber];
            setWebRTCState({
                ...webRTCState,
                subscribers: subscribers
            });
        });

        session.on(WebRTCStreamEvent.streamDestroyed, (event)=>{
            const subscribers = webRTCState.subscribers;
            const idx = subscribers.indexOf(event.stream.streamManager, 0);
            if(idx > -1) {
                setWebRTCState({
                    ...webRTCState,
                    subscribers: [...subscribers.splice(idx, 1)]
                });
            }
        });

        session.on(WebRTCStreamEvent.exception, (exception)=>{
            console.warn(exception);
        });

        getToken(webRTCState.mySessionId).then((token)=>{
            session.connect(token, {
                clientData: webRTCState.myUserName
            }).then(async () => {
                const publisher = await openViduInstance.initPublisherAsync(undefined, {
                    audioSource: undefined, // The source of audio. If undefined default microphone
                    videoSource: undefined, // The source of video. If undefined default webcam
                    publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                    publishVideo: true, // Whether you want to start publishing with your video enabled or not
                    resolution: '640x480', // The resolution of your video
                    frameRate: 30, // The frame rate of your video
                    insertMode: 'APPEND',
                    mirror: false
                });

                session.publish(publisher);

                const devices = await openViduInstance.getDevices();
                const videoDevices = devices.filter(device => device.kind === "videoinput");
                const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                const currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);
                
                setCurrentVideoDevice(currentVideoDevice);
                setWebRTCState({
                    ...webRTCState,
                    mainStreamManager: publisher,
                    publisher: publisher
                });
            }).catch(error=>{
                console.log(error.code, error.message);
            });
        });

        setWebRTCState({
            ...webRTCState,
            "session": session
        });
    }

    const leaveSession = () => {
        const session = webRTCState.session;
        if(session) {
            session.disconnect();
        }

        setOV(null);
        setWebRTCState({
            session: undefined,
            subscribers: [],
            mySessionId: '',
            myUserName: '',
            mainStreamManager: undefined,
            publisher: undefined
        });
    }

    const switchCamera = async () => {
        if(!ov) return;
        try {
            const device = await ov.getDevices();
            const videoDevices = device?.filter(device => device.kind === "videoinput");
            if(videoDevices && videoDevices.length > 1) {
                const newVideoDevices = videoDevices.filter(device => device.deviceId !== currentVideoDevice?.deviceId)
                if (newVideoDevices.length > 0) {
                    const newPublisher = ov.initPublisher(undefined, {
                        videoSource: newVideoDevices[0].deviceId,
                        publishAudio: true,
                        publishVideo: true,
                        mirror: true
                    });
                    
                    const session = webRTCState.session;
                    const streamManager = webRTCState.mainStreamManager;

                    if(session && streamManager) {
                        await session.unpublish(streamManager);
                        await session.publish(newPublisher);
                        setWebRTCState({
                            ...webRTCState,
                            mainStreamManager: newPublisher,
                            publisher: newPublisher
                        });
                        setCurrentVideoDevice(newVideoDevices[0]);
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    return [{ webRTCState, handleChangeSessionId, handleChangeUserName, joinSession, leaveSession, switchCamera }];
}; 