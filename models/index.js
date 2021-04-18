// import all models
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');
// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});
// // Comment.belongsTo(User, {
  
// // })
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});
// Post.hasOne(User, { foreignKey: 'initiator_id' })

// Post.hasOne(User, {as: 'initiator'});
User.belongsToMany(Post, {
  through: Comment,
  as: 'commented_posts',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
})


Post.belongsToMany(User, {
  through: Comment,
  as: 'commented_posts',
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});


Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'

});


Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'cascade'
});

// Post.belongsToMany(User, {
//   through: Comment
//   // foreignKey: 'comment_id'
// });

// User.hasMany(Co)
// Post.belongsToMany(User, {
//   through: Comment,
//   as: 'contributors',
//   // foreignKey: 'user_id',
//   // onDelete: 'SET NULL'
// });


// User.hasMany(Comment, {
//   // through: Post,
//   as: 'user_comments',
//   foreignKey: 'commentId',
//   // foreignKey: 'po',
//   onDelete: 'SET NULL'
// });



  
// Post.belongsToMany(User, {
//     through: Comment,
//     as: 'commented_posts',
//     foreignKey: 'post_id',
//     onDelete: 'SET NULL'
//   });

module.exports = { User, Post, Comment };
