const express = require('express');
const passport = require('passport');
const UserModel = require('../../models/UserModel');
const middlewares = require('../middlewares');

const router = express.Router();

function redirectIfLogged(req, res, next) {
  if (req.user) return res.redirect('/users/account');
  return next();
}

module.exports = (params) => {
  const { avatars } = params;
  router.get('/login', redirectIfLogged, (req, res) => res.render('users/login', { error: req.query.error }));

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login?error=true',
  }));

  router.get('/registration', redirectIfLogged, (req, res) => res.render('users/registration', { success: req.query.success }));

  router.get('/logout', (req, res) => {
    req.logout();
    return res.redirect('/');
  });

  router.post('/registration',
    middlewares.upload.single('avatar'),
    middlewares.handleAvatar(avatars),
    async (req, res, next) => {
      try {
        const user = new UserModel({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
        if (req.file && req.file.storedFilename) {
          user.avatar = req.file.storedFilename;
        }
        const savedUser = await user.save();

        if (savedUser) return res.redirect('/users/registration?success=true');
        return next(new Error('Failed to save user!'));
      } catch (err) {
        if (req.file && req.file.storedFilename) {
          await avatars.delete(req.file.storedFilename);
        }
        return next(err);
      }
    });

  router.get('/account', (req, res, next) => {
    if (req.user) return next();
    return res.status(401).end();
  }, (req, res) => res.render('users/account', { user: req.user }));

  router.get('/avatar/:filename', (req, res) => {
    res.type('png');
    return res.sendFile(avatars.filepath(req.params.filename));
  });

  router.get('/avatartn/:filename', async (req, res) => {
    res.type('png');
    const tn = await avatars.thumbnail(req.params.filename);
    return res.end(tn, 'binary');
  });

  return router;
};
