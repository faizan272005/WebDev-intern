// =========================
// WEATHER APP
// =========================

const API_KEY = "01f966292fe092459985128de0cf4536";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const weatherError = document.getElementById("weatherError");

async function getWeather(city){

    try{

        weatherError.textContent = "";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.textContent =
            `${data.name}, ${data.sys.country}`;

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        humidity.textContent =
            `💧 Humidity: ${data.main.humidity}%`;

        wind.textContent =
            `🌬 Wind Speed: ${data.wind.speed} m/s`;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherIcon.style.display = "block";

        localStorage.setItem(
            "lastCity",
            city
        );

    }
    catch(error){

        weatherError.textContent =
            "❌ City not found. Please try again.";

        cityName.textContent =
            "Search a City";

        temperature.textContent = "";
        humidity.textContent = "";
        wind.textContent = "";

        weatherIcon.src = "";
    }
}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if(city){
        getWeather(city);
    }

});

cityInput.addEventListener("keypress", (e) => {

    if(e.key === "Enter"){

        const city = cityInput.value.trim();

        if(city){
            getWeather(city);
        }
    }

});

// Load Last City

const savedCity =
    localStorage.getItem("lastCity");

if(savedCity){
    getWeather(savedCity);
}


// =========================
// TODO APP
// =========================

const taskInput =
    document.getElementById("taskInput");

const addTaskBtn =
    document.getElementById("addTaskBtn");

const taskList =
    document.getElementById("taskList");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const totalTasks =
    document.getElementById("totalTasks");

const taskCountHero =
    document.getElementById("taskCountHero");

let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];

let currentFilter = "all";


// =========================
// SAVE TASKS
// =========================

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// =========================
// UPDATE COUNTERS
// =========================

function updateCounters(){

    totalTasks.textContent =
        tasks.length;

    taskCountHero.textContent =
        tasks.length;

}


// =========================
// RENDER TASKS
// =========================

function renderTasks(){

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if(currentFilter === "active"){

        filteredTasks =
            tasks.filter(
                task => !task.completed
            );

    }

    if(currentFilter === "completed"){

        filteredTasks =
            tasks.filter(
                task => task.completed
            );

    }

    updateCounters();

    filteredTasks.forEach(task => {

        const li =
            document.createElement("li");

        li.className =
            "task-item";

        li.innerHTML = `

            <div class="task-left">

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})">

                <span
                    class="task-text
                    ${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>

            </div>

            <div class="task-actions">

                <button
                    class="edit-btn"
                    onclick="editTask(${task.id})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </div>

        `;

        taskList.appendChild(li);

    });

}


// =========================
// ADD TASK
// =========================

function addTask(){

    const text =
        taskInput.value.trim();

    if(!text) return;

    tasks.push({

        id: Date.now(),
        text: text,
        completed: false

    });

    taskInput.value = "";

    saveTasks();
    renderTasks();

}

addTaskBtn.addEventListener(
    "click",
    addTask
);

taskInput.addEventListener(
    "keypress",
    (e)=>{

        if(e.key==="Enter"){
            addTask();
        }

    }
);


// =========================
// TOGGLE TASK
// =========================

function toggleTask(id){

    tasks = tasks.map(task =>

        task.id === id

        ? {
            ...task,
            completed:
            !task.completed
        }

        : task

    );

    saveTasks();
    renderTasks();

}


// =========================
// DELETE TASK
// =========================

function deleteTask(id){

    tasks =
        tasks.filter(
            task => task.id !== id
        );

    saveTasks();
    renderTasks();

}


// =========================
// EDIT TASK
// =========================

function editTask(id){

    const task =
        tasks.find(
            task => task.id === id
        );

    const updatedText =
        prompt(
            "Edit Task",
            task.text
        );

    if(
        updatedText !== null &&
        updatedText.trim() !== ""
    ){

        task.text =
            updatedText.trim();

        saveTasks();
        renderTasks();

    }

}


// =========================
// FILTERS
// =========================

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        ()=>{

            filterButtons.forEach(btn =>
                btn.classList.remove(
                    "active"
                )
            );

            button.classList.add(
                "active"
            );

            currentFilter =
                button.dataset.filter;

            renderTasks();

        }
    );

});


// =========================
// INITIAL LOAD
// =========================

renderTasks();