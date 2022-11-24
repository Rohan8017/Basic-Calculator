const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-all-clear]");
const equalButton = document.querySelector("[data-equals]");
const currentOperandtextelement = document.querySelector("[data-current-operand]");
const previousOperandtextelement = document.querySelector("[data-previous-operand]");

let previousOperand = "";
let currentOperand = "";
let operation="";
let result = "";
function appendNumber(number) {
    if (number === "." && currentOperand.includes(".")) return;
    currentOperand += number;
    display();
}
function display() {
    console.log({
        currentOperand,
        previousOperand,
        operation,
    });
    currentOperandtextelement.innerText=currentOperand;
    previousOperandtextelement.innerText=previousOperand + operation;
};
function compute() {
    let prev = parseFloat(previousOperand);
    let curr = parseFloat(currentOperand);
    let computation;
    if (operation !== "") {
        switch (operation) {
            case "+":
                computation = prev + curr;
                break;
            case "-":
                computation = prev - curr;
                break;
            case "*":
                computation = prev * curr;
                break;
            case "/":
                computation = prev / curr;
                break;
            default :
            return;
        }
    }
    currentOperand=computation;
    operation="";
    previousOperand="";
}
function clear() {
    currentOperand = "";
    previousOperand = "";
    operation = "";
}
function deleteLastChar() {
    currentOperand = currentOperand.slice(0, -1);
}
function chooseOperation(newOperation) {
    if (currentOperand === "") return;
    if(operation !==""){
        compute();
    }
    operation = newOperation;
    previousOperand = currentOperand;
    currentOperand = "";
    display();
}
numberButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        appendNumber(button.innerText);
    });
});
operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        chooseOperation(button.innerText);
    });
});
deleteButton.addEventListener("click", () => {
    deleteLastChar();
    display();
})
clearButton.addEventListener("click", () => {
    clear();
    display();
})
equalButton.addEventListener("click",()=>{
    compute();
    display();
})


