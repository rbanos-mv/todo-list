class TaskList {
  static #taskList = [];

  static getTaskList = () => this.#taskList;
}

export default TaskList;
