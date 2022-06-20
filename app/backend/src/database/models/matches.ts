import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';

export default class Matches extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}
Matches.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    homeTeam: {
      type: INTEGER,
      field: 'home_team',
      allowNull: false,
    },
    homeTeamGoals: {
      type: INTEGER,
      field: 'home_team_goals',
      allowNull: false,
    },
    awayTeam: {
      type: INTEGER,
      field: 'away_team',
      allowNull: false,
    },
    awayTeamGoals: {
      type: INTEGER,
      field: 'away_team_goals',
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      field: 'in_progress',
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'matches',
    timestamps: false,
    underscored: true,
  },
);
