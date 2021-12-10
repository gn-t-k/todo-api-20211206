import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { InvalidArgumentError } from 'src/__shared__/invalid-argument-error';
import { CreateDto } from './dto/create-dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  public constructor(private readonly taskService: TaskService) {}

  @Post()
  public async create(@Body() createDto: CreateDto) {
    try {
      const { title, body } = createDto;

      await this.taskService.create({ title, body });
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError = (error: unknown) => {
    if (error instanceof InvalidArgumentError) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } else {
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  };
}
