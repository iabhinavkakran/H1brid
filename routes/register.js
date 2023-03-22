const router = require('express').Router();
const {registerUser} = require('../controllers/AuthAPIs');


// routes
router.route('/').post(registerUser);

module.exports = router;