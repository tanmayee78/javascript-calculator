const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('input');

let currentValue = '';
let previousValue = '';
let operator = null;

function updateDisplay(value) {
  display.value = value || '0';
}

function clearAll() {
  currentValue = '';
  previousValue = '';
  operator = null;
  updateDisplay('');
}

function deleteLast() {
  currentValue = currentValue.slice(0, -1);
  updateDisplay(currentValue);
}

function calculate() {
  const num1 = parseFloat(previousValue);
  const num2 = parseFloat(currentValue);

  if (isNaN(num1) || isNaN(num2)) return;

  let result = 0;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
    case '%':
      result = num1 % num2;
      break;
    default:
      return;
  }

  currentValue = result.toString();
  operator = null;
  previousValue = '';
  updateDisplay(currentValue);
}

function handleNumberInput(value) {
  if (value === '.' && currentValue.includes('.')) return;
  currentValue += value;
  updateDisplay(currentValue);
}

function handleOperatorInput(op) {
  if (currentValue === '') return;

  if (previousValue !== '') {
    calculate(); 
  }

  operator = op;
  previousValue = currentValue;
  currentValue = '';
}


function handleSpecialInput(value) {
  switch (value) {
    case '1/x':
      currentValue = (1 / parseFloat(currentValue)).toString();
      break;
    case 'x²':
      currentValue = (Math.pow(parseFloat(currentValue), 2)).toString();
      break;
    case '√x':
      currentValue = (Math.sqrt(parseFloat(currentValue))).toString();
      break;
    case '±':
      currentValue = (parseFloat(currentValue) * -1).toString();
      break;
  }
  updateDisplay(currentValue);
}


calculator.addEventListener('click', (e) => {
  const target = e.target;

  if (target.tagName !== 'BUTTON') return; 

  const value = target.textContent;

  if (!isNaN(value) || value === '.') {
    
    handleNumberInput(value);
  } else if (['+', '-', '*', '/', '%'].includes(value)) {
   
    handleOperatorInput(value);
  } else if (value === '=') {
    
    calculate();
  } else if (value === 'C') {
    
    clearAll();
  } else if (value === 'CE' || value === '←') {
    
    deleteLast();
  } else {
    
    handleSpecialInput(value);
  }
});