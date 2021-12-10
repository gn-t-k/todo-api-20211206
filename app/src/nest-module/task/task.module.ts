import { Module } from '@nestjs/common';
import { REGISTER_TASK_COMMAND_TOKEN } from 'src/domain/task/service/command/register-task-command.interface';
import { GET_ALL_TASK_QUERY_TOKEN } from 'src/domain/task/service/query/get-all-task-query.interface';
import { RegisterTaskCommand } from 'src/infrastructure/prisma/task/command/register-task-command';
import { GetAllTaskQuery } from 'src/infrastructure/prisma/task/query/get-all-task-query';
import { PrismaService } from 'src/nest-module/prisma.service';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    PrismaService,
    // Be careful not to forget the "@Injectable" decorator.
    {
      useClass: RegisterTaskCommand,
      provide: REGISTER_TASK_COMMAND_TOKEN,
    },
    {
      useClass: GetAllTaskQuery,
      provide: GET_ALL_TASK_QUERY_TOKEN,
    },
  ],
})
export class TaskModule {}
