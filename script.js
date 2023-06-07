const todoList = [
    {
        task: 'task1',
        completed: false
    },
    {
        task: 'task2',
        completed: false
    },
    {
        task: 'task3',
        completed: true
    },
    {
        task: 'task4',
        completed: false
    },
    {
        task: 'task5',
        completed: true
    },
    {
        task: 'task6',
        completed: false
    },
    {
        task: 'task7',
        completed: true
    },
    {
        task: 'task8',
        completed: true
    },
]

const todoListMapped = todoList.map((task, index) => {
    return `<div id=${index} key=${index}>task: ${task.task}, completed: ${task.completed}</div>`
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

    let newTask = new todoTask(taskInput.value, taskCompleted)
    todoList.push(newTask)
    document.querySelector('.tasks-container').innerHTML += `<div>task: ${taskInput.value}, completed: ${taskCompleted}</div>`
    taskCompleted = false
    taskCompletedCheckbox.checked = false

})

class todoTask {
    constructor(task, completed = false) {
        this.task = task
        this.completed = completed
    }
}