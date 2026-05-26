# 🚀 CompileLab - Advanced Interactive Coding Platform

**Version:** 0.0.0 | **Status:** Active Development | **Stack:** React 19 + TypeScript + Vite + Redux Toolkit + RTK Query

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Project Structure](#project-structure)
4. [Technology Stack](#technology-stack)
5. [Development](#development)
6. [Code Patterns](#code-patterns)
7. [Screenshots](#screenshots)

---

## 🎯 Overview

**CompileLab** is an educational platform for managing coding courses, exercises, and student submissions. It provides an interactive workspace for instructors and students to collaborate on coding training with automated exercise grading.

### ✨ Key Features

**Students:** Browse courses • Submit code • Get real-time feedback • Track progress • View analytics

**Instructors:** Create courses • Design exercises • Review submissions • Generate reports • Track metrics

**All Users:** Secure JWT auth • Responsive UI • Error handling • Form validation • Session management

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ | **npm** v9+ | **Git**
- **Backend API** running on `http://localhost:5035` ⚠️ **CRITICAL**

### Installation

```bash
# Clone & install
git clone <repo-url>
cd compile-lab
npm install

# Configure (optional .env)
VITE_API_URL=http://localhost:5035
VITE_APP_NAME=CompileLab

# Start backend (in separate terminal)
cd ../backend
npm start  # Should run on :5035

# Start frontend
npm run dev  # Runs on :5173 or next available port
```

### Available Commands

```bash
npm run dev      # Start dev server with HMR
npm run build    # Type-check + bundle to /dist
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

---

## 📁 Project Structure

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Router setup
├── api/apiSlice.ts             # RTK Query base config + auth headers
├── app/
│   ├── store.ts                # Redux store + global error middleware
│   └── hooks.ts                # useAppSelector, useAppDispatch
├── components/
│   ├── navbar/, footer/
│   └── ui/                     # Reusable UI components (button, input, etc)
├── features/                   # Feature-based modules
│   ├── auth/                   # Login, Signup, authApi, authSlice
│   ├── course-catalog/         # Browse & join courses
│   ├── course-request/         # Course creation requests
│   ├── exercise/               # Exercise management
│   ├── student-answer/         # Code submissions
│   ├── student-course/         # Student's enrolled courses
│   ├── student-exercise/       # Student exercise view
│   ├── teacher-course/         # Instructor's courses
│   ├── report/                 # Analytics & reports
│   └── alert/                  # Notifications
├── pages/                      # Page-level components (combine features)
├── types/                      # TypeScript type definitions
└── lib/utils.ts                # Utility functions
```

### Feature Folder Pattern

Each feature follows this structure:

```
feature-name/
├── Component.tsx              # Main component(s)
├── featureApi.ts              # RTK Query endpoints
├── featureSlice.ts            # Redux state (if needed)
└── Component.module.scss      # Scoped styles
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|-------|--------------|
| **UI** | React 19, TypeScript, Vite, React Router v7 |
| **State** | Redux Toolkit, RTK Query, Middleware |
| **Forms** | React Hook Form, Shadcn UI |
| **Styling** | SCSS, CSS Modules, PostCSS |
| **Tools** | ESLint, TypeScript Strict Mode |
| **Build** | Vite (HMR, Tree-shaking, Code splitting) |

**Build Output:**
```
dist/
├── index.html
└── assets/
    ├── index-[hash].js
    └── index-[hash].css
```

---

## 💻 Development

### Naming Conventions

| Category | Pattern | Example |
|----------|---------|---------|
| Folders | `kebab-case` | `course-catalog/` |
| Components | `PascalCase.tsx` | `StudentCourseCard.tsx` |
| Styles | `PascalCase.module.scss` | `StudentCourseCard.module.scss` |
| API files | `camelCase.ts` | `studentCourseApi.ts` |
| Redux | `camelCase.ts` | `authSlice.ts` |
| Types | `camelCase.types.ts` | `exercise.types.ts` |
| Functions | `camelCase` | `handleSubmit()`, `fetchData()` |

### State Management

**Redux Store Structure:**
```
auth              # User, token, isLoading, error
alert             # message, type, isVisible
RTK Query Cache   # Courses, Exercises, Submissions, Reports
```

**Access Redux in Components:**
```typescript
import { useAppSelector, useAppDispatch } from '@/app/hooks';

const user = useAppSelector((state) => state.auth.user);
const token = useAppSelector((state) => state.auth.token);
const dispatch = useAppDispatch();
```

### API Integration (RTK Query)

All API calls automatically get Bearer token injection:

```typescript
// In featureApi.ts
export const featureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query (GET) - cached automatically
    getItems: builder.query({
      query: () => '/items',
      providesTags: ['Items'],
    }),
    
    // Mutation (POST/PUT/DELETE)
    createItem: builder.mutation({
      query: (data) => ({
        url: '/items',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Items'],
    }),
  }),
});

export const { useGetItemsQuery, useCreateItemMutation } = featureApi;
```

**Use in Components:**
```typescript
const { data, isLoading, error } = useGetItemsQuery();
const [create, { isLoading: isCreating }] = useCreateItemMutation();

const handleCreate = async (data) => {
  await create(data).unwrap();  // Errors handled globally
};
```

### Error Handling

Global middleware in `store.ts` handles all errors:
- **401**: Auto-logout → redirect to `/login`
- **403**: Show access denied alert
- **404/500**: Navigate to error page
- **Network errors**: Show "server down" page

Components don't need try-catch blocks - errors are handled automatically!

### Styling with CSS Modules

```scss
// StudentCourseCard.module.scss
.container {
  padding: 20px;
  border-radius: 8px;
  background: #f5f5f5;
  
  &:hover {
    background: #e9e9e9;
    transform: translateY(-2px);
  }
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
}
```

```typescript
// StudentCourseCard.tsx
import styles from './StudentCourseCard.module.scss';

export const StudentCourseCard = ({ course }) => (
  <div className={styles.container}>
    <h3 className={styles.title}>{course.name}</h3>
  </div>
);
```

---

## 📋 Code Patterns

### Component Pattern

```typescript
import React from 'react';
import { Course } from '@/types/exercise.types';
import styles from './Component.module.scss';

interface ComponentProps {
  course: Course;
  onAction?: (id: string) => void;
}

export const Component: React.FC<ComponentProps> = ({ course, onAction }) => {
  const handleClick = () => onAction?.(course.id);
  
  return (
    <div className={styles.container}>
      <h3>{course.name}</h3>
      <button onClick={handleClick}>Action</button>
    </div>
  );
};
```

### Form with React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import { useLoginMutation } from './authApi';

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [login, { isLoading }] = useLoginMutation();
  
  const onSubmit = async (data) => {
    try {
      await login(data).unwrap();
    } catch (error) {
      // Handled globally
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      {errors.email && <span>Required</span>}
      <button disabled={isLoading}>{isLoading ? 'Loading...' : 'Submit'}</button>
    </form>
  );
};
```

### Custom Hook

```typescript
import { useAppSelector } from '@/app/hooks';

export const useAuthStatus = () => {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  
  return { user, isAuthenticated: !!token };
};
```

---

## 📍 Routes

```typescript
// src/App.tsx
<Routes>
  {/* Public */}
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  
  {/* Student */}
  <Route path="/studies" element={<StudentCoursesList />} />
  <Route path="/studies/:courseId/exercises" element={<StudentExerciseList />} />
  <Route path="/exercise/:exerciseId" element={<ExerciseWorkspace />} />
  
  {/* Instructor */}
  <Route path="/instructors" element={<TeacherCourseList />} />
  <Route path="/instructors/:courseId" element={<TeacherCourseManagementPage />} />
  
  {/* Other */}
  <Route path="/requests" element={<LecturerRequestsPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

---

## 🖼️ Screenshots

### Homepage
![Homepage](./screenshots/homepage.png)
Main landing page with platform overview and navigation

### Login Page
![Login Page](./screenshots/login.png)
User authentication with email/password and visibility toggle

### Sign Up Page
![Sign Up Page](./screenshots/signup.png)
New user registration with validation

---

## 📝 Quick Development Checklist

- [ ] Follow naming conventions (kebab-case folders, PascalCase components)
- [ ] Use TypeScript - avoid `any` types
- [ ] Global state → Redux, API data → RTK Query, UI state → local hooks
- [ ] Import path aliases: `@/features/`, `@/types/`, `@/app/`
- [ ] Styles in CSS Modules only
- [ ] Prop types always defined
- [ ] Errors handled automatically - no try-catch needed

---

## 🚀 Production Build

```bash
npm run build      # Type-check + bundle
npm run preview    # Preview before deploying
```

### Deployment Checklist

- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] Backend API configured
- [ ] Environment variables set
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Error tracking active

### Production Environment

```
VITE_API_URL=https://api.compilelab.com
VITE_APP_ENV=production
```

---

## 📚 Resources

- **TypeScript**: https://www.typescriptlang.org/docs/
- **Redux Toolkit**: https://redux-toolkit.js.org/
- **RTK Query**: https://redux-toolkit.js.org/rtk-query/overview
- **React Router**: https://reactrouter.com/
- **React Hook Form**: https://react-hook-form.com/

---

## 🤝 Contributing

### Commit Format
```
type(scope): subject

body (optional)
```

**Types:** `feat`, `fix`, `docs`, `refactor`, `style`

### Branch Naming
```
feature/name          # New features
fix/issue-name        # Bug fixes
docs/topic            # Documentation
refactor/component    # Code improvements
```

---

## ⚠️ Important Notes

- **Backend required:** Start backend on `:5035` before dev server
- **Type safety:** Always use TypeScript strict mode
- **Redux DevTools:** Install extension for debugging
- **HMR:** Changes auto-reload in dev mode
- **Environment:** Create `.env` file if needed

---

## 📄 License

CompileLab © 2026. All rights reserved.

---

**Last Updated:** May 27, 2026 | **Version:** 1.0.0 | **Status:** Active Development
