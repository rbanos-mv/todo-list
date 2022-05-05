import UI from '../src/UI.js';

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
});
