// import all models
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');
// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'cascade'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});


module.exports = { User, Post, Comment };
