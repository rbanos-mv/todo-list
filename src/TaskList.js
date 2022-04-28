class TaskList {
  static #taskList = [];

  static #lsTaskList = 'taskList';

  static getTaskList = () => TaskList.#taskList;

  static setStore() {
    localStorage.setItem(TaskList.#lsTaskList, JSON.stringify(TaskList.#taskList));
  }

  static getStore() {
    TaskList.#taskList = JSON.parse(localStorage.getItem(TaskList.#lsTaskList) || '[]');
  }

  static add = (task) => {
    const index = TaskList.#taskList.length + 1;
    const newTask = { ...task, completed: false, index };
    TaskList.#taskList.push(newTask);
    TaskList.setStore();
    return newTask;
  };

  static get = (index) => TaskList.#taskList[index - 1];

  static modify = (task) => {
    const { index } = task;
    TaskList.#taskList[index - 1] = task;
    TaskList.setStore();
  };

  static remove = (index) => {
    const list = TaskList.#taskList.filter((task) => task.index !== index);
    TaskList.#taskList = list.map((task, i) => ({ ...task, index: i + 1 }));
    TaskList.setStore();
  };

  static updateCompleted = (id, checked) => {
    const task = TaskList.get(id);
    task.completed = checked;
    TaskList.modify(task);
  };

  static clearCompleted = () => {
    const list = TaskList.#taskList.filter((task) => !task.completed);
    TaskList.#taskList = list.map((task, i) => ({ ...task, index: i + 1 }));
    TaskList.setStore();
  };
}

export default TaskList;
