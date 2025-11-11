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
    
    // Add some basic styles if not already in CSS
    const style = document.createElement('style');
    style.textContent = `
        .li-style {
            padding: 12px;
            margin: 8px 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: Arial, sans-serif;
        }
        
        .li-style:hover {
            background: #f9f9f9;
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .completed {
            text-decoration: line-through;
            opacity: 0.6;
            background: #f0f0f0;
        }
        
        .delete-btn {
            background: #ff4444;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.3s ease;
        }
        
        .delete-btn:hover {
            background: #cc0000;
        }
        
        .empty-message {
            text-align: center;
            color: #666;
            font-style: italic;
            padding: 20px;
            list-style: none;
            font-family: Arial, sans-serif;
        }
        
        .add-task-btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-family: Arial, sans-serif;
            transition: background 0.3s ease;
        }
        
        .add-task-btn:hover {
            background: #0056b3;
        }
        
        #addTaskInput {
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
            font-family: Arial, sans-serif;
            transition: border-color 0.3s ease;
        }
        
        #addTaskInput:focus {
            outline: none;
            border-color: #007bff;
        }
        
        #todoUl {
            list-style: none;
            padding: 0;
            margin: 20px 0;
            max-width: 600px;
        }
    `;
    document.head.appendChild(style);
});