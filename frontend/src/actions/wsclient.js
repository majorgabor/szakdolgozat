import openSocket from 'socket.io-client';
import $ from 'jquery';

import { counter, mainCounter } from './timer.js';
import { shipArray, isShipSank, isGameOver } from './gameLogic.js';

export const socket = openSocket('http://localhost:8080');

export function joinToMatchMaking(username) {
    return () => {
        socket.emit('joinToMatchMaking', username);
        $('.closeModal').hide();
        $('#battleRequest').hide();
        $('#matchmakingModal-footer').text('Waiting for enemy.');
    }
}

export function battleRequestAnswer(answer, username) {
    return () => {
        socket.emit('battleRequestAnswer', answer);
        $('#battleRequest').prop('disable', true);
        clearInterval(counter);
        if(!answer) {
            discarded(username);
        }
    }
}

export function abortMatchMaking() {
    socket.emit('abortMatchMaking', null);
}

socket.on('numberOfWaitingUser', (data) => {
    $('#numberOfWaitingUser').text('There are '+data+' other player waiting for matchmaking.');
});

socket.on('enemyFound', (data) => {
    $('#abortMatchMaking').hide();
    $('#battleRequest').show();
    $('#enemy').html('Your enemy is <strong>'+data+'</strong><br/>Do you accept the battle?');
    mainCounter(10, 'matchmakingModal-footer', () => {
        battleRequestAnswer(false);
    });
});

socket.on('enemyDiscarded', (data) => {
    clearInterval(counter);    
    discarded(data);
    $('#matchmakingModal-footer').text('Your enemy has discarded the battle. Waiting for enemy.');
});

function discarded(username) {
    $('#abortMatchMaking').show();
    joinToMatchMaking(username)();
}


export function shipsReady() {
    socket.emit('shipsReady', null);
}

socket.on('youTurn', (data) => {
    $('#gameInfo-text').text('You turn. Fire on the battlefield!');
    $('#gameModal-body').text('You turn. Get ready!');
    setTimeout(function() {
        $("#close-gameModal").click();
    }, 2000);
    if(!!data) {
        switch(data) {
            case 'MISS':
                $('#gameModal-body').html('<p>The enemy <strong>missed</strong> your ships.</p>');
                break;
            case 'HIT':
                $('#gameModal-body').html('<p>The enemy <strong>hit</strong> your ship.</p>');
                break;
            case 'SANK':
                $('#gameModal-body').html('<p>The enemy <strong>hit</strong> your ship and it <strong>sank</strong>.</p>');
                break;
        }
    }
});

socket.on('youWait', (data) => {
    $('#gameInfo-text').text('Your enemy turn. Wait!');
    $('#gameModal-body').text('You enemy turn. Please wait!');
    if(!!data) {
        $('#gameModalButton').click();
        switch(data) {
            case 'MISS':
                $('#gameModal-body').html('<p>Your missle <strong>missed</strong>.</p>');
                break;
            case 'HIT':
                $('#gameModal-body').html('<p>Your missle <strong>hit</strong> an enemy ship.</p>');
                break;
            case 'SANK':
                $('#gameModal-body').html('<p>Your missle <strong>hit</strong> and the ship <strong>sank</strong>.</p>');
                break;
        }
    }
});

export function fireMissle(x, y) {
    socket.emit('fireMissle', {x, y});
}

socket.on('missleArrived', (data) => {
    const shipId = shipArray[data.x][data.y];
    let result = 'MISS';
    if(!!shipId) {
        result = 'HIT';
        shipArray[data.x][data.y] = null;
        if(isShipSank(shipId)) {
            result = 'SANK';
            if(isGameOver()) {
                socket.emit('gameOver', null);
                return;
            }
        }
    }
    socket.emit('missleArrivedResult', result);
});

export function userExit() {
    socket.emit('userExit', null);
}