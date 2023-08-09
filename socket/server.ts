import express from "express";
import { createServer } from "http";
import cors from 'cors'

import socketMapper from "./socket/socket.model";

const app = express();
const httpServer = createServer(app);
const io = socketMapper(httpServer);
app.use(cors());

const PORT = process.env.PORT || 3050;
httpServer.listen(PORT, () => {
});