let currentInput = '';  // Store the input as the user types

// Append values to the input display
function appendValue(value) {
    currentInput += value;  // Add the clicked value to the current input
    document.getElementById('display').value = currentInput;  // Display the updated input
}

// Clear the input display
function clearDisplay() {
    currentInput = '';  // Reset the current input
    document.getElementById('display').value = '';  // Clear the display
}

// Calculate the result and display it
function calculateResult() {
    try {
        // Evaluate the input expression and update the display with the result
        currentInput = eval(currentInput).toString();
        document.getElementById('display').value = currentInput;
    } catch (e) {
        document.getElementById('display').value = 'Error';  // If an error occurs
        currentInput = '';  // Reset the input after an error
    }
}

