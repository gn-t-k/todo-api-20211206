import { Task } from 'src/domain/task/model/task';

export const FIND_TASK_BY_ID_QUERY_TOKEN = 'FIND_TASK_BY_ID_QUERY_TOKEN';

export type IFindTaskByIDQuery = {
  execute: (id: string) => Promise<Task | null>;
};
