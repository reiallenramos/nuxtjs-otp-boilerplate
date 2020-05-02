const express = require('express');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const mailer = require('../../../util/email')
const otp = require('../../../util/otp')
const redis = require('../../../redis')

dotenv.config();

const router= express.Router();

const accessTokenSecret = process.env.TOKEN_SECRET;

function generateAccessToken(payload) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(payload, accessTokenSecret, { expiresIn: '1800s' });
}

const defaultOTP = '111111';
const OTP_DURATION = 5 * 60;

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
  });
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
  let email = req.body.email;
  let otpObject = otp.generate();
  mailer.sendOTP(email, otpObject);
  redis.otpClient.set(
    email,
    JSON.stringify(otpObject),
    'EX',
    OTP_DURATION
    );
  res.send('OTP sent to email')
})

router.delete('/', (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(token => t !== token);

  res.send("Logout successful");
})

module.exports = router;