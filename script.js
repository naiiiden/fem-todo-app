class TodoTask {
    constructor(task, completed = false, id) {
        this.task = task
        this.completed = completed
        this.id = id
    }
}

TodoTask.prototype.changeCompleteStatus = function() {
    this.completed = !this.completed
}

let todoList = []
let taskId = 0

todoList.push(new TodoTask('task1', false, ++taskId))
todoList.push(new TodoTask('task2', true, ++taskId))
todoList.push(new TodoTask('task3', false, ++taskId))
todoList.push(new TodoTask('task4', true, ++taskId))

function displayTasks(task) { 
    return `
    <div id=task-${task.id} key=${task.id}>
        <input type='checkbox' class='complete-task-checkbox' ${task.completed ? 'checked' : null}/>
        <span>task: ${task.task}, completed: <span class='completed-status-span'>${task.completed ? 'completed' : 'not completed'}</span></span>
        <button class='delete-task-button'>delete</button>
    </div>`
}

let todoListDisplay = todoList.map((task) => {
    return displayTasks(task)
})

document.querySelectorAll('input[name="complete-status"]').forEach(input => {
    input.addEventListener('change', (e) => {
        switch (e.target.getAttribute('id')) {
            case 'active':
                todoListDisplay = todoList.filter(task => task.completed === false).map((task) => {
                    return displayTasks(task)
                })
                document.querySelector('.tasks-container').innerHTML = todoListDisplay.join('')
                break;
            case 'completed':
                todoListDisplay = todoList.filter(task => task.completed === true).map((task) => {
                    return displayTasks(task)
                })
                document.querySelector('.tasks-container').innerHTML = todoListDisplay.join('')
                break;
            default:
                todoListDisplay = todoList.map((task) => {
                    return displayTasks(task)
                })
                document.querySelector('.tasks-container').innerHTML = todoListDisplay.join('')
        }
    })
})
document.querySelector('.tasks-container').innerHTML = todoListDisplay.join('')

const taskInput = document.querySelector('#task-input')
const taskCompletedCheckbox = document.querySelector('#task-completed')

let taskCompleted = false

taskCompletedCheckbox.addEventListener('change', () => {
    taskCompleted = !taskCompleted
})

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    let newTask = new TodoTask(taskInput.value, taskCompleted, ++taskId)
    todoList.push(newTask)
    document.querySelector('.tasks-container').innerHTML += `
        <div id=task-${taskId} key=${taskId}>
            <input type='checkbox' class='complete-task-checkbox' ${taskCompleted ? 'checked' : null}/>    
            <span>task: ${taskInput.value}, completed: <span class='completed-status-span'>${taskCompleted ? 'completed' : 'not completed'}</span></span>
            <button class='delete-task-button'>delete</button>
        </div>`

    taskCompleted = false
    taskCompletedCheckbox.checked = false
    taskInput.value = ''

    document.querySelector('#all').checked = true
})

document.querySelector('.tasks-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-task-button')) {
        const taskToDeleteById = parseInt(e.target.parentNode.getAttribute('key'))
        todoList = todoList.filter(task => task.id !== taskToDeleteById)
        e.target.parentNode.remove()
    } 
})

document.querySelector('.tasks-container').addEventListener('change', (e) => {
    if (e.target.classList.contains('complete-task-checkbox')) {
        const taskToComplete = parseInt(e.target.parentNode.getAttribute('key'))
        const task = todoList.find(task => task.id === taskToComplete) 
        task.changeCompleteStatus()
        e.target.parentNode.querySelector('.completed-status-span').textContent = task.completed ? 'completed' : 'not completed'
    }
})