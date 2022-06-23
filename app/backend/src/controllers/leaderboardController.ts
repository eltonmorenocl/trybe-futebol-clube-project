import { Request, Response } from 'express';
import leaderboardServices from '../services/leaderboardServices';

export class LeaderboardController {
  public GetBoard = async (req: Request, res: Response) => {
    try {
      const resultBoard = await leaderboardServices.board();
      // console.log('resultTeams controller', resultTeams);
      return res.status(200).json(resultBoard);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };
}

export default new LeaderboardController();
