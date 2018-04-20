import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8080');

export function joinToMatchMaking(username) {
    socket.emit('joinTomatchmaking', username);
    socket.on('matchMakingInfo', function(x) {
        console.log('>>>', x);
    });
}

export function abortMatchMaking(username) {
    socket.emit('abortMatchMakin', username);
    
}
