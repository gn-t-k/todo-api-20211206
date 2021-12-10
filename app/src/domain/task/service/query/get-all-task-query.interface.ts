type Task = {
  title: string;
  body: string;
  isDone: boolean;
  createdAt: Date;
};

export const GET_ALL_TASK_QUERY_TOKEN = 'GET_ALL_TASK_QUERY_TOKEN';

export type IGetAllTaskQuery = {
  execute: () => Promise<Task[]>;
};
