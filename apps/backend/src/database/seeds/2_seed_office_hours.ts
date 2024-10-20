import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('office_hours').del();

  // Inserts seed entries
  await knex('office_hours').insert([
    {
      course_id: 508104,
      course_code: 'CDA3101',
      host: "Jackie Wang",
      modality: 'in person',
      office_hour_location: 'MALA5200',
      start_time: '11:30 am',
      end_time: '1:00 pm',
    },
    {
      course_id: 507903,
      course_code: 'COP4533',
      host: "William Sims",
      modality: 'zoom',
      office_hour_location: 'zoom.com/sample',
      start_time: '12:30 pm',
      end_time: '2:00 pm',
    }
  ]);
}
