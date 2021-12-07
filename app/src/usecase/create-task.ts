import { Task } from 'src/domain/task/model/task';
import { IRegisterTaskCommand } from 'src/domain/task/service/repository/command/register-task-command.interface';

type Props = {
  title: string;
  body: string;
};

export class CreateTask {
  public constructor(
    private readonly registerTaskCommand: IRegisterTaskCommand,
  ) {}

  public execute = async ({ title, body }: Props) => {
    const task = Task.create({ title, body });

    await this.registerTaskCommand.execute(task);
  };
}
