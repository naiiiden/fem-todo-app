const todoList = []

const taskInput = document.querySelector('#task-input')

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(taskInput.value)

    let newTask = new todoTask(taskInput.value, false)
    todoList.push(newTask)
})

class todoTask {
    constructor(task, completed = false) {
        this.task = task
        this.completed = completed
    }
}