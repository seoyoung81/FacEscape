import express from "express";
import { createServer } from "http";
import cors from 'cors';

import socketMapper from "./socket/socket.model";
import opController from './openvidu/openviduController'; // opController를 import
import memberController from './member/controller/memberController'
import path from "path";

const app = express();
const httpServer = createServer(app);
const io = socketMapper(httpServer);

app.use(express.json());
app.use(cors());
app.use('/api', opController);
app.use('/member', memberController);

app.use(express.static(path.join(__dirname, "./public")))
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3050;
httpServer.listen(PORT, () => {
});
