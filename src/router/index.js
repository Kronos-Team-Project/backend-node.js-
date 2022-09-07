const router = require('express')();

const board = require('./board');

router.use("/board", board);

module.exports = router;