import TaskList from './TaskList.js';
import deleteIco from './delete.svg';
import moreIco from './more.svg';

class UI {
  static #heading = document.querySelector('.heading');

  static #newItem = document.querySelector('.input-row');

  static #taskNew = document.querySelector('#task-new');

  static #taskList = document.querySelector('#todo-list');

  static #template = document.querySelector('li');

  static getCheckBox = (taskElement) => taskElement.querySelector('input[type="checkbox"]');

  static getDeleBtn = (taskElement) => taskElement.querySelector('#dele');

  static getMoreBtn = (taskElement) => taskElement.querySelector('#more');

  static getTaskEdit = (taskElement) => taskElement.querySelector('#task-edit');

  static setActionButtons(taskElement, index) {
    const deleBtn = UI.getDeleBtn(taskElement);
    deleBtn.src = deleteIco;
    deleBtn.textContent = index;

    const moreBtn = UI.getMoreBtn(taskElement);
    moreBtn.src = moreIco;
    moreBtn.textContent = index;
  }

  static showActionButton = (taskElement, showMore) => {
    const deleBtn = UI.getDeleBtn(taskElement);
    deleBtn.classList.toggle('hidden', showMore);
    const moreBtn = UI.getMoreBtn(taskElement);
    moreBtn.classList.toggle('hidden', !showMore);
  };

  static displayTask = (task) => {
    const taskElement = UI.#template.cloneNode(true);
    UI.getCheckBox(taskElement).checked = task.completed;
    const taskEdit = UI.getTaskEdit(taskElement);
    taskEdit.value = task.description;
    UI.setActionButtons(taskElement, task.index);
    UI.showActionButton(taskElement, true);

    UI.#taskList.appendChild(taskElement);
  };

  static diplayTaskList = () => {
    const list = TaskList.getTaskList();
    list.forEach((task) => UI.displayTask(task));
  };

  static setup = () => {
    UI.diplayTaskList();
    UI.#taskNew.addEventListener('keypress', UI.add);
  };

  static add = (event) => {
    const editElement = event.target;
    if (event.key === 'Enter' && editElement.value) {
      const description = UI.#taskNew.value;
      const newTask = TaskList.add({ description });
      UI.displayTask(newTask);
      UI.#taskNew.value = '';
      event.preventDefault();
    }
  };
}

export default UI;
