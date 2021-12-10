import { sleep } from 'src/__shared__/util/sleep';
import { GetAllTask } from '.';

describe('GetAllTask', () => {
  const mockTaskList = [
    {
      title: 'title1',
      body: 'body1',
      isDone: true,
      createdAt: new Date(),
    },
    {
      title: 'title2',
      body: 'body2',
      isDone: false,
      createdAt: new Date(),
    },
  ];
  const mockGetAllTaskQuery = {
    execute: async () => {
      await sleep(1);

      return mockTaskList;
    },
  };

  test('すべてのタスクを取得できる', async () => {
    const getAllTask = new GetAllTask(mockGetAllTaskQuery);
    const taskList = await getAllTask.execute();

    const isSameTaskList = taskList.every(
      (task, index) =>
        task.title === mockTaskList[index].title &&
        task.body === mockTaskList[index].body &&
        task.isDone === mockTaskList[index].isDone,
    );

    expect(isSameTaskList).toBe(true);
  });
});
