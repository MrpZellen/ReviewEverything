import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'admin', {
  host: 'userDB',
  dialect: 'postgres',
  port: 5432,
});

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    movieReviews: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
    },
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  },
);

export default User;