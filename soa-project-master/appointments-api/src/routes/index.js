const router = require('express').Router();
const bookRoute = require('./api');

router.use('/appointment', bookRoute);
module.exports = router;
