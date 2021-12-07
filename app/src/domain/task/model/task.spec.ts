import { InvalidArgumentError } from 'src/__shared__/invalid-argument-error';
import { Task } from './task';

describe('Task', () => {
  test('新規作成したタスクは未完了である', () => {
    const task = Task.create({ title: 'task title', body: 'task body' });

    expect(task.isDone).toBe(false);
  });

  test('titleを修正できる', () => {
    const task = Task.create({ title: 'task title', body: 'task body' });
    const newTitle = 'task title edited';

    expect(task.changeTitle(newTitle).title).toEqual(newTitle);
  });

  test('bodyを修正できる', () => {
    const task = Task.create({ title: 'task title', body: 'task body' });
    const newBody = 'task body edited';

    expect(task.changeBody(newBody).body).toEqual(newBody);
  });

  test('タスクを完了にできる', () => {
    const task = Task.create({ title: 'task title', body: 'task body' });

    expect(task.complete().isDone).toBe(true);
  });

  test('完了にしたタスクを未完了に戻せる', () => {
    const doneTask = Task.create({
      title: 'task title',
      body: 'task body',
    }).complete();

    expect(doneTask.undo().isDone).toBe(false);
  });

  describe('タスクを再構築できる', () => {
    const id = 'id';
    const title = 'task title';
    const body = 'task body';
    const isDone = true;
    const createdAt = new Date();

    const task = Task.reconstruct({ id, title, body, isDone, createdAt });

    test('idが同じ', () => {
      expect(task.id.toString()).toEqual(id);
    });

    test('titleが同じ', () => {
      expect(task.title).toEqual(title);
    });

    test('bodyが同じ', () => {
      expect(task.body).toEqual(body);
    });

    test('isDoneが同じ', () => {
      expect(task.isDone).toEqual(isDone);
    });

    test('createdAtが同じ', () => {
      expect(task.createdAt).toEqual(createdAt);
    });
  });

  describe('入力値のバリデーション', () => {
    test('空のtitleは設定できない', () => {
      expect(() => Task.create({ title: '', body: 'body' })).toThrow(
        InvalidArgumentError,
      );
    });

    test('空のbodyは設定できない', () => {
      expect(() => Task.create({ title: 'title', body: '' })).toThrow(
        InvalidArgumentError,
      );
    });
  });
});
