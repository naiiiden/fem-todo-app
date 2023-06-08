let taskId = 0;
const todoList = [
    {
        task: 'task1',
        completed: false,
        id: taskId++
    },
    {
        task: 'task2',
        completed: false,
        id: taskId++
    },
    {
        task: 'task3',
        completed: true,
        id: taskId++
    },
    {
        task: 'task4',
        completed: false,
        id: taskId++
    },
    {
        task: 'task5',
        completed: true,
        id: taskId++
    },
    {
        task: 'task6',
        completed: false,
        id: taskId++
    },
    {
        task: 'task7',
        completed: true,
        id: taskId++
    },
    {
        task: 'task8',
        completed: true,
        id: taskId++
    },
]


const todoListMapped = todoList.map((task, index) => {
    return `
        <div>
            <input type='checkbox' class='complete-task-checkbox'/>
            <span id=${index} key=${index}>task: ${task.task}, completed: ${task.completed}</span>
            <button>delete</button>
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

    let newTask = new todoTask(taskInput.value, taskCompleted)
    todoList.push(newTask)
    document.querySelector('.tasks-container').innerHTML += `
        <div>
            <input type='checkbox' class='complete-task-checkbox'/>    
            <span>task: ${taskInput.value}, completed: ${taskCompleted}</span>
            <button>delete</button>
        </div>
        `
    taskCompleted = false
    taskCompletedCheckbox.checked = false
})

document.querySelectorAll('.complete-task-checkbox').forEach(taskCheckbox => {
    taskCheckbox.addEventListener('change', (e) => {
        console.log(e.target.parentNode)
    })
})

class todoTask {
    constructor(task, completed = false) {
        this.id = taskId++
        this.task = task
        this.completed = completed
    }
}