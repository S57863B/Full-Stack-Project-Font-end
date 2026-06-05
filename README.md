# Pro-Tasker — Frontend

The frontend for **Pro-Tasker**, a full-stack MERN project management app. It is
a single-page React application (built with Vite) featuring user authentication,
a project dashboard, and a drag-and-drop Kanban task board.

## Backend repo - https://github.com/S57863B/Full-Stack-Project-Back-end

## Tech Stack

- **React** — UI, built with functional components and hooks
- **Vite** — build tool and dev server
- **React Router** — client-side routing
- **Axios** — API requests
- **Context API** — global authentication state
- **CSS Modules** — scoped component styling

## Features

- Register, log in, and log out (JWT-based, session persists across reloads)
- Create, view, update, and delete your own projects
- A Kanban board with five columns (Backlog, To Do, In Progress, In Review, Done)
- Create, edit, delete, and drag tasks between columns to change status
- Task priorities, tags, and due dates
- Loading, error, and empty states throughout
- Fully responsive (desktop, tablet, mobile)

## Getting Started (Local)

### Prerequisites
- Node.js 18+
- The backend API running (see the backend repo)

### Setup
```bash
# 1. Install dependencies
npm install

# 2. Create a .env file (see below)

# 3. Start the dev server
npm run dev
```

The app runs on `http://localhost:5173` by default.

To build for production:
```bash
npm run build      # output goes to dist/
npm run preview    # preview the production build locally
```

## Environment Variables

Create a `.env` file in the root:

| Variable        | Description                                       | Example |
| --------------- | ------------------------------------------------- | ------- |
| `VITE_API_URL`  | Base URL of the backend API                       | `https://pro-tasker-api.onrender.com` |

> For **local development**, leave `VITE_API_URL` blank — the Vite dev server
> proxies `/api` requests to `http://localhost:5000` (see `vite.config.js`).
>
> For **production**, set it to your deployed backend URL.

## Project Structure

```
src/
├── components/    # reusable UI (cards, board, modal, icons)
├── pages/         # route views (Login, Register, Dashboard, Project)
├── context/       # AuthContext (global login state)
├── hooks/         # custom data-fetching hooks
├── lib/           # API helper (attaches JWT to requests)
└── App.jsx        # routes + protected route guard
```

## Deployment

Deployed as a Static Site on Render. The `VITE_API_URL` environment variable
points to the deployed backend. A rewrite rule serves `index.html` for all
routes so client-side routing works on refresh.

- **Live App:** https://pro-tasker-d40w.onrender.com
- **Backend API:** https://pro-tasker-api-mtq7.onrender.com