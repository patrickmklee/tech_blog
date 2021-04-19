const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const nanoid = require('nanoid/async');
class Comment extends Model {
  // checkPassword(loginPw) {
  //   return bcrypt.compareSync(loginPw, this.password);
  // }
}
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
  // {
  //   hooks: {
  //     // set up beforeCreate lifecycle "hook" functionality
  //     beforeCreate(newCommentData) {
  //       newCommentData.id = nanoid();
  //       return newCommentData;
  //     }
  //   },
  // },
  {
    sequelize,

    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }

);

module.exports = Comment;
