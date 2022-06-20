// import { verifyToken } from '../middleware/token';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
// import LoginServices from './loginServices';

class MatchesService {
  matchesFindAll = async () => {
    const matchesfound = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    // console.log('matchesfound service', matchesfound);
    if (!matchesfound) return null;
    return matchesfound;
  };

  matchesGetProgress = async (inProgress: string) => {
    // console.log('query service antes', typeof inProgress);

    let query = true;

    if (inProgress === 'true') {
      query = true;
    }
    if (inProgress === 'false') {
      query = false;
    }

    const matchesfoundProgress = await Matches.findAll({
      where: { inProgress: query },
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    // console.log('matchesfoundProgress', matchesfoundProgress);
    if (!matchesfoundProgress) return null;

    return matchesfoundProgress;
  };

  matchesCreate = async (body: object) => {
    // console.log('token', token);
    // console.log('body', body);
    // const tokenValidate = LoginServices.loginVerify(token);
    // console.log('tokenValidate', tokenValidate);
    // if (!tokenValidate) {
    //   return null;
    // }

    const matchescreated = await Matches.create(body);
    return matchescreated;
  };

  matchesUpdateId = async (id: number): Promise<boolean> => {
    const matchesFound = await Matches.findByPk(id);

    if (!matchesFound) return false;

    await Matches.update({ inProgress: false }, { where: { id } });
    return true;
  };

  matchesUpdate = async (
    homeTeamGoals: number,
    awayTeamGoals: number,
    id: number,
  ): Promise<boolean> => {
    const matchesFound = await Matches.findByPk(id);

    if (!matchesFound) return false;

    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return true;
  };
}

export default new MatchesService();
