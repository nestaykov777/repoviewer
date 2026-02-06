# RepoViewer

A mobile app for searching and exploring GitHub repositories. Browse repos, view details like stars, forks, and open issues, and switch between English and Ukrainian localization.

Expo is used to maximize productivity and focus on scalable app architecture, performance optimizations, and UX within the limited time window. It allows full access to native APIs when needed (via the Bare workflow), while providing excellent developer experience, fast iteration, and reliable builds.

## Functionality

Search results are cached locally to reduce API calls and improve responsiveness. User preferences such as language and dark/light mode are persisted on the device using MMKV, so settings are preserved between sessions. App configuration (e.g. API base URL) is managed through a `.env` file.

When the device loses internet connectivity, a toast notification is displayed to inform the user. If the user is on the home screen and not actively searching, an offline message with a description and a reload button is shown so they can retry once the connection is restored.

## Environment setup

The `.env` file contains sensitive app configuration and is not committed to the repository. You need to request it. A `.env.example` file is provided as a reference for the required variables. Git-crypt integration is planned for future secure secret management.

## Running the app

- Install the dependencies:

  ```sh
  npm install
  ```

- Create a `.env` file from the example (safe for demo as its not containing any secure info, but once secure data will be added it will be provided seperately or using git-crypt):

  ```sh
  cp .env.example .env
  ```

- Build and run iOS and Android development builds:

  ```sh
  npm run ios
  # or
  npm run android
  ```

- Start the development server:

  ```sh
  npm start
  ```

## Technologies Used

- **Expo** — managed React Native framework for building and deploying the app
- **React Navigation** — screen routing and navigation stack
- **TanStack Query** — data fetching, caching, and server state management
- **Zustand** — lightweight state management for client-side state
- **React Native Unistyles** — performant, cross-platform styling with theming support
- **FlashList** — high-performance list component for smooth scrolling and efficient rendering
- **MMKV** — fast key-value storage for persisting user preferences
- **NetInfo** — network connectivity detection for online/offline status handling
- **Sonner Native** — toast notifications for user feedback
- **i18next** — internationalization with English and Ukrainian translations
- **Prettier** — automatic code formatting
- **Husky** — Git hooks for enforcing commit message conventions and pre-commit checks
- **ESLint** — static analysis and code quality checks

## Commit Message Convention

This project enforces a commit message format via a Husky `commit-msg` hook. Every commit message must follow this pattern:

```
<type>(<task-number>): <description>
```

### Type

| Type   | Description                       |
| ------ | --------------------------------- |
| `feat` | A new feature                     |
| `fix`  | A bug fix                         |
| `task` | A chore, refactor, or maintenance |

### Examples

```
feat(123): add user authentication
fix(456): resolve login crash on iOS
task(789): update project dependencies
```

### Invalid examples

```
updated readme              # missing type and task number
feat: add login             # missing task number
feat(abc): add login        # task number must be numeric
```
