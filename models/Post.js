const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Post model
class Post extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
            'vote_count'
          ]
        ],
        include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      });
    });
  }
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
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;























// // Create Post Model

// // connection to MySQL we stored in the connection.js file. 
// const { Model, DataTypes } = require('sequelize');
// // Model and Datatypes we'll use from the sequelize package.
// const sequelize = require('../config/connection');

// // create our Post model
// class Post extends Model {}

// // Now we will define the columns in the Post, configure the naming conventions, and pass the current connection instance to initialize the Post model.

// // create fields/columns for Post model
// Post.init(
//     {
//         //define the Post schema
//       id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       //define the title column as a String value
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       //Then we include the post_url field, which is also defined as a String
//       post_url: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           isURL: true
//         }
//       },
//       //this column determines who posted the news article. Using the references property, we establish the relationship between this post and the user by creating a reference to the User model, specifically to the id column that is defined by the key property, which is the primary key. The user_id is conversely defined as the foreign key and will be the matching link.
//       user_id: {
//         type: DataTypes.INTEGER,
//         references: {
//           model: 'user',
//           key: 'id'
//         }
//       }
//     },
//     {
//     //In the second parameter of the init method, we configure the metadata, including the naming conventions.
//       sequelize,
//       freezeTableName: true,
//       underscored: true,
//       modelName: 'post'
//     }
//   );

//   //Lastly, we must include the export expression to make the Post model accessible to other parts of the application.
//   module.exports = Post;