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

This project is configured to deploy to **Cloudflare Pages** using the configuration in [wrangler.jsonc](file:///Users/jeffmartin/personal/wordle-helper/wrangler.jsonc).

### 1. Automated CI/CD (Recommended)
The easiest way to deploy is to connect the GitHub repository to the Cloudflare dashboard:
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com).
2. Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select this repository and use the following build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js Version**: `24` (defined in [nvmrc](file:///Users/jeffmartin/personal/wordle-helper/.nvmrc))

### 2. Manual CLI Deployment
You can manually deploy the production build directly from your command line:
1. Authenticate with your Cloudflare account (one-time setup):
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
