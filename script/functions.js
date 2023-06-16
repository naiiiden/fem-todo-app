export function noTasksDisplay(todoList) {
  const emptyTaskList = document.querySelector('.empty-list-message')
  const activeRadioBtn = document.querySelector('#active')
  const completeRadioBtn = document.querySelector('#completed')
  const emptyListContainer = document.querySelector('.empty-list-container')

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
      emptyTaskList.textContent = 'No active tasks'
    } else if (completeRadioBtn.checked) {
      emptyTaskList.textContent = 'No completed tasks'
    } else {
      emptyTaskList.textContent = 'No tasks'
    }
    emptyListContainer.style.display = 'block'
  } else {
    emptyListContainer.style.display = 'none'
  }
}

export function updateTasksAndClearButtonDisableIfEmpty(todoList) {
    document.querySelector('.total-tasks').textContent = `${todoList.length} items left`
    let clearButton = document.querySelector('.clear-completed')

    console.log(todoList.length)

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
    <input type='checkbox' id='task-id-${task.id}' class='complete-task-checkbox' ${task.completed ? 'checked' : ''} aria-label='Mark "${task.task}" as ${task.completed ? "incomplete" : "complete"}' aria-live='polite'/>
    <label for='task-id-${task.id}'>${task.task}</label>
    <button class='delete-task-button' aria-label='Delete task: "${task.task}"'></button>`
  tasksContainer.appendChild(taskElement)
}