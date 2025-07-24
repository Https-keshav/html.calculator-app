const display = document.getElementById("display");
const buttons = document.querySelectorAll(".keyboard button");

let currentInput = "";

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // Convert "X" to "*"
    if (value === "X") {
      handleInput("*");
    }
    else if (value === "AC") {
      handleInput("AC");
    }
    else if (value === "BS") {
      handleInput("BS");
    }
    else {
      handleInput(value);
    }
  });
});

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if ((key >= '0' && key <= '9') || "+-*/.".includes(key)) {
    handleInput(key);
  } else if (key === "Enter") {
    e.preventDefault();
    handleInput("=");
  } else if (key === "Backspace") {
    handleInput("BS");
  } else if (key === "Escape") {
    handleInput("AC");
  } else if (key === "%") {
    handleInput("%");
  }
});

// Input logic
function handleInput(value) {
  if (value === "AC") {
    currentInput = "";
  } else if (value === "BS") {
    currentInput = currentInput.slice(0, -1);
  } else if (value === "=") {
    calculateResult();
    return;
  } else if (value === "%") {
    applySmartPercentage();
    return;
  } else {
    currentInput += value;
  }

  display.value = currentInput;
}

// Smart percentage logic (like real calculator)
function applySmartPercentage() {
  const match = currentInput.match(/(.+)([+\-*/])(\d+\.?\d*)$/);

  if (match) {
    const base = eval(match[1]);
    const operator = match[2];
    const percentValue = parseFloat(match[3]);

    const percentResult = (base * percentValue) / 100;

    currentInput = `${match[1]}${operator}${percentResult}`;
  } else {
    // If no operator found, treat % as simple value/100
    const lastNumber = currentInput.match(/(\d+\.?\d*)$/);
    if (lastNumber) {
      const percent = parseFloat(lastNumber[0]) / 100;
      currentInput = currentInput.replace(/(\d+\.?\d*)$/, percent.toString());
    }
  }

  display.value = currentInput;
}

// Evaluation
function calculateResult() {
  try {
    const result = eval(currentInput);
    display.value = result;
    currentInput = result.toString();
  } catch {
    display.value = "Error";
    currentInput = "";
  }
}
