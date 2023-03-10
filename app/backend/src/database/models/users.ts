import { Model, DataTypes } from 'sequelize';
import db from '.';

class users extends Model {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}
users.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'users',
  timestamps: false,
});

export default users;