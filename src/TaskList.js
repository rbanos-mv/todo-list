class TaskList {
  static #taskList = [];

  static getTaskList = () => TaskList.#taskList;

  static add = (task) => {
    const index = TaskList.#taskList.length + 1;
    const newTask = { ...task, completed: false, index };
    TaskList.#taskList.push(newTask);
    return newTask;
  };

  static get = (index) => TaskList.#taskList[index - 1];

  static modify = (task) => {
    const { index } = task;
    TaskList.#taskList[index - 1] = task;
  };

  static remove = (index) => {
    const list = TaskList.#taskList.filter((task) => task.index !== index);
    TaskList.#taskList = list.map((task, i) => ({ ...task, index: i + 1 }));
  };
}

export default TaskList;
