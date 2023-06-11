import { noTasksDisplay, updateTasksAndClearButtonDisableIfEmpty, renderTask } from "./functions.js"
import { TodoTask } from "./classes.js"

let todoList = []
let taskId = 0

if (localStorage.getItem('todoList')) {
    todoList = JSON.parse(localStorage.getItem('todoList'))
    taskId = Math.max(...todoList.map((task) => task.id), 0) + 1
    todoList.forEach(task => {
        Object.setPrototypeOf(task, TodoTask.prototype)
    })
}

let tasksContainer = document.querySelector('.tasks-container')

todoList.forEach(task => {
    renderTask(task, tasksContainer)
})

document.querySelector('fieldset').addEventListener('change', (e) => {
    if (e.target.matches('input[name="complete-status"]')) {
        tasksContainer.innerHTML = ''
        let filteredTasks = []
        
        switch (e.target.getAttribute('id')) {
            case 'active':
                filteredTasks = todoList.filter(task => !task.completed)
                break
            case 'completed':
                filteredTasks = todoList.filter(task => task.completed)
                break
            default:
                filteredTasks = todoList
        }
        
        filteredTasks.forEach(task => {
            renderTask(task, tasksContainer)
        })  
    }
})

document.querySelector('form').addEventListener('submit', (e) => {
    console.log(todoList)
    e.preventDefault()

    const taskInput = document.querySelector('#task-input')
    const errorText = document.querySelector('.error-indicator')

    if (taskInput.value !== '') {
        if (todoList.some(task => task.task === taskInput.value)) {
            errorText.textContent = 'cannot add duplicate tasks'
            setTimeout(() => {
                errorText.textContent = ''
            }, 3000)
            return
        }

        let newTask = new TodoTask(taskInput.value, false, ++taskId)
        todoList.push(newTask)
        localStorage.setItem('todoList', JSON.stringify(todoList))
        tasksContainer.innerHTML += `
            <li id=task-${taskId} key=${taskId}>
                <input type='checkbox' class='complete-task-checkbox' aria-label='Mark "${taskInput.value}" as ${false ? "incomplete" : "complete"}'/>    
                <span>task: ${taskInput.value}, completed: <span class='completed-status-span'>not completed</span></span>
                <button class='delete-task-button'>delete</button>
            </li>`
        taskInput.value = ''
        document.querySelector('#all').checked = true
        // updateTasksAndClearButtonDisableIfEmpty(todoList, todoListDisplay)
        // noTasksDisplay(todoList, tasksContainer)
    } else {
        errorText.textContent = 'task text cannot be empty'
        setTimeout(() => {
            errorText.textContent = ''
        }, 3000)
    }
})

tasksContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-task-button')) {
        const taskToDeleteById = parseInt(e.target.parentNode.getAttribute('key'))
        todoList = todoList.filter(task => task.id !== taskToDeleteById)
        localStorage.setItem('todoList', JSON.stringify(todoList))
        e.target.parentNode.remove()
        // updateTasksAndClearButtonDisableIfEmpty(todoList, todoListDisplay)
        // noTasksDisplay(todoList, tasksContainer)
    } 
})

tasksContainer.addEventListener('change', (e) => {
    if (e.target.classList.contains('complete-task-checkbox')) {
        const taskToComplete = parseInt(e.target.parentNode.getAttribute('key'))
        const taskIndex = todoList.findIndex(task => task.id === taskToComplete)
        if (taskIndex !== -1) {
            todoList[taskIndex].changeCompleteStatus()
            localStorage.setItem('todoList', JSON.stringify(todoList))
            e.target.parentNode.querySelector('.completed-status-span').textContent = todoList[taskIndex].completed ? 'completed' : 'not completed'
            if (document.querySelector("#active").checked === true || document.querySelector("#completed").checked === true) {
                e.target.parentNode.remove()
            }
        // noTasksDisplay(todoList, tasksContainer);
        }
    }
})

// updateTasksAndClearButtonDisableIfEmpty(todoList, todoListDisplay)

document.querySelector('.clear-completed').addEventListener('click', () => {
    todoList = todoList.filter(task => task.completed === false)
    localStorage.setItem('todoList', JSON.stringify(todoList))
    document.querySelectorAll('.complete-task-checkbox:checked').forEach(element => {
        element.parentNode.remove()
    })
    // updateTasksAndClearButtonDisableIfEmpty(todoList, todoListDisplay)
    // noTasksDisplay(todoList, tasksContainer)
})
  
// noTasksDisplay(todoList, tasksContainer)
  