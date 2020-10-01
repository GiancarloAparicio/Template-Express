import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1511105183653 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		const table = new Table({
			name: 'user',
			columns: [
				{
					name: 'id',
					type: 'int',
					isPrimary: true,
					isNullable: false,
				},
				{
					name: 'created_at',
					type: 'timestamp',
					isPrimary: false,
					isNullable: false,
				},
				{
					name: 'update_at',
					type: 'timestamp',
					isPrimary: false,
					isNullable: true,
				},
			],
		});
		await queryRunner.createTable(table);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.dropTable('user');
	}
}
