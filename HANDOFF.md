# Handoff — NURA Batch Date Fix

## Tujuan
Memastikan sitemap.xml menampilkan tanggal publikasi dan update yang berbeda untuk setiap artikel batch ke-50, sesuai jadwal yang diberikan user.

## Checkout & Branch
- **Worktree:** `.claude/worktrees/modest-blackwell-99e309`
- **Branch:** `claude/modest-blackwell-99e309`
- **Remote main SHA terakhir:** `9902dc0fad8807d9025b65eda1cb11f1a4ca9c46`

## Perubahan yang dilakukan
1. `lib/content.ts` — merge logic `published_date`/`modified_date` diubah dari `ob||nb` ke `nb||ob`, agar tanggal batch di `manifest.json` dipakai saat overwrite.
2. `lib/published-editorial.json` — tanggal 2 artikel collision (`how-to-compare-bespoke-kitchen-quotes-in-london`, `plywood-vs-mfc-kitchen-carcasses`) diganti sesuai jadwal user.
3. `lib/drafts/nura-50/manifest.json` — 50 artikel batch diisi `published_date` dan `modified_date` sesuai tabel user.
4. `tests/nura-batch-audit.test.mjs` — assertion disesuaikan dengan logika merge baru.
5. `tests/plywood-mfc-article.test.mjs` — tanggal published fixture diperbaiki ke `2025-01-15`.
6. `scripts/verify-kitchen-quotes.mjs` — tanggal assertion diperbaiki ke `2025-03-30` dan `2026-10-22`.

## Hasil verifikasi lokal
- `npm test` → 81/81 pass
- `npm run typecheck` → pass
- `npm run build:verified` → PASS, fingerprint `f39b32...`
- Sitemap sekarang memuat tanggal individual (bukan satu hari seragam)

## Deployment
- **Deployment ID:** `dpl_ECLwGtW24urtE16WMz5XTv65Pz8e`
- **State:** READY
- **Production alias:** `www.nura-interiors.com`
- **Source SHA:** `9902dc0` (sudah sesuai main)

## Bekerja
Tidak ada. Semua commit sudah masuk `main` dan deployment READY.

## Langkah berikutnya
1. Verifikasi manual via browser bahwa 50 artikel di `/post/<slug>` menampilkan tanggal `published_date` dan `modified_date` sesuai jadwal user.
2. Opsional: jalankan ulang `node .claude/dev-cycle/verify.mjs` untuk memperbarui fingerprint verification setelah semua perubahan stabil.
