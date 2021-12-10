import { Task } from 'src/domain/task/model/task';
import { IUpdateTaskCommand } from 'src/domain/task/service/command/update-task-command.interface';

type Props = {
  task: Task;
};

export class CompleteTask {
  public constructor(private readonly updateTaskCommand: IUpdateTaskCommand) {}

  public execute = async ({ task }: Props) => {
    await this.updateTaskCommand.execute(task.complete());
  };
}
