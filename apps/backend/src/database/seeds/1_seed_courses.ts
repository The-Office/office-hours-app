import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('courses').del();

  // Inserts seed entries
  await knex('courses').insert([
    {
      course_id: 8371,
      course_code: 'CDA3101',
      title: "Introduction to Computer Organization",
    },
    {
      course_id: 7699,
      course_code: 'COP4533',
      title: "Algorithm Abstraction and Design",
    },
    {
      course_id: 10279,
      course_code: 'CEN3031',
      title: "Introduction to Software Engineering",
    }

  ]);
}
