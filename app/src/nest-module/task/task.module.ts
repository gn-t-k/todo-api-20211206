import { Module } from '@nestjs/common';
import { REGISTER_TASK_COMMAND_TOKEN } from 'src/domain/task/service/command/register-task-command.interface';
import { UPDATE_TASK_COMMAND_TOKEN } from 'src/domain/task/service/command/update-task-command.interface';
import { FIND_TASK_BY_ID_QUERY_TOKEN } from 'src/domain/task/service/query/find-task-by-id.interface';
import { GET_ALL_TASK_QUERY_TOKEN } from 'src/domain/task/service/query/get-all-task-query.interface';
import { RegisterTaskCommand } from 'src/infrastructure/prisma/task/command/register-task-command';
import { UpdateTaskCommand } from 'src/infrastructure/prisma/task/command/update-task-command';
import { FindTaskByIdQuery } from 'src/infrastructure/prisma/task/query/find-task-by-id-query';
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
    {
      useClass: FindTaskByIdQuery,
      provide: FIND_TASK_BY_ID_QUERY_TOKEN,
    },
    {
      useClass: UpdateTaskCommand,
      provide: UPDATE_TASK_COMMAND_TOKEN,
    },
  ],
})
export class TaskModule {}
