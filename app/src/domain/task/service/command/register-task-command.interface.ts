import { Task } from 'src/domain/task/model/task';

export const REGISTER_TASK_COMMAND_TOKEN =
  'REGISTER_TASK_COMMAND_TOKEN' as const;

export interface IRegisterTaskCommand {
  execute: (task: Task) => Promise<void>;
}
