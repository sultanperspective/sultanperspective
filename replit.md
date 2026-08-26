# Sultan Perspective

A premium responsive marketing site for Sultan Perspective, a real estate photography and spatial media studio.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/sultan-perspective/src/App.tsx` — single-page site composition and client-side interactions
- `artifacts/sultan-perspective/src/constants.ts` — editable brand, service, package, and add-on content
- `artifacts/sultan-perspective/src/index.css` — site theme, responsive layout, motion, and visual tokens
- `artifacts/sultan-perspective/public/assets/` — supplied English and Arabic price-list references

## Architecture decisions

- This first version is frontend-only so the estimator and booking experience work immediately without requiring a service account or external integration.
- Package and add-on pricing is centralized in `src/constants.ts` so the public price presentation can be updated without searching through JSX.
- The supplied English and Arabic 2026 price lists are used as visual/content references while the website presents the same business as a more interactive digital experience.

## Product

- Responsive one-page marketing site for real estate agents and developers
- Service showcase covering aerial, interior, virtual tour, and mapping work
- Standard, Pro, and Ultimate packages with selectable add-ons and a live total
- Client-side validated booking form with a clear success state
- Mobile navigation, pricing anchors, and a lightweight work/reel interaction

## User preferences

The user provided Sultan Perspective brand references and requested a modern, sleek, high-converting responsive website.

## Gotchas

- The web artifact workflow supplies `PORT` and `BASE_PATH`; use the managed workflow rather than starting Vite manually.
- Booking submissions are currently client-side only and do not send to a CRM or email service.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
