import { isActive, TaskStatus } from 'src/utils/enums';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { Tag_Task } from './tag_task.entity';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id_task: Number;

  @Column('character varying')
  task_name: String;

  @Column('character varying')
  task_description: String;

  @Column('int')
  task_status: TaskStatus;

  @Column('int')
  task_state: isActive;

  @Column('timestamp')
  task_created_at: Timestamp;

  @Column('timestamp')
  task_updated_at: Timestamp;

  @OneToMany((type) => Tag_Task, (tag_task) => tag_task.task)
  tag_task: Tag_Task[];
}
