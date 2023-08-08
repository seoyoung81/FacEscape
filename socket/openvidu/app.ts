import { config } from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import http from "http";
import { OpenVidu } from "openvidu-node-client";
import cors from "cors";
import { roomManager } from "../room/roomManager";


config(!!process.env.CONFIG ? { path: process.env.CONFIG } : {});

const app: express.Application = express();
const SERVER_PORT: number = 5000;
const OPENVIDU_URL: string = "https://i9a305.p.ssafy.io";
const OPENVIDU_SECRET: string = "teamYaeHunWithNoYaeHun230807";

app.use(
    cors({
        origin: "*",
    })
);

const server: http.Server = http.createServer(app);
const openvidu: OpenVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));
app.use(express.json());

server.listen(SERVER_PORT);


/**
 * openvidu에 화상/음성 채팅을 위한 방 생성/참가 요청입니다. 
 * 
 * 이 요청이 오는 시점은 소켓 서버에 방이 생성되거나, 참가했을 때 이후에
 * 이뤄지는 요청입니다. 따라서 소켓 서버에서의 roomId를 기반으로 방 생성/참가를 합니다.
 * 
 */

app.post(
    "/api/sessions",
    async (req: express.Request, res: express.Response) => {
        if (isNonExistRoom(req.body.sessionId)) {
            // 에러; 생각해보니 안 보내도 될 것 같습니다. 나중에 바꿀 것
            res.send("존재하지 않는 방에 대한 화상 서버 생성 요청입니다.");
        }
        else {
            // 이미 isNonExistRoom()에서 req.body.sessionId의 null check를 했으므로
            const session = await openvidu.createSession(req.body);
            res.send(session.sessionId);
        }
    });

app.post(
    "/api/sessions/:sessionId/connections",
    async (req: express.Request, res: express.Response) => {
        // 존재하지 않는 방에 대해 화상 서버 입장 요청시
        if (isNonExistRoom(req.params.sessionId)) {
            res.send("존재하지 않는 방에 대한 화상 서버 입장 요청입니다.");// 에러; 생각해보니 안 보내도 될 것 같습니다. 나중에 바꿀 것
        }
        // 방은 존재하는데 만원인 경우, 위 조건을 만족하면 sessionId이 무조건 string으로 존재하므로 이후에는 체크 ㄴㄴ 
        else if (isRoomFull(req.params.sessionId)) {
            res.send("이미 만원인 방에 대한 화상 서버 입장 요청입니다.");// 나중에 바꿀 것
        }
        // 위 조건들을 위배하지 않아야 화상 서버 입장 가능
        else {
            const session = openvidu.activeSessions.find((s) => s.sessionId === req.params.sessionId);
            if (!session) {
                res.status(404).send();
            }
            else {
                const connection = await session.createConnection(req.body);
                res.send(connection.token);
            }
        }
    }
);


function isNonExistRoom(roomID: string | undefined | null) {
    if (roomID) {
        return !roomManager.exists(roomID);
    }
    else {
        return true;
    }
}

function isRoomFull(roomID: string) {
    return roomManager.getRoom(roomID)?.isFull
}

process.on("uncaughtException", (err) => console.error(err));
