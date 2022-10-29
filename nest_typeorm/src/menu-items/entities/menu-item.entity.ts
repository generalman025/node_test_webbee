import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ type: 'integer', default: null })
  parentId: number;

  @Column({ type: 'datetime' })
  createdAt: string;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.parent)
  children: MenuItem[]

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.children)
  @JoinColumn({name: 'parentId'})
  parent: MenuItem
}
