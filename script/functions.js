export function noTasksDisplay(todoList) {
  const emptyTaskList = document.querySelector('.empty-list-message')
  const activeRadioBtn = document.querySelector('#active')
  const completeRadioBtn = document.querySelector('#completed')

  let filteredTasks = []
  if (activeRadioBtn.checked) {
    filteredTasks = todoList.filter(task => !task.completed)
  } else if (completeRadioBtn.checked) {
    filteredTasks = todoList.filter(task => task.completed)
  } else {
    filteredTasks = todoList
  }

  if (filteredTasks.length === 0) {
    if (activeRadioBtn.checked) {
      emptyTaskList.textContent = 'no active tasks'
    } else if (completeRadioBtn.checked) {
      emptyTaskList.textContent = 'no completed tasks'
    } else {
      emptyTaskList.textContent = 'no tasks'
    }
    emptyTaskList.style.display = 'block'
  } else {
    emptyTaskList.style.display = 'none'
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
  taskElement.draggable = true
  taskElement.innerHTML = `
    <input type='checkbox' class='complete-task-checkbox' ${task.completed ? 'checked' : ''} aria-label='Mark "${task.task}" as ${task.completed ? "incomplete" : "complete"}'/>
    <span>${task.task}</span>
    <button class='delete-task-button' aria-label='Delete task: "${task.task}"'><img src="images/icon-cross.svg" alt=""></button>`
  tasksContainer.appendChild(taskElement)
}