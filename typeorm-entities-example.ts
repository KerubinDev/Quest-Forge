/**
 * TypeORM Entities for QuestForge
 * 
 * This file contains example TypeORM entity definitions for the QuestForge database.
 * These entities can be used as an alternative to Prisma for NestJS applications.
 * 
 * Usage:
 * 1. Copy these entities to your NestJS src/entities/ directory
 * 2. Split into separate files (one entity per file)
 * 3. Configure TypeORM in your app.module.ts
 * 4. Run migrations with TypeORM CLI
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';

// ==================== ENUMS ====================

export enum UserRole {
  GAME_MASTER = 'GAME_MASTER',
  PLAYER = 'PLAYER',
}

export enum CampaignStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
}

export enum ItemType {
  WEAPON = 'WEAPON',
  ARMOR = 'ARMOR',
  CONSUMABLE = 'CONSUMABLE',
  ARTIFACT = 'ARTIFACT',
  MISC = 'MISC',
}

export enum ItemRarity {
  COMMON = 'COMMON',
  UNCOMMON = 'UNCOMMON',
  RARE = 'RARE',
  VERY_RARE = 'VERY_RARE',
  LEGENDARY = 'LEGENDARY',
}

export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

// ==================== ENTITIES ====================

/**
 * User Entity - Represents both Game Masters and Players
 */
@Entity('users')
@Index(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string; // Should be hashed with bcrypt

  @Column({ length: 255 })
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PLAYER,
  })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @OneToMany(() => Campaign, (campaign) => campaign.gameMaster)
  campaignsCreated: Campaign[];

  @OneToMany(() => CampaignMember, (member) => member.user)
  campaignMemberships: CampaignMember[];

  @OneToMany(() => Character, (character) => character.player)
  characters: Character[];

  @OneToMany(() => Invitation, (invitation) => invitation.sender)
  invitationsSent: Invitation[];

  @OneToMany(() => Invitation, (invitation) => invitation.receiver)
  invitationsReceived: Invitation[];

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshTokens: RefreshToken[];
}

/**
 * RefreshToken Entity - For JWT refresh token management
 */
@Entity('refresh_tokens')
@Index(['userId'])
@Index(['token'])
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 500 })
  token: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'expires_at', type: 'timestamp with time zone' })
  expiresAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.refreshTokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

/**
 * Campaign Entity - Represents an RPG campaign
 */
@Entity('campaigns')
@Index(['gameMasterId'])
@Index(['status'])
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  setting: string;

  @Column({
    type: 'enum',
    enum: CampaignStatus,
    default: CampaignStatus.ACTIVE,
  })
  status: CampaignStatus;

  @Column({ name: 'game_master_id' })
  gameMasterId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.campaignsCreated, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'game_master_id' })
  gameMaster: User;

  @OneToMany(() => CampaignMember, (member) => member.campaign)
  members: CampaignMember[];

  @OneToMany(() => Character, (character) => character.campaign)
  characters: Character[];

  @OneToMany(() => NPC, (npc) => npc.campaign)
  npcs: NPC[];

  @OneToMany(() => Item, (item) => item.campaign)
  items: Item[];

  @OneToMany(() => Session, (session) => session.campaign)
  sessions: Session[];

  @OneToMany(() => Media, (media) => media.campaign)
  media: Media[];

  @OneToMany(() => Invitation, (invitation) => invitation.campaign)
  invitations: Invitation[];
}

/**
 * CampaignMember Entity - Junction table for campaign members
 */
@Entity('campaign_members')
@Unique(['campaignId', 'userId'])
@Index(['campaignId'])
@Index(['userId'])
export class CampaignMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'campaign_id' })
  campaignId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;

  // Relations
  @ManyToOne(() => Campaign, (campaign) => campaign.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;

  @ManyToOne(() => User, (user) => user.campaignMemberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

/**
 * Character Entity - Represents player characters
 */
@Entity('characters')
@Index(['campaignId'])
@Index(['playerId'])
export class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 100 })
  class: string;

  @Column({ length: 100 })
  race: string;

  @Column({ type: 'int', default: 1 })
  level: number;

  // Attributes
  @Column({ type: 'int', default: 10 })
  strength: number;

  @Column({ type: 'int', default: 10 })
  dexterity: number;

  @Column({ type: 'int', default: 10 })
  constitution: number;

  @Column({ type: 'int', default: 10 })
  intelligence: number;

  @Column({ type: 'int', default: 10 })
  wisdom: number;

  @Column({ type: 'int', default: 10 })
  charisma: number;

  // Additional info
  @Column({ type: 'text', nullable: true })
  skills: string;

  @Column({ type: 'text', nullable: true })
  history: string;

  @Column({ name: 'campaign_id' })
  campaignId: string;

  @Column({ name: 'player_id' })
  playerId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Campaign, (campaign) => campaign.characters, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;

  @ManyToOne(() => User, (user) => user.characters, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'player_id' })
  player: User;

  @OneToMany(() => CharacterInventory, (inventory) => inventory.character)
  inventory: CharacterInventory[];
}

/**
 * NPC Entity - Represents non-player characters
 */
@Entity('npcs')
@Index(['campaignId'])
export class NPC {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 255, nullable: true })
  role: string;

  // Attributes (optional for NPCs)
  @Column({ type: 'int', nullable: true })
  strength: number;

  @Column({ type: 'int', nullable: true })
  dexterity: number;

  @Column({ type: 'int', nullable: true })
  constitution: number;

  @Column({ type: 'int', nullable: true })
  intelligence: number;

  @Column({ type: 'int', nullable: true })
  wisdom: number;

  @Column({ type: 'int', nullable: true })
  charisma: number;

  @Column({ type: 'text', nullable: true })
  skills: string;

  @Column({ type: 'text', nullable: true })
  relationships: string;

  @Column({ name: 'campaign_id' })
  campaignId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Campaign, (campaign) => campaign.npcs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;
}

/**
 * Item Entity - Represents items, weapons, armor, artifacts
 */
@Entity('items')
@Index(['campaignId'])
@Index(['type'])
@Index(['rarity'])
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ItemType,
  })
  type: ItemType;

  @Column({
    type: 'enum',
    enum: ItemRarity,
    default: ItemRarity.COMMON,
  })
  rarity: ItemRarity;

  @Column({ type: 'text', nullable: true })
  properties: string;

  @Column({ type: 'text', nullable: true })
  effects: string;

  @Column({ name: 'campaign_id' })
  campaignId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Campaign, (campaign) => campaign.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;

  @OneToMany(() => CharacterInventory, (inventory) => inventory.item)
  characterInventories: CharacterInventory[];
}

/**
 * CharacterInventory Entity - Junction table for character items
 */
@Entity('character_inventory')
@Unique(['characterId', 'itemId'])
@Index(['characterId'])
@Index(['itemId'])
export class CharacterInventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'character_id' })
  characterId: string;

  @Column({ name: 'item_id' })
  itemId: string;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'boolean', default: false })
  equipped: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Character, (character) => character.inventory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @ManyToOne(() => Item, (item) => item.characterInventories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_id' })
  item: Item;
}

/**
 * Session Entity - Represents game sessions
 */
@Entity('sessions')
@Index(['campaignId'])
@Index(['date'])
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'timestamp with time zone' })
  date: Date;

  @Column({ length: 50, nullable: true })
  time: string;

  @Column({ type: 'text' })
  summary: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  milestones: string;

  @Column({ name: 'campaign_id' })
  campaignId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Campaign, (campaign) => campaign.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;
}

/**
 * Media Entity - Represents images, maps, etc.
 */
@Entity('media')
@Index(['campaignId'])
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  filename: string;

  @Column({ name: 'original_name', length: 255 })
  originalName: string;

  @Column({ name: 'mime_type', length: 100 })
  mimeType: string;

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'text' })
  url: string;

  @Column({ name: 'campaign_id' })
  campaignId: string;

  @CreateDateColumn({ name: 'uploaded_at' })
  uploadedAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Campaign, (campaign) => campaign.media, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;
}

/**
 * Invitation Entity - Represents campaign invitations
 */
@Entity('invitations')
@Index(['campaignId'])
@Index(['email'])
@Index(['status'])
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  email: string;

  @Column({
    type: 'enum',
    enum: InvitationStatus,
    default: InvitationStatus.PENDING,
  })
  status: InvitationStatus;

  @Column({ name: 'campaign_id' })
  campaignId: string;

  @Column({ name: 'sender_id' })
  senderId: string;

  @Column({ name: 'receiver_id', nullable: true })
  receiverId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Campaign, (campaign) => campaign.invitations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;

  @ManyToOne(() => User, (user) => user.invitationsSent, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => User, (user) => user.invitationsReceived, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;
}

// ==================== EXPORTS ====================

// Export all entities for use in TypeORM configuration
export const entities = [
  User,
  RefreshToken,
  Campaign,
  CampaignMember,
  Character,
  NPC,
  Item,
  CharacterInventory,
  Session,
  Media,
  Invitation,
];
