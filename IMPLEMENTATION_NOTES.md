# Database Schema Implementation Notes

## Overview

This document contains implementation notes, decisions, and recommendations for the QuestForge database schema.

## Implementation Status

✅ **COMPLETE AND PRODUCTION-READY**

All required database schema files have been created and validated:
- Prisma schema (schema.prisma)
- PostgreSQL SQL schema (database-schema.sql)
- TypeORM entities (typeorm-entities-example.ts)
- Comprehensive documentation
- Entity Relationship Diagram
- Validation report

## Key Design Decisions

### 1. Primary Key Strategy: UUIDs
**Decision**: Use UUIDs instead of auto-incrementing integers

**Rationale**:
- Better for distributed systems
- No sequential ID leakage (security)
- Easier data merging between environments
- Future-proof for microservices

**Trade-offs**:
- Slightly larger storage (16 bytes vs 4 bytes)
- Slightly slower joins (acceptable for this scale)

### 2. ORM Choice: Multiple Options
**Decision**: Provide both Prisma and TypeORM implementations

**Rationale**:
- Prisma recommended for modern NestJS projects (better DX, type safety)
- TypeORM provided as fallback (more mature, wider adoption)
- Raw SQL provided for direct database access

**Recommendation**: Start with Prisma for new development

### 3. Timestamp Strategy
**Decision**: Use `created_at` and `updated_at` on all tables

**Rationale**:
- Audit trail for all records
- Useful for debugging and analytics
- Standard practice in web applications

**Implementation**:
- Prisma: `@default(now())` and `@updatedAt`
- SQL: Triggers for automatic updates
- TypeORM: `@CreateDateColumn()` and `@UpdateDateColumn()`

### 4. Relationship Strategy
**Decision**: Use junction tables for many-to-many relationships

**Rationale**:
- `campaign_members`: Tracks when users joined campaigns
- `character_inventory`: Tracks quantity and equipped status

**Benefits**:
- Can add additional metadata easily
- Clean separation of concerns
- Easy to query

### 5. Enum Strategy
**Decision**: Use database enums for controlled values

**Rationale**:
- Type safety at database level
- Consistent with application layer
- Prevents invalid data

**Enums Created**:
- `user_role`: GAME_MASTER, PLAYER
- `campaign_status`: ACTIVE, PAUSED, COMPLETED
- `item_type`: WEAPON, ARMOR, CONSUMABLE, ARTIFACT, MISC
- `item_rarity`: COMMON, UNCOMMON, RARE, VERY_RARE, LEGENDARY
- `invitation_status`: PENDING, ACCEPTED, DECLINED

### 6. Cascade Delete Strategy
**Decision**: Use CASCADE on all foreign keys

**Rationale**:
- Maintains data integrity
- Prevents orphaned records
- Simplifies application logic

**Important**: Always backup before deleting campaigns or users in production

### 7. Text vs VARCHAR Strategy
**Decision**: Use TEXT for long-form content, VARCHAR with limits for controlled fields

**Fields using TEXT**:
- descriptions
- summaries
- history
- notes
- properties
- effects
- skills
- relationships

**Fields using VARCHAR**:
- names (255)
- email (255)
- class/race (100)
- role (255)
- time (50)

## Security Considerations

### 1. Password Storage
**Current**: Plain text column in schema
**Required**: MUST hash with bcrypt before storing
**Recommendation**: Salt rounds ≥ 10

```typescript
// Example implementation
import * as bcrypt from 'bcrypt';

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}
```

### 2. JWT Token Management
**Implementation**: Separate `refresh_tokens` table
**Strategy**: 
- Short-lived access tokens (15 minutes)
- Long-lived refresh tokens (7 days)
- Token rotation on use
- Invalidate all tokens on logout

### 3. Role-Based Access Control
**Implementation**: `user_role` enum
**Strategy**:
- Game Masters: Full CRUD on their campaigns
- Players: Read-only on campaigns they're members of
- Players: CRUD on their own characters

### 4. File Upload Security
**Recommendations**:
- Validate MIME types before upload
- Generate unique filenames (UUID)
- Store files outside web root
- Implement file size limits
- Scan for malware
- Use signed URLs for access

### 5. SQL Injection Prevention
**Implementation**: Use ORM parameterized queries
**DO NOT**: Concatenate user input into SQL strings
**Prisma/TypeORM**: Automatically prevents SQL injection

## Performance Considerations

### 1. Indexing Strategy
**All foreign keys are indexed** for efficient JOINs

**Additional indexes**:
- `users.email` - Authentication lookups
- `campaigns.status` - Filtering active/paused campaigns
- `items.type` - Filtering items by category
- `items.rarity` - Filtering items by rarity
- `sessions.date` - Chronological ordering
- `invitations.status` - Pending invitations

### 2. Query Optimization Tips

**Good**:
```sql
-- Select only needed columns
SELECT id, name, level FROM characters WHERE campaign_id = $1;

-- Use indexes
SELECT * FROM campaigns WHERE status = 'ACTIVE';
```

**Bad**:
```sql
-- Don't select all columns when not needed
SELECT * FROM characters WHERE campaign_id = $1;

-- Avoid LIKE with leading wildcard (can't use index)
SELECT * FROM users WHERE email LIKE '%@example.com';
```

### 3. Connection Pooling
**Recommendation**: Configure connection pool size based on load

```typescript
// Example Prisma configuration
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Add connection pool settings in DATABASE_URL
  // postgresql://user:pass@host:5432/db?connection_limit=20
}
```

### 4. Pagination
**Always paginate** list endpoints

```typescript
// Example pagination
const characters = await prisma.character.findMany({
  where: { campaignId },
  take: 20, // limit
  skip: page * 20, // offset
});
```

## Data Migration Strategy

### For Development
```bash
# Prisma
npx prisma migrate dev --name description_of_change

# TypeORM
npm run typeorm migration:create -- -n DescriptionOfChange
```

### For Production
```bash
# Always backup first!
pg_dump -U user -d questforge > backup_$(date +%Y%m%d).sql

# Prisma
npx prisma migrate deploy

# TypeORM
npm run typeorm migration:run
```

### Best Practices
1. Never modify existing migrations
2. Test on staging environment first
3. Have rollback plan ready
4. Back up production database
5. Run during low-traffic periods
6. Monitor for errors after deployment

## Scalability Considerations

### Current Design (Good for MVP through Medium Scale)
- Single database server
- Standard indexes
- UUID primary keys
- Connection pooling

### Future Enhancements (When Needed)
1. **Read Replicas** - For read-heavy workloads
2. **Caching Layer** - Redis for frequently accessed data
3. **Partitioning** - For very large tables (sessions, media)
4. **Materialized Views** - For complex aggregate queries
5. **Full-Text Search** - PostgreSQL pg_trgm or Elasticsearch

## Testing Recommendations

### Unit Tests
- Test repository/service methods
- Mock database calls
- Test business logic

### Integration Tests
- Test actual database operations
- Use test database
- Clean up after each test

```typescript
// Example test setup
beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
});

test('creates user', async () => {
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'hashed',
      name: 'Test User',
    },
  });
  expect(user.id).toBeDefined();
});
```

### Performance Tests
- Test with realistic data volumes
- Measure query performance
- Identify slow queries
- Optimize indexes

## Monitoring and Maintenance

### Key Metrics to Monitor
1. Query performance (slow query log)
2. Connection pool usage
3. Database size growth
4. Index usage statistics
5. Lock contention
6. Cache hit rates

### Regular Maintenance Tasks

**Weekly**:
- Review slow queries
- Check for missing indexes
- Monitor disk space

**Monthly**:
- VACUUM and ANALYZE tables
- Review and optimize queries
- Check for unused indexes

**Quarterly**:
- Review data retention policy
- Plan for data archival
- Capacity planning

## Known Limitations and Future Improvements

### Current Limitations
1. No soft delete functionality (can be added via `deleted_at` field)
2. No audit logging (can be added via separate audit table)
3. No full-text search (can be added via PostgreSQL pg_trgm)
4. No versioning for characters/campaigns (can be added via version table)

### Potential Future Enhancements
1. **Notifications System**: Add notifications table for in-app notifications
2. **Chat/Messaging**: Add messages table for player communication
3. **Character Templates**: Add templates for quick character creation
4. **Dice Roller**: Add rolls table for dice roll history
5. **Campaign Analytics**: Add views for campaign statistics

## TypeORM-Specific Notes

### Date Type Usage
**Code Review Comment**: Consider using TypeORM's built-in date types

**Current Implementation** (in typeorm-entities-example.ts):
```typescript
@Column({ type: 'timestamp with time zone' })
date: Date;
```

**Alternative** (more portable):
```typescript
@Column({ type: 'timestamptz' })
date: Date;

// Or simply
@Column()
date: Date;
```

**Recommendation**: Current implementation is correct and works well with PostgreSQL. The alternative is slightly more portable but functionally equivalent.

## Prisma-Specific Notes

### Relation Naming
**Fixed Issue**: Campaign relation to User was incorrectly named

**Before**:
```prisma
gameMaster CampaignMember[] @relation("CampaignToMember")
creator    User             @relation("GameMaster", ...)
```

**After**:
```prisma
gameMaster User             @relation("GameMaster", ...)
members    CampaignMember[]
```

This ensures proper bidirectional relationships and clearer naming.

## SQL-Specific Notes

### Triggers
The SQL schema includes triggers for automatic `updated_at` timestamp updates:

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';
```

This is applied to all tables with `updated_at` columns.

### UUID Extension
The schema requires the `uuid-ossp` extension:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

This is automatically created in the SQL schema file.

## Environment Configuration

### Required Environment Variables

```env
# Database connection
DATABASE_URL="postgresql://user:password@host:5432/questforge?schema=public"

# JWT configuration (application layer)
JWT_SECRET="your-secret-key"
JWT_EXPIRATION="15m"
REFRESH_TOKEN_EXPIRATION="7d"

# File upload (application layer)
MAX_FILE_SIZE="10485760"  # 10MB in bytes
ALLOWED_MIME_TYPES="image/jpeg,image/png,image/gif"
```

## Deployment Checklist

### Pre-Deployment
- [ ] Backup production database
- [ ] Test migrations on staging
- [ ] Review breaking changes
- [ ] Update documentation
- [ ] Verify environment variables

### Deployment
- [ ] Run migrations
- [ ] Verify schema changes
- [ ] Test critical paths
- [ ] Monitor for errors
- [ ] Check performance metrics

### Post-Deployment
- [ ] Verify all features work
- [ ] Monitor error logs
- [ ] Check query performance
- [ ] Update team documentation

## Support and Resources

### Documentation
- [Prisma Docs](https://www.prisma.io/docs)
- [TypeORM Docs](https://typeorm.io/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [NestJS Docs](https://docs.nestjs.com/)

### Useful Commands

```bash
# Prisma
npx prisma studio                    # Database GUI
npx prisma validate                  # Validate schema
npx prisma format                    # Format schema
npx prisma db pull                   # Introspect database
npx prisma db push                   # Push schema (dev only)

# PostgreSQL
psql -d questforge                   # Connect to database
\dt                                  # List tables
\d users                             # Describe table
\di                                  # List indexes

# TypeORM
npm run typeorm schema:log           # Show pending migrations
npm run typeorm schema:sync          # Sync schema (dev only)
npm run typeorm query "SELECT NOW()" # Run query
```

## Conclusion

This database schema provides a solid foundation for the QuestForge platform. It covers all requirements from the project scope, follows best practices, and is production-ready. The schema is designed to be:

- **Complete**: All features supported
- **Secure**: Security considerations addressed
- **Scalable**: Room for growth
- **Maintainable**: Clear structure and documentation
- **Flexible**: Multiple ORM options

The schema is ready for integration with the NestJS backend and will support both the web and mobile applications as specified in the project requirements.

---

**Document Version**: 1.0  
**Last Updated**: November 25, 2025  
**Status**: Production Ready
