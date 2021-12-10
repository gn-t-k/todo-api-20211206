import { IFindTaskByIDQuery } from 'src/domain/task/service/query/find-task-by-id.interface';

type Props = {
  id: string;
};

export class FindTaskById {
  public constructor(private readonly findTaskByID: IFindTaskByIDQuery) {}

  public execute = async ({ id }: Props) => {
    const task = this.findTaskByID.execute(id);

    return task;
  };
}
