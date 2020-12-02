const router = require('express').Router();
const { getPageNotFound } = require('../controllers/page-not-found');

router.get('*', getPageNotFound);

module.exports = router;
