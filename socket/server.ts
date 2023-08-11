import express from "express";
import { createServer } from "http";
import cors from 'cors';

import socketMapper from "./socket/socket.model";
import opController from './openvidu/openviduController'; // opController를 import
import memberController from './member/controller/memberController'

const app = express();
const httpServer = createServer(app);
const io = socketMapper(httpServer);

app.use(express.json());
app.use(cors());
app.use('/api', opController);
app.use('/member', memberController);

const PORT = process.env.PORT || 3050;
httpServer.listen(PORT, () => {
});