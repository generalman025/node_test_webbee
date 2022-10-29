import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CinemaSystem1663877813247 implements MigrationInterface {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I dont want to configure the seating for every show
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
        ]
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'show_room',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
        ]
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'time_slot',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'start', type: 'timestamp' },
          { name: 'end', type: 'timestamp' },
        ]
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'movie_schedule',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'movieId', type: 'integer' },
          { name: 'showRoomId', type: 'integer' },
          { name: 'timeSlotId', type: 'integer' },
          { name: 'isFull', type: 'boolean' },
        ]
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'seat_type',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
        ]
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'seat',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'showRoomId', type: 'integer' },
          { name: 'seatTypeId', type: 'integer' },
          { name: 'location', type: 'varchar' },
        ]
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'ticket',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'movieScheduleId', type: 'integer' },
          { name: 'seatId', type: 'integer' },
          { name: 'userId', type: 'integer' },
          { name: 'isAvailable', type: 'boolean' },
        ]
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
        ]
      }),
    );

    await queryRunner.createForeignKey(
      'movie_schedule',
      new TableForeignKey({
        columnNames: ['movieId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movie',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'movie_schedule',
      new TableForeignKey({
        columnNames: ['showRoomId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movie',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'movie_schedule',
      new TableForeignKey({
        columnNames: ['timeSlotId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'time_slot',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'seat',
      new TableForeignKey({
        columnNames: ['showRoomId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'show_room',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'seat',
      new TableForeignKey({
        columnNames: ['seatTypeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'seat_type',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'ticket',
      new TableForeignKey({
        columnNames: ['movieScheduleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movie_schedule',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'ticket',
      new TableForeignKey({
        columnNames: ['seatId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'seat',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'ticket',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
