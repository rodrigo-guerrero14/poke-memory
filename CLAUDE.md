# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev     # start dev server (localhost:3000)
npm run build   # production build
npm run start   # run production build
npm run lint    # eslint
```

No test suite is configured in this repo.

## Architecture

Next.js (App Router) + React + TypeScript + Tailwind CSS v4 memory-matching game using Pokémon sprites from PokeAPI.

- `app/page.tsx` — root route, immediately redirects to `/memory`.
- `app/memory/page.tsx` — server component. Fetches 3 random Pokémon (IDs 1–151) from `https://pokeapi.co/api/v2/pokemon/{id}`, duplicates each into a pair, shuffles the resulting 6-card array (`sortPokemons`), and passes it to `MemoryContenedor`.
- `components/MemoryContenedor/page.tsx` — client component, owns all game state: `pokemonsActives` (cards currently flipped, max 2 before evaluation), `pokemonsFinded` (matched pairs), `hidePokemons` (mismatch signal to flip cards back down). Match logic (`evaluarPokemons`) compares the two active picks by `id`.
- `components/MemoryItem/page.tsx` — client component for a single card; tracks its own `isActive`/`isFinded` local state via props/effects from the parent (`hidePokemons`, `pokemonsFinded`).
- `components/index.ts` — barrel export for components.
- `pokemons/interfaces/` — TypeScript interfaces: `pokemon-response.ts` mirrors the full PokeAPI `/pokemon/{id}` response shape; `pokemon-image.ts` is the trimmed `PokemonsInfo` shape (`id`, `name`, `pokemonImage`) used throughout the UI.

Component folders use a `ComponentName/page.tsx` convention (not `index.tsx`).

Images are loaded via `next/image` from `raw.githubusercontent.com`, whitelisted in `next.config.ts` under `images.remotePatterns` (required for any new external image host).

## Important

This project pins a Next.js version with breaking changes relative to standard Next.js. Before writing or modifying any Next.js–related code, read the relevant guide under `node_modules/next/dist/docs/` and heed deprecation notices — see `AGENTS.md`.
