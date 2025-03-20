document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('btn-theme');
    let theme = 0;
    if (button) {
        button.addEventListener('click', function() {
            const body = document.body;
            if (theme == 0) {
                body.style.backgroundColor = 'white';
                theme = 1;
            } else {
                body.style.backgroundColor = '#0f0f0f';
                theme = 0;
            }
        });
    } else {
        console.error('Кнопка с id "btn-theme" не найдена.');
    }
});

window.onload = function() {
    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;
    let outputElement = document.getElementById("result");
    let digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit;
            }
            outputElement.innerHTML = a;
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit;
                outputElement.innerHTML = b;
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') return;
        selectedOperation = 'x';
        b = '';
        outputElement.innerHTML = 0;
    };
    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return;
        selectedOperation = '+';
        b = '';
        outputElement.innerHTML = 0;
    };
    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return;
        selectedOperation = '-';
        b = '';
        outputElement.innerHTML = 0;
    };
    document.getElementById("btn_op_delete").onclick = function() {
        if (a === '') return;
        selectedOperation = '/';
        b = '';
        outputElement.innerHTML = 0;
    };

    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) {
            if (a.length > 0) {
                a = a.slice(0, -1);
                if (a.length > 0) {
                    outputElement.innerHTML = a;
                } else outputElement.innerHTML = 0;
            }
        } else {
            if (b.length > 0) {
                b = b.slice(0, -1);
                if (b.length > 0) {
                    outputElement.innerHTML = b;
                } else outputElement.innerHTML = 0;
            }
        }
    };

    document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (parseFloat(a) / 100).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (parseFloat(b) / 100).toString();
                outputElement.innerHTML = b;
            }
        }
    };

    document.getElementById("btn_op_equal").onclick = function() {
        console.log(selectedOperation, a, b);
        if (a === '' || b === '' || !selectedOperation) {
            return;
        } else {
            switch (selectedOperation) {
                case 'x':
                    expressionResult = (+a) * (+b);
                    break;
                case '+':
                    expressionResult = (+a) + (+b);
                    break;
                case '-':
                    expressionResult = (+a) - (+b);
                    break;
                case '/':
                    expressionResult = (+a) / (+b);
                    break;
            }
        }
        console.log(selectedOperation);
        a = expressionResult.toString();
        outputElement.innerHTML = a;
        console.log(selectedOperation);
    };

    document.getElementById("btn_op_clear").onclick = function() {
        a = '';
        b = '';
        selectedOperation = '';
        expressionResult = '';
        outputElement.innerHTML = 0;
    };

    document.getElementById("SPV_button").onclick = function() {
        let vector1 = prompt("Введите координаты первого вектора через запятую (например, 1,2,3):");
        let vector2 = prompt("Введите координаты второго вектора через запятую (например, 4,5,6):");

        if (vector1 && vector2) {
            let v1 = vector1.split(',').map(Number);
            let v2 = vector2.split(',').map(Number);

            if (v1.length === v2.length && v1.length > 0) {
                let spv = 0;
                for (let i = 0; i < v1.length; i++) {
                    spv += v1[i] * v2[i];
                }
                outputElement.innerHTML = spv;
            } else {
                outputElement.innerHTML = "Векторы должны быть одинаковой длины.";
            }
        } else {
            outputElement.innerHTML = "Ввод отменен.";
        }
    };
};