import TaskList from './TaskList.js';
import deleteIco from './delete.svg';
import enterIco from './return.svg';
import moreIco from './more.svg';
import renewIco from './renew.svg';

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

  static setFormIcons = () => {
    const renewIcon = new Image();
    renewIcon.src = renewIco;
    UI.#heading.appendChild(renewIcon);
    renewIcon.addEventListener('click', window.location.reload.bind(window.location));

    const enterIcon = new Image();
    enterIcon.src = enterIco;
    UI.#newItem.appendChild(enterIcon);
    enterIcon.addEventListener('click', UI.add);
  };

  static setActionButtons(taskElement, index) {
    const deleBtn = UI.getDeleBtn(taskElement);
    deleBtn.src = deleteIco;
    deleBtn.textContent = index;
    deleBtn.addEventListener('click', UI.remove);

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

    taskEdit.addEventListener('focusin', UI.modify);
    taskEdit.addEventListener('focusout', UI.modify);
    taskEdit.addEventListener('keypress', UI.modify);
  };

  static diplayTaskList = () => {
    const list = TaskList.getTaskList();
    list.forEach((task) => UI.displayTask(task));
  };

  static setup = () => {
    TaskList.getStore();
    UI.setFormIcons();
    UI.diplayTaskList();
    UI.#taskNew.addEventListener('keypress', UI.add);
  };

  static add = (event) => {
    const { type, key } = event;
    if (type === 'keypress' && key !== 'Enter') return;

    const description = UI.#taskNew.value.trim();
    if (description !== '') {
      const newTask = TaskList.add({ description });
      UI.displayTask(newTask);
      UI.#taskNew.value = '';
    }
    event.preventDefault();
  };

  static modify = (event) => {
    const { type, key, target } = event;
    if (type === 'keypress' && key !== 'Enter') return;

    const isModifying = type === 'focusin';

    const taskElement = target.parentElement;
    taskElement.classList.toggle('selected', isModifying);
    UI.showActionButton(taskElement, !isModifying);

    if (isModifying) return;

    const editElement = UI.getTaskEdit(taskElement);
    const value = editElement.value.trim();

    const moreElement = UI.getMoreBtn(taskElement);
    const index = parseInt(moreElement.textContent, 10);
    if (value !== '') {
      const checkboxElement = UI.getCheckBox(taskElement);
      TaskList.modify({
        description: value,
        completed: checkboxElement.checked,
        index,
      });
      UI.#taskNew.focus();
    } else UI.getDeleBtn(taskElement).dispatchEvent(new Event('click'));
  };

  static renumberTaskList = () => {
    if (UI.#taskList.hasChildNodes()) {
      const taskElements = UI.#taskList.childNodes;
      taskElements.forEach((taskElement, i) => {
        UI.getDeleBtn(taskElement).textContent = i + 1;
        UI.getMoreBtn(taskElement).textContent = i + 1;
      });
    }
  };

  static remove = (event) => {
    const btnElement = event.target;
    const taskElement = btnElement.parentElement;
    const { value } = UI.getTaskEdit(taskElement);
    if (value.trim() === '') {
      const index = parseInt(btnElement.textContent, 10);
      TaskList.remove(index);
      btnElement.parentElement.remove();
      UI.renumberTaskList();
      UI.#taskNew.focus();
    }
  };
}

export default UI;
