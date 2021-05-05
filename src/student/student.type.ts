import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Student')
export class StudentType {
  @Field(() => ID)
  _id: string;

  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
