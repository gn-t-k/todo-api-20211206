import { Injectable } from '@nestjs/common';
import { Task } from 'src/domain/task/model/task';
import { IRegisterTaskCommand } from 'src/domain/task/service/repository/command/register-task-command.interface';
import { PrismaService } from 'src/nest-module/prisma.service';

@Injectable()
export class RegisterTaskCommand implements IRegisterTaskCommand {
  public constructor(private readonly prismaService: PrismaService) {}

  public execute = async (task: Task) => {
    const id = task.id.toString();
    const { title, body, isDone, createdAt } = task;

    await this.prismaService.task.create({
      data: {
        id,
        title,
        body,
        isDone,
        createdAt,
      },
    });
  };
}
