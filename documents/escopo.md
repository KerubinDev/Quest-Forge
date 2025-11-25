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
- To be defined

**Database:**
- To be defined

**Authentication:**
- To be defined

**File Storage:**
- To be defined

### 5.2. Web Application

**Frontend Framework:**
- To be defined

**Language:**
- To be defined

**Styling:**
- To be defined

**State Management:**
- To be defined

**HTTP Client:**
- To be defined

### 5.3. Mobile Application

**Framework:**
- To be defined

**Language:**
- To be defined

**State Management:**
- To be defined

**HTTP Client:**
- To be defined

### 5.4. Tools and Infrastructure

**Version Control:**
- To be defined

**Development Environment:**
- To be defined

**Testing:**
- To be defined

**API Documentation:**
- To be defined

---

## 6. Conclusion

QuestForge is a complete system for managing tabletop RPG campaigns, with specialized interfaces for Game Masters (web) and Players (mobile). The system provides all necessary features to organize, manage, and track campaigns in a centralized and intuitive manner.
