const todoList = []

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

    let newTask = new todoTask(taskInput.value, taskCompleted)
    todoList.push(newTask)
    taskCompleted = false
    taskCompletedCheckbox.checked = false
})

class todoTask {
    constructor(task, completed = false) {
        this.task = task
        this.completed = completed
    }
}