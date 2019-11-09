const app = require('./app');
const http = require('http').createServer(app);

const port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = http;
