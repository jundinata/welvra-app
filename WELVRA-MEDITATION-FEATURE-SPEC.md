# WELVRA MEDITATION FEATURE — COMPLETE IMPLEMENTATION SPECIFICATION
# Priority: CRITICAL | Visual Quality: PLAYSTATION 5 LEVEL | Depth: 5D MAXIMUM

---

## EXECUTIVE SUMMARY

Implement a complete "Meditasi" (Meditation) feature in `index.html` as a new major section in Welvra. This feature contains 10 world meditation types, each with full educational content, multiple SVG avatar pose illustrations rendered at cinematic quality, and an integrated audio player. Every visual element must achieve 5D depth — the most visually stunning section of the entire app.

The visual standard is: **PlayStation 5 cinematics meets luxury wellness brand**. Every SVG avatar must look like a character render from a premium video game — smooth gradients, anatomical accuracy in silhouette, dynamic lighting, volumetric depth, and cinematic composition.

---

## 1. ENTRY POINT — HOME SCREEN

### 1.1 New Grid Tile

Add a new tile to the home screen grid labeled "Meditasi". This tile must match the existing 5D tile style but stand out as premium:

- **Icon**: SVG of a seated meditation figure in lotus position, rendered with the same 5D treatment as other icons (gradient pad, layered shadow, 64-72px size)
- **Icon colors**: Deep indigo-to-purple gradient for the pad, golden figure silhouette
- **Label**: "Meditasi" (Cormorant Garamond, bold)
- **Subtitle**: "Ketenangan jiwa & raga"
- **Tap action**: Opens the Meditasi modal/panel (same pattern as other feature panels)

---

## 2. MEDITATION MAIN SCREEN — THE GALLERY

When user taps the Meditasi tile, a full-screen modal opens showing all 10 meditation types as premium cards.

### 2.1 Modal Header

```
┌─────────────────────────────────┐
│  ← Meditasi                  ✕ │
│  "Temukan ketenangan dalam     │
│   setiap napasmu"              │
│                                │
│  [Search/Filter bar]           │
└─────────────────────────────────┘
```

- Header background: deep gradient (#0A1628 to #1A0A2E) — dark luxury
- Title "Meditasi" in Cormorant Garamond, 28px, gold color #C8860A
- Subtitle in Plus Jakarta Sans, 14px, rgba(255,255,255,0.6)
- Optional: horizontal filter chips: "Semua", "Pemula", "Menengah", "Lanjutan"

### 2.2 Meditation Cards — Vertical Scroll List

Each meditation type is a LARGE premium card (not small tiles). Cards scroll vertically.

**Card dimensions**: Full width (padding 16px sides), height ~220px
**Card layout**:

```
┌─────────────────────────────────┐
│ ┌──────┐                       │
│ │      │  Mindfulness           │
│ │ SVG  │  Kesadaran Penuh       │
│ │Avatar│                       │
│ │      │  ⏱ 10-30 menit        │
│ │      │  🎯 Pemula             │
│ └──────┘                       │
│                                │
│  Latihan fokus pada napas dan  │
│  sensasi tubuh untuk mencapai  │
│  kesadaran penuh di saat ini.  │
│  Teknik tertua dan paling      │
│  terbukti secara ilmiah untuk  │
│  mengurangi stress, kecemasan, │
│  dan meningkatkan kejernihan   │
│  pikiran...                    │
│                                │
│  Asal: Tradisi Buddha,         │
│        Asia Tenggara            │
│                                │
│  ┌──────────────────────────┐  │
│  │  ▶  Mulai Meditasi       │  │
│  └──────────────────────────┘  │
└─────────────────────────────────┘
```

### 2.3 Card Visual Design — 5D Treatment

Each card MUST have:

**Background**: 
```css
background: linear-gradient(135deg, rgba(cardColor, 0.12) 0%, rgba(cardColor, 0.04) 100%);
backdrop-filter: blur(12px);
```

Each meditation has a UNIQUE card accent color:
1. Mindfulness: #4A90D9 (calm blue)
2. Zen: #2D2D2D with gold accent (minimal black)
3. Vipassana: #7B68AE (spiritual purple)
4. Yoga Nidra: #1B3A5C (deep night blue)
5. Tai Chi: #2E7D5B (jade green)
6. Qigong: #C75B39 (warm terra cotta)
7. Metta: #D4567A (compassion rose)
8. Chakra: #E8A832 (golden energy)
9. Mantra: #8B5E3C (earthy brown)
10. Pranayama: #4ECDC4 (breath teal)

**Shadow stack (5D depth)**:
```css
box-shadow:
  0 2px 4px rgba(0,0,0,0.06),
  0 8px 16px rgba(0,0,0,0.08),
  0 16px 32px rgba(0,0,0,0.06),
  0 32px 64px rgba(0,0,0,0.04),
  inset 0 1px 0 rgba(255,255,255,0.15),
  inset 0 0 40px rgba(cardColor, 0.05);
```

**Hover/Tap**: lift translateY(-6px), shadow expands, subtle glow of card color underneath

**Border**: 0.5px solid rgba(255,255,255,0.1)
**Border-radius**: 28px
**Transition**: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)

---

## 3. SVG AVATAR ILLUSTRATIONS — PS5 CINEMATIC QUALITY

This is the MOST IMPORTANT visual element. Each meditation type has a PRIMARY avatar (shown on the card) and 3-4 SECONDARY avatars (shown on the detail page demonstrating different poses).

### 3.1 Avatar Art Direction

Every avatar must be a **premium human silhouette/figure** rendered in SVG with:

**Anatomy**:
- Realistic human proportions (not cartoonish, not stick figures)
- Visible head, neck, shoulders, torso, arms, hands, legs in correct proportion
- Hair suggested with smooth curves (not detailed strands)
- Fingers visible when hands are in mudra positions
- Face shown in profile or 3/4 view with serene expression suggested by minimal lines

**Rendering technique — LAYERED GRADIENT SILHOUETTE**:
```
Layer 1 (back): Dark shadow silhouette — offset 2-3px, darker shade, opacity 0.3
Layer 2 (body): Main body fill — rich gradient (2-3 color stops)
Layer 3 (depth): Muscle/form contour lines — subtle darker paths suggesting anatomy
Layer 4 (light): Highlight edge — thin bright stroke on light-facing edge (rim lighting)
Layer 5 (glow): Ambient aura — radial gradient behind figure, meditation-specific color
```

**Color treatment per figure**:
- Body gradient: warm skin-like tones (#D4A574 to #8B6D4F) for universal appeal
- OR monochromatic meditation-color silhouette (e.g., blue gradient for Mindfulness figure)
- Rim light: white or gold, 1-2px, opacity 0.4-0.6 on one side
- Shadow: darker version of body color, offset behind

**Size**: Each avatar SVG viewBox should be approximately 200x280 (portrait proportion)
**Display size on card**: 90px wide, proportional height
**Display size on detail page**: 160-200px wide

### 3.2 Avatar Poses Per Meditation Type

**1. MINDFULNESS — Kesadaran Penuh**
- Primary pose: Seated cross-legged (sukhasana), hands resting on knees palms up, spine straight, eyes gently closed, serene expression
- Pose 2: Seated with hands in lap (cosmic mudra), slight forward lean suggesting deep concentration
- Pose 3: Walking meditation — standing figure, one foot slightly forward, arms relaxed at sides, head slightly bowed
- Pose 4: Seated on chair — upright, feet flat, hands on thighs, accessible modern pose
- Aura color: soft blue radial glow behind figure

**2. ZEN (ZAZEN) — Meditasi Zen**
- Primary pose: Formal seated position (seiza — kneeling on heels), spine perfectly straight, hands forming oval cosmic mudra at navel level
- Pose 2: Full lotus position (padmasana), hands in dhyana mudra, absolute stillness conveyed
- Pose 3: Kinhin (walking Zen) — standing upright, hands clasped at chest (shashu position), one foot mid-step
- Pose 4: Seated facing wall — back view showing straight spine, suggesting Soto Zen practice
- Aura color: minimal — dark gray with single gold accent line

**3. VIPASSANA — Meditasi Insight**
- Primary pose: Seated cross-legged, one hand on chest, one on belly, suggesting body scan awareness
- Pose 2: Seated with eyes closed, slight head tilt — deep introspection
- Pose 3: Lying down body scan position — on back, arms at sides, palms up
- Pose 4: Seated with hand touching different body parts (shoulder, knee) — scanning illustration
- Aura color: purple/violet radial glow

**4. YOGA NIDRA — Tidur Yoga**
- Primary pose: Savasana — lying flat on back, arms 30° from body, palms up, legs slightly apart, completely relaxed
- Pose 2: Lying with bolster/pillow under knees — supported relaxation
- Pose 3: Side-lying fetal position — alternative rest position
- Pose 4: Transition from seated to lying — mid-recline pose
- Aura color: deep blue/indigo, suggesting night sky

**5. TAI CHI — Meditasi Gerak**
- Primary pose: "Wave Hands Like Clouds" — standing, arms extended in flowing motion, weight on back leg, front foot light
- Pose 2: "Brush Knee Push" — one arm extended forward, other sweeping at knee level, dynamic stance
- Pose 3: "Single Whip" — wide stance, one arm extended, other in hook hand position
- Pose 4: Opening stance — feet shoulder-width, arms slowly rising to chest level
- Aura color: jade green with flowing energy lines suggesting movement

**6. QIGONG — Kultivasi Energi**
- Primary pose: "Lifting the Sky" — standing, arms raised above head, palms facing up, back slightly arched
- Pose 2: "Embracing the Tree" — standing, arms rounded in front of chest as if holding a large ball
- Pose 3: "Pushing Mountains" — standing, arms extended forward, palms out
- Pose 4: "Gathering Qi" — standing, hands at lower belly, cupping energy
- Aura color: warm terra cotta/red-orange with circular energy flow lines

**7. METTA — Cinta Kasih**
- Primary pose: Seated cross-legged, both hands on heart center, gentle smile, radiating warmth
- Pose 2: Seated with hands open on knees, palms up — offering/receiving love
- Pose 3: Hands in prayer position (anjali mudra) at heart — devotional pose
- Pose 4: Seated with arms slightly open wide — embracing/welcoming gesture
- Aura color: warm rose/pink radial glow, possibly with heart-shaped subtle element

**8. CHAKRA — Pusat Energi**
- Primary pose: Seated in lotus, spine straight, 7 colored energy dots visible along spine (red at base to violet at crown)
- Pose 2: Seated with hands at heart center — heart chakra focus
- Pose 3: Seated with hands on belly — sacral/solar plexus focus
- Pose 4: Seated with hands at crown of head — crown chakra focus
- Aura color: rainbow/multi-color gradient suggesting all 7 chakras

**9. MANTRA — Pengulangan Sakral**
- Primary pose: Seated cross-legged, one hand holding mala (prayer beads) draped over fingers, other hand on knee
- Pose 2: Seated with hands in gyan mudra (thumb+index touching), lips slightly parted suggesting chanting
- Pose 3: Seated upright, hands in lap with mala wrapped around both hands
- Pose 4: Close-up suggestion — hands detail with mala beads between fingers
- Aura color: warm earthy brown with gold sacred geometry pattern

**10. PRANAYAMA — Seni Pernapasan**
- Primary pose: Seated cross-legged, right hand at nose (vishnu mudra — ring+middle fingers folded, thumb+pinky+index extended) for alternate nostril breathing
- Pose 2: Seated with hands on belly, chest expanded — deep belly breathing
- Pose 3: Seated with arms extended, lungs visually expanded — full breath retention
- Pose 4: Seated with hands on knees, visible breath lines from nostrils — rhythmic breathing
- Aura color: teal/cyan with flowing air/breath lines

### 3.3 SVG Avatar Technical Implementation

Each avatar MUST be built with this SVG structure:

```svg
<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Body gradient -->
    <linearGradient id="bodyGrad" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="#D4A574"/>
      <stop offset="50%" stop-color="#B8896A"/>
      <stop offset="100%" stop-color="#8B6D4F"/>
    </linearGradient>
    
    <!-- Rim light gradient -->
    <linearGradient id="rimLight" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(255,255,255,0)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0.5)" />
    </linearGradient>
    
    <!-- Aura/glow behind figure -->
    <radialGradient id="aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(meditationColor, 0.25)"/>
      <stop offset="100%" stop-color="rgba(meditationColor, 0)"/>
    </radialGradient>
  </defs>
  
  <!-- Layer 1: Aura glow -->
  <ellipse cx="100" cy="160" rx="90" ry="120" fill="url(#aura)"/>
  
  <!-- Layer 2: Drop shadow -->
  <g transform="translate(3, 3)" opacity="0.2">
    <!-- Shadow copy of body paths -->
  </g>
  
  <!-- Layer 3: Main body -->
  <g fill="url(#bodyGrad)">
    <!-- Head -->
    <ellipse cx="100" cy="45" rx="22" ry="26"/>
    <!-- Neck -->
    <path d="M92,68 Q100,72 108,68 L106,80 Q100,82 94,80 Z"/>
    <!-- Torso, arms, legs as smooth paths -->
    <!-- Each body part is a separate <path> for anatomical accuracy -->
  </g>
  
  <!-- Layer 4: Contour/muscle definition -->
  <g fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="0.5">
    <!-- Subtle lines suggesting form -->
  </g>
  
  <!-- Layer 5: Rim lighting -->
  <g fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5">
    <!-- Bright edge on light-facing side -->
  </g>
</svg>
```

**QUALITY REQUIREMENTS**:
- Each figure must use minimum 8-12 separate `<path>` elements for body parts
- Smooth bezier curves — NO jagged edges, NO polygon approximations
- Gradients must have minimum 2-3 color stops for richness
- Rim lighting on exactly ONE side (right or left) for consistent light direction
- Shadow offset always consistent (bottom-right, 2-3px)
- Aura glow BEHIND the figure, never in front
- Figures must look PREMIUM — spend extra tokens on path smoothness

---

## 4. MEDITATION DETAIL PAGE

When user taps a meditation card, the detail page opens.

### 4.1 Layout Structure

```
┌─────────────────────────────────┐
│  ← [Meditation Name]        ✕  │
│                                │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │    HERO AVATAR (large)  │   │
│  │    200px wide           │   │
│  │    with aura glow       │   │
│  │    + ambient particles  │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                │
│  [Meditation Name]             │
│  [Origin badge]  [Level badge] │
│  [Duration badge]              │
│                                │
│  ══════════════════════════     │
│                                │
│  📖 Tentang Meditasi Ini       │
│  [Full description text,       │
│   2-3 paragraphs, complete     │
│   explanation of the practice] │
│                                │
│  ══════════════════════════     │
│                                │
│  🎯 Manfaat untuk Tubuh        │
│  • Manfaat 1                   │
│  • Manfaat 2                   │
│  • Manfaat 3                   │
│  • Manfaat 4                   │
│  • Manfaat 5                   │
│                                │
│  ══════════════════════════     │
│                                │
│  🌍 Asal & Sejarah             │
│  [History paragraph]           │
│                                │
│  ══════════════════════════     │
│                                │
│  🧘 Cara Melakukan             │
│  [Step-by-step instructions]   │
│                                │
│  ══════════════════════════     │
│                                │
│  📸 Panduan Gerakan             │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ │
│  │Pose│ │Pose│ │Pose│ │Pose│  │
│  │ 1  │ │ 2  │ │ 3  │ │ 4  │  │
│  └────┘ └────┘ └────┘ └────┘  │
│  [Horizontal scroll]          │
│  Tap pose for description     │
│                                │
│  ══════════════════════════     │
│                                │
│  🎵 Audio Meditasi             │
│  ┌─────────────────────────┐  │
│  │  ▶  Singing Bowl         │  │
│  │  ━━━━━●━━━━━━  3:24     │  │
│  │  🔊 ━━━━━━━━━           │  │
│  └─────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐ │
│  │  ▶  Mulai Meditasi 🧘    │ │
│  └──────────────────────────┘ │
│                                │
└─────────────────────────────────┘
```

### 4.2 Detail Page Visual Design

**Hero Avatar Area**:
- Large avatar (200px) centered
- Behind avatar: animated ambient particles (CSS keyframes, 6-8 small circles floating slowly)
- Aura glow: meditation-specific color, pulsing slowly (opacity 0.15 to 0.25, 4s cycle)
- Background: dark gradient specific to this meditation type

**Section Headers** (Tentang, Manfaat, Asal, Cara, Gerakan, Audio):
- Cormorant Garamond, 20px, gold #C8860A
- Small decorative line underneath (gradient from gold to transparent, 40px wide)
- Section icon before text

**Content Text**:
- Plus Jakarta Sans, 14px, line-height 1.7
- Color: var(--text) with good readability
- Paragraphs spaced 12px apart

**Benefit List**:
- Each benefit has a small 3D dot (radial gradient sphere, meditation color)
- Text in 14px, slight left padding
- Each item has subtle entrance animation when scrolled into view

**Pose Gallery**:
- Horizontal scrollable row
- Each pose card: 120px wide, 160px tall
- White/glass background with shadow
- Avatar SVG inside (scaled to fit)
- Pose name below in small text (12px)
- Tap a pose: modal/popup shows larger version with description
- Active pose has gold border highlight

---

## 5. AUDIO PLAYER

### 5.1 Audio Sources

Since we cannot host audio files in a single HTML file, use the Web Audio API to GENERATE meditation sounds programmatically:

```javascript
// Generate meditation audio using Web Audio API
function createMeditationAudio(type) {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    
    switch(type) {
        case 'mindfulness':
            // Soft ambient drone with gentle overtones
            return createAmbientDrone(ctx, 174, 0.3); // 174Hz - healing frequency
        case 'zen':
            // Singing bowl simulation
            return createSingingBowl(ctx, 396); // 396Hz
        case 'vipassana':
            // Pure silence with very subtle breath-like white noise
            return createBreathNoise(ctx, 0.05);
        case 'yoga-nidra':
            // Deep slow drone, very low frequency
            return createAmbientDrone(ctx, 136.1, 0.2); // OM frequency
        case 'tai-chi':
            // Flowing water + gentle wind simulation
            return createNatureSound(ctx, 'water');
        case 'qigong':
            // Chinese flute-like harmonic
            return createHarmonic(ctx, 528); // 528Hz - transformation
        case 'metta':
            // Warm, heart-opening harmonics
            return createAmbientDrone(ctx, 639, 0.25); // 639Hz - connection
        case 'chakra':
            // Ascending frequency sweep through 7 chakra tones
            return createChakraTones(ctx);
        case 'mantra':
            // Deep OM drone with rhythmic pulse
            return createMantraDrone(ctx, 136.1);
        case 'pranayama':
            // Rhythmic breathing guide - inhale tone, hold, exhale tone
            return createBreathingGuide(ctx, 4, 4, 4); // 4-4-4 pattern
    }
}

// Singing bowl simulation
function createSingingBowl(ctx, freq) {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.value = freq;
    osc2.type = 'sine';
    osc2.frequency.value = freq * 2.01; // slight detuning for richness
    
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 2);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 15);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    
    return { start: () => { osc1.start(); osc2.start(); }, stop: () => { osc1.stop(); osc2.stop(); } };
}

// Ambient drone
function createAmbientDrone(ctx, freq, vol) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    lfo.type = 'sine';
    lfo.frequency.value = 0.1; // very slow modulation
    lfoGain.gain.value = freq * 0.02;
    
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    
    gain.gain.value = vol;
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    return { start: () => { osc.start(); lfo.start(); }, stop: () => { osc.stop(); lfo.stop(); } };
}

// Breathing guide with timed tones
function createBreathingGuide(ctx, inhale, hold, exhale) {
    // Creates a repeating cycle:
    // Rising tone for inhale phase
    // Sustained tone for hold phase
    // Falling tone for exhale phase
    // Visual circle animation synced to this cycle
}
```

### 5.2 Audio Player UI Design

The audio player must look premium and 5D:

```css
.meditation-player {
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%);
    backdrop-filter: blur(16px);
    border: 0.5px solid rgba(255,255,255,0.12);
    border-radius: 24px;
    padding: 20px;
    box-shadow:
        0 4px 16px rgba(0,0,0,0.15),
        0 12px 32px rgba(0,0,0,0.08),
        inset 0 1px 0 rgba(255,255,255,0.15);
}
```

**Play button**: 3D circle with gradient, gold accent, animated pulse ring when playing
**Progress bar**: 3D track (inset shadow) with gradient fill (meditation color), animated glow dot at position
**Volume control**: smaller 3D slider
**Duration text**: small, muted, monospace-like

### 5.3 Audio Player States

**Idle**: Play button prominent, progress bar empty
**Playing**: 
- Play button becomes Pause
- Progress bar fills with animated gradient
- Subtle pulse ring animation around player
- Avatar on the page gently animates (subtle breathing motion — scale 1.0 to 1.02, 4s cycle)
**Paused**: Pulse stops, avatar pauses

---

## 6. COMPLETE CONTENT FOR ALL 10 MEDITATIONS

All text MUST be in Bahasa Indonesia.

### 6.1 MINDFULNESS — Kesadaran Penuh

**Deskripsi lengkap**:
"Mindfulness atau Kesadaran Penuh adalah praktik meditasi yang berakar dari tradisi Buddha Theravada di Asia Tenggara, khususnya dari ajaran Satipatthana Sutta yang berusia lebih dari 2.500 tahun. Praktik ini mengajak kamu untuk hadir sepenuhnya di momen saat ini — mengamati napas, sensasi tubuh, pikiran, dan emosi tanpa menghakimi atau bereaksi. Berbeda dari meditasi lain yang berusaha 'mengosongkan' pikiran, Mindfulness justru mengajak kamu untuk menyadari apa yang sedang terjadi di dalam diri dengan sikap terbuka dan penuh penerimaan. Dalam beberapa dekade terakhir, Mindfulness telah menjadi praktik meditasi yang paling banyak diteliti secara ilmiah, dengan lebih dari 600 studi menunjukkan manfaatnya untuk kesehatan mental dan fisik."

**Manfaat untuk tubuh**:
- Mengurangi hormon stress cortisol hingga 25%
- Menurunkan tekanan darah dan detak jantung
- Meningkatkan fungsi sistem kekebalan tubuh
- Memperbaiki kualitas tidur secara signifikan
- Meningkatkan kemampuan fokus dan konsentrasi
- Mengurangi gejala kecemasan dan depresi
- Memperlambat penuaan sel otak

**Asal & Sejarah**:
"Mindfulness berasal dari tradisi Buddha Theravada yang berkembang di India, Sri Lanka, Myanmar, dan Thailand. Kata Pali aslinya adalah 'Sati' yang berarti 'mengingat untuk hadir'. Pada tahun 1979, Jon Kabat-Zinn membawa praktik ini ke dunia medis Barat melalui program MBSR (Mindfulness-Based Stress Reduction) di University of Massachusetts Medical Center. Sejak saat itu, Mindfulness telah menjadi fenomena global yang dipraktikkan di rumah sakit, sekolah, perusahaan, dan militer di seluruh dunia."

**Cara Melakukan**:
"1. Duduk dengan nyaman di lantai atau kursi, punggung tegak tapi tidak kaku.
2. Tutup mata perlahan atau arahkan pandangan ke bawah.
3. Tarik napas dalam melalui hidung, rasakan udara mengisi perut dan dada.
4. Hembuskan napas perlahan melalui mulut.
5. Fokuskan perhatian pada sensasi napas di ujung hidung atau perut.
6. Saat pikiran mengembara (dan pasti akan), sadari tanpa menghakimi, lalu kembalikan fokus ke napas.
7. Lakukan selama 10-30 menit. Mulai dari 5 menit jika baru pertama kali."

**Durasi**: 10-30 menit
**Level**: Pemula
**Frekuensi audio**: 174 Hz (healing frequency)

---

### 6.2 ZEN (ZAZEN) — Meditasi Zen

**Deskripsi lengkap**:
"Zen atau Zazen adalah jantung dari praktik Buddha Zen yang berkembang di Jepang dan Tiongkok. Kata 'Za' berarti 'duduk' dan 'Zen' berarti 'meditasi' — secara harfiah berarti 'duduk dalam meditasi'. Zazen bukan tentang mencapai sesuatu atau pergi ke suatu tempat — ini tentang hanya duduk, hanya ada, hanya bernapas. Dalam Zen, tidak ada tujuan selain praktik itu sendiri. Kesederhanaan ini justru yang membuatnya sangat mendalam. Tradisi Zen menekankan disiplin postur yang ketat — punggung lurus seperti tumpukan koin, dagu sedikit ditundukkan, mata setengah terbuka. Keheningan dan keformalan ini menciptakan wadah yang kuat untuk kesadaran murni."

**Manfaat untuk tubuh**:
- Meningkatkan kejelasan mental dan kemampuan pengambilan keputusan
- Mengurangi overthinking dan kecemasan berlebihan
- Memperbaiki postur tubuh dan kesehatan tulang belakang
- Menurunkan respons stress fight-or-flight
- Meningkatkan kreativitas dan kemampuan problem-solving
- Memperdalam kesadaran diri dan emosional
- Membangun disiplin mental yang kuat

**Asal & Sejarah**:
"Zen bermula dari perpaduan antara Buddhisme India dan Taoisme Tiongkok pada abad ke-6 Masehi. Bodhidharma, seorang biksu India, membawa ajarannya ke Tiongkok dan mendirikan tradisi Chan (yang kemudian menjadi 'Zen' dalam bahasa Jepang). Tradisi ini berkembang pesat di Jepang pada abad ke-12 melalui dua aliran utama: Soto Zen (menekankan shikantaza — 'hanya duduk') dan Rinzai Zen (menggunakan koan — teka-teki paradoks). Zen telah mempengaruhi banyak aspek budaya Jepang termasuk seni teh, kaligrafi, ikebana, dan arsitektur."

**Cara Melakukan**:
"1. Duduk di atas zafu (bantal meditasi) dalam posisi seiza (berlutut) atau padmasana (lotus penuh).
2. Tegakkan punggung seperti menumpuk koin satu per satu dari tulang ekor ke kepala.
3. Tundukkan dagu sedikit, sejajarkan telinga dengan bahu.
4. Buka mata setengah, arahkan pandangan ke lantai sekitar 1 meter di depan.
5. Letakkan tangan dalam posisi cosmic mudra — tangan kiri di atas tangan kanan, ibu jari saling menyentuh membentuk oval.
6. Bernapas alami melalui hidung. Jangan mengatur napas.
7. Biarkan pikiran datang dan pergi seperti awan. Jangan ikuti, jangan tolak.
8. Duduk selama 25-40 menit. Pemula bisa mulai dari 15 menit."

**Durasi**: 25-40 menit
**Level**: Menengah
**Frekuensi audio**: 396 Hz (singing bowl)

---

### 6.3 VIPASSANA — Meditasi Insight

**Deskripsi lengkap**:
"Vipassana, yang berarti 'melihat sesuatu sebagaimana adanya', adalah salah satu teknik meditasi tertua di India. Diajarkan lebih dari 2.500 tahun lalu oleh Gotama Buddha sebagai obat universal untuk penderitaan manusia. Praktik ini melibatkan pengamatan sistematis terhadap sensasi tubuh — dari ujung kepala sampai ujung kaki — dengan kesadaran yang tajam namun tidak reaktif. Vipassana mengajarkan bahwa semua sensasi bersifat sementara (anicca), dan dengan mengamati mereka tanpa bereaksi, kita membebaskan diri dari pola kebiasaan pikiran yang menyebabkan penderitaan. Praktik ini dipopulerkan kembali di era modern oleh S.N. Goenka melalui retreat 10 hari yang ketat dan intensif."

**Manfaat untuk tubuh**:
- Mengurangi nyeri kronis melalui perubahan persepsi terhadap rasa sakit
- Menurunkan tingkat stress dan kecemasan secara drastis
- Meningkatkan neuroplastisitas otak (kemampuan otak membentuk koneksi baru)
- Memperbaiki regulasi emosi dan pengendalian impuls
- Membantu pemulihan dari trauma dan PTSD
- Meningkatkan empati dan kecerdasan emosional
- Memperbaiki pola tidur dan kualitas istirahat

**Asal & Sejarah**:
"Vipassana berasal dari India kuno dan merupakan inti ajaran Gotama Buddha. Setelah hampir punah di India, praktik ini dipertahankan oleh garis guru di Myanmar (Burma) selama berabad-abad. Pada abad ke-20, guru-guru seperti Mahasi Sayadaw, Ledi Sayadaw, dan U Ba Khin menghidupkan kembali tradisi ini. Murid U Ba Khin, S.N. Goenka, membawa Vipassana kembali ke India pada tahun 1969 dan mendirikan jaringan pusat meditasi global. Saat ini, lebih dari 200 pusat Vipassana tersebar di seluruh dunia, menawarkan retreat 10 hari secara gratis."

**Cara Melakukan**:
"1. Duduk dengan nyaman, punggung tegak, mata tertutup.
2. Mulai dengan Anapana — fokus pada sensasi napas alami di area segitiga hidung dan bibir atas selama 3-5 menit.
3. Setelah pikiran tenang, mulai body scan: pindahkan perhatian dari ujung kepala ke bawah secara sistematis.
4. Di setiap area tubuh, amati sensasi apa pun — panas, dingin, gatal, tekanan, berdenyut, kosong.
5. Jangan bereaksi terhadap sensasi apapun. Tidak ada sensasi yang 'baik' atau 'buruk'.
6. Amati dengan kesadaran: 'Ini juga akan berlalu' (anicca).
7. Scan seluruh tubuh dari kepala ke kaki, lalu kaki ke kepala.
8. Lakukan selama 30-60 menit. Pemula mulai dari 15 menit."

**Durasi**: 30-60 menit
**Level**: Menengah-Lanjutan
**Frekuensi audio**: White noise sangat halus

---

### 6.4 YOGA NIDRA — Tidur Yoga

**Deskripsi lengkap**:
"Yoga Nidra, yang secara harfiah berarti 'Tidur Yoga', adalah praktik relaksasi mendalam yang membawamu ke kondisi antara sadar dan tidur — zona hypnagogic yang ajaib. Dalam kondisi ini, tubuh benar-benar rileks seperti tidur, tetapi kesadaran tetap terjaga. Satu sesi Yoga Nidra selama 30 menit dikatakan setara dengan 2-3 jam tidur biasa dalam hal pemulihan tubuh. Praktik ini selalu dipandu (guided) melalui serangkaian instruksi yang membawamu melalui rotasi kesadaran ke berbagai bagian tubuh, visualisasi, dan afirmasi positif (sankalpa). Yoga Nidra sangat cocok untuk orang modern yang sulit tidur, mengalami stress berlebihan, atau butuh deep recovery."

**Manfaat untuk tubuh**:
- Mengatasi insomnia dan gangguan tidur
- Mengurangi stress dan kecemasan secara mendalam
- Mempercepat pemulihan fisik setelah sakit atau cedera
- Menurunkan tekanan darah dan menstabilkan detak jantung
- Meningkatkan produksi hormon pertumbuhan (HGH) untuk regenerasi sel
- Mengurangi nyeri kronis dan ketegangan otot
- Meningkatkan memori dan kemampuan belajar

**Asal & Sejarah**:
"Yoga Nidra berakar dari tradisi Tantra kuno India dan disebut dalam teks-teks Upanishad yang berusia ribuan tahun. Dalam mitologi Hindu, dewa Vishnu dikatakan berada dalam keadaan Yoga Nidra — tidur kosmis yang menjaga keseimbangan alam semesta. Praktik modern Yoga Nidra dikembangkan oleh Swami Satyananda Saraswati pada tahun 1960-an di Bihar School of Yoga, India. Beliau mensistematisasikan teknik relaksasi kuno menjadi metode yang dapat diakses oleh siapa saja. Saat ini, Yoga Nidra digunakan oleh militer AS untuk mengatasi PTSD, oleh rumah sakit untuk manajemen nyeri, dan oleh jutaan orang untuk kualitas tidur yang lebih baik."

**Cara Melakukan**:
"1. Berbaring terlentang di tempat yang nyaman (kasur, matras yoga, atau karpet).
2. Rentangkan kaki selebar bahu, biarkan kaki jatuh ke samping secara alami.
3. Letakkan tangan 15-20 cm dari tubuh, telapak menghadap ke atas.
4. Tutup mata. Tarik napas dalam 3 kali untuk melepaskan ketegangan.
5. Tetapkan sankalpa (niat/resolusi positif) — ucapkan dalam hati 3 kali.
6. Ikuti panduan rotasi kesadaran: pindahkan perhatian ke setiap bagian tubuh yang disebutkan.
7. Biarkan tubuh semakin berat dan rileks di setiap bagian.
8. Jangan melawan jika mengantuk — biarkan kesadaran mengalir alami.
9. Di akhir sesi, gerakkan jari dan jari kaki perlahan, lalu buka mata.
10. Durasi: 20-45 menit."

**Durasi**: 20-45 menit
**Level**: Pemula (sangat mudah — tinggal berbaring dan mendengarkan)
**Frekuensi audio**: 136.1 Hz (frekuensi OM)

---

### 6.5 TAI CHI — Meditasi Gerak

**Deskripsi lengkap**:
"Tai Chi, atau Taijiquan, adalah seni meditasi gerak kuno dari Tiongkok yang menggabungkan gerakan mengalir yang lembut dengan pernapasan dalam dan fokus mental. Sering disebut 'meditasi dalam gerakan', Tai Chi mengajarkan bahwa ketenangan sejati bisa ditemukan bukan hanya dalam keheningan, tetapi juga dalam gerakan yang penuh kesadaran. Setiap gerakan Tai Chi terinspirasi dari alam — awan yang mengalir, air yang mengalir, burung bangau yang berdiri satu kaki. Gerakan-gerakan ini tampak lambat dan anggun, tetapi sesungguhnya melatih keseimbangan, kekuatan, fleksibilitas, dan koordinasi secara bersamaan. Tai Chi juga merupakan seni bela diri — setiap gerakan memiliki aplikasi pertahanan diri."

**Manfaat untuk tubuh**:
- Meningkatkan keseimbangan dan mencegah jatuh (terutama untuk lansia)
- Memperkuat otot kaki, core, dan punggung tanpa beban
- Meningkatkan fleksibilitas sendi dan rentang gerak
- Menurunkan tekanan darah dan kolesterol
- Mengurangi nyeri arthritis dan sendi
- Meningkatkan kapasitas paru-paru dan efisiensi pernapasan
- Memperbaiki koordinasi dan proprioception tubuh

**Asal & Sejarah**:
"Tai Chi lahir di Tiongkok pada abad ke-17, dikembangkan oleh keluarga Chen di provinsi Henan. Legenda menceritakan bahwa biksu Taois Zhang Sanfeng menciptakan Tai Chi setelah menyaksikan pertarungan antara ular dan bangau — menyadari bahwa kelembutan bisa mengalahkan kekuatan. Dari gaya Chen yang asli, berkembang gaya-gaya lain: Yang (paling populer saat ini), Wu, Wu/Hao, dan Sun. Setiap gaya memiliki karakteristik unik, tetapi semuanya berbagi prinsip dasar: gerakan lembut, pernapasan dalam, dan aliran energi (qi). Saat ini Tai Chi dipraktikkan oleh lebih dari 300 juta orang di seluruh dunia."

**Cara Melakukan**:
"1. Berdiri tegak dengan kaki selebar bahu, lutut sedikit ditekuk.
2. Rilekskan bahu, tangan menggantung alami di samping.
3. Tarik napas dalam melalui hidung, hembuskan melalui mulut.
4. Gerakan dasar 'Lifting Hands': angkat kedua tangan perlahan setinggi bahu sambil menarik napas.
5. Turunkan tangan perlahan sambil menghembuskan napas, lutut sedikit ditekuk lebih dalam.
6. Gerakan 'Cloud Hands': pindahkan berat badan dari satu kaki ke kaki lain, tangan mengalir seperti awan.
7. Setiap gerakan mengalir ke gerakan berikutnya tanpa jeda — seperti air mengalir.
8. Fokus pada sensasi aliran energi di telapak tangan dan seluruh tubuh.
9. Praktikkan 15-30 menit. Pemula bisa mulai dengan 3-5 gerakan dasar."

**Durasi**: 15-30 menit
**Level**: Pemula-Menengah
**Frekuensi audio**: Suara air mengalir + angin lembut

---

### 6.6 QIGONG — Kultivasi Energi

**Deskripsi lengkap**:
"Qigong (dibaca 'chi-gung') adalah seni kuno Tiongkok untuk mengolah energi kehidupan (Qi) melalui gerakan lembut, pernapasan, dan visualisasi. Kata 'Qi' berarti energi kehidupan dan 'Gong' berarti latihan atau kultivasi. Berbeda dari Tai Chi yang memiliki rangkaian gerakan yang panjang dan kompleks, Qigong lebih sederhana — setiap gerakan bisa dipraktikkan secara terpisah dan diulang. Dalam filosofi Tiongkok, kesehatan bergantung pada aliran Qi yang lancar melalui meridian-meridian tubuh. Ketika Qi tersumbat, penyakit muncul. Qigong membuka sumbatan ini melalui gerakan, napas, dan niat. Praktik ini telah digunakan dalam pengobatan tradisional Tiongkok selama lebih dari 4.000 tahun."

**Manfaat untuk tubuh**:
- Meningkatkan sirkulasi darah dan aliran limfa
- Memperkuat sistem kekebalan tubuh
- Meningkatkan kapasitas dan fungsi paru-paru (terbukti untuk COPD)
- Mengurangi peradangan kronis dalam tubuh
- Meningkatkan kepadatan tulang dan mencegah osteoporosis
- Memperbaiki pencernaan dan metabolisme
- Meningkatkan vitalitas dan energi secara keseluruhan

**Asal & Sejarah**:
"Qigong memiliki sejarah lebih dari 4.000 tahun di Tiongkok. Jejak paling awal ditemukan dalam lukisan di makam Mawangdui dari Dinasti Han (sekitar 168 SM) yang menggambarkan figur-figur dalam posisi Qigong. Praktik ini berkembang dalam tiga tradisi utama: medis (untuk penyembuhan), martial (untuk bela diri), dan spiritual (untuk pencerahan). Selama Revolusi Kebudayaan (1966-1976), Qigong ditekan dan hampir punah. Namun pada tahun 1980-an, terjadi 'Qigong Boom' di Tiongkok — jutaan orang mulai berlatih di taman-taman kota. Saat ini, Qigong diakui oleh WHO dan banyak rumah sakit di dunia sebagai terapi komplementer."

**Cara Melakukan**:
"1. Berdiri tegak, kaki selebar bahu, lutut sedikit rileks.
2. 'Lifting the Sky': Angkat kedua tangan perlahan dari samping ke atas kepala, telapak menghadap langit. Tarik napas. Turunkan perlahan sambil hembuskan napas. Ulangi 8 kali.
3. 'Embracing the Tree': Angkat kedua tangan setinggi dada, seolah memeluk pohon besar. Tahan posisi ini 2-5 menit sambil bernapas alami. Rasakan energi mengalir di antara telapak tangan.
4. 'Pushing Mountains': Dorong kedua tangan ke depan setinggi bahu, telapak menghadap depan. Tarik kembali ke dada. Ulangi 8 kali.
5. 'Gathering Qi': Tangan di depan perut bawah, seolah memegang bola energi. Rasakan kehangatan.
6. Akhiri dengan 'Closing': tangan di atas pusar, mata tertutup, rasakan energi mengalir ke seluruh tubuh.
7. Durasi total: 15-30 menit."

**Durasi**: 15-30 menit
**Level**: Pemula
**Frekuensi audio**: 528 Hz (transformation frequency)

---

### 6.7 METTA — Cinta Kasih

**Deskripsi lengkap**:
"Metta Bhavana, atau Meditasi Cinta Kasih, adalah praktik mengembangkan perasaan cinta tanpa syarat dan kebaikan hati terhadap semua makhluk — dimulai dari diri sendiri. Kata 'Metta' dalam bahasa Pali berarti 'kebaikan hati yang tulus' atau 'cinta persahabatan'. Praktik ini bukan tentang emosi romantis, tetapi tentang mengembangkan sikap dasar kehangatan dan penerimaan terhadap semua kehidupan. Dalam meditasi ini, kamu secara sistematis mengirimkan harapan baik: pertama kepada diri sendiri, lalu orang yang dicintai, orang netral, orang yang sulit, dan akhirnya semua makhluk di alam semesta. Riset neurosains menunjukkan bahwa praktik Metta secara literal mengubah struktur otak — memperbesar area yang terkait dengan empati dan kasih sayang."

**Manfaat untuk tubuh**:
- Meningkatkan emosi positif dan kebahagiaan secara keseluruhan
- Mengurangi depresi, kecemasan sosial, dan rasa kesepian
- Menurunkan respons peradangan dalam tubuh
- Meningkatkan koneksi sosial dan empati
- Mengurangi bias implisit dan prasangka
- Memperlambat penuaan biologis (melalui panjang telomer)
- Mengurangi migrain dan sakit kepala kronis

**Asal & Sejarah**:
"Metta Bhavana berasal dari ajaran Buddha yang tercatat dalam Metta Sutta (Karaniya Metta Sutta), salah satu teks paling terkenal dalam kanon Pali. Konon, Buddha mengajarkan meditasi ini kepada sekelompok biksu yang ketakutan saat bermeditasi di hutan — setelah mempraktikkan Metta, hewan-hewan hutan menjadi jinak dan biksu-biksu bisa bermeditasi dengan tenang. Tradisi ini dipertahankan terutama dalam Buddhisme Theravada di Sri Lanka dan Myanmar. Di era modern, guru-guru seperti Sharon Salzberg dan Jack Kornfield mempopulerkan Metta di dunia Barat. Riset oleh Barbara Fredrickson di University of North Carolina membuktikan manfaat Metta secara ilmiah."

**Cara Melakukan**:
"1. Duduk nyaman dengan mata tertutup. Letakkan tangan di dada/jantung.
2. Mulai dengan diri sendiri. Ucapkan dalam hati: 'Semoga aku bahagia. Semoga aku sehat. Semoga aku aman. Semoga aku hidup dengan damai.'
3. Rasakan kehangatan di dada. Ulangi 3-5 kali.
4. Pindahkan ke orang yang kamu cintai. Bayangkan wajahnya. Ucapkan: 'Semoga kamu bahagia...'
5. Pindahkan ke orang netral (kenalan biasa, tetangga, kasir toko).
6. Pindahkan ke orang yang sulit (orang yang membuatmu kesal/marah).
7. Terakhir, perluas ke semua makhluk: 'Semoga semua makhluk bahagia. Semoga semua makhluk sehat. Semoga semua makhluk aman. Semoga semua makhluk hidup dengan damai.'
8. Rasakan cinta kasih memancar dari dadamu ke seluruh arah.
9. Durasi: 15-30 menit."

**Durasi**: 15-30 menit
**Level**: Pemula
**Frekuensi audio**: 639 Hz (connection frequency)

---

### 6.8 CHAKRA — Pusat Energi

**Deskripsi lengkap**:
"Meditasi Chakra adalah praktik yang berfokus pada tujuh pusat energi utama dalam tubuh yang tersusun sepanjang tulang belakang. Dalam tradisi Hindu dan Tantra, chakra (yang berarti 'roda' dalam bahasa Sanskerta) adalah titik-titik di mana energi kehidupan (prana) berputar dan mengalir. Setiap chakra terhubung dengan aspek fisik, emosional, dan spiritual yang berbeda — dari kebutuhan dasar kelangsungan hidup (Muladhara/Root) hingga koneksi spiritual tertinggi (Sahasrara/Crown). Ketika chakra seimbang dan terbuka, energi mengalir lancar dan kita merasa sehat, vital, dan selaras. Ketika chakra tersumbat, muncul masalah fisik dan emosional yang spesifik. Meditasi Chakra menggunakan visualisasi warna, bunyi mantra, dan fokus perhatian untuk membuka dan menyeimbangkan setiap pusat energi."

**7 Chakra dan warna**:
- Root (Muladhara) — Merah — dasar tulang belakang — keamanan, stabilitas
- Sacral (Svadhisthana) — Oranye — bawah pusar — kreativitas, emosi
- Solar Plexus (Manipura) — Kuning — ulu hati — kepercayaan diri, kekuatan
- Heart (Anahata) — Hijau — dada — cinta, kasih sayang
- Throat (Vishuddha) — Biru muda — tenggorokan — komunikasi, ekspresi
- Third Eye (Ajna) — Indigo — antara alis — intuisi, kebijaksanaan
- Crown (Sahasrara) — Ungu/Putih — ubun-ubun — koneksi spiritual

**Manfaat untuk tubuh**:
- Menyeimbangkan sistem endokrin (setiap chakra terkait kelenjar hormonal)
- Meningkatkan aliran energi dan vitalitas
- Memperbaiki kesehatan emosional dan stabilitas mood
- Mengurangi blokade psikologis dan pola pikir negatif
- Meningkatkan kreativitas dan ekspresi diri
- Memperdalam koneksi spiritual dan intuisi
- Memperbaiki kesehatan organ yang terkait setiap chakra

**Asal & Sejarah**:
"Sistem Chakra berasal dari tradisi Hindu kuno, pertama kali disebutkan dalam teks Veda (1500-500 SM) dan kemudian dikembangkan secara detail dalam tradisi Tantra dan teks Yoga Upanishad. Penyebutan paling sistematis ada dalam teks Sat-Cakra-Nirupana abad ke-16 oleh Purnananda Swami. Di Barat, sistem Chakra diperkenalkan oleh Arthur Avalon (Sir John Woodroffe) pada tahun 1919 melalui bukunya 'The Serpent Power'. Sejak itu, Chakra menjadi bagian integral dari yoga, healing alternatif, dan spiritualitas modern."

**Cara Melakukan**:
"1. Duduk tegak dalam posisi nyaman, mata tertutup.
2. Mulai dari Root Chakra di dasar tulang belakang. Visualisasikan cahaya merah berputar di sana.
3. Ucapkan mantra 'LAM' perlahan. Rasakan rasa aman dan membumi.
4. Pindah ke Sacral Chakra di bawah pusar. Visualisasikan cahaya oranye. Mantra: 'VAM'.
5. Solar Plexus di ulu hati. Cahaya kuning. Mantra: 'RAM'. Rasakan kekuatan.
6. Heart Chakra di dada. Cahaya hijau. Mantra: 'YAM'. Rasakan cinta.
7. Throat Chakra di tenggorokan. Cahaya biru muda. Mantra: 'HAM'.
8. Third Eye di antara alis. Cahaya indigo. Mantra: 'OM'.
9. Crown Chakra di ubun-ubun. Cahaya ungu/putih. Keheningan.
10. Rasakan energi mengalir dari root ke crown melalui tulang belakang.
11. Durasi: 20-40 menit."

**Durasi**: 20-40 menit
**Level**: Menengah
**Frekuensi audio**: Ascending tones melalui 7 frekuensi chakra

---

### 6.9 MANTRA — Pengulangan Sakral

**Deskripsi lengkap**:
"Meditasi Mantra adalah praktik mengulang kata, suku kata, atau frasa sakral secara berulang — baik dengan suara keras, berbisik, atau dalam hati — untuk menenangkan pikiran dan mencapai kondisi meditatif yang mendalam. Kata 'Mantra' berasal dari bahasa Sanskerta: 'man' (pikiran) dan 'tra' (alat/pembebas) — secara harfiah berarti 'alat untuk membebaskan pikiran'. Pengulangan mantra menciptakan getaran yang resonan di dalam tubuh dan pikiran. Secara neurosains, pengulangan ritmis menginhibisi aktivitas default mode network otak — bagian otak yang bertanggung jawab atas mind-wandering dan overthinking. Mantra paling terkenal adalah 'OM' (AUM), yang dianggap sebagai getaran primordial alam semesta."

**Manfaat untuk tubuh**:
- Mengurangi overthinking dan mental chatter secara efektif
- Menurunkan detak jantung dan tekanan darah
- Meningkatkan fokus dan konsentrasi jangka panjang
- Menstimulasi saraf vagus untuk aktivasi respons relaksasi
- Meningkatkan memori verbal dan kemampuan linguistik
- Mengurangi gejala depresi dan kecemasan
- Meningkatkan kualitas tidur

**Asal & Sejarah**:
"Tradisi Mantra berasal dari India kuno, dengan akar dalam Rigveda (1500 SM). Mantra awalnya adalah hymne sakral yang digunakan dalam ritual Vedic. Seiring waktu, praktik ini berkembang dalam tradisi Hindu (japa yoga), Buddha (dharani dan mantra seperti 'Om Mani Padme Hum'), dan Sikh (Naam Japna). Transcendental Meditation (TM), yang dipopulerkan oleh Maharishi Mahesh Yogi pada tahun 1950-an, adalah adaptasi modern dari meditasi mantra yang telah dipelajari secara ekstensif — lebih dari 600 studi ilmiah. Di Indonesia, tradisi dzikir dalam Islam juga merupakan bentuk meditasi mantra."

**Cara Melakukan**:
"1. Duduk nyaman dengan punggung tegak. Mata tertutup.
2. Pilih mantra yang resonan denganmu. Contoh:
   - 'OM' (AUM) — getaran universal
   - 'SO HUM' — 'Aku adalah Itu' (saya adalah bagian dari semesta)
   - 'OM MANI PADME HUM' — mantra kasih sayang Buddha
   - Atau kata sederhana yang bermakna bagi kamu
3. Mulai ucapkan mantra perlahan dengan suara keras. Rasakan getarannya.
4. Setelah beberapa menit, pelankan menjadi bisikan.
5. Kemudian, ucapkan hanya dalam hati.
6. Jika menggunakan mala (tasbih 108 butir), pindahkan satu butir setiap pengulangan.
7. Saat pikiran mengembara, sadari dan kembali ke mantra tanpa frustrasi.
8. Akhiri dengan keheningan — rasakan efek mantra di tubuh.
9. Durasi: 15-20 menit, 2x sehari."

**Durasi**: 15-20 menit
**Level**: Pemula
**Frekuensi audio**: 136.1 Hz (OM drone) dengan pulse ritmis

---

### 6.10 PRANAYAMA — Seni Pernapasan

**Deskripsi lengkap**:
"Pranayama adalah ilmu dan seni pengaturan napas yang berasal dari tradisi Yoga India. Kata 'Prana' berarti energi kehidupan (serupa dengan 'Qi' dalam tradisi Tiongkok) dan 'Ayama' berarti perluasan atau pengendalian. Pranayama bukan sekadar latihan pernapasan — ini adalah metode untuk mengendalikan aliran energi vital dalam tubuh melalui napas yang disengaja dan terstruktur. Dalam filosofi Yoga, napas adalah jembatan antara tubuh dan pikiran: dengan mengendalikan napas, kita mengendalikan kondisi mental. Pranayama memiliki puluhan teknik — dari yang menenangkan (Nadi Shodhana) hingga yang mengenergi (Kapalabhati) — masing-masing dengan efek fisiologis yang spesifik dan terukur. Pranayama adalah salah satu dari delapan tahap Ashtanga Yoga yang diajarkan oleh Patanjali."

**Teknik-teknik utama**:
- Nadi Shodhana (Alternate Nostril): menyeimbangkan otak kiri dan kanan
- Ujjayi (Ocean Breath): menenangkan, menghangatkan
- Kapalabhati (Skull Shining): mengenergi, membersihkan
- Bhramari (Bee Breath): menenangkan, mengurangi kecemasan
- Box Breathing (4-4-4-4): menstabilkan, dipakai Navy SEAL

**Manfaat untuk tubuh**:
- Meningkatkan kapasitas paru-paru dan efisiensi pernapasan
- Mengaktifkan sistem saraf parasimpatik (respons relaksasi)
- Menurunkan detak jantung dan tekanan darah dalam hitungan menit
- Meningkatkan oksigenasi darah dan fungsi otak
- Mengurangi kecemasan akut dan serangan panik
- Meningkatkan variabilitas detak jantung (HRV) — indikator kesehatan jantung
- Memperbaiki fungsi pencernaan melalui pijatan diafragma

**Asal & Sejarah**:
"Pranayama adalah bagian integral dari Yoga yang berusia lebih dari 5.000 tahun. Referensi paling awal ditemukan dalam Rigveda dan Atharvaveda. Patanjali, dalam Yoga Sutra-nya (sekitar 200 SM), menetapkan Pranayama sebagai tahap keempat dari delapan tahap Yoga — setelah Yama (etika), Niyama (disiplin), dan Asana (postur). Teks Hatha Yoga Pradipika (abad ke-15) memberikan instruksi detail tentang berbagai teknik Pranayama. Di era modern, guru-guru seperti B.K.S. Iyengar, T.K.V. Desikachar, dan Wim Hof telah membawa Pranayama ke khalayak global. Teknik Wim Hof, yang terinspirasi oleh Tummo breathing Tibet, telah terbukti secara ilmiah mampu memodulasi sistem kekebalan tubuh."

**Cara Melakukan (Nadi Shodhana — teknik dasar)**:
"1. Duduk tegak, mata tertutup, bahu rileks.
2. Tangan kiri di lutut kiri, telapak ke atas.
3. Tangan kanan: tekuk jari tengah dan telunjuk ke telapak. Ibu jari dan jari manis siap.
4. Tutup lubang hidung kanan dengan ibu jari. Tarik napas melalui lubang kiri selama 4 hitungan.
5. Tutup kedua lubang hidung (ibu jari + jari manis). Tahan 4 hitungan.
6. Buka lubang kanan (angkat ibu jari). Hembuskan melalui kanan selama 4 hitungan.
7. Tarik napas melalui lubang kanan selama 4 hitungan.
8. Tutup kedua. Tahan 4 hitungan.
9. Buka lubang kiri. Hembuskan melalui kiri selama 4 hitungan.
10. Ini 1 siklus. Ulangi 8-12 siklus.
11. Setelah selesai, bernapas normal dan rasakan efeknya.
12. Durasi total: 10-20 menit."

**Durasi**: 10-20 menit
**Level**: Pemula
**Frekuensi audio**: Rhythmic breathing guide tones (ascending = inhale, sustained = hold, descending = exhale)

---

## 7. DARK MODE SUPPORT

All elements must support dark mode:
- Card backgrounds: rgba(20,28,45,0.9) with blur
- Text: warm white #FAFAF7
- Avatar SVG: works on both light/dark (aura glow more visible in dark)
- Audio player: glass effect on dark background
- Section dividers: rgba(255,255,255,0.08) line

---

## 8. ANIMATION SPECIFICATIONS

### 8.1 Card Entrance (main gallery)
Cards enter with staggered animation:
```
Card 1: delay 0.1s, translateY(30px) → 0, opacity 0 → 1, 500ms
Card 2: delay 0.2s
...
Card 10: delay 1.0s
```

### 8.2 Avatar Breathing Animation (detail page, when audio playing)
```css
@keyframes meditation-breathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
}
animation: meditation-breathe 4s ease-in-out infinite;
```

### 8.3 Aura Pulse (detail page)
```css
@keyframes aura-pulse {
    0%, 100% { opacity: 0.15; transform: scale(1); }
    50% { opacity: 0.25; transform: scale(1.05); }
}
animation: aura-pulse 4s ease-in-out infinite;
```

### 8.4 Particle Float (detail page hero area)
6-8 small circles floating around the avatar:
```css
@keyframes particle-float {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
    25% { transform: translate(10px, -15px) rotate(90deg); opacity: 0.6; }
    50% { transform: translate(-5px, -25px) rotate(180deg); opacity: 0.3; }
    75% { transform: translate(-15px, -10px) rotate(270deg); opacity: 0.6; }
    100% { transform: translate(0, 0) rotate(360deg); opacity: 0.3; }
}
```

---

## 9. PERFORMANCE CONSTRAINTS

- Maximum 2 backdrop-filter elements visible at once
- SVG avatars: keep path count reasonable (12-16 paths per figure max)
- Audio: Web Audio API only, no external audio files
- Animations: transform + opacity only (GPU composited)
- Lazy load detail page content — only render when opened
- Total new CSS: aim for under 400 lines
- Total new HTML: keep efficient with template-like JS generation
- All meditation data stored as JS object, cards generated dynamically

---

## 10. ABSOLUTE CONSTRAINTS

1. DO NOT modify any existing JavaScript functions or features
2. DO NOT break any existing panels, modals, or functionality
3. DO NOT remove or alter any existing home screen tiles
4. All new text content in Bahasa Indonesia
5. Word "AI" must NOT appear in any user-facing text
6. Support both light and dark mode
7. Mobile-first, max-width 480px
8. No external dependencies or CDN resources (except existing ones already in use)
9. Maintain the existing code style and naming conventions
10. The Meditasi feature should be fully self-contained within the single index.html file

---

## 11. ACCEPTANCE CRITERIA

- [ ] "Meditasi" tile visible on home screen with 5D icon
- [ ] Tapping tile opens meditation gallery with all 10 types
- [ ] Each meditation card shows full description, not brief
- [ ] Each card has unique accent color and 5D depth
- [ ] Tapping a card opens detail page with all content sections
- [ ] Detail page shows large hero avatar with aura glow
- [ ] 4 pose avatars visible in horizontal scroll gallery
- [ ] Each avatar has PS5-quality rendering (gradient, rim light, shadow, aura)
- [ ] Audio player present with play/pause functionality
- [ ] Audio generates meditation-appropriate sound via Web Audio API
- [ ] Avatar breathing animation activates when audio plays
- [ ] All content in Bahasa Indonesia
- [ ] Dark mode fully supported
- [ ] No existing features broken
- [ ] Performance smooth on mobile

---

END OF SPECIFICATION. Read the current index.html structure first, then implement systematically. Begin with the data object containing all 10 meditation types, then build the UI components, then the SVG avatars, then the audio system. Ask permission before each file edit.
