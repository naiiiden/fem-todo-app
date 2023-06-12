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
    <button class='delete-task-button' aria-label='Delete task: "${task.task}"'>delete</button>`
  tasksContainer.appendChild(taskElement)
}