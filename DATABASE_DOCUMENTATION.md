# QuestForge Database Schema Documentation

## Overview

This document describes the complete database schema for QuestForge, an integrated platform for managing tabletop RPG campaigns. The schema is designed to support both the web application (for Game Masters) and mobile application (for Players).

## Technology Stack

- **Database**: PostgreSQL
- **ORM Options**: 
  - Prisma (recommended for NestJS)
  - TypeORM (alternative)
- **Authentication**: JWT with refresh tokens

## Database Files

1. **schema.prisma** - Prisma schema file for NestJS integration
2. **database-schema.sql** - Raw SQL schema for direct PostgreSQL setup
3. **DATABASE_DOCUMENTATION.md** - This documentation file

## Entity Relationship Diagram

```
Users (1) ----< (N) Campaigns (via game_master_id)
Users (N) ----< (N) Campaigns (via campaign_members)
Users (1) ----< (N) Characters
Campaigns (1) ----< (N) Characters
Campaigns (1) ----< (N) NPCs
Campaigns (1) ----< (N) Items
Campaigns (1) ----< (N) Sessions
Campaigns (1) ----< (N) Media
Campaigns (1) ----< (N) Invitations
Characters (N) ----< (N) Items (via character_inventory)
Users (1) ----< (N) RefreshTokens
```

## Tables

### 1. users

Stores user accounts for both Game Masters and Players.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | VARCHAR(255) | Unique email address |
| password | VARCHAR(255) | Hashed password (use bcrypt) |
| name | VARCHAR(255) | User's full name |
| role | ENUM | GAME_MASTER or PLAYER |
| created_at | TIMESTAMP | Account creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes:**
- `idx_users_email` on email

**Security Note:** Passwords must be hashed using bcrypt with a salt rounds of at least 10.

---

### 2. refresh_tokens

Stores JWT refresh tokens for authentication management.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| token | VARCHAR(500) | Unique refresh token |
| user_id | UUID | Foreign key to users |
| expires_at | TIMESTAMP | Token expiration time |
| created_at | TIMESTAMP | Token creation timestamp |

**Indexes:**
- `idx_refresh_tokens_user_id` on user_id
- `idx_refresh_tokens_token` on token

**Security Note:** Implement token rotation and invalidation on logout.

---

### 3. campaigns

Stores RPG campaign information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(255) | Campaign name |
| description | TEXT | Campaign description |
| setting | TEXT | Campaign world/setting information |
| status | ENUM | ACTIVE, PAUSED, or COMPLETED |
| game_master_id | UUID | Foreign key to users (campaign creator) |
| created_at | TIMESTAMP | Campaign creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes:**
- `idx_campaigns_game_master_id` on game_master_id
- `idx_campaigns_status` on status

---

### 4. campaign_members

Junction table linking players to campaigns they participate in.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| campaign_id | UUID | Foreign key to campaigns |
| user_id | UUID | Foreign key to users |
| joined_at | TIMESTAMP | When user joined the campaign |

**Indexes:**
- `idx_campaign_members_campaign_id` on campaign_id
- `idx_campaign_members_user_id` on user_id
- Unique constraint on (campaign_id, user_id)

---

### 5. characters

Stores player character information with complete attributes.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(255) | Character name |
| class | VARCHAR(100) | Character class (e.g., Warrior, Mage) |
| race | VARCHAR(100) | Character race (e.g., Human, Elf) |
| level | INTEGER | Character level (default: 1) |
| strength | INTEGER | Strength attribute (default: 10) |
| dexterity | INTEGER | Dexterity attribute (default: 10) |
| constitution | INTEGER | Constitution attribute (default: 10) |
| intelligence | INTEGER | Intelligence attribute (default: 10) |
| wisdom | INTEGER | Wisdom attribute (default: 10) |
| charisma | INTEGER | Charisma attribute (default: 10) |
| skills | TEXT | Character skills description |
| history | TEXT | Character backstory |
| campaign_id | UUID | Foreign key to campaigns |
| player_id | UUID | Foreign key to users |
| created_at | TIMESTAMP | Character creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes:**
- `idx_characters_campaign_id` on campaign_id
- `idx_characters_player_id` on player_id

**Business Rules:**
- A player can have multiple characters across different campaigns
- Attributes typically range from 1 to 20 in most RPG systems

---

### 6. npcs

Stores non-player character information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(255) | NPC name |
| description | TEXT | NPC description |
| role | VARCHAR(255) | NPC role in campaign |
| strength | INTEGER | Strength attribute (optional) |
| dexterity | INTEGER | Dexterity attribute (optional) |
| constitution | INTEGER | Constitution attribute (optional) |
| intelligence | INTEGER | Intelligence attribute (optional) |
| wisdom | INTEGER | Wisdom attribute (optional) |
| charisma | INTEGER | Charisma attribute (optional) |
| skills | TEXT | NPC skills description |
| relationships | TEXT | NPC relationships with other characters |
| campaign_id | UUID | Foreign key to campaigns |
| created_at | TIMESTAMP | NPC creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes:**
- `idx_npcs_campaign_id` on campaign_id

---

### 7. items

Stores items, weapons, armor, and artifacts.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(255) | Item name |
| description | TEXT | Item description |
| type | ENUM | WEAPON, ARMOR, CONSUMABLE, ARTIFACT, MISC |
| rarity | ENUM | COMMON, UNCOMMON, RARE, VERY_RARE, LEGENDARY |
| properties | TEXT | Item special properties |
| effects | TEXT | Item effects and mechanics |
| campaign_id | UUID | Foreign key to campaigns |
| created_at | TIMESTAMP | Item creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes:**
- `idx_items_campaign_id` on campaign_id
- `idx_items_type` on type
- `idx_items_rarity` on rarity

---

### 8. character_inventory

Junction table linking characters to items with quantities.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| character_id | UUID | Foreign key to characters |
| item_id | UUID | Foreign key to items |
| quantity | INTEGER | Number of items (default: 1) |
| equipped | BOOLEAN | Whether item is equipped (default: false) |
| created_at | TIMESTAMP | When item was added |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes:**
- `idx_character_inventory_character_id` on character_id
- `idx_character_inventory_item_id` on item_id
- Unique constraint on (character_id, item_id)

**Business Rules:**
- A character cannot have the same item twice (use quantity instead)
- Quantity must be at least 1

---

### 9. sessions

Stores game session records with summaries and notes.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| title | VARCHAR(255) | Session title |
| date | TIMESTAMP | Session date |
| time | VARCHAR(50) | Session time/duration |
| summary | TEXT | Session summary |
| notes | TEXT | Important notes |
| milestones | TEXT | Story milestones reached |
| campaign_id | UUID | Foreign key to campaigns |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes:**
- `idx_sessions_campaign_id` on campaign_id
- `idx_sessions_date` on date

---

### 10. media

Stores campaign-related images, maps, and other media files.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| filename | VARCHAR(255) | Stored filename |
| original_name | VARCHAR(255) | Original uploaded filename |
| mime_type | VARCHAR(100) | File MIME type |
| size | INTEGER | File size in bytes |
| url | TEXT | File URL or path |
| campaign_id | UUID | Foreign key to campaigns |
| uploaded_at | TIMESTAMP | Upload timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes:**
- `idx_media_campaign_id` on campaign_id

**Security Notes:**
- Validate file types on upload
- Implement file size limits
- Store files outside web root
- Use signed URLs for access control

---

### 11. invitations

Stores campaign invitation records.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | VARCHAR(255) | Invitee email address |
| status | ENUM | PENDING, ACCEPTED, DECLINED |
| campaign_id | UUID | Foreign key to campaigns |
| sender_id | UUID | Foreign key to users (who sent invite) |
| receiver_id | UUID | Foreign key to users (nullable until accepted) |
| created_at | TIMESTAMP | Invitation creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes:**
- `idx_invitations_campaign_id` on campaign_id
- `idx_invitations_email` on email
- `idx_invitations_status` on status

**Business Rules:**
- receiver_id is null until invitation is accepted by a registered user
- When accepted, create a campaign_members entry

---

## Enums

### user_role
- `GAME_MASTER` - Can create and manage campaigns
- `PLAYER` - Can view campaigns and manage own characters

### campaign_status
- `ACTIVE` - Campaign is ongoing
- `PAUSED` - Campaign is temporarily on hold
- `COMPLETED` - Campaign has ended

### item_type
- `WEAPON` - Weapons and arms
- `ARMOR` - Protective equipment
- `CONSUMABLE` - Single-use items
- `ARTIFACT` - Special/magical items
- `MISC` - Other items

### item_rarity
- `COMMON` - Common items
- `UNCOMMON` - Uncommon items
- `RARE` - Rare items
- `VERY_RARE` - Very rare items
- `LEGENDARY` - Legendary items

### invitation_status
- `PENDING` - Invitation sent, waiting for response
- `ACCEPTED` - Invitation accepted
- `DECLINED` - Invitation declined

---

## Setup Instructions

### Using Prisma (Recommended for NestJS)

1. Install Prisma:
```bash
npm install @prisma/client
npm install -D prisma
```

2. Initialize Prisma (if not done):
```bash
npx prisma init
```

3. Copy `schema.prisma` to your project root or `prisma/` directory

4. Configure your `.env` file:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/questforge?schema=public"
```

5. Generate Prisma Client:
```bash
npx prisma generate
```

6. Run migrations:
```bash
npx prisma migrate dev --name init
```

### Using Raw SQL

1. Create a PostgreSQL database:
```bash
createdb questforge
```

2. Run the SQL schema:
```bash
psql -d questforge -f database-schema.sql
```

---

## Data Integrity and Constraints

### Cascade Deletes

The schema implements CASCADE deletes to maintain referential integrity:

- Deleting a user deletes all their refresh tokens
- Deleting a campaign deletes all related:
  - Characters
  - NPCs
  - Items
  - Sessions
  - Media
  - Invitations
  - Campaign memberships
- Deleting a character deletes all their inventory items
- Deleting an item removes it from all character inventories

### Unique Constraints

- `users.email` - Each email must be unique
- `refresh_tokens.token` - Each refresh token must be unique
- `campaign_members(campaign_id, user_id)` - A user can only join a campaign once
- `character_inventory(character_id, item_id)` - A character can only have each item once (use quantity)

---

## Performance Considerations

### Indexes

All foreign keys have indexes for efficient JOIN operations:
- Campaign-related lookups
- User-related lookups
- Character-related lookups

Additional indexes:
- Email lookup for authentication
- Campaign status for filtering
- Item type and rarity for categorization
- Session date for chronological ordering
- Invitation status for filtering

### Optimization Tips

1. Use connection pooling in production
2. Implement pagination for list endpoints
3. Use SELECT only needed columns
4. Cache frequently accessed data (e.g., campaign details)
5. Consider read replicas for heavy read operations

---

## Security Considerations

### Authentication
- Store passwords hashed with bcrypt (salt rounds ≥ 10)
- Implement JWT access tokens (short expiry, e.g., 15 minutes)
- Implement refresh tokens (longer expiry, e.g., 7 days)
- Rotate refresh tokens on use
- Invalidate all tokens on logout

### Authorization
- Game Masters can only manage their own campaigns
- Players can only view campaigns they're members of
- Players can only edit their own characters
- Validate user permissions on all operations

### File Uploads
- Validate file types (images only)
- Implement file size limits
- Scan for malware
- Store files with generated names
- Use signed URLs for access control

### SQL Injection Prevention
- Use parameterized queries (Prisma/TypeORM handle this)
- Never concatenate user input into SQL

### Data Validation
- Validate all input on the backend
- Sanitize text fields for XSS prevention
- Validate email format
- Validate numeric ranges for attributes

---

## Migration Strategy

### For Future Schema Changes

1. Never modify existing migrations
2. Create new migrations for changes
3. Test migrations on a copy of production data
4. Back up database before running migrations in production
5. Use Prisma Migrate for version control

### Example Workflow with Prisma

```bash
# After modifying schema.prisma
npx prisma migrate dev --name add_character_notes

# In production
npx prisma migrate deploy
```

---

## Sample Queries

### Get all characters in a campaign with their items
```sql
SELECT c.*, ci.quantity, i.name as item_name, i.type, i.rarity
FROM characters c
LEFT JOIN character_inventory ci ON c.id = ci.character_id
LEFT JOIN items i ON ci.item_id = i.id
WHERE c.campaign_id = 'campaign-uuid'
ORDER BY c.name, i.name;
```

### Get campaign statistics
```sql
SELECT 
    cp.id,
    cp.name,
    COUNT(DISTINCT cm.user_id) as player_count,
    COUNT(DISTINCT ch.id) as character_count,
    COUNT(DISTINCT s.id) as session_count
FROM campaigns cp
LEFT JOIN campaign_members cm ON cp.id = cm.campaign_id
LEFT JOIN characters ch ON cp.id = ch.campaign_id
LEFT JOIN sessions s ON cp.id = s.campaign_id
WHERE cp.game_master_id = 'user-uuid'
GROUP BY cp.id, cp.name;
```

### Get player's character sheet with inventory
```sql
SELECT 
    c.*,
    json_agg(
        json_build_object(
            'item_id', i.id,
            'name', i.name,
            'type', i.type,
            'rarity', i.rarity,
            'quantity', ci.quantity,
            'equipped', ci.equipped
        )
    ) as inventory
FROM characters c
LEFT JOIN character_inventory ci ON c.id = ci.character_id
LEFT JOIN items i ON ci.item_id = i.id
WHERE c.id = 'character-uuid'
GROUP BY c.id;
```

---

## Testing Data

For development and testing, consider creating:
- 2-3 test Game Master accounts
- 5-10 test Player accounts
- 3-5 test campaigns with various statuses
- Multiple characters per campaign
- Diverse NPCs, items, and sessions
- Sample images for media testing

---

## Backup and Recovery

### Recommended Backup Strategy

1. **Daily automated backups** of entire database
2. **Weekly full backups** stored off-site
3. **Point-in-time recovery** enabled
4. **Regular backup testing** (restore to test environment)

### Backup Command (PostgreSQL)
```bash
pg_dump -U username -d questforge -F c -f questforge_backup_$(date +%Y%m%d).dump
```

### Restore Command
```bash
pg_restore -U username -d questforge questforge_backup_20251125.dump
```

---

## Support and Maintenance

### Regular Maintenance Tasks

1. **Weekly**: Review slow queries and optimize
2. **Monthly**: Vacuum and analyze tables
3. **Quarterly**: Review and archive old data
4. **Yearly**: Review schema and plan improvements

### Monitoring

Monitor these metrics:
- Query performance
- Connection pool usage
- Database size growth
- Index usage
- Slow query logs

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | November 2025 | Initial schema design |

---

## Contact

For questions or issues related to the database schema, please contact the development team or create an issue in the GitHub repository.
