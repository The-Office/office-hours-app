import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user_courses').del();

  // Inserts seed entries
  await knex('user_courses').insert([
    {
      user_id: 997865764,
      course_id: 234597675,
      course_code: 'MAS3114',
      instructor_id: 5478986,
      class_period: 5,
    },
    {
      user_id: 234780987,
      course_id: 876539,
      course_code: 'COP3530',
      instructor_id: 65429004,
      class_period: 4,
    }
  ]);
}
