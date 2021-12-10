import { IGetAllTaskQuery } from 'src/domain/task/service/query/get-all-task-query.interface';

export class GetAllTask {
  public constructor(private readonly getAllTaskQuery: IGetAllTaskQuery) {}

  public execute = async () => {
    const taskList = await this.getAllTaskQuery.execute();

    return taskList;
  };
}
