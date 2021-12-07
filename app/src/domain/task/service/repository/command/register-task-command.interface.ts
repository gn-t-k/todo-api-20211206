import { Task } from 'src/domain/task/model/task';

export interface IRegisterTaskCommand {
  execute: (task: Task) => Promise<void>;
}
