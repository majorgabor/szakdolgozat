import $ from 'jquery';
import Position from '../enums/position.js';

export let shipArray = [];
export let enemyArea = [];

for(let i = 0; i < 10; i++) {
    shipArray[i] = [];
    enemyArea[i] = [];
    for(let j = 0; j < 10; j++) {
        shipArray[i][j] = null;
        enemyArea[i][j] = null;
    }
}

let placeinfShipId = 2;
const shipSize = [null, 1, 1, 2, 2, 3, 4, 5];

export function isPlacebal(x, y, orientation){
    if(placeinfShipId === 0) {
        return false;
    }
    const length = shipSize[placeinfShipId];
    if(orientation === Position.vertical){
        if(x > 10-length) return false;
        if(y > 0){
            for(let i = 0; i < length; i++){
                if(shipArray[x+i][y-1]) return false;
            }    
        }
        if(x > 0){
            if(shipArray[x-1][y]) return false;            
        } 
        for(let i = 0; i < length; i++){
            if(shipArray[x+i][y]) return false;
        }
        if(x+length < 10){
            if(shipArray[x+length][y]) return false;            
        } 
        if(y < 9){
            for(let i = 0; i < length; i++){
                if(shipArray[x+i][y+1]) return false;
            }    
        }
    } else if(orientation === Position.horisontal) {
        if(y > 10-length) return false;
        if(x > 0){
            for(let i = 0; i < length; i++){
                if(shipArray[x-1][y+i]) return false;
            }    
        }
        if(y > 0){
            if(shipArray[x][y-1]) return false;            
        }
        for(let i = 0; i < length; i++){
            if(shipArray[x][y+i]) return false;
        }
        if(y+length < 10){
            if(shipArray[x][y+length]) return false;            
        } 
        if(x < 9){
            for(let i = 0; i < length; i++){
                if(shipArray[x+1][y+i]) return false;
            }    
        }
    } else {
        return false;
    }
    return true;
}

export function markShip(x, y, orientation) {
    const length = shipSize[placeinfShipId];
    const type = placeinfShipId;
    if(orientation === Position.vertical){
        for(let i = 0; i < length; i++){
            shipArray[x+i][y] = type;
            $('#myShips').find('[data-x='+ (x+i) +'][data-y='+ y +']').addClass('ship');
        }
    } else if(orientation === Position.horisontal){
        for(let i = 0; i < length; i++){
            shipArray[x][y+i] = type;            
            $('#myShips').find('[data-x='+ x +'][data-y='+ (y+i) +']').addClass('ship');
        }
    }
    if(placeinfShipId === 7) {
        $('#reset').prop("disabled", false);
    }
    if(placeinfShipId === 1) {
        $('#ready').prop("disabled", false);
    }
    placeinfShipId--;
}

export function shipIndicator(x, y, orientation, isValid) {
    const length = shipSize[placeinfShipId];
    if(orientation === Position.vertical){
        for(let i = 0; i < length; i++){
            const $_this = $('#myShips').find('[data-x='+ (x+i) +'][data-y='+ y +']');
            if(isValid) {
                if($_this.hasClass('shipIsPlaceable')) {
                    $_this.removeClass('shipIsPlaceable');
                } else {
                    $_this.addClass('shipIsPlaceable');
                }
            } else {
                if($_this.hasClass('shipNotPlaceable')) {
                    $_this.removeClass('shipNotPlaceable');
                } else {
                    $_this.addClass('shipNotPlaceable');
                }
            }
        }
    } else if(orientation === Position.horisontal){
        for(let i = 0; i < length; i++){
            const $_this = $('#myShips').find('[data-x='+ x +'][data-y='+ (y+i) +']');           
            if(isValid) {
                if($_this.hasClass('shipIsPlaceable')) {
                    $_this.removeClass('shipIsPlaceable');
                } else {
                    $_this.addClass('shipIsPlaceable');
                }
            } else {
                if($_this.hasClass('shipNotPlaceable')) {
                    $_this.removeClass('shipNotPlaceable');
                } else {
                    $_this.addClass('shipNotPlaceable');
                }
            }
        }
    }
}

export function resetTable() {
    $('#reset').prop("disabled", true);
    $('#ready').prop("disabled", true);
    placeinfShipId = 2;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            shipArray[i][j] = null;
            enemyArea[i][j] = null;
            $('.fieldCell[data-x='+ i +'][data-y='+ j +']').removeClass('ship');
            $('.fieldCell[data-x='+ i +'][data-y='+ j +']').removeClass('miss');
            $('.fieldCell[data-x='+ i +'][data-y='+ j +']').removeClass('hit');
        }
    }
    console.log('reset');
}

export function randomShips() {
    resetTable();
    let orientation, x, y;
    while(placeinfShipId > 0){
        if(Math.random() >= 0.5){
            orientation = Position.horisontal;
        } else {
            orientation = Position.vertical;
        }
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        if(isPlacebal(x, y, orientation)){
            markShip(x, y, orientation);
        }
    }
}

export function validFire(x, y) {
    return !enemyArea[x][y];
}

export function markFiredMissleResult(x, y, result) {
    enemyArea[x][y] = result.toLowerCase();
}

export function isShipSank(shipId) {
    let result = true;
    let i = 0;
    while(i < 10 && result) {
        result = shipArray[i].indexOf(shipId) > -1 ? false : true; 
        i++;
    }
    return result;
}

export function isGameOver() {
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            if(Number.isInteger(shipArray[i][j])) {
                return false;
            }
        }
    }
    return true;
}