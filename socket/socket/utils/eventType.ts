export enum MemberActionEvent {
    chat = "chat",
    updateNickName = "updateNickName"
};

export enum ConnectEvent {
    connection = "connection",
}

export enum JoinEvent {
    create = "createRoom",
    join = "joinRoom",
};

export enum MemberResponseEvent {
    joinSuccess = "joinSuccess",
    joinFail = "joinFail",
    someoneEntered = "someoneEntered",
    othersExit = "othersExit",
    kick = "kick",
    hostChanged = "hostChanged"
}

export enum ExitEvent {
    leave = "leaveRoom",
    disconnect = "disconnect"
};

export enum GameActionEvent {
    start = "start"
}

export enum GameResponseEvent {
    startSuccess = "startSuccess",
    startFail = "startFail"
}