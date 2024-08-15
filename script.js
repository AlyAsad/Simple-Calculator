let runningTotal = 0;
let buffer = "0";
let previousOperator;
let prevNum = 0;
let equals = false;


const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    }
    
    else {
        if (equals) reset();
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch(symbol) {
        case 'AC':
            reset();
            break;
        
        case '=':
            if (equals) {
                flushOperation(parseInt(prevNum));
                buffer = runningTotal.toString();
            }
            else {
                equals = true;
                prevNum = parseInt(buffer);
                flushOperation(parseInt(buffer));
                buffer = runningTotal.toString();
            }
            break;
        
        case '←':
            if (equals) {
                runningTotal = 0;
                previousOperator = null;
                equals = false;
            }
            if (buffer.length === 1) {
                buffer = '0';
            }
            else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        
        default:
            if (equals) {
                runningTotal = 0;
                previousOperator = null;
                equals = false;
            }
            handleMath(symbol);
            break;
    }
}

function reset() {
    buffer = '0';
    runningTotal = 0;
    previousOperator = null;
    let prevNum = 0;
    equals = false;
}


function handleMath(symbol) {
    const intBuffer = parseInt(buffer);
    
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    }
    else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    }
    else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    }
    else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    }
    else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}


function handleNumber(numberString) {
    
    if (buffer === '0')
        buffer = numberString;
    
    else
        buffer += numberString;
    
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();