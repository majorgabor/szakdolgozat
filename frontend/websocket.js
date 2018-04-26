const io = require('socket.io')();

let online = [];
let matchMake = [];
let pairs = [];
let timer;
let timeOut = null;

io.on('connection', (client) => {
    online.push(client);
    // console.log('new connection. %s online user', online.length);
    console.log('online + = %s', online.length);

    //join to matchmaking
    client.on('joinToMatchMaking', (username) => {
        clearTimeout(timeOut);
        timeOut = null;
        client.username = username;
        matchMake.push(client);
        // console.log('%s connected to the matchmaking. %s user waiting', client.username, matchMake.length);
        console.log('pairs + %s = %s', client.username, matchMake.length);
        sendNumberOfWaitingUser();
        console.log('timeOut=', timeOut);
        if(matchMake.length === 2 && !timeOut) {
            timeOut = setTimeout(function() {
                startMatchMakeing();
                console.log('----timeout----');
            }, 3000);
        }
    });

    function sendNumberOfWaitingUser() {
        matchMake.forEach(matchMakeClient => {
            matchMakeClient.emit('numberOfWaitingUser', matchMake.length);
        });
    }

    function startMatchMakeing() {
        console.log('start match making');        
        while(matchMake.length >= 2) {
            const firstIndex = Math.floor(Math.random() * matchMake.length);
            const secondIndex = Math.floor(Math.random() * matchMake.length);
            if(firstIndex !== secondIndex) {
                console.log('pair found. %s and %s', matchMake[firstIndex].username, matchMake[secondIndex].username);
                
                matchMake[firstIndex].enemyPairIndex = pairs.push(matchMake[secondIndex]) -1;
                matchMake[secondIndex].enemyPairIndex = pairs.push(matchMake[firstIndex]) -1;

                matchMake[firstIndex].emit('enemyFound', matchMake[secondIndex].username);
                matchMake[secondIndex].emit('enemyFound', matchMake[firstIndex].username);
                
                matchMake.splice(matchMake.indexOf(matchMake[firstIndex]), 1);
                matchMake.splice(matchMake.indexOf(matchMake[secondIndex]), 1);
            }
        }
        console.log('end of match making %s', matchMake.length);
    }

    client.on('battleRequestAnswer', (data) => {
        if(data) {
            if(pairs[client.enemyPairIndex].accepted) {
                pairs[client.enemyPairIndex].accepted = null;
                pairs[client.enemyPairIndex].emit('startGame', null);
                client.emit('startGame', null);
            } else {
                client.accepted = true;
            }
        } else {
            pairs[client.enemyPairIndex].accepted = false;
            pairs[client.enemyPairIndex].emit('enemyDiscarded', null);
            
            pairs.splice(client.enemyPairIndex, 1);
            pairs.splice(pairs.indexOf(client), 1);
        }
    });

    client.on('getEnemyUsername', () => {
        if(!!pairs[client.enemyPairIndex]) {
            client.emit('enemyUsername', pairs[client.enemyPairIndex].username);
        } else {
            client.emit('enemyLeftGame', null);
        }
    });


    client.on('shipsReady', (data) => {
        if(pairs[client.enemyPairIndex].shipsReady) {
            pairs[client.enemyPairIndex].shipsReady = null;
            if(Math.random() >= 0.5) {
                pairs[client.enemyPairIndex].emit('youTurn', null);
                client.emit('youWait', null);
            } else {
                pairs[client.enemyPairIndex].emit('youWait', null);
                client.emit('youTurn', null);
            }
        } else {
            client.shipsReady = true;
        }
    });

    client.on('fireMissle', (x, y) => {
        pairs[client.enemyPairIndex].emit('missleArrived', x, y);
    });

    client.on('missleArrivedResult', (result) => {
        pairs[client.enemyPairIndex].emit('youWait', result);
        client.emit('youTurn', result);
    });

    client.on('gameOver', () => {
        pairs[client.enemyPairIndex].emit('winnerIs', pairs[client.enemyPairIndex].username);
        client.emit('winnerIs', pairs[client.enemyPairIndex].username);
    });

    //leave game
    client.on('userExit', () => {
        console.log('%s left the game. his enemy was %s', client.username, pairs[client.enemyPairIndex].username);
        pairs[client.enemyPairIndex].emit('enemyLeftGame', null);
        
        pairs.splice(client.enemyPairIndex, 1);
        pairs.splice(pairs.indexOf(client), 1);
    });

    //leave matchmaking
    client.on('leaveMatchMaking', () => {
        // console.log('%s is leaving the matchmaking', client.username);
        matchMake.splice(matchMake.indexOf(client), 1);
        console.log('pairs - %s = %s', client.username, matchMake.length);
        if(matchMake.length < 2) {
            clearTimeout(timeOut);
            timeOut = null;
            console.log('--timeout-clear--');
        }
        sendNumberOfWaitingUser();
    });


    //disconnect
    client.on('disconnect', () => {
        online.splice(online.indexOf(client), 1);
        const matchMakingIndex = matchMake.indexOf(client);
        if(matchMakingIndex > -1) {
            matchMake.splice(matchMakingIndex, 1);
        }
        console.log('client dissconnected %s', client.username);
    });
    
});

const port = 8080;
io.listen(port);
console.log('listening on port ', port);