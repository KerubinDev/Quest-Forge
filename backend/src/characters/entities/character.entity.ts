import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Campaign } from '../../campaigns/entities/campaign.entity';

@Entity('characters')
export class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  class: string;

  @Column({ nullable: true })
  race: string;

  @Column({ default: 1 })
  level: number;

  @Column({ default: 10 })
  strength: number;

  @Column({ default: 10 })
  dexterity: number;

  @Column({ default: 10 })
  constitution: number;

  @Column({ default: 10 })
  intelligence: number;

  @Column({ default: 10 })
  wisdom: number;

  @Column({ default: 10 })
  charisma: number;

  @Column({ type: 'text', nullable: true })
  skills: string;

  @Column({ type: 'text', nullable: true })
  history: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'playerId' })
  player: User;

  @Column()
  playerId: string;

  @ManyToOne(() => Campaign, { eager: true })
  @JoinColumn({ name: 'campaignId' })
  campaign: Campaign;

  @Column()
  campaignId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
