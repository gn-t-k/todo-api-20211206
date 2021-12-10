import { Task } from 'src/domain/task/model/task';
import { CompleteTask } from '.';

describe('CompleteTask', () => {
  test('タスクを完了させる', async () => {
    const incompleteTask = Task.create({ title: 'title', body: 'body' });
    const mockUpdateTaskCommand = {
      execute: jest.fn(),
    };

    const completeTask = new CompleteTask(mockUpdateTaskCommand);

    await completeTask.execute({ task: incompleteTask });

    const arg: Task = mockUpdateTaskCommand.execute.mock.calls[0][0];
    expect(arg.isDone).toBe(true);
  });
});
