import { OpenVidu } from 'openvidu-node-client';

const openvidu = new OpenVidu(process.env.OPENVIDU_URL!, process.env.OPENVIDU_SECRET!);

export default openvidu;