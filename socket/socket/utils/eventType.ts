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
    joinFail = "joinFail"
}

export enum ExitEvent {
    leave = "leaveRoom",
    disconnect = "disconnect"
};