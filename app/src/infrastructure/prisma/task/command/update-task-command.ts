import { Injectable } from '@nestjs/common';
import { Task } from 'src/domain/task/model/task';
import { IUpdateTaskCommand } from 'src/domain/task/service/command/update-task-command.interface';
import { PrismaService } from 'src/nest-module/prisma.service';

@Injectable()
export class UpdateTaskCommand implements IUpdateTaskCommand {
  public constructor(private readonly prismaService: PrismaService) {}

  public execute = async (task: Task) => {
    await this.prismaService.task.update({
      where: {
        id: task.id.toString(),
      },
      data: {
        title: task.title,
        body: task.body,
        isDone: task.isDone,
      },
    });
  };
}
