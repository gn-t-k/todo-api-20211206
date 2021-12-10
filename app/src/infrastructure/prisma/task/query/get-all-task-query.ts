import { Injectable } from '@nestjs/common';
import { IGetAllTaskQuery } from 'src/domain/task/service/query/get-all-task-query.interface';
import { PrismaService } from 'src/nest-module/prisma.service';

@Injectable()
export class GetAllTaskQuery implements IGetAllTaskQuery {
  public constructor(private readonly prismaService: PrismaService) {}

  public execute = async () => {
    const taskList = await this.prismaService.task.findMany();

    return taskList;
  };
}
