import express from 'express';
import { memberService } from '../service/memberService';

const router = express.Router();

router.post(
  '/update',
  async (req: express.Request, res: express.Response) => {
    const hostIp = req.socket.remoteAddress || "";
    const memberId = parseInt(req.body.memberId as string);
    const nickname = req.body.nickname as string;
    res.send(memberService.updateMemberNickname(hostIp, memberId, nickname));
  }
);

export default router;