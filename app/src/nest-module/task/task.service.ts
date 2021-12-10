import { Inject, Injectable } from '@nestjs/common';
import {
  IRegisterTaskCommand,
  REGISTER_TASK_COMMAND_TOKEN,
} from 'src/domain/task/service/command/register-task-command.interface';
import {
  IUpdateTaskCommand,
  UPDATE_TASK_COMMAND_TOKEN,
} from 'src/domain/task/service/command/update-task-command.interface';
import {
  FIND_TASK_BY_ID_QUERY_TOKEN,
  IFindTaskByIDQuery,
} from 'src/domain/task/service/query/find-task-by-id.interface';
import {
  GET_ALL_TASK_QUERY_TOKEN,
  IGetAllTaskQuery,
} from 'src/domain/task/service/query/get-all-task-query.interface';
import { CompleteTask } from 'src/use-case/complete-task';
import { CreateTask } from 'src/use-case/create-task';
import { FindTaskById } from 'src/use-case/find-task-by-id';
import { GetAllTask } from 'src/use-case/get-all-task';
import { ResourceNotFoundError } from 'src/__shared__/error/resource-not-found-error';

type CreateProps = {
  title: string;
  body: string;
};

type FindByIDProps = {
  id: string;
};

type CompleteProps = {
  id: string;
};

@Injectable()
export class TaskService {
  public constructor(
    @Inject(REGISTER_TASK_COMMAND_TOKEN)
    private readonly registerTaskCommand: IRegisterTaskCommand,
    @Inject(GET_ALL_TASK_QUERY_TOKEN)
    private readonly getAllTaskQuery: IGetAllTaskQuery,
    @Inject(FIND_TASK_BY_ID_QUERY_TOKEN)
    private readonly findTaskByIDQuery: IFindTaskByIDQuery,
    @Inject(UPDATE_TASK_COMMAND_TOKEN)
    private readonly updateTaskCommand: IUpdateTaskCommand,
  ) {}

  public getAll = async () => {
    const getAllTask = new GetAllTask(this.getAllTaskQuery);
    const taskList = await getAllTask.execute();

    return taskList;
  };

  public findByID = async ({ id }: FindByIDProps) => {
    const findTaskByID = new FindTaskById(this.findTaskByIDQuery);
    const task = await findTaskByID.execute({ id });

    return task;
  };

  public create = async ({ title, body }: CreateProps) => {
    const createTask = new CreateTask(this.registerTaskCommand);

    await createTask.execute({ title, body });
  };

  public complete = async ({ id }: CompleteProps) => {
    const task = await this.findByID({ id });

    if (task === null) {
      throw new ResourceNotFoundError('task not found');
    }

    const completeTask = new CompleteTask(this.updateTaskCommand);

    await completeTask.execute({ task });
  };
}
