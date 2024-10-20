import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('courses').del();

  // Inserts seed entries
  await knex('courses').insert([
    {
      course_id: 508104,
      course_code: 'CDA3101',
    },
    {
      course_id: 507903,
      course_code: 'COP4533',
    }
  ]);
}
