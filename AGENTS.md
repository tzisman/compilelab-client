# CompileLab Client - AI Agent Guide

## Project Overview

**CompileLab** is a React-based educational platform for managing courses, exercises, and student submissions. The frontend is built with React 19, TypeScript, Vite, Redux Toolkit, and RTK Query.

- **Backend API**: Runs on `http://localhost:5035` (required for development)
- **Frontend Dev Server**: `http://localhost:5173` (via Vite HMR)
- **Type Safety**: Full strict TypeScript mode enabled

---

## Getting Started

### Commands
```bash
npm run dev       # Start dev server with HMR on port 5173
npm run build     # Type-check + Vite bundle to /dist
npm run lint      # Run ESLint on all TS/TSX files
npm run preview   # Preview production build locally
```

**Critical**: Ensure backend API is running on `http://localhost:5035` before starting dev server.

---

## Architecture

### State Management: Redux Toolkit + RTK Query

**Global Store Structure**:
- **Auth Module** ([src/features/auth/](src/features/auth/)): Login/signup state, user info, JWT token
- **Per-Feature Modules**: Each domain (courses, exercises, reports) has its own feature folder with API + Redux slices
- **Base API**: [src/api/apiSlice.ts](src/api/apiSlice.ts) provides centralized `fetchBaseQuery` with automatic Bearer token injection
- **Error Middleware**: [src/app/store.ts](src/app/store.ts) handles all HTTP errors globally:
  - `401`: Auto-logout + redirect to /login
  - `403`: Access denied alert
  - `404`, `500`: Error page
  - Connection failures: Server down page

**RTK Query Pattern**:
```typescript
// apiSlice injects endpoints, providing auto-generated hooks
export const { useGetCoursesQuery, useCreateCourseMutation } = coursesApi;
```

### Component Architecture

**Feature-Based Organization**: Each domain lives in `src/features/{domain-name}/`
```
features/
├── auth/              # Authentication (Login, Signup, state)
├── course-catalog/    # Browse & join courses
├── course-request/    # Course creation requests
├── exercise/          # Exercise creation & management
├── report/           # Course reports & analytics
├── student-answer/   # Student submissions (ExerciseWorkspace)
├── student-course/   # Student enrolled courses
├── student-exercise/ # Student view of exercises
└── teacher-course/   # Lecturer course management
```

**Per-Feature Pattern**:
```
feature-name/
├── {ComponentName}.tsx        # Main UI component(s)
├── {ComponentName}.module.scss # Scoped styles
├── {featureName}Api.ts         # RTK Query endpoints
└── {featureName}Slice.ts       # Redux state (if needed)
```

### Routing

React Router v7 with SPA structure. Routes defined in [src/App.tsx](src/App.tsx).

### Styling

- **CSS Modules** with SCSS: `*.module.scss` for all component styles
- Component imports: `import styles from './ComponentName.module.scss'`
- Usage: `<div className={styles.containerClass}>`
- No global CSS (except [src/index.scss](src/index.scss) for base styles)

---

## Naming Conventions

### File & Folder Names

| Category | Pattern | Examples |
|----------|---------|----------|
| **Folders/Directories** | `kebab-case` | `course-catalog/`, `student-answer/`, `course-request/` |
| **Component files (.tsx)** | `PascalCase` | `StudentExerciseItem.tsx`, `ExerciseWorkspace.tsx`, `Login.tsx` |
| **Style files (.module.scss)** | `PascalCase` | `ExerciseCard.module.scss`, `JoinCourseModal.module.scss` |
| **API files (.ts)** | `camelCase` | `authApi.ts`, `exerciseApi.ts`, `studentCourseApi.ts` |
| **Redux slices (.ts)** | `camelCase` | `authSlice.ts`, `courseSlice.ts` |
| **Type definition files (.ts)** | `camelCase` | `exercise.types.ts`, `studentCourse.types.ts` |
| **Utility/helper files (.ts)** | `camelCase` | `store.ts`, `hooks.ts`, `utils.ts` |

### Code Symbols

| Category | Pattern | Examples |
|----------|---------|----------|
| **React components** | `PascalCase` | `StudentExerciseItem`, `ExerciseWorkspace`, `LoginForm` |
| **Custom hooks** | `camelCase` with `use` prefix | `useLoginMutation()`, `useGetCoursesQuery()`, `useAuthState()` |
| **Event handlers** | `camelCase` with `handle` prefix | `handleSubmit()`, `handleJoinCourse()`, `handleChange()` |
| **Variables & functions** | `camelCase` | `studentId`, `fetchUserData()`, `formatDate()` |

### Quick Reference

```
✓ CORRECT:
├── src/features/student-course/           # kebab-case folder
│   ├── StudentCourseCard.tsx               # PascalCase component
│   ├── StudentCourseCard.module.scss       # PascalCase style
│   ├── studentCourseApi.ts                 # camelCase API
│   └── courseSlice.ts                      # camelCase Redux slice

✗ INCORRECT:
├── src/features/studentCourse/            # ❌ should be kebab-case
│   ├── student-course-card.tsx             # ❌ should be PascalCase
│   ├── studentCourseCard.scss              # ❌ should be .module.scss
│   ├── StudentCourseApi.ts                 # ❌ should be camelCase
│   └── CourseSlice.ts                      # ❌ should be camelCase
```

---

## Key Patterns

### RTK Query API Definition

Each feature's `*Api.ts` file injects endpoints into the base `apiSlice`:

```typescript
// courseCatalogApi.ts
export const courseCatalogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseCatalog: builder.query({
      query: () => '/courses/catalog',
      providesTags: ['Courses'],
    }),
    joinCourse: builder.mutation({
      query: (courseId) => ({
        url: `/courses/${courseId}/join`,
        method: 'POST',
      }),
      invalidatesTags: ['Courses', 'User'],
    }),
  }),
});

export const { useGetCatalogQuery, useJoinCourseMutation } = courseCatalogApi;
```

### Redux Hooks

Custom hooks in [src/app/hooks.ts](src/app/hooks.ts):
```typescript
import { useAppSelector, useAppDispatch } from '@/app/hooks';

const user = useAppSelector((state) => state.auth.user);
const dispatch = useAppDispatch();
```

### Types Structure

All domain types in `src/types/{domain}.types.ts`. Import and use for:
- Component props interfaces
- RTK Query payloads/responses
- Redux state shape

Example:
```typescript
import { Exercise } from '@/types/exercise.types';

const ExerciseCard: React.FC<{ exercise: Exercise }> = ({ exercise }) => {
  // ...
};
```

### Auth State Access

```typescript
import { useAppSelector } from '@/app/hooks';

const user = useAppSelector((state) => state.auth.user);
const token = useAppSelector((state) => state.auth.token);
```

### Modal Patterns

Features often use modal components (e.g., `JoinCourseModal.tsx`, `AddTeacherCourseModal.tsx`). Modals are typically:
- Controlled components (show/hide via state)
- Contain form validation (react-hook-form)
- Handle API mutations with loading/error states

---

## Coding Guidelines for AI Agents

1. **Always use TypeScript types**: Import from `src/types/` directory
2. **Follow naming conventions**: PascalCase for components, camelCase for functions
3. **Organize imports**: Path aliases via `@/` (configured in tsconfig)
   ```typescript
   import { Component } from '@/features/auth';
   import { Exercise } from '@/types/exercise.types';
   import styles from './Component.module.scss';
   ```
4. **Use RTK Query hooks**: Prefer `useGetQuery()` + `useMutation()` over manual `fetch()`
5. **Scope styles**: All styles should be in `.module.scss` files, never global
6. **Error handling**: Errors are handled globally via middleware; show loading states in UI
7. **Module feature folders**: When adding new features, create `features/{feature-name}/` with subfolders for components, types, API
8. **Component props**: Always define interfaces/types for props, don't use `any`

---

## Important Notes for Development

- **Backend dependency**: The backend API must be running on `http://localhost:5035`
- **Token persistence**: Auth tokens are stored in Redux state (persisted to localStorage by middleware)
- **Cache invalidation**: Use RTK Query tags to invalidate related caches after mutations
- **ESLint**: Runs in flat config mode (v9+); type-aware rules not yet enabled (opportunity for enhancement)
- **No testing framework**: Testing infrastructure not configured; consider Vitest + React Testing Library for future work

---

## File Structure Reference

| Path | Purpose |
|------|---------|
| [src/main.tsx](src/main.tsx) | App entry point; Redux Provider wrap |
| [src/App.tsx](src/App.tsx) | Router setup, main routes |
| [src/api/apiSlice.ts](src/api/apiSlice.ts) | RTK Query base config, Bearer token injection |
| [src/app/store.ts](src/app/store.ts) | Redux store with global error middleware |
| [src/app/hooks.ts](src/app/hooks.ts) | Custom Redux hooks (`useAppSelector`, `useAppDispatch`) |
| [src/features/](src/features/) | Feature modules (auth, courses, exercises, etc.) |
| [src/pages/](src/pages/) | Page-level components (combine features into full pages) |
| [src/types/](src/types/) | TypeScript interfaces for all domains |
| [tsconfig.app.json](tsconfig.app.json) | TypeScript strict mode, path aliases, target ES2022 |
| [eslint.config.js](eslint.config.js) | ESLint rules (recommended, not type-aware yet) |

---

## Quick Links for Common Tasks

- **Add a new API endpoint**: Edit the feature's `*Api.ts` file, inject new endpoint into `apiSlice.injectEndpoints()`
- **Add component state**: Create Redux slice in feature folder or use local state (React hooks)
- **Create new feature**: Create folder in `src/features/{name}/` with API, slices, and components
- **Update types**: Edit or create file in `src/types/{domain}.types.ts`
- **Style a component**: Create `{Component}.module.scss` and import into component
- **Handle forms**: Use `react-hook-form` (already installed); see existing forms in auth, modals

