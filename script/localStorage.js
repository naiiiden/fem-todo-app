import { TodoTask } from "./classes.js"

export function getLocalStorage() {
    let todoList = []
    let taskId = 0
  
    if (localStorage.getItem('todoList')) {
        todoList = JSON.parse(localStorage.getItem('todoList'))
        taskId = Math.max(...todoList.map((task) => task.id), 0) + 1
        todoList.forEach((task) => {
            Object.setPrototypeOf(task, TodoTask.prototype)
        })
    }
  
    return { todoList, taskId }
}
  
export function setLocalStorage(todoList) {
    localStorage.setItem('todoList', JSON.stringify(todoList))
}