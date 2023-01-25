const router = require('express').Router();
const { orderReceived } = require('../controllers/APIsForSellers');

// routes
router.route('/').get(orderReceived);

module.exports = router;