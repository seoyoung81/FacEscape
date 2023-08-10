
export type ClientSocketEvent = "createRoom" | "chat" | "joinRoom";
export type ServerSocketResposneEvent = "joinSuccess" | "joinFail" | "kick";
export type ServerSocketEvent = "hostChanged"|"someoneEntered";
