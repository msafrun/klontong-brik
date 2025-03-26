import dataSource from '../common/configs/dbConnection';

export async function createLogs(data: any, table: string, operation: string) {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  await dataSource.query(
    `INSERT INTO logs("data", "table", "operation") VALUES ($1, $2, $3)`,
    [data, table, operation],
  );
}
