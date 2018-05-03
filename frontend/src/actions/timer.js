import $ from 'jquery';


export let timer = null;

export function mainTimerFunc(totalTime, whereToPrint, callbackFunction) {
    let counter = (function () {
        let x = totalTime;
        return function () {
            return x -= 1;
        };
    })();
    $("#" + whereToPrint).text('You have '+totalTime+' seconds left.');
    timer = setInterval(function () {
        let timeLeft = counter();
        // console.log(timeLeft);
        $("#" + whereToPrint).text('You have '+timeLeft+' seconds left.');
        if (timeLeft === 0) {
            clearInterval(timer);
            callbackFunction();
        }
    }, 1000);
}
