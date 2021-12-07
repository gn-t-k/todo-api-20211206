import { Task } from 'src/domain/task/model/task';
import { CreateTask } from './create-task';

describe('CreateTask', () => {
  const registerTaskCommand = {
    execute: jest.fn(),
  };
  const createTask = new CreateTask(registerTaskCommand);

  test('taskオブジェクトを作成してcommandを実行する', async () => {
    const title = 'title';
    const body = 'body';

    await createTask.execute({ title, body });

    const arg: Task = registerTaskCommand.execute.mock.calls[0][0];
    const isSameTask = arg.title === title && arg.body === body;

    expect(isSameTask).toBe(true);
  });
});
