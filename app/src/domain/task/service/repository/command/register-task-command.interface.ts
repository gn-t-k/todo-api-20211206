import { Task } from 'src/domain/task/model/task';

export const REGISTER_TASK_COMMAND = 'REGISTER_TASK_COMMAND';

export interface IRegisterTaskCommand {
  execute: (task: Task) => Promise<void>;
}
