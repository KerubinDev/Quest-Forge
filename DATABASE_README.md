# QuestForge Database Schema

This repository contains the complete database schema for **QuestForge**, a tabletop RPG campaign management platform.

## 📋 Quick Links

- [Database Documentation](./DATABASE_DOCUMENTATION.md) - Comprehensive schema documentation
- [Entity Relationship Diagram](./database-erd.md) - Visual representation of the database structure
- [Project Scope](./documents/scopo.md) - Full project requirements

## 📦 What's Included

### 1. **schema.prisma** 
Prisma schema file for NestJS integration (recommended)
- Modern ORM with excellent TypeScript support
- Type-safe database client
- Easy migrations management
- Perfect for NestJS projects

### 2. **database-schema.sql**
Raw PostgreSQL schema file
- Can be run directly on PostgreSQL
- Includes all tables, indexes, constraints
- Contains triggers for automatic timestamp updates
- Useful for database administrators

### 3. **typeorm-entities-example.ts**
TypeORM entity definitions (alternative to Prisma)
- Traditional ORM approach
- Decorator-based syntax
- Can be split into separate entity files

### 4. **DATABASE_DOCUMENTATION.md**
Comprehensive documentation including:
- Detailed table descriptions
- Column specifications
- Relationships and constraints
- Security considerations
- Setup instructions
- Sample queries
- Performance tips

### 5. **database-erd.md**
Entity Relationship Diagram in Mermaid format
- Visual schema representation
- Shows all relationships
- Cascade delete behavior
- Data flow examples

## 🎯 Schema Overview

The database schema supports a complete RPG campaign management system with:

### Core Entities

1. **Users** - Game Masters and Players
2. **Campaigns** - RPG campaign information
3. **Characters** - Player characters with full attributes
4. **NPCs** - Non-player characters
5. **Items** - Weapons, armor, artifacts, etc.
6. **Sessions** - Game session records
7. **Media** - Images, maps, and files
8. **Invitations** - Campaign invitation system

### Supporting Entities

- **Campaign Members** - Links players to campaigns
- **Character Inventory** - Links characters to items
- **Refresh Tokens** - JWT token management

## 🚀 Quick Start

### Option 1: Using Prisma (Recommended for NestJS)

```bash
# Install Prisma
npm install @prisma/client
npm install -D prisma

# Initialize Prisma (if needed)
npx prisma init

# Copy schema.prisma to your project root or prisma/ directory

# Set your database URL in .env
echo "DATABASE_URL=\"postgresql://user:password@localhost:5432/questforge\"" > .env

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
```

### Option 2: Using Raw SQL

```bash
# Create database
createdb questforge

# Run schema
psql -d questforge -f database-schema.sql
```

### Option 3: Using TypeORM

```bash
# Install TypeORM
npm install @nestjs/typeorm typeorm pg

# Copy entities to src/entities/
# Configure TypeORM in app.module.ts
# Run migrations
npm run typeorm migration:run
```

## 📊 Database Statistics

- **Total Tables**: 11
- **Enums**: 5
- **Indexes**: 25+
- **Relationships**: 15+
- **Cascade Deletes**: Full support for data integrity

## 🔒 Security Features

- ✅ Password hashing support (use bcrypt)
- ✅ JWT refresh token management
- ✅ Role-based access control (GAME_MASTER, PLAYER)
- ✅ Cascade deletes for data integrity
- ✅ Unique constraints for data validation
- ✅ Foreign key constraints

## 📐 Key Design Decisions

### 1. UUIDs for Primary Keys
- Better for distributed systems
- No sequential ID leakage
- Easier data merging

### 2. Soft Enums in Database
- Type safety at database level
- Consistent with application layer
- Easy validation

### 3. Separate Junction Tables
- Clean many-to-many relationships
- Additional metadata support (quantity, equipped)
- Easy to extend

### 4. Timestamp Tracking
- All tables have created_at and updated_at
- Automatic updates via triggers (SQL) or ORM
- Audit trail support

### 5. Text vs VARCHAR
- TEXT for long-form content
- VARCHAR with limits for controlled fields
- Better performance and storage optimization

## 🎮 Feature Coverage

All features from the project scope are supported:

### ✅ Authentication System
- User accounts (users table)
- JWT tokens (refresh_tokens table)
- Role-based access (user_role enum)

### ✅ Campaign Management
- CRUD operations (campaigns table)
- Status tracking (campaign_status enum)
- Member management (campaign_members table)

### ✅ Character System
- Full attribute support (strength, dexterity, etc.)
- Skills and history
- Inventory management

### ✅ NPC System
- Flexible attribute system
- Relationships tracking
- Description and role

### ✅ Item System
- Type categorization (item_type enum)
- Rarity levels (item_rarity enum)
- Properties and effects

### ✅ Session Recording
- Date and time tracking
- Summaries and notes
- Milestones

### ✅ Media Management
- File metadata
- Campaign association
- URL storage for CDN support

### ✅ Invitation System
- Email invitations
- Status tracking (invitation_status enum)
- Sender/receiver relationships

## 🧪 Testing the Schema

### Validate Schema Structure

```bash
# With Prisma
npx prisma validate

# With SQL
psql -d questforge -c "\dt"  # List all tables
psql -d questforge -c "\d users"  # Describe users table
```

### Test Data Insertion

```sql
-- Insert a test user
INSERT INTO users (email, password, name, role) 
VALUES ('gamemaster@example.com', '$2b$10$hashedpassword', 'Test GM', 'GAME_MASTER');

-- Insert a test campaign
INSERT INTO campaigns (name, description, status, game_master_id)
VALUES ('Test Campaign', 'A test campaign', 'ACTIVE', 
        (SELECT id FROM users WHERE email = 'gamemaster@example.com'));
```

## 📈 Performance Considerations

### Indexed Columns
- All foreign keys are indexed
- Email for user lookup
- Campaign status for filtering
- Item type and rarity for categorization
- Session date for ordering

### Query Optimization Tips
1. Use connection pooling
2. Implement pagination for large lists
3. Select only needed columns
4. Cache frequently accessed data
5. Consider read replicas for heavy read operations

## 🔄 Migration Strategy

### Adding New Fields
```bash
# With Prisma - modify schema.prisma, then:
npx prisma migrate dev --name add_new_field

# With TypeORM - create a new migration:
npm run typeorm migration:create -- -n AddNewField
```

### Best Practices
- Never modify existing migrations
- Always backup before migrating in production
- Test migrations on staging first
- Use database transactions
- Keep migrations small and focused

## 📚 Additional Resources

### Learning Resources
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [NestJS Documentation](https://docs.nestjs.com/)

### Database Design
- [Database Normalization](https://en.wikipedia.org/wiki/Database_normalization)
- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Don't_Do_This)
- [SQL Style Guide](https://www.sqlstyle.guide/)

## 🤝 Contributing

When modifying the schema:

1. Update all three schema files (Prisma, SQL, TypeORM)
2. Update documentation
3. Update ERD if relationships change
4. Test migrations thoroughly
5. Document breaking changes

## 📝 Schema Validation Checklist

- [x] All required entities from project scope implemented
- [x] Proper relationships between entities
- [x] Foreign key constraints with CASCADE
- [x] Indexes on frequently queried columns
- [x] Unique constraints where needed
- [x] Timestamp tracking on all tables
- [x] Enum types for controlled values
- [x] Proper column types and sizes
- [x] Security considerations documented
- [x] Sample queries provided
- [x] Setup instructions included

## 🐛 Troubleshooting

### Common Issues

**Issue**: Prisma migration fails
```bash
# Solution: Reset database and re-migrate
npx prisma migrate reset
npx prisma migrate dev
```

**Issue**: Foreign key constraint violation
```bash
# Check if referenced records exist
SELECT * FROM users WHERE id = 'uuid-here';
```

**Issue**: Enum type mismatch
```sql
-- Drop and recreate enum if needed
DROP TYPE user_role;
CREATE TYPE user_role AS ENUM ('GAME_MASTER', 'PLAYER');
```

## 📞 Support

For questions or issues:
1. Check [DATABASE_DOCUMENTATION.md](./DATABASE_DOCUMENTATION.md)
2. Review [database-erd.md](./database-erd.md)
3. Check PostgreSQL logs
4. Create an issue in the repository

## 📜 License

See [LICENSE](./LICENSE) file for details.

---

**Last Updated**: November 2025  
**Schema Version**: 1.0  
**Compatible With**: PostgreSQL 12+, Prisma 5+, TypeORM 0.3+
