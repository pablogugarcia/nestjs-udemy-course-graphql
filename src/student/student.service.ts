import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentInput) {
    const student = this.studentRepository.create({
      ...createStudentDto,
      id: uuid(),
    });

    return this.studentRepository.save(student);
  }

  getAll() {
    return this.studentRepository.find();
  }

  getById(id: string) {
    return this.studentRepository.findOne({ id });
  }
}
