const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
// router.use('/', withAuth, (req,res) => {
//   console.log(req.session);
//   // next();
// })
// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log('======================');
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'text',
      'title',
      'created_at',
    //   [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts,  loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/new', withAuth, (req, res) => {
  res.render('dashboard', { loggedIn:true, isEditorPage:true})
});
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: [
      'id',
      'text',
      'title',
      'created_at',
    ]
  })
  .then(dbPostData => {
    if (dbPostData) {
      const post = dbPostData.get({ plain: true });
      res.render('dashboard', { post, loggedIn:true, isEditorPage:true})

      // res.render('edit-post', {
      //   post,
      //   loggedIn: true
      // });
    } else {
      res.status(404).end();
    }
  })
  .catch(err => {
    res.status(500).json(err);
  });
});
router.post('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: [
      'id',
      'text',
      'title',
      'created_at',
    //   [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    // include: [
    //   {
    //     model: Comment,
    //     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
    //     include: {
    //       model: User,
    //       attributes: ['username']
    //     }
    //   },
    //   {
    //     model: User,
    //     attributes: ['username']
    //   }
    // ]
  })
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        res.render('dashboard', { post, loggedIn:true, isEditorPage:true})

        // res.render('edit-post', {
        //   post,
        //   loggedIn: true
        // });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
