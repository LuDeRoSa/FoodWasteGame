const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

//github callback if using github OAUTH
router.get('/github/callback', async (req, res, next) => {
  //User.authenticateGithub will attempt to use code to find a user in our system.
  //if successful, a jwt token will be returned
  //that token will be set in localStorage
  //and client will redirect to home page
  try {
    res.send(
      `
      <html>
      <body>
        <script>
        window.localStorage.setItem('token', '${await User.authenticateGithub(
          req.query.code
        )}');
        window.document.location = '/';
        </script>
      </body>
      </html>
      `
    );
  } catch (ex) {
    next(ex);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

router.post('/facebook', async (req, res, next) => {
  try {
<<<<<<< HEAD
    res.send({ token: await User.authenticateFb(req.body) });
=======
    res.send({ token: await User.fbAuthenticate(req.body) });
>>>>>>> a57d308523aaf3b74beb6fece327a9cd493779c7
  } catch (err) {
    next(err);
  }
});
