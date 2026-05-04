# Project: Welvra App

## Project Context
- Nama project: welvra-app
- Type: Premium AI health companion web app
- Domain: welvra-health.com
- GitHub: jundinata/welvra-app (PUBLIC)

## Working Folders
- Mac Mini / MacBook Pro: ~/code/welvra-app
- Windows: C:\Dev\welvra-app

## Architecture
- Single index.html, no build step, no framework
- Vanilla JS, CSS custom properties for theming
- Mobile-first 320-480px primary

## Brand Constraints (CRITICAL)
- TIDAK BOLEH ada kata "AI" visible di UI
- Dr. Sly sebagai persona consultant (bukan "AI assistant")
- No emoji policy
- Indonesian UI

## Design Tokens
- Fonts: Cormorant Garamond (serif headings) + Plus Jakarta Sans (sans body)
- Colors: --teal #0A7B6C, --gold #C8860A, --sage #6B9E78, --ivory #FAFAF7

## Existing Features
- Fitur Tekanan Darah (lihat: PROMPT-FITUR-TEKANAN-DARAH-WELVRA.md)
- Fitur Faceprint (skin checkup via Claude Vision, Phase 1 shipped)

## Project-Specific Rules
- Selalu baca file spec yang relevan (PROMPT-FITUR-*.md atau *-FEATURE-SPEC.md) sebelum modifikasi fitur terkait.
- Deploy via Netlify (config ada di netlify.toml).
- Simpan asset avatar di /avatars/.

## Tone & UX
- Wellness app — tone harus calming, supportive, ga clinical.
- Visual: lembut, ga harsh, banyak white space.
- Copywriting Bahasa Indonesia, hangat dan personal.

## Workflow
- Sebelum bikin fitur baru, cek dulu apakah udah ada spec file di root.
- Kalau user kasih screenshot, langsung infer dan kasih prompt siap pakai.

## Notes
[Tambahin target user, brand color, atau detail spesifik lainnya di sini]
