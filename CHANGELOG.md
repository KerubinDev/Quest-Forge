# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 🚧 In Progress
- Campaign invitation system
- Inventory management endpoints
- NPC management UI
- Item management UI
- Session management UI
- Media gallery implementation

---

## [0.3.0] - 2025-12-16

### ✨ Added
- Character CRUD endpoints in backend
- Character management module with TypeORM entities
- Character validation with class-validator
- JWT authentication guards for character endpoints
- Swagger documentation for character API

### 🔄 Changed
- Improved error handling in API responses
- Enhanced authentication middleware

### 🐛 Fixed
- Token refresh mechanism improvements
- Database connection stability

---

## [0.2.0] - 2025-12-10

### ✨ Added
- Campaign CRUD endpoints in backend
- Campaign management module with TypeORM
- Campaign membership system
- User-campaign relationship mapping
- API documentation with Swagger

### 🔄 Changed
- Enhanced database schema for campaigns
- Improved validation rules

---

## [0.1.0] - 2025-12-03

### ✨ Added
- Initial project structure
- NestJS backend setup with TypeScript
- PostgreSQL database integration
- React frontend with Vite
- JWT authentication system (access + refresh tokens)
- User registration and login endpoints
- Password hashing with bcrypt
- TypeORM integration
- Prisma schema reference
- Docker Compose configuration
- ESLint and Prettier configuration
- Basic project documentation

### 🛡️ Security
- Implemented JWT authentication
- Added Helmet.js for security headers
- Configured CORS properly
- Password hashing with bcrypt

---

## Project Milestones

### ✅ Phase 1: Infrastructure Setup (Week 1)
**Status:** COMPLETED ✅  
**Date:** November 27 - December 3, 2025

- [x] GitHub repository structure
- [x] Development environment setup
- [x] Database schema design
- [x] Documentation structure

### ✅ Phase 2: Backend Foundation (Week 2-3)
**Status:** COMPLETED ✅  
**Date:** December 4 - December 17, 2025

- [x] Authentication system implementation
- [x] JWT token management
- [x] User registration and login
- [x] API base structure
- [x] Swagger documentation

### 🚧 Phase 3: Campaign & Character Management (Week 4-5)
**Status:** IN PROGRESS 🔄  
**Date:** December 18 - December 31, 2025

- [x] Campaign CRUD endpoints
- [x] Character CRUD endpoints
- [ ] Inventory management
- [ ] Player invitation system

### 📋 Phase 4-5: Web Application (Week 6-9)
**Status:** PLANNED 📅  
**Date:** January 1 - January 28, 2026

- [ ] Dashboard and layout
- [ ] Campaign management UI
- [ ] Character management UI
- [ ] NPC, Item, Session management UI
- [ ] Media gallery

### 📱 Phase 6-7: Mobile Application (Week 10-11)
**Status:** PLANNED 📅  
**Date:** January 29 - February 11, 2026

- [ ] Character sheet viewer
- [ ] Inventory tracker
- [ ] Campaign journal
- [ ] Maps and images viewer

### 🎯 Phase 8-9: Testing & Polish (Week 12-13)
**Status:** PLANNED 📅  
**Date:** February 12 - February 28, 2026

- [ ] Comprehensive testing
- [ ] Bug fixes and optimization
- [ ] UI/UX refinement
- [ ] Final documentation

---

## Version History

- **[0.3.0]** - Character Management (December 16, 2025)
- **[0.2.0]** - Campaign Management (December 10, 2025)
- **[0.1.0]** - Initial Release (December 3, 2025)

---

## Legend

- ✨ **Added** - New features
- 🔄 **Changed** - Changes in existing functionality
- 🗑️ **Deprecated** - Soon-to-be removed features
- ❌ **Removed** - Removed features
- 🐛 **Fixed** - Bug fixes
- 🛡️ **Security** - Security improvements
- 📝 **Documentation** - Documentation changes
- ⚡ **Performance** - Performance improvements

[Unreleased]: https://github.com/kerubindev/quest-forge/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/kerubindev/quest-forge/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/kerubindev/quest-forge/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/kerubindev/quest-forge/releases/tag/v0.1.0
