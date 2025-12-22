let focusTime = 25 * 60;
let breakTime = 5 * 60;
let time = focusTime;
let isBreak = false;
let timer;
let running = false;


const alarm = new Audio("alarm.mp3");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");


function updateTime() {
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");
    timeDisplay.textContent = `${min}:${sec}`;
}

startBtn.onclick = () => {
    if (running) return;
    running = true;

    timer = setInterval(() => {
        if (time > 0) {
            time--;
            updateTime();
        } else {
            alarm.play();

            if (!isBreak) {
                isBreak = true;
                time = breakTime;
                alert("Hora da pausa ☕");
            } else {
                isBreak = false;
                time = focusTime;
                alert("Hora de focar 🔥");
            }

            updateTime();
        }
    }, 1000);
};


resetBtn.onclick = () => {
    clearInterval(timer);
    isBreak = false;
    time = focusTime;
    updateTime();
    running = false;
};


// Tarefas
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

taskInput.addEventListener("keypress", e => {
    if (e.key === "Enter" && taskInput.value.trim()) {
        addTask(taskInput.value);
        taskInput.value = "";
    }
});

function addTask(text) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => {
        const newText = prompt("Editar tarefa:", span.textContent);
        if (newText) span.textContent = newText;
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => li.remove();

    li.append(span, editBtn, deleteBtn);
    taskList.appendChild(li);
}


// Frases
const quotes = [
    "Feito é melhor que perfeito.",
    "Sem enrolação. Só ação.",
    "Você não precisa de motivação, precisa começar.",
    "Um passo hoje vale mais que um plano amanhã.",
    "Disciplina vence o desânimo.",
    "Começa pequeno, termina grande.",
    "Constância cria resultados.",
    "Você já sabe o que fazer.",
    "Ação gera clareza.",
    "Não pare agora.",
    "Só continua.",
    "Menos pensar, mais fazer.",
    "O foco de hoje é o progresso de amanhã.",
    "Ninguém vai fazer por você.",
    "Você está mais perto do que imagina.",
    "O tempo vai passar de qualquer jeito.",
    "Sem desculpas hoje.",
    "Trabalho silencioso, resultado alto.",
    "Foco não é talento, é escolha.",
    "Faça mesmo sem vontade."
];

const quoteElement = document.getElementById("quote");

function changeQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[random];
}

changeQuote();
setInterval(changeQuote, 5 * 60 * 1000);
