import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) { }

  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.save(createTaskDto)
  }

  findAll(completed?: boolean) {
    if (!completed) {
      return this.taskRepository.find();
    } else {
      return this.taskRepository.findBy({ completed });
    }
  }

  findOne(id: number) {
    return this.taskRepository.findOneBy({ id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const todo = await this.taskRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException("to do not found");
    }
    todo.name = updateTaskDto.name;
    todo.completed = updateTaskDto.completed;
    return this.taskRepository.save(todo);
  }

  remove(id: number) {
    this.taskRepository.delete(id);
  }
}