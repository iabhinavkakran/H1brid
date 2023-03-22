const router = require('express').Router();
const { createOrderById  } = require('../controllers/APIsForBuyers');


// routes
router.route('/:seller_id').post(createOrderById);

module.exports = router;