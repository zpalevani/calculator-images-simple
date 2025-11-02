/*
================================================================
SECTION 1: SIMPLE CALCULATOR SCRIPT
================================================================
*/
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear() { this.currentOperand = '0'; this.previousOperand = ''; this.operation = undefined; }
    deleteChar() { if (this.currentOperand === '0') return; this.currentOperand = this.currentOperand.toString().slice(0, -1); if (this.currentOperand === '') { this.currentOperand = '0'; } }
    appendNumber(number) { if (number === '.' && this.currentOperand.includes('.')) return; if (this.currentOperand === '0' && number !== '.') { this.currentOperand = number.toString(); } else { this.currentOperand = this.currentOperand.toString() + number.toString(); } }
    chooseOperation(operation) { if (this.currentOperand === '' && this.previousOperand === '') return; if (this.previousOperand !== '') { this.compute(); } this.operation = operation; this.previousOperand = this.currentOperand; this.currentOperand = ''; }
    compute() {
        let computation; const prev = parseFloat(this.previousOperand); const current = parseFloat(this.currentOperand); if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) { case '+': computation = prev + current; break; case '-': computation = prev - current; break; case '×': computation = prev * current; break; case '÷': computation = prev / current; break; default: return; }
        this.currentOperand = computation; this.operation = undefined; this.previousOperand = '';
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) { this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`; } else { this.previousOperandTextElement.innerText = ''; }
    }
}
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const calcPrevOpEl = document.querySelector('#previous-operand');
const calcCurrOpEl = document.querySelector('#current-operand');
const calculator = new Calculator(calcPrevOpEl, calcCurrOpEl);
numberButtons.forEach(b => b.addEventListener('click', () => { calculator.appendNumber(b.innerText); calculator.updateDisplay(); }));
operatorButtons.forEach(b => b.addEventListener('click', () => { calculator.chooseOperation(b.innerText); calculator.updateDisplay(); }));
equalsButton.addEventListener('click', () => { calculator.compute(); calculator.updateDisplay(); });
allClearButton.addEventListener('click', () => { calculator.clear(); calculator.updateDisplay(); });
deleteButton.addEventListener('click', () => { calculator.deleteChar(); calculator.updateDisplay(); });

/*
================================================================
SECTION 2: WEATHER APP SCRIPT
================================================================
*/
const citySelect = document.getElementById('city-select');
citySelect.addEventListener('change', () => {
    console.log(`City changed to: ${citySelect.value}`);
});

/*
================================================================
SECTION 3: MODERN TO-DO LIST SCRIPT
================================================================
*/
const todoInput = document.getElementById('todo-input');
const todoDateInput = document.getElementById('todo-date-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

function createTaskElement(taskText, taskDate) {
    const li = document.createElement('li');
    const contentDiv = document.createElement('div');
    contentDiv.className = 'task-content';
    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = taskText;
    contentDiv.appendChild(textSpan);
    if (taskDate) {
        const dateSpan = document.createElement('span');
        dateSpan.className = 'task-date';
        const date = new Date(taskDate + 'T00:00:00');
        dateSpan.textContent = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        contentDiv.appendChild(dateSpan);
    }
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-button';
    deleteBtn.innerHTML = '&times;';
    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);
    contentDiv.addEventListener('click', () => { li.classList.toggle('completed'); });
    deleteBtn.addEventListener('click', () => { taskList.removeChild(li); });
    return li;
}
function addTask() {
    const taskText = todoInput.value.trim();
    const taskDate = todoDateInput.value;
    if (taskText !== '') {
        const newTask = createTaskElement(taskText, taskDate);
        taskList.appendChild(newTask);
        todoInput.value = '';
        todoDateInput.value = '';
        todoInput.focus();
    }
}
addTaskButton.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { addTask(); } });