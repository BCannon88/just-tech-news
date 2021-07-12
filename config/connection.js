// New Connection to database
const Sequelize = require('sequelize');

require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;














// // import the Sequelize constructor from the library
// const Sequelize = require('sequelize');

// require('dotenv').config();

// // create connection to our db
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//   host: 'localhost',
//   dialect: 'mysql',
//   port: 3306
// });

// module.exports = sequelize;










// ORIGINAL WAY TO SET UP A CONNECTION TO THE DATABASE! MODULE 13.1.4
// // create connection to our database, pass in your MySQL information for username and password
// const sequelize = new Sequelize('just_tech_news_bd', 'root', 'Stardestroyer88', {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
// });