import { Task } from 'src/domain/task/model/task';
import { sleep } from 'src/__shared__/util/sleep';
import { FindTaskById } from '.';

describe('FindTaskById', () => {
  test('タスクを取得できる', async () => {
    const taskProps = {
      id: 'id',
      title: 'title',
      body: 'body',
      isDone: false,
      createdAt: new Date(),
    };
    const mockTask = Task.reconstruct(taskProps);
    const mockFindTaskByIDQuery = {
      execute: async () => {
        await sleep(1);

        return mockTask;
      },
    };

    const findTaskByID = new FindTaskById(mockFindTaskByIDQuery);
    const task = await findTaskByID.execute({ id: taskProps.id });

    expect(task?.isEqualTo(mockTask)).toBe(true);
  });

  test('タスクがなかった場合nullを返す', async () => {
    const mockTask = null;
    const mockFindTaskByIDQuery = {
      execute: async () => {
        await sleep(1);

        return mockTask;
      },
    };

    const findTaskByID = new FindTaskById(mockFindTaskByIDQuery);
    const task = await findTaskByID.execute({ id: 'id' });

    expect(task).toEqual(null);
  });
});
