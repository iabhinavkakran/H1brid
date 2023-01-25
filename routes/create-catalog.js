const router = require('express').Router();
const { createCatalog  } = require('../controllers/APIsForSellers');

// routes
router.route('/').post(createCatalog);

module.exports = router;