const router = require('express').Router();
const { getListOfSellers,  } = require('../controllers/APIsForBuyers');


// routes
router.route('/').get(getListOfSellers);

module.exports = router;