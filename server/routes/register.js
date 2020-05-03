const express = require('express');
const db = require('../db')

const router= express.Router();

router.post('/', (req, res) => {
  db.addUser(req.body.email);
  res.send('Created new user.')
})

module.exports = router;