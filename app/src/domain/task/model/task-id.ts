import { UniqueEntityId } from 'src/domain/__shared__/unique-entity-id';
import { v4 as uuid } from 'uuid';

export class TaskId extends UniqueEntityId {
  private constructor(value: string) {
    super(value, 'TaskId');
  }

  public static create = () => new TaskId(uuid());

  public static reconstruct = (value: string) => new TaskId(value);
}
