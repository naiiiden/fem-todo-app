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

updateTasksLeft()

function displayTasks(task) { 
    return `
    <div id=task-${task.id} key=${task.id}>
        <input type='checkbox' class='complete-task-checkbox' ${task.completed ? 'checked' : null}/>
        <span>task: ${task.task}, completed: <span class='completed-status-span'>${task.completed ? 'completed' : 'not completed'}</span></span>
        <button class='delete-task-button'>delete</button>
    </div>`
}

let todoListDisplay = todoList.map((task) => displayTasks(task))

let tasksContainer = document.querySelector('.tasks-container')
tasksContainer.innerHTML = todoListDisplay.join('')

document.body.addEventListener('change', (e) => {
  if (e.target.matches('input[name="complete-status"]')) {
    switch (e.target.getAttribute('id')) {
      case 'active':
        todoListDisplay = todoList.filter(task => !task.completed).map(task => displayTasks(task));
        tasksContainer.innerHTML = todoListDisplay.join('');
        break;
      case 'completed':
        todoListDisplay = todoList.filter(task => task.completed).map(task => displayTasks(task));
        tasksContainer.innerHTML = todoListDisplay.join('');
        break;
      default:
        todoListDisplay = todoList.map(task => displayTasks(task));
        tasksContainer.innerHTML = todoListDisplay.join('');
    }
  }
});

const taskInput = document.querySelector('#task-input')

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    let newTask = new TodoTask(taskInput.value, false, ++taskId)
    todoList.push(newTask)
    tasksContainer.innerHTML += `
        <div id=task-${taskId} key=${taskId}>
            <input type='checkbox' class='complete-task-checkbox'/>    
            <span>task: ${taskInput.value}, completed: <span class='completed-status-span'>not completed</span></span>
            <button class='delete-task-button'>delete</button>
        </div>`

    taskInput.value = ''

    document.querySelector('#all').checked = true
    updateTasksLeft()
})

tasksContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-task-button')) {
        const taskToDeleteById = parseInt(e.target.parentNode.getAttribute('key'))
        todoList = todoList.filter(task => task.id !== taskToDeleteById)
        e.target.parentNode.remove()
        updateTasksLeft()
    } 
})

tasksContainer.addEventListener('change', (e) => {
    if (e.target.classList.contains('complete-task-checkbox')) {
        const taskToComplete = parseInt(e.target.parentNode.getAttribute('key'))
        const task = todoList.find(task => task.id === taskToComplete) 
        task.changeCompleteStatus()
        e.target.parentNode.querySelector('.completed-status-span').textContent = task.completed ? 'completed' : 'not completed'
        if (document.querySelector("#active").checked === true || document.querySelector("#completed").checked === true) {
            e.target.parentNode.remove()
        }
    }
})

function updateTasksLeft() {
    document.querySelector('.total-tasks').textContent = `${todoList.length} items left`
}

document.querySelector('.clear-completed').addEventListener('click', () => {
    todoList = todoList.filter(task => task.completed === false)
    console.log(todoList)
    document.querySelectorAll('.complete-task-checkbox:checked').forEach(element => {
        element.parentNode.remove();
    });
    updateTasksLeft()
})