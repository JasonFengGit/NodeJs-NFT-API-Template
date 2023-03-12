const express = require('express');

const mint = require('./mint');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello Instap API V1',
  });
});

router.use('/mint', mint);

module.exports = router;
