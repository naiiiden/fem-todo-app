export class TodoTask {
    constructor(task, completed = false, id) {
      this.task = task;
      this.completed = completed;
      this.id = id !== null ? id : ++taskId;
    }
}
  
TodoTask.prototype.changeCompleteStatus = function() {
    this.completed = !this.completed;
};