const mariadb = require('mariadb');

let connection = null;

mariadb.createConnection({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASS })
.then(conn => {
  console.log('DB connection established!');
  connection = conn;

  conn.query("select 1", [2])
    .then(rows => {
      console.log(rows); // [{ "1": 1 }]
      conn.end();
    })
    .catch(err => {
      console.log('DB query error', err);
    });
})
.catch(err => {
  console.log('DB connection error', err);
});

module.exports = connection;
