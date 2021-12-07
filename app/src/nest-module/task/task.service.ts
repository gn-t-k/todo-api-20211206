import { Inject, Injectable } from '@nestjs/common';
import {
  IRegisterTaskCommand,
  REGISTER_TASK_COMMAND,
} from 'src/domain/task/service/command/register-task-command.interface';
import { CreateTask } from 'src/use-case/create-task';

type CreateTaskProps = {
  title: string;
  body: string;
};

@Injectable()
export class TaskService {
  public constructor(
    @Inject(REGISTER_TASK_COMMAND)
    private readonly registerTaskCommand: IRegisterTaskCommand,
  ) {}

  public createTask = async ({ title, body }: CreateTaskProps) => {
    const createTask = new CreateTask(this.registerTaskCommand);

    await createTask.execute({ title, body });
  };
}
