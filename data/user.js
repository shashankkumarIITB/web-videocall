var users = [];

var Users = {
  search: (username) => {
    return users.includes(username);
  },
  login: (username) => {
    users.push(username);
  },
  logout: (username) => {
    users = users.filter((e) => {return e !== username});
  },
  print: () => {
    users.map((e) => console.log(e));
  },
  fetch: () => {
    return users;
  },
}

module.exports = Users;
