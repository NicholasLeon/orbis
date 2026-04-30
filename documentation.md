# Orbis - Technical Documentation

## Project Overview

**Orbis** is an enterprise communication platform built with modern full-stack technologies. It provides real-time messaging, workspace management, and channel-based communication for team collaboration.

### Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Frontend Framework** | Next.js | 16.2.4 |
| **UI Library** | React | 19.2.4 |
| **Backend Server** | Elysia | 1.4.28 |
| **Database ORM** | Drizzle ORM | 0.45.2 |
| **Database** | PostgreSQL | (via Neon) |
| **Authentication** | JWT (jose) | 6.2.3 |
| **Real-time** | WebSocket | Native |
| **Query Management** | TanStack React Query | 5.100.6 |
| **Styling** | Tailwind CSS | 4 |
| **UI Components** | shadcn/ui | 4.5.0 |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│          Next.js Frontend (App Router)           │
│  (Authentication, Dashboard, Channel Views)     │
└────────────────┬────────────────────────────────┘
                 │
        ┌────────┴─────────┬──────────────┐
        │                  │              │
   ┌────▼─────┐    ┌──────▼──────┐  ┌───▼──────┐
   │ Server    │    │  WebSocket  │  │ Services │
   │ Actions   │    │  (Elysia)   │  │ Layer    │
   │           │    │  Real-time  │  │ (Business│
   └─┬─────────┘    └─────┬───────┘  │ Logic)   │
     │                    │          └────┬─────┘
     └────────────────────┼──────────────┬┘
                          │              │
                    ┌─────▼──────────────▼─────┐
                    │  Database (PostgreSQL)   │
                    │  Drizzle ORM Schema      │
                    └──────────────────────────┘
```

---

## Core Database Schema

| Entity | Purpose | Key Fields |
|--------|---------|-----------|
| **Users** | User accounts & authentication | id, name, email, password, image, createdAt |
| **Workspaces** | Multi-tenant workspace containers | id, name, slug, inviteCode, createdBy, createdAt |
| **Members** | User-Workspace relationships | id, userId, workspaceId, role (admin/moderator/member), joinedAt |
| **Channels** | Chat rooms (text/voice/announcement) | id, workspaceId, name, type, createdAt |
| **Messages** | Chat messages | id, channelId, memberId, content, createdAt |
| **ChannelMembers** | Member-Channel relationships | memberId, channelId |
| **ChannelReadStatus** | Track read/unread messages | memberId, channelId, lastReadAt |

---

## Key Project Structure

### Configuration Files

| File | Purpose |
|------|---------|
| [next.config.ts](next.config.ts) | Next.js configuration & build settings |
| [tsconfig.json](tsconfig.json) | TypeScript compiler options |
| [drizzle.config.ts](drizzle.config.ts) | Drizzle ORM database config & migrations |
| [tailwind.config.ts](tailwind.config.ts) | Tailwind CSS theme & plugin configuration |
| [components.json](components.json) | shadcn/ui component registry |
| [package.json](package.json) | Dependencies & npm scripts |

### Source Structure

#### Entry Points

| File | Purpose |
|------|---------|
| [src/index.ts](src/index.ts) | Elysia WebSocket server entry point; handles real-time notifications |
| [src/app/layout.tsx](src/app/layout.tsx) | Root Next.js layout; metadata, fonts, providers |
| [src/app/page.tsx](src/app/page.tsx) | Landing page; hero, features, CTA |

#### Frontend Pages & Routes

| Path | Purpose |
|------|---------|
| [src/app/(auth)/login/](src/app/(auth)/login/) | User login page & components |
| [src/app/(auth)/register/](src/app/(auth)/register/) | User registration page & components |
| [src/app/dashboard/](src/app/dashboard/) | Main dashboard layout & navigation |
| [src/app/dashboard/[workspaceId]/[channelId]/](src/app/dashboard/[workspaceId]/[channelId]/) | Channel chat view & message display |

#### Business Logic & Services

| Directory | Purpose |
|-----------|---------|
| [src/actions/](src/actions/) | **Server Actions** - Backend logic for channel, message, member, workspace operations |
| [src/services/](src/services/) | **Service Layer** - Database queries & business logic (auth, channels, members, etc.) |
| [src/lib/](src/lib/) | **Utilities & Auth** - Helper functions, JWT auth, session management, invite generation |
| [src/schemas/](src/schemas/) | **Zod Validation** - Input validation schemas for auth, channels, members, messages, workspaces |

#### Frontend Components

| Directory | Purpose |
|-----------|---------|
| [src/components/ui/](src/components/ui/) | **shadcn/ui Components** - Reusable UI primitives (button, dialog, input, sidebar, etc.) |
| [src/app/components/](src/app/components/) | **Marketing Components** - Hero, navbar, features, footer for landing page |
| [src/app/dashboard/components/](src/app/dashboard/components/) | **Dashboard UI** - Sidebar, navbar, channel input, empty states, modals |

#### Data & State Management

| Directory | Purpose |
|-----------|---------|
| [src/db/](src/db/) | **Database setup** - Connection pool, Drizzle schema definitions |
| [src/hooks/](src/hooks/) | **Custom React Hooks** - Mobile detection, socket events, notifications |
| [src/providers/](src/providers/) | **React Context** - Query provider for TanStack React Query |

#### Real-time & Networking

| File | Purpose |
|------|---------|
| [src/websocket/client.ts](src/websocket/client.ts) | Client-side WebSocket management & event handling |
| [src/websocket/types.ts](src/websocket/types.ts) | TypeScript types for WebSocket messages |
| [src/websocket/notif.ts](src/websocket/notif.ts) | Notification event handlers |
| [src/middleware/auth.middleware.ts](src/middleware/auth.middleware.ts) | Next.js authentication middleware |

#### Additional Files

| File | Purpose |
|------|---------|
| [src/proxy.ts](src/proxy.ts) | Proxy configuration or request handling utilities |

---

## Key Features & Flows

### 1. **Authentication Flow**
- User registration/login via [src/app/(auth)/](src/app/(auth)/)
- JWT token generation in [src/lib/auth.ts](src/lib/auth.ts)
- Session management in [src/lib/authSession.ts](src/lib/authSession.ts)
- Protected routes via [src/middleware/auth.middleware.ts](src/middleware/auth.middleware.ts)

### 2. **Workspace & Channel Management**
- Create/manage workspaces in [src/actions/workspaceAction.ts](src/actions/workspaceAction.ts)
- Create/delete channels in [src/actions/channelAction.ts](src/actions/channelAction.ts)
- Channel display in [src/app/dashboard/[workspaceId]/[channelId]/](src/app/dashboard/[workspaceId]/[channelId]/)

### 3. **Real-time Messaging**
- WebSocket server in [src/index.ts](src/index.ts)
- Message submission in [src/actions/messageAction.ts](src/actions/messageAction.ts)
- Real-time sync via [src/websocket/client.ts](src/websocket/client.ts)

### 4. **Member & Role Management**
- Member operations in [src/actions/memberAction.ts](src/actions/memberAction.ts)
- Role-based access (admin/moderator/member) in schema

---

## Database Migrations

| File | Version | Purpose |
|------|---------|---------|
| [drizzle/0000_needy_meteorite.sql](drizzle/0000_needy_meteorite.sql) | v0 | Initial schema setup |
| [drizzle/0001_left_warpath.sql](drizzle/0001_left_warpath.sql) | v1 | Schema updates |
| [drizzle/0002_stiff_dracula.sql](drizzle/0002_stiff_dracula.sql) | v2 | Schema updates |

---

## Entry Points & Deployment

### Development
```bash
npm run dev          # Start Next.js dev server + WebSocket server
npm run build        # Production build
npm run start        # Production server
```

### Key Servers
- **Next.js App Router**: `http://localhost:3000`
- **Elysia WebSocket**: Embedded in `src/index.ts`

---

## Future Roadmap

- 📝 Approval System (leave requests, permissions)
- 🧰 Internal Tools (custom company operations)
- 🔗 Third-party Integrations

---

## Notes

- **Multi-tenant**: Each workspace is isolated
- **Real-time**: WebSocket notifications for messages & status updates
- **Secure**: JWT-based authentication with bcrypt password hashing
- **Type-safe**: Full TypeScript + Zod validation
- **Database**: PostgreSQL via Neon serverless with Drizzle ORM
