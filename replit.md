# Todo App - React + TypeScript + Bootstrap

## Overview
A modern, responsive todo list application built with React, TypeScript, Vite, and Bootstrap. Features a clean interface with sample tasks and full CRUD functionality for managing todos.

## Current State
- **Status**: ✅ Fully functional and running on port 5000
- **Last Updated**: September 05, 2025
- **Environment**: Replit with Bun runtime

## Project Architecture

### Tech Stack
- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6.3.2
- **Styling**: Bootstrap 5.3.5 + SCSS + Custom fonts (Inter, Ubuntu Sans)
- **Icons**: React Icons (FontAwesome)
- **Package Manager**: Bun
- **Runtime**: Bun

### Project Structure
```
├── src/
│   ├── components/
│   │   ├── TodoInternal.tsx      # Main todo logic component
│   │   └── TodoListItem.tsx      # Individual todo item component
│   ├── scss/
│   │   └── App.scss              # Bootstrap + custom styles
│   ├── App.tsx                   # Main app component
│   ├── functions.ts              # Utility functions
│   └── main.tsx                  # React entry point
├── vite.config.ts                # Vite config (configured for Replit)
├── package.json                  # Dependencies and scripts
└── index.html                    # HTML template
```

### Key Features
- ✅ Add new todos (Enter key to submit)
- ✅ Mark todos as complete/incomplete
- ✅ Edit todo names (via prompt dialog)
- ✅ Delete todos (with confirmation for incomplete items)
- ✅ Duplicate detection
- ✅ Responsive Bootstrap UI
- ✅ Custom font styling (Inter + Ubuntu Sans)
- ✅ Hover effects on action buttons

## Configuration

### Development Server
- **Host**: 0.0.0.0 (configured for Replit proxy)
- **Port**: 5000 (required for Replit)
- **HMR**: Enabled with client port 5000

### Deployment
- **Target**: Autoscale (stateless website)
- **Build**: `bun run build` (TypeScript compilation + Vite build)
- **Run**: `bun run preview` (serves built files)

## Recent Changes
- **2025-09-05**: Project imported and configured for Replit
  - Fixed TypeScript type definitions (Arr, RenameFn)
  - Configured Vite for Replit environment (0.0.0.0:5000)
  - Set up development workflow
  - Configured deployment settings
  - Verified full functionality

## Development Workflow
1. **Start Development**: Workflow "Todo App Server" runs `bun run dev`
2. **Build**: `bun run build` creates production assets
3. **Preview**: `bun run preview` serves built files locally
4. **Lint**: `bun run lint` runs ESLint checks

## Notes
- Project uses some deprecated Bootstrap/SCSS functions (warnings only, functionality intact)
- Sample todos included for demonstration purposes
- All hosts allowed in Vite config for Replit proxy compatibility