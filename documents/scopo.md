# QuestForge - Initial Scope

**Final Integrating Project — Technical Course in Systems Development**  
**Student:** KerubinDev  
**Professor:** Gabriel Barros  
**Date:** November 2025

---

## 1. Program Description

**QuestForge** is an integrated platform for managing tabletop RPG campaigns. The system allows Game Masters to manage all aspects of a campaign in a centralized and organized manner, while players track their characters and story progress through a dedicated mobile interface.

The program solves the problem of information fragmentation in RPG campaigns by offering a single place to store and manage campaigns, characters, NPCs, items, sessions, and media (maps, images).

---

## 2. Main Features

### 2.1. For the Game Master (Web Interface)

The Game Master has access to a complete management panel with the following features:

**Authentication:**
- Secure login and logout
- New account registration
- Password recovery

**Campaign Management:**
- Create new campaigns with name, description, and setting
- Edit campaign information
- View all campaigns
- Delete campaigns
- Invite players to participate

**Character Management:**
- Create player character sheets with attributes (Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma)
- Edit character information
- View complete character sheets
- Delete characters
- Manage inventory for each character

**NPC Management:**
- Create non-player characters with description and role in the campaign
- Edit and view NPCs
- Delete NPCs
- Organize by relationships

**Item Management:**
- Create items, weapons, armor, and artifacts
- Categorize by type and rarity
- Edit and view items
- Assign items to characters
- Delete items

**Session Management:**
- Record session dates and summaries
- Add important notes and story milestones
- Edit and view sessions
- Delete sessions

**Media Management:**
- Upload images (maps, character art)
- View image gallery
- Delete images

### 2.2. For the Player (Mobile Interface)

The Player has access to a mobile application focused on viewing and tracking:

**Authentication:**
- Login and logout
- New account registration

**Campaign Viewing:**
- List campaigns the player participates in
- Select a campaign to track

**Character Sheet:**
- View attributes (Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma)
- View skills
- View character history

**Inventory:**
- View all character items
- See description and properties of each item
- Track item quantities

**Campaign Journal:**
- View list of all campaign sessions
- Read session summaries
- Track milestones and important notes

**Maps and Images:**
- View campaign maps and images
- Zoom and full-screen viewing

---

## 3. Web Application Screens (Game Master)

### 3.1. Login Screen
Simple form with email and password fields. Options to recover password or create new account.

### 3.2. Dashboard (Home)
Home page showing:
- Personalized welcome message
- List of recent campaigns
- Quick statistics (total campaigns, characters, next session)
- Button to create new campaign

### 3.3. Campaign List
Table or grid showing all campaigns with:
- Campaign name
- Creation date
- Number of characters
- Status (active, paused, completed)
- Action buttons (open, edit, delete)

### 3.4. Campaign Details
Main campaign page with tabs for:
- **Characters:** List of player characters with options to create, edit, view, and delete
- **NPCs:** List of NPCs with options to create, edit, view, and delete
- **Items:** List of items with options to create, edit, view, and delete
- **Sessions:** List of sessions with options to create, edit, view, and delete
- **Media:** Image gallery with upload and delete options
- **Settings:** Edit campaign information and invite players

### 3.5. Create/Edit Character
Form with fields:
- Name, Class, Race, Level
- Attributes (Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma)
- Skills (text field)
- History (rich text editor)

### 3.6. Create/Edit NPC
Form with fields:
- Name, Description, Role in Campaign
- Attributes and Skills
- Relationships

### 3.7. Create/Edit Item
Form with fields:
- Name, Description
- Type (dropdown: weapon, armor, consumable, artifact, misc)
- Rarity (dropdown: common, uncommon, rare, very rare, legendary)
- Special properties and effects

### 3.8. Create/Edit Session
Form with fields:
- Date, Time, Title
- Summary (rich text editor)
- Important notes
- Story milestones

### 3.9. Media Gallery
Image grid with:
- Image thumbnails
- Drag-and-drop upload option
- View and delete buttons

### 3.10. Invite Players
Form for:
- Enter player email
- Send invitation
- View invitation status (pending, accepted, declined)

---

## 4. Mobile Application Screens (Player)

### 4.1. Login Screen
Simple form optimized for mobile with email and password fields.

### 4.2. Dashboard (Home)
List of campaigns the player participates in, showing:
- Campaign name
- Game Master name
- Number of characters
- Button to enter campaign

### 4.3. Character Sheet
Screen with sliding tabs showing:
- **Attributes:** The 6 main attributes with values and modifiers
- **Skills:** List of skills with description
- **Inventory:** List of character items
- **History:** Character history information

### 4.4. Inventory
List of character items showing:
- Item name
- Type and rarity
- Quantity
- Option to expand for full description

### 4.5. Campaign Journal
List of campaign sessions showing:
- Session date
- Session title
- Brief summary
- Option to expand for full summary

### 4.6. Maps and Images
Campaign image gallery with:
- Image thumbnails
- Option to view full-screen
- Zoom and navigation

### 4.7. Profile
Page with player information and logout options.

---

## 5. Technologies to Be Used

### 5.1. Back-end / API

**Language and Framework:**
- TypeScript + NestJS

**Database:**
- PostgreSQL

**Authentication:**
- JWT (Access + Refresh Tokens)

**File Storage:**
- To be defined

---

### 5.2. Web Application

**Frontend Framework:**
- React

**Language:**
- TypeScript

**Styling:**
- TailwindCSS + Shadcn/UI

**State Management:**
- Zustand

**HTTP Client:**
- Axios

---

### 5.3. Mobile Application

**Framework:**
- React Native (Expo)

**Language:**
- TypeScript

**State Management:**
- Zustand

**HTTP Client:**
- Axios

---

### 5.4. Tools and Infrastructure

**Version Control:**
- Git + GitHub

**Development Environment:**
- VS Code

**Testing:**
- Jest (Backend)  
- React Testing Library (Web)  
- Jest + Testing Library (Mobile)

**API Documentation:**
- Swagger (via NestJS)


---

## 6. Development Order and Timeline

**Start Date:** November 27, 2025  
**End Date:** February 28, 2026  
**Total Duration:** 3 months (approximately 13 weeks)

### 6.1. Phase 1: Infrastructure Setup (Week 1 - November 27 to December 3)

**Tasks:**
- Set up GitHub repository structure
- Configure development environment (Codespaces)
- Create database schema (PostgreSQL)
- Set up project documentation
- Initialize back-end project structure

**Deliverables:**
- GitHub repository ready
- Database schema created
- Development environment configured
- Documentation structure in place

### 6.2. Phase 2: Back-end Foundation (Week 2-3 - December 4 to December 17)

**Tasks:**
- Implement authentication system (Login, Logout, Registration)
- Create API endpoints for authentication
- Implement JWT and password hashing
- Create base API structure
- Set up error handling and validation

**Deliverables:**
- Working authentication system
- API documentation (Swagger)
- Authentication endpoints tested

### 6.3. Phase 3: Campaign and Character Management (Week 4-5 - December 18 to December 31)

**Tasks:**
- Create CRUD endpoints for campaigns
- Create CRUD endpoints for characters
- Implement campaign member management
- Create player invitation system
- Add inventory management endpoints

**Deliverables:**
- Complete campaign API
- Complete character API
- Complete inventory API
- API endpoints tested

### 6.4. Phase 4: Web Application - Part 1 (Week 6-7 - January 1 to January 14)

**Tasks:**
- Set up Vue.js project
- Create layout components (Header, Sidebar, Navigation)
- Implement login page
- Implement dashboard
- Implement campaign list and details pages

**Deliverables:**
- Web app with authentication
- Campaign management interface
- Responsive design

### 6.5. Phase 5: Web Application - Part 2 (Week 8-9 - January 15 to January 28)

**Tasks:**
- Implement character management pages
- Implement NPC management pages
- Implement item management pages
- Implement session management pages
- Add media upload and gallery

**Deliverables:**
- Complete web application for Game Master
- All management features implemented
- Integration with back-end API

### 6.6. Phase 6: Mobile Application - Part 1 (Week 10 - January 29 to February 4)

**Tasks:**
- Set up Flutter project
- Create login screen
- Create campaign list screen
- Create character sheet screen (basic)

**Deliverables:**
- Mobile app with authentication
- Campaign selection working
- Basic character sheet display

### 6.7. Phase 7: Mobile Application - Part 2 (Week 11 - February 5 to February 11)

**Tasks:**
- Complete character sheet with all tabs (Attributes, Skills, Inventory, History)
- Implement inventory screen
- Implement campaign journal screen
- Add maps and images gallery

**Deliverables:**
- Complete mobile app for Player
- All viewing features implemented
- Integration with back-end API

### 6.8. Phase 8: Additional Features (Week 12 - February 12 to February 18)

**Tasks:**
- Implement NPC management in web app
- Implement item management in web app
- Implement session management in web app
- Add notification system
- Implement media upload functionality

**Deliverables:**
- All secondary features implemented
- Complete feature set for Game Master
- Complete feature set for Player

### 6.9. Phase 9: Testing and Refinement (Week 13 - February 19 to February 28)

**Tasks:**
- Perform comprehensive testing (Web and Mobile)
- Fix bugs and issues
- Optimize performance
- Refine UI/UX
- Complete documentation
- Prepare presentation

**Deliverables:**
- Fully tested application
- Bug fixes completed
- Performance optimized
- Complete documentation
- Presentation ready

### 6.10. Priority Order Summary

1. **Critical (Must Have):**
   - Authentication system
   - Campaign CRUD
   - Character CRUD
   - Web dashboard
   - Mobile character sheet
   - Mobile campaign journal

2. **High (Should Have):**
   - NPC management
   - Item management
   - Session management
   - Media upload
   - Inventory management

3. **Medium (Nice to Have):**
   - Notifications
   - Advanced search/filtering
   - User profiles
   - Campaign statistics

### 6.11. Weekly Milestones

| Week | Dates | Phase | Status |
| :--- | :--- | :--- | :--- |
| 1 | Nov 27 - Dec 3 | Infrastructure Setup | ⏳ |
| 2-3 | Dec 4 - Dec 17 | Back-end Foundation | ⏳ |
| 4-5 | Dec 18 - Dec 31 | Campaign & Character API | ⏳ |
| 6-7 | Jan 1 - Jan 14 | Web App Part 1 | ⏳ |
| 8-9 | Jan 15 - Jan 28 | Web App Part 2 | ⏳ |
| 10 | Jan 29 - Feb 4 | Mobile App Part 1 | ⏳ |
| 11 | Feb 5 - Feb 11 | Mobile App Part 2 | ⏳ |
| 12 | Feb 12 - Feb 18 | Additional Features | ⏳ |
| 13 | Feb 19 - Feb 28 | Testing & Refinement | ⏳ |
