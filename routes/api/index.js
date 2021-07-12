// Setting up server to test user-routes.js and post-routes.js

const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;
