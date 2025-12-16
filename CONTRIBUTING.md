# Contributing to QuestForge

First off, thank you for considering contributing to QuestForge! 🎉

It's people like you that make QuestForge such a great tool for the tabletop RPG community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inclusive environment. By participating, you are expected to uphold this standard.

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if applicable**
- **Include your environment details** (OS, browser, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **A clear and descriptive title**
- **A detailed description of the proposed feature**
- **Explain why this enhancement would be useful**
- **List any alternatives you've considered**

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`
3. Make your changes
4. Write or update tests as needed
5. Ensure all tests pass
6. Update documentation
7. Submit a pull request

## 🛠️ Development Setup

### Prerequisites

- Node.js 20+
- PostgreSQL 14+
- Git

### Setup Steps

1. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/quest-forge.git
   cd quest-forge
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   
   # Mobile (optional)
   cd ../mobile
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

4. **Set up the database**
   ```bash
   cd backend
   npm run typeorm migration:run
   ```

5. **Start development servers**
   ```bash
   # Backend (in one terminal)
   cd backend
   npm run start:dev
   
   # Frontend (in another terminal)
   cd frontend
   npm run dev
   ```

## 🔄 Pull Request Process

1. **Update the README.md** with details of changes if applicable
2. **Update the documentation** if you're changing functionality
3. **Add tests** for new features
4. **Ensure all tests pass** before submitting
5. **Follow the code style guidelines** (see below)
6. **Write a clear PR description** explaining what and why
7. **Link related issues** in your PR description

### PR Title Format

Use conventional commits format:

```
<type>(<scope>): <subject>

Examples:
feat(campaigns): add campaign sharing feature
fix(auth): resolve token refresh issue
docs(readme): update installation instructions
style(ui): improve button hover effects
```

## 🎨 Style Guidelines

### TypeScript Style Guide

- Use **TypeScript** for all new code
- Enable strict mode in `tsconfig.json`
- Use **interfaces** for object types
- Use **arrow functions** for methods when appropriate
- Prefer **const** over **let**, avoid **var**
- Use **meaningful variable names**

### Code Formatting

We use **Prettier** and **ESLint** for code formatting:

```bash
# Format code
npm run format

# Lint code
npm run lint
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `CampaignCard.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Types**: PascalCase (e.g., `Campaign.ts`)

### Component Structure

```typescript
// Imports
import React from 'react';
import { ComponentProps } from './types';

// Types/Interfaces
interface Props {
  title: string;
  onSave: () => void;
}

// Component
export const MyComponent: React.FC<Props> = ({ title, onSave }) => {
  // Hooks
  const [state, setState] = useState();
  
  // Event handlers
  const handleClick = () => {
    // ...
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

## 📝 Commit Message Guidelines

We follow the **Conventional Commits** specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding or updating tests
- **chore**: Changes to build process or auxiliary tools

### Examples

```bash
feat(campaigns): add ability to archive campaigns

fix(auth): resolve JWT token expiration issue

docs(readme): update installation instructions

style(ui): improve spacing in campaign cards

refactor(api): simplify character creation endpoint

test(campaigns): add unit tests for campaign service

chore(deps): update dependencies to latest versions
```

## 🧪 Testing

- Write **unit tests** for new functions and utilities
- Write **integration tests** for API endpoints
- Write **component tests** for React components
- Aim for **>80% code coverage** on new code

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch
```

## 📚 Documentation

- Update **JSDoc comments** for functions and classes
- Update **README.md** for user-facing changes
- Update **API documentation** (Swagger) for API changes
- Add **inline comments** for complex logic

## ❓ Questions?

Feel free to open an issue with your question, or reach out to the maintainers.

---

**Thank you for contributing to QuestForge!** 🎲⚔️
