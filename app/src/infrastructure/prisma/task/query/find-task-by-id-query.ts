import { Injectable } from '@nestjs/common';
import { Task } from 'src/domain/task/model/task';
import { IFindTaskByIDQuery } from 'src/domain/task/service/query/find-task-by-id.interface';
import { PrismaService } from 'src/nest-module/prisma.service';

@Injectable()
export class FindTaskByIdQuery implements IFindTaskByIDQuery {
  public constructor(private readonly prismaService: PrismaService) {}

  public execute = async (id: string) => {
    const taskData = await this.prismaService.task.findUnique({
      where: {
        id,
      },
    });

    const task =
      taskData !== null
        ? Task.reconstruct({
            id: taskData.id,
            title: taskData.title,
            body: taskData.body,
            isDone: taskData.isDone,
            createdAt: taskData.createdAt,
          })
        : null;

    return task;
  };
}
