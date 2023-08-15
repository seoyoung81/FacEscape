import { Session, Publisher, StreamManager, Subscriber } from "openvidu-browser";

export type WebRTCState = {
    mySessionId: string,
    myUserName: string,
    session: Session | undefined,
    mainStreamManager: Publisher | undefined,
    publisher: Publisher | undefined,
    subscribers: StreamManager[],
}

export enum WebRTCStreamEvent {
    streamCreated = "streamCreated",
    streamDestroyed = "streamDestroyed",
    exception = "exception",
    othersExit = "othersExit",
}

export type RoomMember = {
    id: number,
    nickname: string
};

export type WebRTCRemoteMember = {
    stream: Subscriber,
    member: RoomMember
}