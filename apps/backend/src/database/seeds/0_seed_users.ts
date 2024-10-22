import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 88884444,
      canvas_user_id: 1234567890,
      email: 'johndoe@example.com',
      first_name: 'John',
      last_name: 'Doe',
      canvas_login_id: 'johndoe123',
      access_token: 'access_token_1',
      refresh_token: 'refresh_token_1',
      token_expiration: new Date('2024-12-31T23:59:59'),
      is_active: true,
      ical_link: 'https://example.com/ical/johndoe',
    },
    {
      id: 55558888,
      canvas_user_id: 9876543210,
      email: 'janedoe@example.com',
      first_name: 'Jane',
      last_name: 'Doe',
      canvas_login_id: 'janedoe123',
      access_token: 'access_token_2',
      refresh_token: 'refresh_token_2',
      token_expiration: new Date('2024-12-31T23:59:59'),
      is_active: true,
      ical_link: 'https://example.com/ical/janedoe',
    }
  ]);
}
