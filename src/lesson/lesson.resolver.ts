import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AssignStudentToLessonInput } from './assign-student-to-lesson.input';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @Query((returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Query((returns) => [LessonType])
  lessons() {
    return this.lessonService.getAllLessons();
  }

  @Mutation(() => LessonType)
  assignStudentToLesson(
    @Args('assignStudentsToLessonInput')
    asssignStudentsToLesson: AssignStudentToLessonInput,
  ) {
    return this.lessonService.assignStudentsToLesson(
      asssignStudentsToLesson.lessonId,
      asssignStudentsToLesson.studentsIds,
    );
  }
}
