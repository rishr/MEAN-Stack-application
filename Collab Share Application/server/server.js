const dotenv = require('dotenv').config();
module.exports = (function () {
    const http = require('http'); // Require the http interface
    const app = require('./app'); // Require a js module defined in the file called app.js

    const port = process.env.PORT || 9090; // Pass env variable for port no. If not passed, use default as 3000

    const server = http.createServer(app); // Create a server using the app module required above
    server.listen(port, () => {
        console.log("Listening to port 9090");
        require('./api/controller/socketController')(server, app);
    }); // Port number listener
}());