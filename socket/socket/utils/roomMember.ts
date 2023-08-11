export class RoomMember{
    private id: number;
    private nickname: string;
    private uuid: string;

    constructor(id: number, nickname: string, uuid: string) {
        this.id = id;
        this.nickname = nickname;
        this.uuid = uuid;
    }
}