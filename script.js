// Select all necessary elements
const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('input');

// Initialize variables to keep track of operations
let currentValue = '';
let previousValue = '';
let operator = null;

// Update display function
function updateDisplay(value) {
  display.value = value || '0';
}

// Clear all inputs
function clearAll() {
  currentValue = '';
  previousValue = '';
  operator = null;
  updateDisplay('');
}

// Delete last character
function deleteLast() {
  currentValue = currentValue.slice(0, -1);
  updateDisplay(currentValue);
}

// Perform calculation
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

// Add number or decimal point to the display
function handleNumberInput(value) {
  if (value === '.' && currentValue.includes('.')) return;
  currentValue += value;
  updateDisplay(currentValue);
}

// Handle operator input
function handleOperatorInput(op) {
  if (currentValue === '') return;

  if (previousValue !== '') {
    calculate(); // Perform calculation if there's an ongoing operation
  }

  operator = op;
  previousValue = currentValue;
  currentValue = '';
}

// Handle special buttons
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

// Add event listeners to all buttons
calculator.addEventListener('click', (e) => {
  const target = e.target;

  if (target.tagName !== 'BUTTON') return; // Ignore clicks outside buttons

  const value = target.textContent;

  if (!isNaN(value) || value === '.') {
    // If it's a number or decimal
    handleNumberInput(value);
  } else if (['+', '-', '*', '/', '%'].includes(value)) {
    // If it's an operator
    handleOperatorInput(value);
  } else if (value === '=') {
    // Equal button
    calculate();
  } else if (value === 'C') {
    // Clear button
    clearAll();
  } else if (value === 'CE' || value === '←') {
    // Delete button
    deleteLast();
  } else {
    // Special buttons (e.g., 1/x, x², √x)
    handleSpecialInput(value);
  }
});