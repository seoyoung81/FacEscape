import express from 'express';
import opService from './openviduService';

const router = express.Router();

router.post(
  '/sessions',
  async (req: express.Request, res: express.Response) => {

    const result = await opService.createSession(req);

    if (result.error) {
      res.send(result.error);
    } 
    else {
      res.send(result.sessionId);
    }
  }
);

router.post(
  '/sessions/:sessionId/connections',
  async (req: express.Request, res: express.Response) => {
    const result = await opService.createConnection(
      req.params.sessionId,
      req
    );

    if (result.error) {
      res.send(result.error);
    } 
    else {
      res.send(result.token);
    }
  }
);

export default router;
