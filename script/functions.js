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
        todoListDisplay = todoList.filter(task => !task.completed).map(task => renderTask(task, tasksContainer))
      } else if (completeRadioBtn.checked) {
        todoListDisplay = todoList.filter(task => task.completed).map(task => renderTask(task, tasksContainer))
      } else {
        todoListDisplay = todoList.map(task => renderTask(task, tasksContainer))
      }
      tasksContainer.innerHTML = todoListDisplay
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

export function renderTask(task, tasksContainer) {
  const taskElement = document.createElement('li')
  taskElement.id = `task-${task.id}`
  taskElement.dataset.key = task.id
  taskElement.innerHTML = `
    <input type='checkbox' class='complete-task-checkbox haha' ${task.completed ? 'checked' : ''} aria-label='Mark "${task.task}" as ${task.completed ? "incomplete" : "complete"}'/>
    <span>task: ${task.task}, completed: <span class='completed-status-span'>${task.completed ? 'completed' : 'not completed'}</span></span>
    <button class='delete-task-button'>delete</button>`
  tasksContainer.appendChild(taskElement)
}