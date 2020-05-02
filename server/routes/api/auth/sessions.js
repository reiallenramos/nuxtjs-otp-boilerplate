const express = require('express');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const mailer = require('../../../util/email')

dotenv.config();

const router= express.Router();

const accessTokenSecret = process.env.TOKEN_SECRET;

function generateAccessToken(payload) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(payload, accessTokenSecret, { expiresIn: '1800s' });
}

const defaultOTP = '111111';

const users = [
  {
    email: 'reiallenramos@gmail.com',
  },
  {
    email: 'admin@admin.com',
  },
  {
    email: 'iscovid19over@gmail.com'
  },
  {
    email: 'rei.ramos@obf.ateneo.edu'
  }
]

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.post('/', (req, res) => {
  const { email, otp } = req.body;
  if (otp === defaultOTP) {
    const user = users.find(u => { return u.email === email });
    if (user) {
      const token = generateAccessToken({ email: email })
      res.json({ token });
    } else {
      res.send('User not found. Please register')
    }
  } else {
    res.send('Incorrect OTP');
  }
})

router.get('/user', authenticateJWT, (req, res) => {
  const { email } = req.user;
  const user = users.find(u => { return u.email === email});
  res.send({
    user: {
      email: user.email
    }
  })
})

router.post('/generateOTP', (req, res) => {
  mailer.sendOTP(req.body.email);
  res.send('OTP sent to email')
})

router.delete('/', (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(token => t !== token);

  res.send("Logout successful");
})

module.exports = router;