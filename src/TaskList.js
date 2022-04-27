class TaskList {
  static #taskList = [];

  static getTaskList = () => this.#taskList;

  static add = (task) => {
    const index = (TaskList.#taskList.length + 1).toString();
    const newTask = { ...task, completed: false, index };
    TaskList.#taskList.push(newTask);
    return newTask;
  };
}

export default TaskList;
