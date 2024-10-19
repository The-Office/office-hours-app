import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('courses').del();

  // Inserts seed entries
  await knex('courses').insert([
    {
      course_id: 981247501,
      course_code: 'COP4533',
      instructor_id: 18240587,
      class_period: 5,
    },
    {
      course_id: 8301219,
      course_code: 'MAS4301',
      instructor_id: 2475010,
      class_period: 3,
    }
  ]);
}
