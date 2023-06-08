let taskId = 0;
const todoList = []

const todoListMapped = todoList.map((task, index) => {
    return `
        <div id=task-${task.id}>
            <input type='checkbox' class='complete-task-checkbox'/>
            <span id=${index} key=${index}>task: ${task.task}, completed: ${task.completed}</span>
            <button>delete</button>
            ${task.id}
        </div>
        `
})

document.querySelector('.tasks-container').innerHTML = todoListMapped.join('')

const taskInput = document.querySelector('#task-input')
const taskCompletedCheckbox = document.querySelector('#task-completed')

let taskCompleted = false

taskCompletedCheckbox.addEventListener('change', () => {
    taskCompleted = !taskCompleted
})

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(taskInput.value)
    console.log('task completed: ', taskCompleted)

    let newTask = new todoTask(taskInput.value, taskCompleted, taskId++)
    todoList.push(newTask)
    document.querySelector('.tasks-container').innerHTML += `
        <div id=task-${taskId}>
            <input type='checkbox' class='complete-task-checkbox'/>    
            <span>task: ${taskInput.value}, completed: ${taskCompleted}</span>
            <button>delete</button>
            ${taskId}
        </div>
        `
    taskCompleted = false
    taskCompletedCheckbox.checked = false
    taskInput.value = ''
})

document.querySelectorAll('.complete-task-checkbox').forEach(taskCheckbox => {
    taskCheckbox.addEventListener('change', (e) => {
        console.log(e.target.parentNode)
    })
})

class todoTask {
    constructor(task, completed = false, id) {
        this.task = task
        this.completed = completed
        this.id = id
    }
}