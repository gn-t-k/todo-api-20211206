import { AggregateRoot } from 'src/domain/__shared__/aggregate-root';
import { InvalidArgumentError } from 'src/__shared__/error/invalid-argument-error';
import { TaskId } from './task-id';

type TaskProps = {
  title: string;
  body: string;
  isDone: boolean;
  createdAt: Date;
};
type CreateProps = Pick<TaskProps, 'title' | 'body'>;
type ReconstructProps = TaskProps & { id: string };

export class Task extends AggregateRoot<TaskProps, TaskId> {
  public static create = (props: CreateProps) =>
    new Task(
      {
        title: Task.validateTitle(props.title),
        body: Task.validateBody(props.body),
        isDone: false,
        createdAt: new Date(),
      },
      TaskId.create(),
    );

  public static reconstruct = (props: ReconstructProps) =>
    new Task(
      {
        title: Task.validateTitle(props.title),
        body: Task.validateBody(props.body),
        isDone: props.isDone,
        createdAt: props.createdAt,
      },
      TaskId.reconstruct(props.id),
    );

  public get title() {
    return this.props.title;
  }

  public get body() {
    return this.props.body;
  }

  public get isDone() {
    return this.props.isDone;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public changeTitle = (title: string) => {
    this.props.title = title;

    return this;
  };

  public changeBody = (body: string) => {
    this.props.body = body;

    return this;
  };

  public complete = () => {
    this.props.isDone = true;

    return this;
  };

  public undo = () => {
    this.props.isDone = false;

    return this;
  };

  private static validateTitle = (title: string) => {
    if (title === '') {
      throw new InvalidArgumentError('title must not be empty');
    }

    return title;
  };

  private static validateBody = (body: string) => {
    if (body === '') {
      throw new InvalidArgumentError('body must not be empty');
    }

    return body;
  };
}
