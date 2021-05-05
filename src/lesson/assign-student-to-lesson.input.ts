import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentToLessonInput {
  @Field(() => ID)
  @IsUUID()
  lessonId: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID])
  studentsIds: string[];
}
