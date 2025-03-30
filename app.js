
/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Functions --------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  // Get the display element
  const display = document.querySelector('.display');
  
  // Variables to store the current input, previous input, and the operator
  let currentInput = '';
  let operator = null;
  let previousInput = '';

  // Function to update the display with the current input
  function updateDisplay() {
    display.textContent = currentInput || '0';
  }

  // Function to handle number button clicks
  function handleNumberClick(number) {
    if (currentInput.length < 10) {
      currentInput += number;
      updateDisplay();
    }
  }

  // Function to handle operator button clicks
  function handleOperatorClick(op) {
    if (currentInput === '' && op !== 'C') return;
    
    if (op === 'C') {
      currentInput = '';
      previousInput = '';
      operator = null;
      updateDisplay();
      return;
    }
    
    if (op === '=') {
      if (previousInput === '' || currentInput === '' || !operator) return;
      
      currentInput = String(eval(previousInput + ' ' + operator + ' ' + currentInput));
      previousInput = '';
      operator = null;
      updateDisplay();
      return;
    }
    
    if (previousInput !== '') {
      currentInput = String(eval(previousInput + ' ' + operator + ' ' + currentInput));
    }
    
    previousInput = currentInput;
    currentInput = '';
    operator = op;
    updateDisplay();
  }

  // Add event listeners to number buttons
  const numberButtons = document.querySelectorAll('.number');
  numberButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      handleNumberClick(e.target.textContent);
    });
  });

  // Add event listeners to operator buttons
  const operatorButtons = document.querySelectorAll('.operator, .equals');
  operatorButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      handleOperatorClick(e.target.textContent);
    });
  });
});