var connect = require('connect');
var serveStatic = require('serve-static');

connect()
  .use(serveStatic(__dirname))
  .listen(3000, function () {
    console.log('Server running on http://localhost:3000');
  });
