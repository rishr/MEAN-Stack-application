var socket = require('socket.io');
let connCount = 0;

module.exports = (server, app) => {
    let io = socket(server);

    io.on('connect', () => {
        app.locals.currentConnectedCount = connCount;
    });

    io.on('connection', (socket) => {

        socket.on('addUser', (userData) => {
            // store the username in the socket session for this client
            socket.username = userData.username;
            // store the room name in the socket session for this client
            socket.room = userData.roomName;

            // send client to room 1
            socket.join(userData.roomName);
            // echo to client they've connected
            connCount += 1;
            let resData = {
                username: userData.username,
                updatedCount: connCount
            }
            socket.emit('updateCount', resData);
        });

        socket.on('disconnect', () => {
            connCount -= 1;
            app.locals.currentConnectedCount = connCount;
        })
        // Read a message from the chat emitter
        socket.on('chat', (data) => {
            // Emit the message to all connected sockets
            io.sockets.emit('chat', data);
        });
        socket.on('typing', (data) => {
            // Broadcast the typing message
            socket.broadcast.emit('typing', data);
        });
        socket.on('collab', (data) => {
            socket.broadcast.emit('collab', data);
        });
    });
}