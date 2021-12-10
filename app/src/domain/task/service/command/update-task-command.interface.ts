import { Task } from 'src/domain/task/model/task';

export const UPDATE_TASK_COMMAND_TOKEN = 'UPDATE_TASK_COMMAND_TOKEN' as const;

export type IUpdateTaskCommand = {
  execute: (task: Task) => Promise<void>;
};
