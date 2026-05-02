# WELVRA WISDOM HUB CONTENT SPEC

Spesifikasi data model, schema, dan API untuk konten Wisdom Hub.
Dokumen ini adalah kontrak yang dipakai Phase 2D (article detail + Dr. Sly consult) dan Phase 2E (history/bookmarks screens).

---

## 1. Article Schema

```js
/**
 * @typedef {Object} WelvraArticle
 * @property {string} id - Stable ID, e.g. "art_kehamilan_001"
 * @property {string} slug - URL-safe kebab-case, e.g. "tanda-kehamilan-trimester-pertama"
 * @property {string} title - Indonesian, sentence case, < 70 chars
 * @property {string} excerpt - 140-200 chars, hook-style
 * @property {ContentBlock[]} body - Structured content blocks (no raw HTML)
 * @property {string} category - Must match one of WELVRA_CATEGORIES slugs
 * @property {string|null} subcategory - Optional finer grouping
 * @property {string[]} tags - 3-6 Indonesian tags, lowercase
 * @property {WelvraAuthor} author - Author object
 * @property {WelvraSource|null} source - Attribution if adapted; null if original
 * @property {string} publishedAt - ISO 8601 date
 * @property {string|null} updatedAt - null if never updated
 * @property {number} readingTimeMinutes - Calculated, 1-15
 * @property {WelvraImageAsset} heroImage - Hero image
 * @property {WelvraImageAsset} thumbnail - Thumbnail image
 * @property {boolean} featured - Shows in Featured section
 * @property {number} trendingScore - 0-100
 * @property {boolean} pinned - Overrides recency in Recent section
 * @property {"ringan"|"sedang"|"dalam"} difficulty - Reading depth
 * @property {string[]} relatedArticleIds - 0-4 related article IDs
 */
```

## 2. ContentBlock Schema

Body content menggunakan typed blocks. TIDAK boleh raw HTML (risiko XSS + Dr. Sly perlu parse semantik).

```js
/**
 * @typedef {Object} ContentBlock
 * @property {"paragraph"|"heading"|"blockquote"|"list"|"callout"|"image"|"divider"} type
 *
 * Variants:
 * - { type: "paragraph", text: string }
 * - { type: "heading", level: 2|3, text: string }
 * - { type: "blockquote", text: string, attribution: string|null }
 * - { type: "list", style: "unordered"|"ordered", items: string[] }
 * - { type: "callout", tone: "calm"|"warm"|"gentle-warning", title: string, text: string }
 * - { type: "image", asset: WelvraImageAsset, caption: string|null }
 * - { type: "divider" }
 */
```

Callout tones:
- `calm`: latar belakang sage lembut
- `warm`: latar belakang gold lembut
- `gentle-warning`: amber lembut (BUKAN merah)

## 3. Author Schema

```js
/**
 * @typedef {Object} WelvraAuthor
 * @property {string} id - e.g. "auth_dr_sly"
 * @property {string} name - Display name
 * @property {string} role - e.g. "Konsultan Wellness Welvra"
 * @property {string|null} credentials
 * @property {string} avatarUrl - Path to /avatars/ or Unsplash URL
 * @property {string} bio - 1-2 sentence Indonesian bio
 */
```

Minimum 4 authors:
1. Dr. Sly (auth_dr_sly) - Konsultan Wellness Welvra
2. Nutritionist
3. Mindfulness practitioner
4. Women's health writer

Dr. Sly authors ~30% of articles.

## 4. Source Schema

```js
/**
 * @typedef {Object} WelvraSource
 * @property {string} publication - e.g. "Harvard Health"
 * @property {string|null} url
 * @property {string} adaptedNotice - Indonesian, e.g. "Diadaptasi untuk pembaca Welvra."
 */
```

~40% artikel memiliki source attribution.

## 5. ImageAsset Schema

```js
/**
 * @typedef {Object} WelvraImageAsset
 * @property {string} url - Unsplash CDN URL
 * @property {string} alt - Indonesian descriptive alt text
 * @property {Object} credit
 * @property {string} credit.photographer
 * @property {string} credit.photographerUrl
 * @property {string} credit.sourceUrl
 * @property {"Unsplash"} credit.platform
 * @property {"16:9"|"4:5"|"1:1"|"4:3"} aspectRatio
 * @property {string} dominantColor - Hex, placeholder background
 * @property {number} width
 * @property {number} height
 */
```

## 6. Categories Taxonomy

10 kategori konten + 3 meta (discover, all, saved), aligned with Phase 2B:

| ID | Label |
|---|---|
| discover | Discover |
| all | Semua |
| saved | Tersimpan |
| kesehatan-umum | Kesehatan Umum |
| kesehatan-reproduksi | Kesehatan Reproduksi |
| kehamilan | Kehamilan |
| panduan-orangtua | Panduan Orangtua |
| wellness-mental | Wellness Mental |
| nutrisi-gizi | Nutrisi & Gizi |
| kebugaran | Kebugaran |
| herbal-indonesia | Herbal Indonesia |
| lifestyle | Lifestyle & Kecantikan |
| isu-sosial | Isu Sosial Kesehatan |

## 7. localStorage Schema

```js
// Key: "welvra.wisdomHub.v1"
/**
 * @typedef {Object} WisdomHubState
 * @property {number} schemaVersion - Always 1
 * @property {Array<{articleId: string, readAt: string, scrollDepth: number}>} readHistory
 * @property {Array<{articleId: string, savedAt: string}>} bookmarks
 * @property {Array<{query: string, ranAt: string}>} searchHistory - Capped at 20
 * @property {string|null} lastVisitedCategory
 */
```

Migration helpers:
- `loadWisdomHubState()` - Returns state, graceful fallback on corrupt data
- `saveWisdomHubState(state)` - Writes to localStorage, never throws

Backward compatibility: existing `welvra_saved_articles` key migrated to new schema on first load.

## 8. Helper API

| Function | Description |
|---|---|
| `getArticleById(id)` | O(1) lookup via memoized Map |
| `getArticlesByCategory(slug)` | Array, sorted by publishedAt desc |
| `getFeaturedArticles(limit)` | featured:true, sorted by trendingScore desc |
| `getTrendingArticles(limit)` | By trendingScore desc, excluding featured |
| `getRecentArticles(limit)` | Pinned first, then publishedAt desc |
| `searchArticles(query)` | Weighted: title(3), excerpt(2), tags(2), body(1) |
| `getRelatedArticles(id, limit)` | relatedArticleIds first, fallback same-category |
| `calculateReadingTime(body)` | Indonesian avg 200 wpm, min 1 max 15 |
| `renderContentBlock(block)` | Renders ContentBlock to safe HTML |

## 9. Photography System

- `renderWelvraImage(asset, options)` - Pure function returning HTML string
- `buildUnsplashUrl(baseId, variant)` - Standardized URL params per variant
- Variants: hero (800x450), thumbnail (400x400), inline (720x405), avatar (96x96)
- Lazy loading: native `loading="lazy"` + IntersectionObserver fade-in
- Dominant-color placeholder via container background
- Credit attribution: bottom-right, 11px, white-on-gradient

## 10. Card Variants

| Variant | Section | Layout |
|---|---|---|
| `.wisdom-card--featured` | Featured | Large, hero 16:9, gradient overlay, 280px wide |
| `.wisdom-card--horizontal` | Trending | Thumbnail 1:1 left (96px), text right |
| `.wisdom-card--list` | Recent | Compact row, small thumbnail 64px left |
| `.wisdom-card--category-grid` | By Category | 2-column grid, thumbnail 4:3 top |

## 11. Content Authoring Guidelines

- Bahasa Indonesia, "kamu" form (bukan "Anda")
- Tone: hangat, supportive, non-klinis
- Hindari: "harus", "wajib", "bahaya", "darurat"
- Prefer: "bisa coba", "sering kali membantu"
- Minimum 8 ContentBlocks per artikel, target 12-18
- Mulai dengan paragraph (bukan heading)
- 2-4 H2 headings per artikel
- Minimal 1 blockquote ATAU callout per artikel
- Max 2 list blocks per artikel
- ZERO "AI" substring di UI strings
- ZERO emoji

## 12. Brand Constraints

- Dr. Sly = "Konsultan Welvra" (bukan "AI assistant")
- No emoji policy
- Glass system: overlay/modal baru pakai `.welvra-glass-modal`
- Design tokens locked: --teal, --gold, --sage, --ivory
- Fonts: Cormorant Garamond (headings), Plus Jakarta Sans (body)
