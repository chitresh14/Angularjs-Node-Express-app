const http = require('http');
const app = require("./backend/app");

const port = process.env.PORT || 3000;

app.set('port', port);

const server = http.createServer(app);

console.log("Listening to 3000")
server.listen(port);

process.on('uncaughtException', function(err) {
    console.log('Uncaught exception has been handled. Exception caught is ');
    console.log(err.toString());
    console.log(err.stack);
});