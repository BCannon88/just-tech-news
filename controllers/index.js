// This file is meant to collect the packaged API routes

const router = require('express').Router();
const homeRoutes = require('./home-routes.js');

const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;