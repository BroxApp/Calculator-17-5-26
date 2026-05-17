const display = document.getElementById('display');
let shouldResetScreen = false;

function appendToDisplay(input) {
    if (shouldResetScreen) {
        shouldResetScreen = false;
        if (!['+', '-', '*', '/', '%'].includes(input)) {
            display.value = input;
            return;
        }
    }

    if (display.value === "0" || display.value === "Error") {
        display.value = input;
    } else {
        display.value += input;
    }
}

function clearDisplay() {
    display.value = "0";
    shouldResetScreen = false;
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9]/.test(key) || ['+', '-', '*', '/', '%'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        display.value = display.value.slice(0, -1) || "0";
    }
});


function calculateResult() {
    try {
        // Note: eval is not recommended for production, but it's fine for learning.
        let expression = display.value;

        expression = expression.replace(/(\d+\.?\d*)\s*([\+\-])\s*(\d+\.?\d*)%/g, '$1$2($1*$3/100)');
        
        expression = expression.replace(/%/g, '/100');

        display.value = eval(expression);
        shouldResetScreen = true;
    } catch (e) {
        display.value = "Error";
        shouldResetScreen = true;
    }
}