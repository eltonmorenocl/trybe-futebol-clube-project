import Teams from '../database/models/teams';

class TeamsService {
  teamsFindAll = async () => {
    const teamsfound = await Teams.findAll();
    // console.log('teamsfound', teamsfound);
    if (!teamsfound) return null;

    return teamsfound;
  };

  teamsFindId = async (id: string) => {
    const teamfoundId = await Teams.findOne({ where: { id } });
    // console.log('teamfoundId', teamfoundId);
    if (!teamfoundId) return null;

    return teamfoundId;
  };
}

export default new TeamsService();
