export class RoomMember{
    private id: number;
    private nickname: string;
    private gameUuid: string;

    constructor(id: number, nickname: string, gameUuid: string) {
        this.id = id;
        this.nickname = nickname;
        this.gameUuid = gameUuid;
    }
}