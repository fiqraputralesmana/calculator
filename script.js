const displayHistory = document.querySelector(".display-history");
const displayInput = document.querySelector(".display-input");
const tempResult = document.querySelector(".temp-result");
const clearAll = document.querySelector(".all-clear");
const clearInput = document.querySelector(".clear-input");
const operations = document.querySelectorAll(".operation");
const numbers = document.querySelectorAll(".number");
const buttonZero = document.querySelector(".zero");
const buttonDot = document.querySelector(".dot");
const buttonEqual = document.querySelector(".equal");

let disInput = "";
let disHistory = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    disInput += e.target.innerText;
    displayInput.innerText = disInput;
  });
});

operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!disInput) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (disInput && disHistory && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(disInput);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});

function clearVar(operationName = "") {
  disHistory += disInput + " " + operationName + " ";
  displayHistory.innerText = disHistory;
  displayInput.innerText = "0";
  disInput = "";
  tempResult.innerText = result;
}

function mathOperation() {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(disInput);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(disInput);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(disInput);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(disInput);
  } else if (lastOperation === "%") {
    result = parseFloat(result) / parseFloat(disInput);
  }
}

buttonEqual.addEventListener("click", () => {
  if (!disHistory || !disInput) return;
  haveDot = false;
  mathOperation();
  clearVar();
  displayInput.innerText = result;
  tempResult.innerText = "";
  disInput = result;
  disHistory = "";
});

clearAll.addEventListener("click", () => {
  disInput = "";
  disHistory = "";
  haveDot = false;
  displayHistory.innerText = "";
  displayInput.innerText = "";
  result = null;
  tempResult.innerText = "";
  lastOperation = "";
});

clearInput.addEventListener("click", () => {
  disInput = "";
  displayInput.innerText = "";
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9"
  ) {
    clickButton(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");
  } else if (e.key === "Enter" || e.key === "=") {
    clickEqual();
  } else if (e.key === "Delete") {
    clickClearAll();
  } else if (e.key === "Backspace") {
    clickClearInput();
  }
});

function clickButton(key) {
  numbers.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickOperation(key) {
  operations.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}

function clickEqual() {
  buttonEqual.click();
}

function clickClearAll() {
  clearAll.click();
}

function clickClearInput() {
  clearInput.click();
}
