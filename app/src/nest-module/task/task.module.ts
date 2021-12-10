import { Module } from '@nestjs/common';
import { REGISTER_TASK_COMMAND } from 'src/domain/task/service/command/register-task-command.interface';
import { RegisterTaskCommand } from 'src/infrastructure/prisma/task/command/register-task-command';
import { PrismaService } from 'src/nest-module/prisma.service';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    PrismaService,
    {
      useClass: RegisterTaskCommand,
      provide: REGISTER_TASK_COMMAND,
    },
  ],
})
export class TaskModule {}
