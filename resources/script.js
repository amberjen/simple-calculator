// Get all the buttons from the document
var calBtn = document.getElementsByClassName('js-btn');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;

// Add onclick event to all the buttons and perform operations
for (var i=0; i<calBtn.length; i++) {
    calBtn[i].onclick = function(){
        // Get output value and button values
        var output = document.getElementById('js-output');
        var outputVal = output.innerHTML;
        var btnVal = this.innerHTML;

        // Append button values to output string, then use eval() to evaluate the result
        // If 'C' is pressed, clear the output screen
        if (btnVal == 'C') {
            output.innerHTML = '0';
            decimalAdded = false;
        }

        // if '=' is pressed, calculate and display the result
        else if (btnVal == '=') {
            var equation = outputVal;
            var lastChar = equation[equation.length - 1];

            // Replace 'x' with '*' and '÷' with '/'
            // Regex in JS: /pattern/modifiers
            // g modifier: find all matched rather than stopping after the first match
            equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

            // Check the last character of the equation, remove it if it is an operator
            // or a decimal
            // n$: match any string with n at the end of it
            if (operators.indexOf(lastChar) > -1 || lastChar == '.') {
                equation.replace(/.$/, '');
            }

            if (equation) {
                // eval(string)
                output.innerHTML = eval(equation);
            }

            decimalAdded = false;

        }

        // If operator is clicked,
        else if (operators.indexOf(btnVal) > -1){
            // get last character from the equation
            var lastChar = outputVal[outputVal.length - 1];

            // No two operators should be added consecutively, only add operator when
            // output is not empty and there is no operator at the last
            if (output != '' && operators.indexOf(lastChar) == -1) {
                output.innerHTML += btnVal;
            }

            // The equation should not start from an operator except minus
            // i.e. allow minus if output screen is empty
            else if (output == '' && btnVal == '-') {
                output.innerHTML += btnVal;
            }

            // Replace the last operators (if exists) with the newly pressed operator
            if (operators.indexOf(lastChar) > -1 && outputVal.length > 1) {
                output.innerHTML = outputVal.replace(/.$/, btnVal);
            }

            decimalAdded = false;
        }

        // No more than one decimal should be there in a number
        // Using a flag, set 'decimalAdded' to true once a decimal is added and prevent
        // more decimals to be added once it is set
        // 'decimalAdded' will be reset when an operator(+, -, x, ÷), '=', or 'C' is pressed
        else if (btnVal == '.') {
            if (!decimalAdded) {
                output.innerHTML += btnVal;
                decimalAdded = true;
            }

        } else {
            output.innerHTML += btnVal;
        }
    };
}
