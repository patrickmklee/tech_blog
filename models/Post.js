const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Post model
class Post extends Model {
  // checkUser(session) {
  //   return (session.user_id === this.user_id);
  // },
  // static comment(body, models) {
  //   return models.Comment.create({
  //     comment_text: body.comment_text,
  //     user_id: body.user_id,
  //     post_id: body.post_id
  //   }).then(() => {
  //     return Post.findOne({
  //       where: {
  //         id: body.post_id
  //       },
  //       attributes: [
  //         'id',
  //         'title',
  //         'text',
  //         'created_at'
  //         [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']
  //       ]
  //       ,
  //       include: [
  //         {
  //           model: models.Comment,
  //           attributes: ['id', 'comment_text', 'user_id', 'created_at'],
  //           include: {
  //             model: models.User,
  //             attributes: ['username']
  //           }
  //         }
  //       ]
  //     });
  //   });
  // }
}


// create fields/columns for Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [6]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },

      // validate: {
      //   len[1]
      // }
  },
  // {
  //     hooks: {
  //   // set up beforeCreate lifecycle "hook" functionality
  //   async beforeCreate(newCommentData) {
  //     newCommentData.id = await g.hash(newUserData.password, 10);
  //     return newUserData;
  //   },
  // }
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;
