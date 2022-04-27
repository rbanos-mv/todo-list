import TaskList from './TaskList.js';
import more from './more.svg';

class UI {
  static #heading = document.querySelector('.heading');

  static #newItem = document.querySelector('.input-row');

  static #taskInput = document.querySelector('#task-input');

  static #taskList = document.querySelector('#todo-list');

  static #template = document.querySelector('li');

  static displayTask = (task) => {
    const taskElement = UI.#template.cloneNode(true);
    taskElement.querySelector('input').checked = task.completed;
    taskElement.querySelector('label').lastChild.textContent = task.description;
    taskElement.querySelector('img').src = more;
    UI.#taskList.appendChild(taskElement);
  };

  static diplayTaskList = () => {
    const list = TaskList.getTaskList();
    list.forEach((task) => UI.displayTask(task));
  };

  static setup = () => {
    UI.diplayTaskList();
  };
}

export default UI;
