import { noTasksDisplay, updateTasksAndClearButtonDisableIfEmpty, displayTasks } from "./functions.js"

let todoList = []
let taskId = 0


class TodoTask {
    constructor(task, completed = false, id) {
        this.task = task
        this.completed = completed
        this.id = id !== null ? id : ++taskId
    }
}

TodoTask.prototype.changeCompleteStatus = function() {
    this.completed = !this.completed
}

if (localStorage.getItem('todoList')) {
    todoList = JSON.parse(localStorage.getItem('todoList'))
    taskId = Math.max(...todoList.map((task) => task.id), 0) + 1
    todoList.forEach(task => {
        Object.setPrototypeOf(task, TodoTask.prototype)
    })
}

let todoListDisplay = todoList.map((task) => displayTasks(task))
let tasksContainer = document.querySelector('.tasks-container')
tasksContainer.innerHTML = todoListDisplay.join('')

document.body.addEventListener('change', (e) => {
  if (e.target.matches('input[name="complete-status"]')) {
    switch (e.target.getAttribute('id')) {
      case 'active':
        todoListDisplay = todoList.filter(task => !task.completed).map(task => displayTasks(task))
        tasksContainer.innerHTML = todoListDisplay.join('')
        noTasksDisplay(todoList, tasksContainer)
        break
      case 'completed':
        todoListDisplay = todoList.filter(task => task.completed).map(task => displayTasks(task))
        tasksContainer.innerHTML = todoListDisplay.join('')
        noTasksDisplay(todoList, tasksContainer)
        break
      default:
        todoListDisplay = todoList.map(task => displayTasks(task))
        tasksContainer.innerHTML = todoListDisplay.join('')
        noTasksDisplay(todoList, tasksContainer)
    }
  }
})

document.querySelector('form').addEventListener('submit', (e) => {
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
            <div id=task-${taskId} key=${taskId}>
                <input type='checkbox' class='complete-task-checkbox'/>    
                <span>task: ${taskInput.value}, completed: <span class='completed-status-span'>not completed</span></span>
                <button class='delete-task-button'>delete</button>
            </div>`
        taskInput.value = ''
        document.querySelector('#all').checked = true
        updateTasksAndClearButtonDisableIfEmpty(todoList, todoListDisplay)
        noTasksDisplay(todoList, tasksContainer)
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
        updateTasksAndClearButtonDisableIfEmpty(todoList, todoListDisplay)
        noTasksDisplay(todoList, tasksContainer)
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
        noTasksDisplay(todoList, tasksContainer);
        }
    }
})

updateTasksAndClearButtonDisableIfEmpty(todoList, todoListDisplay)

document.querySelector('.clear-completed').addEventListener('click', () => {
    todoList = todoList.filter(task => task.completed === false)
    localStorage.setItem('todoList', JSON.stringify(todoList))
    document.querySelectorAll('.complete-task-checkbox:checked').forEach(element => {
        element.parentNode.remove()
    })
    updateTasksAndClearButtonDisableIfEmpty(todoList, todoListDisplay)
    noTasksDisplay(todoList, tasksContainer)
})
  
noTasksDisplay(todoList, tasksContainer)
  