import { Inject, Injectable } from '@nestjs/common';
import {
  IRegisterTaskCommand,
  REGISTER_TASK_COMMAND_TOKEN,
} from 'src/domain/task/service/command/register-task-command.interface';
import {
  GET_ALL_TASK_QUERY_TOKEN,
  IGetAllTaskQuery,
} from 'src/domain/task/service/query/get-all-task-query.interface';
import { CreateTask } from 'src/use-case/create-task';
import { GetAllTask } from 'src/use-case/get-all-task';

type CreateProps = {
  title: string;
  body: string;
};

@Injectable()
export class TaskService {
  public constructor(
    @Inject(REGISTER_TASK_COMMAND_TOKEN)
    private readonly registerTaskCommand: IRegisterTaskCommand,
    @Inject(GET_ALL_TASK_QUERY_TOKEN)
    private readonly getAllTaskQuery: IGetAllTaskQuery,
  ) {}

  public getAll = async () => {
    const getAllTask = new GetAllTask(this.getAllTaskQuery);
    const taskList = await getAllTask.execute();

    return taskList;
  };

  public create = async ({ title, body }: CreateProps) => {
    const createTask = new CreateTask(this.registerTaskCommand);

    await createTask.execute({ title, body });
  };
}
