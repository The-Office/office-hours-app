import * as fs from 'fs';
import * as path from 'path';
import type { Knex } from 'knex';

// Helper function to read SQL files
const readSqlFile = (fileName: string): string => {
  const filePath = path.join(__dirname, 'sql', fileName);
  return fs.readFileSync(filePath, 'utf8');
};

export async function up(knex: Knex): Promise<void> {
  const sql = readSqlFile('2_create_office_hours_table_up.sql');
  await knex.raw(sql);  // Execute the SQL file content
}

export async function down(knex: Knex): Promise<void> {
  const sql = readSqlFile('2_create_office_hours_table_down.sql');
  await knex.raw(sql);  // Execute the rollback SQL file
}
