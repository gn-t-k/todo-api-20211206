import { Body, Controller, Get, Post } from '@nestjs/common';
import { handleError } from 'src/__shared__/error/handle-error';
import { CompleteDto } from './dto/complete-dto';
import { CreateDto } from './dto/create-dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  public constructor(private readonly taskService: TaskService) {}

  @Get('/')
  public async getAll() {
    try {
      const taskList = await this.taskService.getAll();

      return taskList;
    } catch (error) {
      handleError(error);
    }
  }

  @Post('/create')
  public async create(@Body() createDto: CreateDto) {
    try {
      const { title, body } = createDto;

      await this.taskService.create({ title, body });
    } catch (error) {
      handleError(error);
    }
  }

  @Post('/complete')
  public async complete(@Body() completeDto: CompleteDto) {
    try {
      const { id } = completeDto;

      await this.taskService.complete({ id });
    } catch (error) {
      handleError(error);
    }
  }
}
