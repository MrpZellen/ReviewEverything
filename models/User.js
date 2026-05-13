import { Sequelize, DataTypes, Model } from 'sequelize';

//sequelize definition for connection and datatype definition like mongoose.
const sequelize = new Sequelize('database', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5400,
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
        type: DataTypes.ARRAY,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
    }
  },
  {
    sequelize,
    modelName: 'User',
  },
);

export default User