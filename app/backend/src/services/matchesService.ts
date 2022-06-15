import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

class MatchesService {
  matchesFindAll = async () => {
    const matchesfound = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    // console.log('matchesfound', matchesfound);
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
}

export default new MatchesService();
