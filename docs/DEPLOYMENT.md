# Deployment

## Current method (production)

1. Edit the files in this repo tree.
2. Upload changed files to Vercel via the file-upload flow (each file is content-addressed by SHA-1; unchanged files are skipped).
3. Create a production deployment from the uploaded files and verify the served bytes (status, size and markers) before reporting it live.

The live site is a static deployment: no server code, no environment variables consumed by pages, no build step.

## Rollback

Redeploy the previous production deployment from the Vercel dashboard (or recreate it from the same file set). Recent production deployments, newest first:

- `dpl_4g6aDfKHpJZFeuoYqBuHPYMD2MwT` — bag buttons on all cards (2026-11-02)
- `dpl_CaAKb8dSzbukHXiUFxQTkkCh8yPL` — V2 luxury motion + icon buttons (2026-11-02)
- `dpl_B5z4HbPYtq157KkFcnczXUEKCRZQ` — category rail (2026-11-02)

## Git deploys (not enabled)

This repo is not connected to Vercel for automatic deploys. Enabling that changes how production updates and must be done deliberately (connect repo in Vercel project settings, set production branch, confirm the static output). Until then, the file-upload flow above is the only production path.

## Backend (none connected)

No backend is connected. A Supabase project was evaluated and set aside by the owner (2026-11-02); nothing in this repo reads Supabase. The admin/owner gate page is a placeholder, not authenticated access. Real Supabase Auth + Row Level Security must land before anything is presented as an owner CMS.
