const express = require('express');
const jwt = require('jsonwebtoken');
const mailer = require('../../../util/email')
const otp = require('../../../util/otp')
const redis = require('../../../redis')
const config = require('../../../config')
const db = require('../../../db')

const router= express.Router();

function generateAccessToken(payload) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1800s' });
}

const defaultOTP = '111111';

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.JWT_SECRET, (err, user) => {
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
  redis.otpClient.get(email, (redisGetError, otpString) => {
    if (redisGetError) {
      console.log(`Error retrieving OTP:\t${redisGetError}`)
      res.serverError(
        jsonMessage('Error retrieving OTP. Please try again later.')
      )
      return
    }

    if (!otpString) {
      res.unauthorized(jsonMessage('OTP expired/not found.'))
      return
    }

    let isOTPValidated = otp == JSON.parse(otpString);

    if (isOTPValidated) {
      db.findDocuments('users_directory', (users) => {
        const user = users.find(u => { return u.email === email });
        if (user) {
          const token = generateAccessToken({ email: email })
          res.json({ token });
        } else {
          res.send('User not found. Please register')
        }
      })
    } else {
      res.send('Incorrect OTP');
    }
  });
})

router.get('/user', authenticateJWT, (req, res) => {
  const { email } = req.user;
  db.findDocuments('users_directory', (users) => {
    const user = users.find(u => { return u.email === email});
    res.send({
      user: {
        email: user.email
      }
    })
  });
})

router.post('/generateOTP', (req, res) => {
  let email = req.body.email;
  let otpObject = otp.generate();
  mailer.sendOTP(email, otpObject);
  redis.otpClient.set(
    email,
    JSON.stringify(otpObject),
    'EX',
    config.OTP_DURATION
    );
  res.send('OTP sent to email')
})

router.delete('/', (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(token => t !== token);

  res.send("Logout successful");
})

module.exports = router;