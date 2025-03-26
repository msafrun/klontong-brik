import * as fs from 'fs';
import * as path from 'path';
import dataSource from '../src/common/configs/dbConnection';

async function runSeeder() {
  try {
    console.log('📌 Initializing database connection...');
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    const sql = fs.readFileSync(path.join(__dirname, 'seeder.sql'), 'utf8');
    await dataSource.query(sql);

    console.log('✅ Database seeding completed!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await dataSource.destroy();
  }
}

runSeeder().catch(console.error);
