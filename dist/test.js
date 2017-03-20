'use strict';

var bcrypt = require('bcrypt');
var User = require('./server/models/index.js').User;
var Role = require('./server/models/index.js').Role;

var newUser = {};
newUser.name = 'TUgonnaP';
newUser.email = 'johnhg@doe.com';
newUser.password = 'sugar';
newUser.password_confirmation = 'sugar';
newUser.role_id = 1;

User.create(newUser).then(function (user) {
  console.log(user);
});

// User.findOne({where: {id: 1}}).then((user) => {

// });
// var user = User.findOne({where: {id: 1}}).then((user) => {
//   // console.log(user.getRole());
//   // console.log(user);
//   user.getRole().then((role) => {
//     console.log(role);
//   });
// });

// console.log(user);

// var a = bcrypt.hashSync('password', 10);

// console.log(a);

// var b = bcrypt.compareSync('password1', a);

// console.log(b);