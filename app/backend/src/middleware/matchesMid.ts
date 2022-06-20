import { Request, Response, NextFunction } from 'express';
import TeamsServices from '../services/teamsServices';

export const validateMatches = async (req:Request, res:Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  // console.log('awayTeam', typeof awayTeam);
  // console.log('homeTeam', typeof homeTeam);
  const resultTeamsIdhomeTeam = await TeamsServices.teamsFindId(homeTeam);
  if (resultTeamsIdhomeTeam === null) {
    const message = 'There is no team with such id!';
    return res.status(404).json({ message });
  }
  const resultTeamsIdawayTeam = await TeamsServices.teamsFindId(awayTeam);
  if (resultTeamsIdawayTeam === null) {
    const message = 'There is no team with such id!';
    return res.status(404).json({ message });
  }
  next();
};

// export function validateMatchSame(req:Request, res:Response, next: NextFunction) {
//   const { homeTeam, awayTeam } = req.body;
//   if (homeTeam === awayTeam) {
//     const message = 'It is not possible to create a match with two equal teams';
//     return res.status(401).json({ message });
//   }
//   next();
// }

export default validateMatches;
