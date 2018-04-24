import $ from 'jquery';


export let counter = null;

export function mainCounter(totalTime, whereToPrint, callbackFunction) {
    let timer = (function () {
        let x = totalTime;
        return function () {
            return x -= 1;
        };
    })();
    $("#" + whereToPrint).text('You have '+totalTime+' seconds left.');
    counter = setInterval(function () {
        let timeLeft = timer();
        console.log(timeLeft);
        $("#" + whereToPrint).text('You have '+timeLeft+' seconds left.');
        if (timeLeft === 0) {
            clearInterval(counter);
            callbackFunction();
        }
    }, 1000);
}
