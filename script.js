// ---------------- FIREBASE ----------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDBjHsW-0N7znow4ZwCo82Wn5ovQa7Khzk",
    authDomain: "semenrolacao-ca934.firebaseapp.com",
    projectId: "semenrolacao-ca934",
    storageBucket: "semenrolacao-ca934.firebasestorage.app",
    messagingSenderId: "407271099730",
    appId: "1:407271099730:web:04c374caa54a7551c67e8b",
    measurementId: "G-5R3CYLFZYD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const tasksRef = collection(db, "tasks");

// ---------------- FIREBASE ----------------


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

taskInput.addEventListener("keydown", e => {
    if (e.key === "Enter" && taskInput.value.trim()) {
        addTask(taskInput.value.trim());
        taskInput.value = "";
    }
});

document.getElementById("addTaskBtn").addEventListener("click", () => {
    if (taskInput.value.trim()) {
        addTask(taskInput.value.trim());
        taskInput.value = "";
    }
});


async function addTask(text) {
    const docRef = await addDoc(tasksRef, {
        text,
        createdAt: Date.now()
    });

    renderTask(docRef.id, text);
}

function renderTask(id, text) {
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
    deleteBtn.onclick = async () => {
        await deleteDoc(doc(db, "tasks", id));
        li.remove();
    };

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

const quoteEl = document.querySelector('.quote');

function changeQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    quoteEl.textContent = quotes[random];
}

changeQuote();
setInterval(changeQuote, 5 * 60 * 1000);


// Carregar tarefas do Firestore

async function loadTasks() {
    const querySnapshot = await getDocs(tasksRef);
    querySnapshot.forEach(doc => {
        renderTask(doc.id, doc.data().text);
    });
}

loadTasks();
