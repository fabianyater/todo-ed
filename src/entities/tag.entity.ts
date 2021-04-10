import { isActive } from 'src/utils/enums';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { Tag_Task } from './tag_task.entity';
import { User } from './user.entity';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: Number;

  @Column({ type: 'character varying' })
  tag_name: String;

  @Column('character varying')
  tag_description: String;

  @Column('timestamp')
  tag_created_at: Timestamp;

  @Column('timestamp')
  tag_updated_at: Timestamp;

  @Column('int')
  tag_state: isActive;

  @ManyToOne((type) => User, (user) => user.tag)
  @JoinColumn({ name: 'fk_user' })
  user: User;

  @OneToMany((type) => Tag_Task, (tag_task) => tag_task.tag)
  tag_task: Tag_Task[];
}
