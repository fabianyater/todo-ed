import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { isActive } from 'src/utils/enums';
import { Tag } from './tag.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  user_id: Number;

  @Column('character varying')
  user_name: String;

  @Column('character varying')
  user_email: String;

  @Column('character varying')
  user_key_secret: String;

  @Column('int')
  user_state: isActive;

  @Column('timestamp')
  user_created_at: Timestamp;

  @Column('timestamp')
  user_updated_at: Timestamp;

  @OneToMany((type) => Tag, (tag) => tag.user)
  tag: Tag[];
}
