const taskInput = document.getElementById("taskText");
const dateInput = document.getElementById("taskDate");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "") {
    taskList.innerHTML = "";
    const now = new Date().toISOString().split("T")[0];
    tasks
        .filter(t => t.text.toLowerCase().includes(filter.toLowerCase()))
        .forEach((task, index) => {
            const li = document.createElement("li");
            li.className = task.date && task.date < now ? "overdue" : "";
            li.innerHTML = `
                <span>${task.text} ${task.date ? `<small>(${task.date})</small>` : ""}</span>
                <div class="task-actions">
                    <button onclick="editTask(${index})">✏️</button>
                    <button onclick="deleteTask(${index})">🗑️</button>
                </div>
            `;
            taskList.appendChild(li);
        });
}

function addTask() {
    const text = taskInput.value.trim();
    const date = dateInput.value;
    if (!text) return;
    tasks.push({ text, date });
    saveTasks();
    renderTasks();
    taskInput.value = "";
    dateInput.value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks(searchTask.value);
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null) tasks[index].text = newText.trim();
    saveTasks();
    renderTasks(searchTask.value);
}

addBtn.addEventListener("click", addTask);
searchTask.addEventListener("input", e => renderTasks(e.target.value));

renderTasks();

// Particle Animation
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 80; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 4 + 1,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
}
drawParticles();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
