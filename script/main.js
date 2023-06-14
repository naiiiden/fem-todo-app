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

noTasksDisplay(todoList)

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

        noTasksDisplay(todoList)

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
            <li id=task-${taskId} key=${taskId} draggable='true'>
                <input type='checkbox' class='complete-task-checkbox' aria-label='Mark "${taskInput.value}" as ${false ? "incomplete" : "complete"}' aria-live='polite'/>    
                <span>${taskInput.value}</span>
                <button class='delete-task-button' aria-label='Delete task: "${taskInput.value}"'>delete</button>
            </li>`
        taskInput.value = ''
        document.querySelector('#all').checked = true
        updateTasksAndClearButtonDisableIfEmpty(todoList)
        noTasksDisplay(todoList)
    } else {
        errorText.textContent = 'task text cannot be empty'
        setTimeout(() => {
            errorText.textContent = ''
        }, 3000)
    }
})

tasksContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-task-button')) {
        const taskToDeleteKey = parseInt(e.target.parentNode.dataset.key)
        todoList = todoList.filter(task => task.id !== taskToDeleteKey)
        localStorage.setItem('todoList', JSON.stringify(todoList))
        e.target.parentNode.remove()
        updateTasksAndClearButtonDisableIfEmpty(todoList)
        noTasksDisplay(todoList)
    }
})

tasksContainer.addEventListener('change', (e) => {
    if (e.target.classList.contains('complete-task-checkbox')) {
        const taskToComplete = parseInt(e.target.parentNode.getAttribute('data-key'))
        const taskIndex = todoList.findIndex(task => task.id === taskToComplete)
        if (taskIndex !== -1) {
            todoList[taskIndex].changeCompleteStatus()
            e.target.parentNode.querySelector('li input').ariaLabel = `Mark "${todoList[taskIndex].task}" as ${todoList[taskIndex].completed ? 'incomplete' : 'complete'}`
            localStorage.setItem('todoList', JSON.stringify(todoList))
            if ((document.querySelector("#active").checked && todoList[taskIndex].completed) || (document.querySelector("#completed").checked && !todoList[taskIndex].completed)) {
                e.target.parentNode.remove()
            }
            noTasksDisplay(todoList)
        }
    }
})

updateTasksAndClearButtonDisableIfEmpty(todoList)

document.querySelector('.clear-completed').addEventListener('click', () => {
    todoList = todoList.filter(task => task.completed === false)
    localStorage.setItem('todoList', JSON.stringify(todoList))
    document.querySelectorAll('.complete-task-checkbox:checked').forEach(element => {
        element.parentNode.remove()
    })
    updateTasksAndClearButtonDisableIfEmpty(todoList)
    noTasksDisplay(todoList)
})

// https://web.dev/drag-and-drop/
document.addEventListener('DOMContentLoaded', (e) => {
    let items = document.querySelectorAll('.tasks-container li')
    let dragSrcEl

    function handleDragStart(e) {
        this.style.opacity = '0.4'
        dragSrcEl = this // Assign the current element to dragSrcEl

        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/html', this.innerHTML)
    }
    
    function handleDragEnd(e) {
        this.style.opacity = '1'
    }

    items.forEach(function (item) {
        item.classList.remove('over')
    })

    function handleDragOver(e) {
        e.preventDefault()
        return false
    }

    function handleDragEnter(e) {
        this.classList.add('over')
    }
    
    function handleDragLeave(e) {
        this.classList.remove('over')
    }

    function handleDrop(e) {
        e.stopPropagation() // stops the browser from redirecting.
      
        if (dragSrcEl !== this) {
          const dragSrcId = dragSrcEl.getAttribute('id').replace('task-', '')
          const dropTargetId = this.getAttribute('id').replace('task-', '')
      
          const dragSrcIndex = todoList.findIndex(task => task.id === parseInt(dragSrcId))
          const dropTargetIndex = todoList.findIndex(task => task.id === parseInt(dropTargetId))
      
          if (dragSrcIndex !== -1 && dropTargetIndex !== -1) {
            // Swap the tasks in the todoList array
            [todoList[dragSrcIndex], todoList[dropTargetIndex]] = [todoList[dropTargetIndex], todoList[dragSrcIndex]]
      
            // Update the local storage with the updated todoList
            localStorage.setItem('todoList', JSON.stringify(todoList))
          }
      
          dragSrcEl.innerHTML = this.innerHTML
          this.innerHTML = e.dataTransfer.getData('text/html')
        }
      
        return false
      }

    items.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart)
        item.addEventListener('dragover', handleDragOver)
        item.addEventListener('dragenter', handleDragEnter)
        item.addEventListener('dragleave', handleDragLeave)
        item.addEventListener('dragend', handleDragEnd)
        item.addEventListener('drop', handleDrop)
    })
})
