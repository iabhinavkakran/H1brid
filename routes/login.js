const router = require('express').Router();
const {loginUser} = require('../controllers/AuthAPIs');


// routes
router.route('/').post(loginUser);

module.exports = router;