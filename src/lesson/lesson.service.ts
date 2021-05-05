import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      ...createLessonInput,
      id: uuid(),
    });

    return this.lessonRepository.save(lesson);
  }

  getLesson(id: string) {
    return this.lessonRepository.findOne({ id });
  }

  getAllLessons() {
    return this.lessonRepository.find();
  }

  async assignStudentsToLesson(lessonId: string, studentsIds: string[]) {
    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    if (!lesson.students) {
      lesson.students = [];
    }
    lesson.students = [...lesson.students, ...studentsIds];
    return this.lessonRepository.save(lesson);
  }
}
