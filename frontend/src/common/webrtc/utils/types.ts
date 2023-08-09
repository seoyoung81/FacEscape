import { Session, Publisher, StreamManager } from "openvidu-browser";

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
