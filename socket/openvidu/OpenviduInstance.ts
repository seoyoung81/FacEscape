import { OpenVidu } from 'openvidu-node-client';
import dotenv from 'dotenv';

dotenv.config();

const openvidu = new OpenVidu(process.env.OPENVIDU_URL!, process.env.OPENVIDU_SECRET!);

export default openvidu;