import { Request, Response } from 'express';
import TeamsServices from '../services/teamsServices';

export class TeamsController {
  public teamsGetAll = async (req: Request, res: Response) => {
    try {
      const resultTeams = await TeamsServices.teamsFindAll();
      // console.log('resultTeams controller', resultTeams);
      if (!resultTeams) return res.status(401).json({ message: 'Erro nos times' });
      return res.status(200).json(resultTeams);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  public teamsGetid = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const resultTeamsId = await TeamsServices.teamsFindId(id);
      // console.log('resultTeams controller', resultTeamsId);
      if (!resultTeamsId) {
        return res.status(401).json({ message: 'There is no team with such id!' });
      }
      return res.status(200).json(resultTeamsId);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };
}

export default new TeamsController();
