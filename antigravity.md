# Antigravity CLI Reference: Wordle Helper

This file provides guidance to Antigravity (and other AI coding assistants) when working in the `wordle-helper` repository.

## Project Overview
Wordle Helper is a React 19 single-page web application that helps users solve Wordle puzzles by suggesting matching words based on correct letter positions, incorrect letter positions, and unused letters.
- **Tech Stack**: React 19 + TypeScript + Tailwind CSS v4 + Vite.
- **Hosting/Deployment**: Configured for Cloudflare Pages (via `wrangler.jsonc` assets pointing to `./dist`).

---

## Critical Commands

| Task | Command | Description |
|---|---|---|
| Start Dev Server | `npm run dev` | Runs the Vite development server locally. |
| Production Build | `npm run build` | Builds the static assets into `./dist`. |
| Lint Check | `npm run lint` | Runs ESLint configuration on the codebase. |
| Auto-Fix Linting | `npm run lint:fix` | Runs ESLint and automatically resolves fixable issues. |
| Type-Check | `npx tsc --noEmit` | Checks the TypeScript project for static type errors. |
| Preview Build | `npm run preview` | Runs a local server to preview the built static app. |

> [!IMPORTANT]
> **Pre-commit Hook**: A custom Git hook is defined at [pre-commit](file:///Users/jeffmartin/personal/wordle-helper/tools/git-hooks/pre-commit) which automatically runs `npm run lint` on commit. Do not push code that fails linting, as the commit will be rejected.

---

## Repository Structure

- `src/`
  - [App.tsx](file:///Users/jeffmartin/personal/wordle-helper/src/App.tsx): Root application component providing drag-and-drop (`react-dnd`) and app state context.
  - [main.tsx](file:///Users/jeffmartin/personal/wordle-helper/src/main.tsx): Entry point bootstrap.
  - [index.css](file:///Users/jeffmartin/personal/wordle-helper/src/index.css): Global styles introducing Tailwind v4 `@import "tailwindcss";`.
  - `components/`: UI components (pools for letter placement, word list output, help and settings modals).
  - `context/`: Application state management via React Context (`contexts.ts`, `StateProvider.tsx`) and reducer logic (`reducer.ts`).
  - `hooks/`: Custom React hooks for keyboard shortcuts (`useKeyboardShortcuts.ts`), drag-and-drop interactions (`useDropLetter.ts`), and wordlist updates (`useWordUpdater.ts`).
  - `types/`: Strict TypeScript definitions (`common.ts` for letter/word types, `actions.ts` for reducer actions, `context.ts` for state interfaces).
  - `utils/`: Shared helper functions (e.g., standard alphabet letter pools).
  - `pages/`: Main page-level container layout components ([WordleHelper.tsx](file:///Users/jeffmartin/personal/wordle-helper/src/pages/WordleHelper.tsx)).
- `tools/`
  - `git-hooks/`: Git-level integration files like the `pre-commit` linter.

---

## Deployment

### 1. Automated CI/CD (Active)
This project is configured with a GitHub Actions workflow in [.github/workflows/deploy.yml](file:///Users/jeffmartin/personal/wordle-helper/.github/workflows/deploy.yml).
- **Trigger**: Every push to the `main` branch.
- **Actions**:
  - Sets up Node.js v24 (matching [.nvmrc](file:///Users/jeffmartin/personal/wordle-helper/.nvmrc)).
  - Runs `npm run lint` and `npm run build`.
  - Authenticates with Google Cloud and uploads the production build `./dist` folder to a Google Cloud Storage bucket.
- **Auto-deployment**: Yes! Simply pushing your changes to the remote `main` branch will automatically build and deploy the application.

### 2. Alternative Manual Deployment (Cloudflare Pages)
A [wrangler.jsonc](file:///Users/jeffmartin/personal/wordle-helper/wrangler.jsonc) config file is present in the repository, allowing manual deployments to Cloudflare Pages:
1. Authenticate with Wrangler:
   ```bash
   npx wrangler login
   ```
2. Build the production assets:
   ```bash
   npm run build
   ```
3. Deploy the built static assets:
   ```bash
   npx wrangler deploy
   ```

---

## Code Quality & Technical Rules

### 1. Types & Strict Mode
- Always use the types defined in `src/types/`. Avoid declaring local types for standard entities.
- For example, represent Wordle guess states using `Letter` (`"a" | "b" | ...`), `LetterOrEmptyArray` (for five-letter slots), or `Word`.
- **Ranked Words**: Words list in [words.ts](file:///Users/jeffmartin/personal/wordle-helper/src/data/words.ts) is typed as `RankedWord[]` containing a `word: string`, `score: number` (positional letter frequency + solution status), and `isSolution: boolean`. The array literal is cast to `any` at the end to prevent compiler union-type complexity issues (error `TS2590`).
- Standard ESLint config (`typescript-eslint`) uses `projectService: true` for full type checking during linting.

### 2. State Mutation
- The application uses a standard React reducer pattern. Do not bypass the context or perform direct state updates inside components unless they are completely local UI interactions (like modal open states).
- Registered actions must be declared in [actions.ts](file:///Users/jeffmartin/personal/wordle-helper/src/types/actions.ts) and fully handled in [reducer.ts](file:///Users/jeffmartin/personal/wordle-helper/src/context/reducer.ts).

### 3. Tailwind CSS v4 Styling
- Tailwind CSS v4 is integrated directly through `@tailwindcss/vite`.
- Avoid adding Tailwind imports or configurations via `@tailwind` directives in CSS. Use `@import "tailwindcss";` at the top of the main CSS files.
- Prefer utility classes for styling. When writing custom CSS, place it in page-specific style sheets (e.g. `WordleHelper.css`) or `index.css`.

### 4. Code Style & Review
- Preserve all existing comments and JSDoc strings when modifying files.
- Run `npm run lint` before committing to avoid blocking the git commit pipeline.
