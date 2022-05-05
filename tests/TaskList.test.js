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
    const tasks = [
      {
        description: 'This is the description',
        completed: false,
        index: 1,
      },
    ];
    TaskList.setStore(tasks);

    expect(TaskList.remove(1));
    expect(TaskList.getTaskList().length).toBe(0);
    expect(TaskList.getTaskList()).toStrictEqual([]);
  });
});
