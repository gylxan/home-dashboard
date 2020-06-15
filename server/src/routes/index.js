const router = require('express').Router();
const projectRoutes = require('./projects');

// Define routes to use
router.use('/projects', projectRoutes);

module.exports = router;