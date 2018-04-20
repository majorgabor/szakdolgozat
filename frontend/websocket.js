const io = require('socket.io')();

let waitingForMatchmake = [];

io.on('connection', (client) => {
    console.log('new websocket connection');
    
    client.on('joinTomatchmaking', (username) => {
        console.log(username +' connected to the matchmaking');
        const wsClient = {
            username: username,
            client: client,
        };
        waitingForMatchmake.push(wsClient);

        client.emit('matchMakingInfo', waitingForMatchmake.length);
    });

    client.on('abortMatchMakin', (username) => {
        const removeClient = {
            username: username,
            client: client,
        };
        const index = waitingForMatchmake.indexOf(removeClient);
        if(index > -1) {
            waitingForMatchmake.splice(index, 1);
            console.log(username +' leaved the matchmaking');
        } else {
            console.log('error abort matchmake');
        }
    });
    
});

const port = 8080;
io.listen(port);
console.log('listening on port ', port);