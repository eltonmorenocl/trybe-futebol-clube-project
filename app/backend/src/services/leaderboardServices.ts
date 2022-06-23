import sortArray = require('sort-array');
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

class BoardService {
  static victory = (matchs: Matches[]) => matchs
    .reduce((acc, cv) => (cv.homeTeamGoals > cv.awayTeamGoals ? acc + 1 : acc), 0);

  static draws = (matchs: Matches[]) => matchs
    .reduce((acc, cv) => (cv.homeTeamGoals === cv.awayTeamGoals ? acc + 1 : acc), 0);

  static losses = (matchs: Matches[]) => matchs
    .reduce((acc, cv) => (cv.homeTeamGoals < cv.awayTeamGoals ? acc + 1 : acc), 0);

  static golsFeitos = (matchs: Matches[]) => matchs
    .reduce((acc, cv) => acc + cv.homeTeamGoals, 0);

  static golsTomados = (matchs: Matches[]) => matchs
    .reduce((acc, curr) => acc + curr.awayTeamGoals, 0);

  static saldoPontos = (matchs: Matches[]) => {
    const totalVictories = (BoardService.victory(matchs) * 3);
    const totalEmpates = BoardService.draws(matchs);
    return (totalEmpates + totalVictories);
  };

  static SaldodeGols = (matchs: Matches[]) => {
    const golsF = (BoardService.golsFeitos(matchs));
    const golsC = BoardService.golsTomados(matchs);
    return (golsF - golsC);
  };

  static aproveitamento = (matchs: Matches[]) => {
    const points = BoardService.saldoPontos(matchs);
    const matchLength = matchs.length;
    return +((points / (matchLength * 3)) * 100).toFixed(2);
  };

  static boardC(matchs: Matches[]) {
    return {
      totalPoints: BoardService.saldoPontos(matchs),
      totalGames: matchs.length,
      totalVictories: BoardService.victory(matchs),
      totalDraws: BoardService.draws(matchs),
      totalLosses: BoardService.losses(matchs),
      goalsFavor: BoardService.golsFeitos(matchs),
      goalsOwn: BoardService.golsTomados(matchs),
      goalsBalance: BoardService.SaldodeGols(matchs),
      efficiency: BoardService.aproveitamento(matchs),
    };
  }

  board = async () => {
    const getTeams = await Teams.findAll();
    // console.log('getTeams', getTeams);
    const getMatchesF = getTeams.map(async (t) => {
      // console.log('getMatchesF', getMatchesF);
      const matchMap = await Matches
        .findAll({ where: { homeTeam: t.id, inProgress: false } });
      // console.log('matchMap', matchMap);
      const board = BoardService.boardC(matchMap);
      return {
        name: t.teamName,
        ...board,
      };
    });

    const resultBoard = await Promise.all(getMatchesF);
    // console.log('resultBoard', resultBoard);
    const ids = ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'];
    const order = ['desc', 'desc', 'desc', 'desc', 'desc'];
    return sortArray(resultBoard, { by: ids, order });
    // return returnBoard;
  };
}

export default new BoardService();
