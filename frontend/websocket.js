const io = require('socket.io')();

let online = [];
let matchMake = [];
let pairs = [];
let timer;
let timeOut = null;

io.on('connection', (client) => {
    online.push(client);
    console.log('new connection. %s online user', online.length);

    //join to matchmaking
    client.on('joinToMatchMaking', (username) => {
        client.username = username;
        matchMake.push(client);
        console.log('%s connected to the matchmaking. %s user waiting', client.username, matchMake.length);
        sendNumberOfWaitingUser();
        if(matchMake.length > 1 && !timeOut) {
            timeOut = setTimeout(function() {
                startMatchMakeing();
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
        timeOut = null;
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

    // do you accet the enemy (ACCEPT, DISCARD)
    client.on('battleRequestAnswer', (data) => {
        client.enemyPairIndex
        if(data) {
            if(pairs[client.enemyPairIndex].accepted) {
                pairs[client.enemyPairIndex].accepted = null;
                pairs[client.enemyPairIndex].emit('startGame', null);
                client.emit('startGame', null);
            } else {
                client.accepted = true;
            }
        } else {
            if(matchMake.length < 2) {
                clearTimeout(timeOut);
                timeOut = null;
            }

            pairs[client.enemyPairIndex].accepted = null;
            pairs[client.enemyPairIndex].emit('enemyDiscarded', null);
            
            pairs.splice(client.enemyPairIndex, 1);
            pairs.splice(pairs.indexOf(client), 1);
        }
    });

    //leave matchmaking
    client.on('leaveMatchMaking', () => {
        if(!client.username) {
            console.log('>>> exception on: leaveMatchMaking');
            return;
        }
        console.log('%s is leaving the matchmaking', client.username);
        matchMake.splice(matchMake.indexOf(client), 1);
        
        if(matchMake.length < 2) {
            clearTimeout(timeOut);
            timeOut = null;
        }
        sendNumberOfWaitingUser();
    });

    // get enemy username
    client.on('getEnemyUsername', () => {
        if(client.enemyPairIndex === null || !client.username) {
            console.log('>>> exception on: getEnemyUsername');            
            return;
        }
        if(!!pairs[client.enemyPairIndex]) {
            client.emit('enemyUsername', pairs[client.enemyPairIndex].username);
        } else {
            client.emit('enemyLeftGame', null);
        }
    });

    // player ships are set, ready for game
    client.on('shipsReady', (data) => {
        if(client.enemyPairIndex === null || !client.username) {
            console.log('>>> exception on: shipsReady');
            return;
        }
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

    // fired missile to enemy
    client.on('fireMissle', (x, y) => {
        if(client.enemyPairIndex === null || !client.username) {
            console.log('>>> exception on: fireMissle');
            return;
        }
        pairs[client.enemyPairIndex].emit('missleArrived', x, y);
    });

    // enemy ansver (MISS, HIT, SUNK) to missile
    client.on('missleArrivedResult', (result) => {
        if(client.enemyPairIndex === null || !client.username) {
            console.log('>>> exception on: missleArrivedResult');
            return;
        }
        pairs[client.enemyPairIndex].emit('youWait', result);
        client.emit('youTurn', result);
    });

    // somebody won
    client.on('gameOver', () => {
        if(client.enemyPairIndex === null || !client.username) {
            console.log('>>> exception on: gameOver');
            return;
        }
        console.log('%s won a game aginst %s', pairs[client.enemyPairIndex].username, client.username);
        pairs[client.enemyPairIndex].emit('winnerIs', pairs[client.enemyPairIndex].username);
        client.emit('winnerIs', pairs[client.enemyPairIndex].username);
    });

    //leave game
    client.on('userExit', () => {
        if(client.enemyPairIndex === null || !client.username) {
            console.log('>>> exception on: userExit');
            return;
        }
        console.log('%s left the game. his enemy was %s', client.username, pairs[client.enemyPairIndex].username);
        pairs[client.enemyPairIndex].emit('enemyLeftGame', null);
        
        pairs.splice(client.enemyPairIndex, 1);
        pairs.splice(pairs.indexOf(client), 1);
    });

    //disconnect
    client.on('disconnect', () => {
        online.splice(online.indexOf(client), 1);
        const matchMakingIndex = matchMake.indexOf(client);
        if(matchMakingIndex > -1) {
            matchMake.splice(matchMakingIndex, 1);
        }
        const pairsIndex = pairs.indexOf(client);
        if(pairsIndex > -1) {
            pairs.splice(pairsIndex, 1);
            if(!!pairs[client.enemyPairsIndex]) {
                pairs[client.enemyPairsIndex].emit('enemyLeftGame');
            }
        }
        console.log('%s dissconnected from the webserver', client.username || 'client');
    });
    
});

const port = 8080;
io.listen(port);
console.log('listening on port ', port);