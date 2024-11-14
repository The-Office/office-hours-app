import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('feedback').del();

  // Inserts seed entries
  await knex('feedback').insert([
    {
      user_id: '55558888ff',
      rating: 5,
      content: "Great course! Very informative and well-structured.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: '88884444ff',
      rating: 4,
      content: "Good course, but could use more hands-on examples.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: '55558888gg',
      rating: 3,
      content: "Average course, some parts were confusing.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: '55558888gg',
      rating: 5,
      content: "Excellent! Highly recommend it to others.",
      created_at: new Date(),
      updated_at: new Date(),
    }
  ]);
}
