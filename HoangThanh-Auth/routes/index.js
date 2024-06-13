const user = require('./users')
const admin = require('./admin');


function route(app) {
  app.use("/", user);
  app.use("/admin", admin);
}

module.exports = route