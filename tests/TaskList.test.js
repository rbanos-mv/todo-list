import TaskList from '../src/TaskList.js';

describe('Task List', () => {
  it('add(task)', () => {
    const task = {
      description: 'This is the description',
      completed: false,
      index: 1,
    };
    expect(TaskList.add(task)).toStrictEqual(task);
    expect(TaskList.getTaskList().length).toBe(1);
    expect(TaskList.getTaskList()[0]).toStrictEqual(task);
  });

  it('remove(index)', () => {
    TaskList.setStore([
      {
        description: 'This is the description',
        completed: false,
        index: 1,
      },
    ]);

    expect(TaskList.remove(1));
    expect(TaskList.getTaskList().length).toBe(0);
    expect(TaskList.getTaskList()).toStrictEqual([]);
  });

  it('modify(task)', () => {
    TaskList.setStore([
      {
        description: 'This is the description',
        completed: false,
        index: 1,
      },
    ]);

    const modifiedTask = {
      description: 'Modified description',
      completed: false,
      index: 1,
    };

    TaskList.modify(modifiedTask);

    expect(TaskList.getTaskList()).toHaveLength(1);
    expect(TaskList.get(1)).toBe(modifiedTask);
  });

  it('updateCompleted(id, checked)', () => {
    TaskList.setStore([
      {
        description: 'This is the description',
        completed: false,
        index: 1,
      },
    ]);

    TaskList.updateCompleted(1, true);
    expect(TaskList.getTaskList()).toHaveLength(1);
    expect(TaskList.get(1).completed).toBe(true);

    TaskList.updateCompleted(1, false);
    expect(TaskList.getTaskList()).toHaveLength(1);
    expect(TaskList.get(1).completed).toBe(false);
  });

  it('clearCompleted()', () => {
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

    TaskList.clearCompleted();
    expect(TaskList.getTaskList()).toHaveLength(2);
    expect(TaskList.get(1).index).toBe(1);
    expect(TaskList.get(1).description).toBe('222');
    expect(TaskList.get(2).index).toBe(2);
    expect(TaskList.get(2).description).toBe('444');
  });
});
