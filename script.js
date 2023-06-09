let todoList = []
let taskId = 0

if (localStorage.getItem('todoList')) {
    todoList = JSON.parse(localStorage.getItem('todoList'))
    taskId = todoList.length
}

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
        updateTasksLeft()
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
        updateTasksLeft()
    } 
})

tasksContainer.addEventListener('change', (e) => {
    if (e.target.classList.contains('complete-task-checkbox')) {
        const taskToComplete = parseInt(e.target.parentNode.getAttribute('key'))
        const task = todoList.find(task => task.id === taskToComplete) 
        localStorage.setItem('todoList', JSON.stringify(todoList))
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