import { isActive } from 'src/utils/enums';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { Tag } from './tag.entity';
import { Task } from './task.entity';

@Entity('tag_task')
export class Tag_Task {
  @PrimaryGeneratedColumn('uuid')
  tag_task_id: Number;

  @Column('timestamp')
  tag_task_created_at: Timestamp;

  @Column('timestamp')
  tag_task_updated_at: Timestamp;

  @Column('int')
  tag_task_status: isActive;

  @ManyToOne((type) => Tag, (tag) => tag.tag_task)
  @JoinColumn({ name: 'fk_tag' })
  tag: Tag;

  @ManyToOne((type) => Task, (task) => task.tag_task)
  @JoinColumn({ name: 'fk_task' })
  task: Task;
}
