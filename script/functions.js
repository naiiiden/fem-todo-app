export function noTasksDisplay(todoList, tasksContainer, todoListDisplay) {
    const emptyTaskList = document.querySelector('.empty-list-message')
    const activeRadioBtn = document.querySelector('#active')
    const completeRadioBtn = document.querySelector('#completed')
  
    if (todoList.length === 0 || (activeRadioBtn.checked && !todoList.some(task => !task.completed)) || (completeRadioBtn.checked && !todoList.some(task => task.completed))) {
      emptyTaskList.style.display = 'block'
      tasksContainer.innerHTML = ''
      if (activeRadioBtn.checked) {
        emptyTaskList.textContent = 'no active tasks'
      } else if (completeRadioBtn.checked) {
        emptyTaskList.textContent = 'no completed tasks'
      } else {
        emptyTaskList.textContent = 'no tasks'
      }
    } else {
      emptyTaskList.style.display = 'none'
      if (activeRadioBtn.checked) {
        todoListDisplay = todoList.filter(task => !task.completed).map(task => displayTasks(task))
      } else if (completeRadioBtn.checked) {
        todoListDisplay = todoList.filter(task => task.completed).map(task => displayTasks(task))
      } else {
        todoListDisplay = todoList.map(task => displayTasks(task))
      }
      tasksContainer.innerHTML = todoListDisplay.join('')
    }
}

export function updateTasksAndClearButtonDisableIfEmpty(todoList) {
    document.querySelector('.total-tasks').textContent = `${todoList.length} items left`
    let clearButton = document.querySelector('.clear-completed')

    if (todoList.length === 0) {
        clearButton.disabled = true
    } else {
        clearButton.disabled = false
    }
}

export function displayTasks(task) { 
    return `
    <li id=task-${task.id} key=${task.id}>
        <input type='checkbox' class='complete-task-checkbox' ${task.completed ? 'checked' : null}/>
        <span>task: ${task.task}, completed: <span class='completed-status-span'>${task.completed ? 'completed' : 'not completed'}</span></span>
        <button class='delete-task-button'>delete</button>
    </li>`
}