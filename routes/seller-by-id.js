const router = require('express').Router();
const { getSellerById  } = require('../controllers/APIsForBuyers');

// routes
router.route('/:seller_id').get(getSellerById);

module.exports = router;