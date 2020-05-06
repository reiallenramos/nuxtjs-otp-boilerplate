const express = require('express');
const models = require('../models')
const router= express.Router();

router.post('/', async (req, res) => {
  try {
    const u = new models.User({
      email: req.body.email
    });
    await u.save();
    res.send('Created new user.')
  } catch {
    res.sendStatus(400) // bad request
  }
})

module.exports = router;