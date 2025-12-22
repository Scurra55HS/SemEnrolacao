let time = 25 * 60;
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
            clearInterval(timer);
            alarm.play();
            alert("Tempo finalizado! 💥");
            running = false;
        }
    }, 1000);
};

resetBtn.onclick = () => {
    clearInterval(timer);
    time = 25 * 60;
    updateTime();
    running = false;
};

// Tarefas
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

taskInput.addEventListener("keypress", e => {
    if (e.key === "Enter" && taskInput.value.trim()) {
        const li = document.createElement("li");
        li.textContent = taskInput.value;
        taskList.appendChild(li);
        taskInput.value = "";
    }
});

// Frases
const quotes = [
    "Comece antes de estar pronto.",
    "Um passo pequeno ainda é um passo.",
    "Feito é melhor que perfeito.",
    "Você só precisa continuar."
];

document.getElementById("quote").textContent =
    quotes[Math.floor(Math.random() * quotes.length)];
