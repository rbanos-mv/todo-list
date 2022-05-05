import UI from '../src/UI.js';
import TaskList from '../src/TaskList.js';

const htmlDocument = `
  <section>
    <div class="heading">
      <h1>Today's To Do</h1>
    </div>
    <form>
      <div class="input-row">
        <input id="task-new" type="text" placeholder="Add to your list" />
      </div>
      <ul id="todo-list"></ul>
      <button type="button">Clear All Completed</button>
    </form>
  </section>
  <ul class="hidden">
    <li>
      <input type="checkbox" />
      <input id="task-edit" type="text" />
      <img id="more" class="more" src="#" alt="#">1</img>
      <img id="dele" class="more" src="#" alt="#">1</img>
    </li>
  </ul>`;

const liHtml = `<li>
    <input type="checkbox" />
    <input id="task-edit" type="text" value="old description" />
    <img id="more" class="more" src="#" alt="#">1</img>
    <img id="dele" class="more" src="#" alt="#">1</img>
  </li>`;

const li4Html = `<li>
    <input type="checkbox" checked />
    <input id="task-edit" type="text" value="111" />
    <img id="more" class="more" src="#" alt="#">1</img>
    <img id="dele" class="more" src="#" alt="#">1</img>
  </li><li>
    <input type="checkbox" />
    <input id="task-edit" type="text" value="222" />
    <img id="more" class="more" src="#" alt="#">2</img>
    <img id="dele" class="more" src="#" alt="#">2</img>
  </li><li>
    <input type="checkbox" checked />
    <input id="task-edit" type="text" value="333" />
    <img id="more" class="more" src="#" alt="#">3</img>
    <img id="dele" class="more" src="#" alt="#">3</img>
  </li><li>
    <input type="checkbox" />
    <input id="task-edit" type="text" value="444" />
    <img id="more" class="more" src="#" alt="#">4</img>
    <img id="dele" class="more" src="#" alt="#">4</img>
  </li>`;

describe('User Interface', () => {
  let before = null;

  beforeEach(() => {
    document.body.innerHTML = htmlDocument;
    before = document.querySelectorAll('#todo-list li');
    const inputText = document.getElementById('task-new');
    inputText.value = 'Mock Test';
  });

  it('add(event)', () => {
    const event = {
      type: 'keypress',
      key: 'Enter',
      target: document.getElementById('task-new'),
      preventDefault: () => {},
    };

    UI.add(event);

    const after = document.querySelectorAll('#todo-list li');
    expect(after).toBeDefined();
    expect(after).toHaveLength(before.length + 1);
  });

  it('remove(index)', () => {
    const task = {
      description: 'This is the description',
      completed: false,
      index: 1,
    };

    UI.displayTask(task);
    const after = document.querySelectorAll('#todo-list li');
    expect(after).toBeDefined();
    expect(after).toHaveLength(before.length + 1);

    const list = document.querySelector('#todo-list');
    const btnElement = list.querySelector('#dele');

    const event = {
      type: 'click',
      target: btnElement,
      preventDefault: () => {},
    };

    const beforeDelete = document.querySelectorAll('#todo-list li');
    expect(UI.remove(event));
    const afterDelete = document.querySelectorAll('#todo-list li');
    expect(afterDelete).toBeDefined();
    expect(afterDelete).toHaveLength(beforeDelete.length - 1);
  });

  it('modify(event)', () => {
    const list = document.querySelector('#todo-list');
    list.innerHTML = liHtml;
    const descriptionElement = list.querySelector('#task-edit');
    const oldDescription = descriptionElement.value;
    const newDescription = 'Description is new';
    descriptionElement.value = newDescription;
    list.querySelector('#dele').textContent = '1';
    list.querySelector('#more').textContent = '1';
    TaskList.setStore([
      {
        description: oldDescription,
        completed: false,
        index: 1,
      },
    ]);
    const event = {
      type: 'focusout',
      key: null,
      target: descriptionElement,
    };

    UI.modify(event);

    const childElements = list.childNodes;
    expect(childElements).toBeDefined();
    expect(childElements).toHaveLength(1);
    expect(descriptionElement.value).not.toBe(oldDescription);
    expect(descriptionElement.value).toBe(newDescription);
    expect(TaskList.getTaskList()).toHaveLength(1);
    expect(TaskList.get(1).description).toBe(newDescription);
  });

  it('updateCompleted(event)', () => {
    const list = document.querySelector('#todo-list');
    list.innerHTML = liHtml;
    const cbElement = list.querySelector('input[type="checkbox"]');
    list.querySelector('#dele').textContent = '1';
    list.querySelector('#more').textContent = '1';
    TaskList.setStore([
      {
        description: 'old description',
        completed: false,
        index: 1,
      },
    ]);
    const event = {
      type: 'click',
      key: null,
      target: cbElement,
    };
    cbElement.checked = true;

    UI.updateCompleted(event);
    let childElements = list.childNodes;
    expect(childElements).toBeDefined();
    expect(childElements).toHaveLength(1);
    expect(TaskList.getTaskList()).toHaveLength(1);
    expect(TaskList.get(1).completed).toBe(true);

    cbElement.checked = false;

    UI.updateCompleted(event);
    childElements = list.childNodes;
    expect(childElements).toBeDefined();
    expect(childElements).toHaveLength(1);
    expect(TaskList.getTaskList()).toHaveLength(1);
    expect(TaskList.get(1).completed).toBe(false);
  });

  it('clearCompleted()', () => {
    const list = document.querySelector('#todo-list');
    list.innerHTML = li4Html;
    const cbElements = list.querySelectorAll('input[type="checkbox"]');
    cbElements.forEach((cb, i) => {
      cb.textContent = i;
    });
    TaskList.setStore([
      {
        description: '111',
        completed: true,
        index: 1,
      },
      {
        description: '222',
        completed: false,
        index: 2,
      },
      {
        description: '333',
        completed: true,
        index: 3,
      },
      {
        description: '444',
        completed: false,
        index: 4,
      },
    ]);

    UI.clearCompleted();

    const childElements = list.childNodes;
    expect(childElements).toBeDefined();
    expect(childElements).toHaveLength(2);
    expect(TaskList.getTaskList()).toHaveLength(2);
    expect(TaskList.get(1).index).toBe(1);
    expect(TaskList.get(1).description).toBe('222');
    expect(TaskList.get(2).index).toBe(2);
    expect(TaskList.get(2).description).toBe('444');
  });
});
