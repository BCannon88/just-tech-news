const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Vote } = require('../../models');

// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    order: [['created_at', 'DESC']],
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
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
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.body.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/upvote', (req, res) => {
  // custom static method created in models/Post.js
  Post.upvote(req.body, { Vote, Comment, User })
    .then(updatedVoteData => res.json(updatedVoteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;






































// // Creating Express.js API endpoints
// const router = require('express').Router();
// // In a query to the post table, we would like to retrieve not only information about each post, but also the user that posted it. With the foreign key, user_id, we can form a JOIN, an essential characteristic of the relational data model.
// const { Post, User } = require('../../models');

// // A route that will retrieve all posts in te database

// // get all users
// router.get('/', (req, res) => {
//     // account for the other columns that we'll retrieve in this query and then account for the JOIN. These will be the id, post_url, title, and created_at columns. configure the findAll method by customizing the attributes property.
//    Post.findAll({
//      attributes: ['id', 'post_url', 'title', 'created_at'],
//      order: [['created_at', 'DESC']],
//      //  include the JOIN to the User table. We do this by adding the property include
//      include: [
//        {
//          model: User,
//          attributes: ['username']
//        }
//      ]
//    })
//      .then(dbPostData => res.json(dbPostData))
//      .catch(err => {
//        console.log(err);
//        res.status(500).json(err);
//      });
//  });
 
//  router.get('/:id', (req, res) => {
//    Post.findOne({
//      where: {
//        id: req.params.id
//      },
//      attributes: ['id', 'post_url', 'title', 'created_at'],
//      include: [
//        {
//          model: User,
//          attributes: ['username']
//        }
//      ]
//    })
//      .then(dbPostData => {
//        if (!dbPostData) {
//          res.status(404).json({ message: 'No post found with this id' });
//          return;
//        }
//        res.json(dbPostData);
//      })
//      .catch(err => {
//        console.log(err);
//        res.status(500).json(err);
//      });
//  });




//  module.exports = router;