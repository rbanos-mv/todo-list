class TaskList {
  static #taskList = [
    { description: 'aaa', completed: true, index: 1 },
    { description: 'bbb', completed: true, index: 2 },
    { description: 'ccc', completed: false, index: 3 },
    { description: 'ddd', completed: false, index: 4 },
  ];

  static getTaskList = () => this.#taskList;
}

export default TaskList;
