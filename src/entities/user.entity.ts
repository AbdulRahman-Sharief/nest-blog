import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AbstractEntity } from './abstract.entity';
import { Exclude, classToPlain, instanceToPlain } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column()
  @IsEmail()
  email: string;
  @Column({ unique: true })
  @IsString()
  username: string;
  @Column({ default: '' })
  bio: string;
  @Column({ default: null, nullable: true })
  image: string | null;
  @Column()
  @Exclude()
  password: string;
  //TODO: add following
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempted: string) {
    return await bcrypt.compare(attempted, this.password);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
