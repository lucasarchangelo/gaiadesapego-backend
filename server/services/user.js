'use strict';
var User     = require('../models/user');
const bcrypt = require('bcryptjs'),
      jwt = require('jsonwebtoken');
      
const supersecret = process.env.SUPERSECRET || 'weirdpassword2'

class UsersService {

  static newUser(req, res) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }

        const user = new User();
        user.nickname = req.body.nickname;
        user.email = req.body.email;
        user.password = hashedPassword;
  
        user.save(function(err) {
          if (err) { 
            console.log(err);
            return res.status(500).json(err);
          }
  
          return res.json({ code: 0, message: 'User created!' });
        });
      })
    })
  }

  static login(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) { 
          return res.status(500).json(err);
      }
      if(!user) {
        return res.status(500).json({code: 10, message: 'No user found / Incorrect password'})
      }
      bcrypt.compare(req.body.password, user.password, (err, valid) => {
        if (err) {
            return res.status(500).json({code: 10, message: 'No user found / Incorrect password'})
        }
        if (!valid) {
          return res.status(500).json({code: 10, message: 'No user found / Incorrect password'})
        }
        const token = jwt.sign({ id: user._id }, supersecret, { expiresIn: '7d' });
        return res.json({ id: user._id,  nickname: user.nickname, email: user.email, token: token });
        });
    });
  }

}

module.exports = UsersService;