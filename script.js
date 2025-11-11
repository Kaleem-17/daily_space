// Getting all the required elements
const greethead = document.querySelector(".greet-heading");
const timeP = document.querySelector(".time");
const dateP = document.querySelector(".date");
const weatherBtn = document.querySelector("#weather-btn");
const weatherP = document.querySelector(".weather");
const temP = document.querySelector(".temprature");
const feelP = document.querySelector(".feel-like");
const pressureP = document.querySelector(".pressure");
const windSpeedP = document.querySelector(".wind-speed");
const quoteP = document.querySelector(".qoute");
const qouteBtn = document.querySelector(".qoute-btn");
const nameofCity = document.querySelector(".city-name");
const humidityP = document.querySelector(".humidity");
// const todoUl = document.querySelector(".tasks-list");
// const addTaskBtn = document.querySelector(".add-task-btn");
// const addTaskInput = document.querySelector(".todo-input");

// Declaring Months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// Deslaring Days to show in today data
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// getting Current Time
function getTime() {
  const now = new Date(); // Getting the whole day along with date and time
  let time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`; // getting only current time
  const currentMonth = now.getMonth() + 1; // Current monthe (it will give number from 0 to 11)
  const currentDay = now.getDay(); // current day of the week (will also be a number starting from monday)
  const currentYear = now.getFullYear(); // current year
  const currentDayOfMonth = now.getDate(); // getting current day number of the month

  const today = `${days[currentDay]}, ${months[currentMonth]} ${currentDayOfMonth},${currentYear}`; // complete day date
  dateP.innerText = `Today it's ${today}`;
  timeP.innerText = `Time now: ${time}`;
}
// setting setInterval to make it countinous or live
setInterval(() => {
  getTime();
}, 1000);

// Qoute section
const category = ["success", "wisdom", "inspirational", "philosophy"]; // quote category
const header = {
  headers: { "X-Api-Key": "mtdtKew/+jAYaZYnlvJ7WA==6oZxeLFcC0hTuHLs" }, // key to call api
};
let qouteApiUrl = `https://api.api-ninjas.com/v2/randomquotes?categories=${category}`; // qoute api url

async function getDailyQoute() {
  let res = await fetch(qouteApiUrl, header);
  let data = await res.json();
  quoteP.innerText = data[0].quote;
  // console.log(data[0].quote);
}
getDailyQoute();
qouteBtn.addEventListener("click", getDailyQoute);

// Weather Section

async function getWeather() {
  let key = "27c7ed90f206a01ca79da5e0acae2eb7";

  let input = document.querySelector("#city-name"); // fetching city from input field
  let cityName = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`; // complete url to fetch weather
  if (cityName === "") {
    input.style.border = "2px solid red";
    setTimeout(() => (input.style.border = ""), 2000);
    return;
  }
  input.value = ""; // clearing input after taking the city name

  let res = await fetch(url); // fetching weather using async await
  let data = await res.json();
  // showing complete weather information on screen
  nameofCity.innerText = `Your City: ${data.name}`;

  weatherP.innerText = `Weather condition: ${data.weather[0].description}`;
  temP.innerText = `Temprature: ${Math.floor(data.main.temp - 273)} \u00b0C`;
  feelP.innerText = `Feels-like: ${Math.floor(
    data.main.feels_like - 273
  )} \u00b0C`;
  humidityP.innerText = `Humidity: ${data.main.humidity}`;
  pressureP.innerText = `Pressure: ${data.main.pressure} hPa`;
  windSpeedP.innerText = `Wind Speed: ${data.wind.speed} m/s`;
  // console.log(data);
}
// Event listener to call weather api and get weather
weatherBtn.addEventListener("click", getWeather);

// setting up todo section

// addTaskBtn.addEventListener("click",() =>{
//   let task = addTaskInput.value.trim();
//   addTaskInput.value = "";

//   if(task === ""){
//     addTaskInput.style.border = "2px solid red";
//      return;
//   }
 

//   let li = document.createElement("li");
//   li.innerText = task;
//   li.classList.add("li-style")
//   let deleteBtn = document.createElement("button");
//   deleteBtn.innerText = "Delete Task";
//   deleteBtn.classList.add("add-task-btn")
//   li.appendChild(deleteBtn);
//   todoUl.appendChild(li)

//   deleteBtn.addEventListener("click",()=>{
//     li.remove()
//   })
// })


// 
// 
// 
// 
// 
// DOM elements
const addTaskBtn = document.getElementById('addTaskBtn');
const addTaskInput = document.getElementById('addTaskInput');
const todoUl = document.getElementById('todoUl');

// Load tasks from localStorage when page loads
function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Clear any existing empty message
    const emptyMsg = document.getElementById('empty-message');
    if (emptyMsg) emptyMsg.remove();
    
    if (savedTasks.length === 0) {
        showEmptyState();
        return;
    }
    
    savedTasks.forEach((taskText) => {
        addTaskToUI(taskText); // display tasks on screen
    });
}

// Function to add task to UI
function addTaskToUI(taskText) {
    // Remove empty state if it exists
    const emptyMsg = document.getElementById('empty-message');
    if (emptyMsg) emptyMsg.remove();
    
    let li = document.createElement("li");
    li.innerText = taskText;
    li.classList.add("li-style");

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");

    li.appendChild(deleteBtn);
    todoUl.appendChild(li);

    // Toggle completion on task click
    li.addEventListener("click", (e) => {
        if (e.target !== deleteBtn) {
            li.classList.toggle("completed");
        }
    });

    // delete button logic
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering the li click event
        li.remove();

        // remove from localStorage
        removeFromStorage(taskText);

        // Show notification instead of alert
        showNotification("Task has been deleted", "success");
        
        // Check if we need to show empty state
        checkEmptyState();
    });
}

// Save task to localStorage
function saveToStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // Prevent duplicates
    if (!tasks.includes(task)) {
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Remove task from localStorage
function removeFromStorage(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let updated = tasks.filter((t) => t.trim() !== taskToRemove.trim());
    localStorage.setItem("tasks", JSON.stringify(updated));
}

// Show notification (toast)
function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        background: ${type === "success" ? "#4CAF50" : "#f44336"};
        color: white;
        border-radius: 6px;
        z-index: 1000;
        font-family: Arial, sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, 3000);
}

// Show empty state message
function showEmptyState() {
    const emptyMsg = document.createElement("li");
    emptyMsg.textContent = "No tasks yet! Add one above.";
    emptyMsg.classList.add("empty-message");
    emptyMsg.id = "empty-message";
    todoUl.appendChild(emptyMsg);
}

// Check if we need to show empty state
function checkEmptyState() {
    const tasks = document.querySelectorAll('.li-style');
    if (tasks.length === 0) {
        showEmptyState();
    }
}

// Add task button functionality
addTaskBtn.addEventListener("click", () => {
    let task = addTaskInput.value.trim();

    if (task === "") {
        addTaskInput.style.border = "2px solid red";
        addTaskInput.placeholder = "Please enter a task!";
        showNotification("Please enter a task first!", "error");
        setTimeout(() => {
            addTaskInput.style.border = "";
            addTaskInput.placeholder = "Add a new task...";
        }, 2000);
        return;
    }

    // Add to UI
    addTaskToUI(task);

    // Save to localStorage
    saveToStorage(task);

    // Clear input
    addTaskInput.value = "";
    
    // Show success notification
    showNotification("Task added successfully!");
});

// Enter key support
addTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTaskBtn.click();
    }
});

// Input validation on focus
addTaskInput.addEventListener("focus", () => {
    addTaskInput.style.border = "";
    addTaskInput.placeholder = "Add a new task...";
});

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    

});

