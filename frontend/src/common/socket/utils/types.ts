
export enum ClientSocketEvent {
    CREATE_ROOM="createRoom",
    CHAT="chat",
    JOIN_ROOM="joinRoom"
}

export enum ServerSocketResposneEvent {
    JOIN_SUCCESS="joinSuccess",
    JOIN_FAIL="joinFail",
    KICK="kick"
}

export enum ServerSocketEvent {
    HOST_ChANGED="hostChanged",
    SOMEONE_ENTER="someoneEntered"
}