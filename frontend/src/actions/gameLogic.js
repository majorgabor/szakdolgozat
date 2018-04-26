import $ from 'jquery';

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

let placeinfShipId = 7;
const shipSize = [null, 1, 1, 2, 2, 3, 4, 5];

let shoots = [];

export function isPlacebal(x, y, orientation){
    if(placeinfShipId === 0) {
        return false;
    }
    const length = shipSize[placeinfShipId];
    if(orientation === 'vertical'){
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
    } else if(orientation === 'horisontal') {
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

export function markShip(x, y, orientation){
    const length = shipSize[placeinfShipId];
    const type = placeinfShipId;
    if(orientation === 'vertical'){
        for(let i = 0; i < length; i++){
            shipArray[x+i][y] = type;
            $('#myShips').find('[data-x='+ (x+i) +'][data-y='+ y +']').addClass('ship');
        }
    } else if(orientation === 'horisontal'){
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

export function resetTable() {
    $('#reset').prop("disabled", true);
    $('#ready').prop("disabled", true);    
    placeinfShipId = 7;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            shipArray[i][j] = null;
            $('#myShips').find('[data-x='+ i +'][data-y='+ j +']').removeClass('ship');
        }
    }
}

export function randomShips() {
    resetTable();
    let orientation, x, y;
    while(placeinfShipId > 0){
        if(Math.random() >= 0.5){
            orientation = 'horisontal';
        } else {
            orientation = 'vertical';
        }
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        if(isPlacebal(x, y, orientation)){
            markShip(x, y, orientation);
        }
    }
}

export function validFire(x, y) {
    return !(shoots.indexOf(10*x+y) > -1);
}

export function markFiredMissle(x, y) {
    shoots.push(10*x+y);
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
            if(!!shipArray[i][j]) {
                return false;
            }
        }
    }
    return true;
}