const express = require('express');
const jwt = require('jsonwebtoken');
const mailer = require('../../../util/email')
const otp = require('../../../util/otp')
const redis = require('../../../redis')
const config = require('../../../config')
const models = require('../../../models')

const router= express.Router();

function generateAccessToken(payload) {
  // expires after half an hour (1800 seconds = 30 minutes)
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1800s' });
}

const defaultOTP = config.DEFAULT_OTP;
const isAdmin = (email, otp) => {return email == 'admin@admin.com' && otp == defaultOTP }

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
    res.sendStatus(401); // unauthorized
  }
};

router.post('/', (req, res) => {
  const { email, otp } = req.body;

  if (isAdmin(email, otp)) {
    const token = generateAccessToken({ email: email })
    res.json({ token });
  } else {
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
        const token = generateAccessToken({ email: email })
        res.json({ token });
      } else {
        res.sendStatus(400); // bad request
      }
    });
  }
})

router.get('/user', authenticateJWT, (req, res) => {
  const { email } = req.user;

  models.User.findByEmail(email).then(user => {
    if(user) {
      res.send({
        user: {
          email: user.email
        }
      })
    } else {
      res.sendStatus(404) // user not found
    }
  })
})

router.post('/generateOTP', (req, res) => {
  let email = req.body.email;

  if (isAdmin(email, otp)) {
    res.send('ok');
  } else {
    models.User.findByEmail(email).then(user => {
      if (user) {
        let otpObject = otp.generate();
        mailer.sendOTP(email, otpObject);
        redis.otpClient.set(
          email,
          JSON.stringify(otpObject),
          'EX',
          config.OTP_DURATION
        );
        res.send('OTP sent to email')
      } else {
        res.sendStatus(404) // record not found
      }
    })
  }
})

router.delete('/logout', (req, res) => {
  // no need to do anything here. Just delete the token in the browser
  res.send({ message: 'ok' })
})

module.exports = router;