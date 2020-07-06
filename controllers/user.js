const users = require('../data/user');

exports.home = (req, res) => {
  let username = req.session.username;
  if (username == undefined) {
    return res.redirect('/login');
  }
  else {
    // console.log(users);
    username = username.toUpperCase();
    return res.render('user', { username: username, users: users.fetch(),});
  }
}

exports.login = (req, res) => {
  let username = req.body.username;
  if (username == undefined) {
    return res.render('login', {hasMessage: false});
  }
  else {
    username = username.toUpperCase();
    if (users.search(username)) {
      let message = `User with username ${username} already exists.`;
      return res.render('login', { hasMessage: true, message: message });
    }
    else {
      users.login(username);
      req.session.username = username;
      return res.redirect('/');
    }
  }
};

exports.logout = (req, res) => {
  let username = req.session.username;
  if (username != undefined) {
    users.logout(username);
  }
  return res.redirect('/login');
} 