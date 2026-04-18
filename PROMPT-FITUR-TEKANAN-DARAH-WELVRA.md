# CLAUDE CODE PROMPT — FITUR PANTAU TEKANAN DARAH WELVRA

## INSTRUKSI UTAMA

Kamu adalah developer senior yang sedang membangun fitur "Pantau Tekanan Darah" untuk aplikasi kesehatan premium bernama **Welvra**. Fitur ini ditambahkan ke file `index.html` yang sudah ada. JANGAN buat file baru — semua kode (HTML, CSS, JS) ditambahkan langsung ke dalam file `index.html` yang existing.

**Lokasi file:** `C:\Users\junma\Desktop\HEALTH WEBSITE & APPS\index.html`

---

## KONTEKS APLIKASI WELVRA

Welvra adalah health companion app premium dengan desain warm luxury spa. Aplikasi ini sudah memiliki fitur-fitur berikut yang sudah jalan:
- Splash screen premium dengan animasi
- Onboarding (input nama user)
- Panel 1: Foto Gejala + analisa AI
- Panel 2: Baca Hasil Lab
- Panel 3: Chat Konsultasi
- Settings panel, Health Profile, BMI calculator
- Dark mode, Riwayat Konsultasi, Notifikasi
- Semua API call sudah inject health profile user

**Tech stack:** Single HTML file, semua CSS + JS inline, Claude API (claude-opus-4-5), deploy Netlify, zero dependencies.

---

## BRAND GUIDELINES — WAJIB DIIKUTI

```
Nama        : Welvra
Tagline     : "Your Personal Health Companion"
Sub-tagline : "Kesehatan terbaik, dalam genggamanmu"
Badge       : "Ask Me · Online 24/7"

WARNA:
- Primary Teal   : #0A7B6C (utama, header, tombol)
- Gold Accent     : #C8860A (highlight, badge, ikon penting)
- Sage Green      : #6B9E78 (status normal, indikator sehat)
- Ivory Background: #FAFAF7 (background utama)
- Dark Text       : #2D3436
- Soft Gray        : #636E72
- Danger Red      : #D63031 (peringatan hipertensi)
- Warning Orange  : #E17055 (prehipertensi)

FONT:
- Heading   : 'Playfair Display', serif (italic untuk aksen)
- Body/UI   : 'DM Sans', sans-serif

FEELING: Warm luxury wellness spa — bukan klinik steril.
Bayangkan lobi hotel bintang 5 yang tenang, hangat, dan menenangkan.

DARK MODE: Semua elemen harus support dark mode.
- Dark bg: #1a1a2e atau #16213e
- Dark card: #1e293b
- Teks tetap readable di kedua mode
```

---

## DESAIN UI — PANEL TEKANAN DARAH

### Posisi di Home Screen
Tambahkan sebagai **Panel 4** di halaman home, setelah panel Chat Konsultasi. 
Gunakan pattern yang sama dengan panel lainnya:
- Card dengan border-radius 20px
- Shadow halus: `0 4px 20px rgba(0,0,0,0.06)`
- Ikon + judul + deskripsi singkat
- Tap untuk masuk ke halaman detail

```
┌─────────────────────────────────┐
│  ❤️‍🩹  Pantau Tekanan Darah       │
│  Ukur, catat, dan pantau tensi  │
│  kesehatanmu secara rutin       │
│                          ▸      │
└─────────────────────────────────┘
```

### Halaman Detail — Layout Tab

Halaman detail tekanan darah memiliki 3 tab di bagian atas:

```
┌──────────┬──────────┬──────────┐
│  Manual  │Bluetooth │  Kamera  │
└──────────┴──────────┴──────────┘
```

Tab menggunakan desain pill/segment control, bukan tab biasa:
- Background pill: rgba(10,123,108,0.08)
- Active tab: background #0A7B6C, teks putih, border-radius 12px
- Inactive: transparan, teks #636E72
- Animasi slide saat pindah tab (transform smooth)

---

## TAB 1: INPUT MANUAL

### Desain Form

```
┌─────────────────────────────────┐
│         TEKANAN DARAH           │
│                                 │
│    ┌───────┐     ┌───────┐     │
│    │  120  │  /  │   80  │     │
│    │mmHg   │     │mmHg   │     │
│    │Sistolik│    │Diastolik│    │
│    └───────┘     └───────┘     │
│                                 │
│  Detak Jantung (opsional)       │
│    ┌───────────────────────┐   │
│    │  72 BPM               │   │
│    └───────────────────────┘   │
│                                 │
│  Posisi Tubuh                   │
│  ○ Duduk  ○ Berdiri  ○ Baring  │
│                                 │
│  Catatan (opsional)             │
│  ┌───────────────────────────┐ │
│  │ Setelah olahraga pagi... │  │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │     💾 Simpan Hasil       │ │
│  └───────────────────────────┘ │
└─────────────────────────────────┘
```

### Spesifikasi Input Sistolik/Diastolik
- Input type="number" dengan font besar (48px, Playfair Display, bold)
- Min sistolik: 60, max: 250
- Min diastolik: 40, max: 150
- Placeholder: "---"
- Border-bottom style (underline input), bukan kotak penuh
- Warna angka berubah sesuai klasifikasi:
  - Normal (≤120/80): #6B9E78 (sage green)
  - Elevated (120-129/<80): #C8860A (gold)
  - Hipertensi 1 (130-139/80-89): #E17055 (orange)
  - Hipertensi 2 (≥140/≥90): #D63031 (red)
  - Krisis (>180/>120): #D63031 + animasi pulse

### Setelah Simpan — Tampilkan Hasil Card

```
┌─────────────────────────────────┐
│  ┌─────────────────────────┐   │
│  │    ✓ Tersimpan!          │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │  120/80 mmHg             │   │
│  │  ● Normal                │   │
│  │                          │   │
│  │  "Tekanan darah kamu     │   │
│  │   dalam batas normal.    │   │
│  │   Pertahankan pola       │   │
│  │   hidupmu yang sehat!"   │   │
│  │                          │   │
│  │  — Welvra                │   │
│  └─────────────────────────┘   │
│                                 │
│  💡 Tips dari Welvra:           │
│  "Rutin minum air putih dan    │
│   konsumsi seledri bisa bantu  │
│   jaga tekanan darah stabil."  │
│                                 │
└─────────────────────────────────┘
```

---

## TAB 2: BLUETOOTH SYNC

### Desain UI

```
┌─────────────────────────────────┐
│                                 │
│      ┌─────────────────┐       │
│      │   🔗             │       │
│      │  Hubungkan Alat  │       │
│      │  Tensi Digital   │       │
│      └─────────────────┘       │
│                                 │
│  Alat yang didukung:            │
│  • Omron Series                 │
│  • Xiaomi Mi Smart              │
│  • iHealth                      │
│  • Alat BLE lainnya             │
│                                 │
│  ┌───────────────────────────┐ │
│  │  🔍 Cari Perangkat        │ │
│  └───────────────────────────┘ │
│                                 │
│  Status: Belum terhubung        │
│                                 │
└─────────────────────────────────┘
```

### Implementasi Web Bluetooth
```javascript
// Gunakan Web Bluetooth API
// Blood Pressure Service UUID: 0x1810
// Blood Pressure Measurement Characteristic: 0x2A35

async function connectBluetoothBP() {
    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [
                { services: ['blood_pressure'] },
                { services: [0x1810] }
            ],
            optionalServices: ['battery_service']
        });
        
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService('blood_pressure');
        const characteristic = await service.getCharacteristic('blood_pressure_measurement');
        
        await characteristic.startNotifications();
        characteristic.addEventListener('characteristicvaluechanged', handleBPReading);
        
    } catch (error) {
        // Tampilkan pesan fallback yang friendly
        // "Perangkat tidak ditemukan. Pastikan alat tensi 
        //  dalam mode pairing dan Bluetooth aktif."
    }
}

function handleBPReading(event) {
    const value = event.target.value;
    // Parse IEEE 11073 float format
    const flags = value.getUint8(0);
    const systolic = parseSFloat(value, 1);
    const diastolic = parseSFloat(value, 3);
    const meanAP = parseSFloat(value, 5);
    
    // Simpan dengan tag sumber "bluetooth"
    saveBPReading({
        systolic, diastolic,
        source: 'bluetooth',
        accuracy: 'high',
        device: device.name,
        timestamp: Date.now()
    });
}
```

### Fallback jika Bluetooth tidak didukung
Tampilkan pesan elegant:
```
"Browser kamu belum mendukung Bluetooth.
 Untuk pengalaman terbaik, gunakan Chrome
 atau Edge versi terbaru.
 
 Atau kamu bisa gunakan tab Manual untuk
 mencatat hasil pengukuran dari alatmu."
```

---

## TAB 3: ESTIMASI PPG KAMERA

### ⚠️ DISCLAIMER WAJIB
Tampilkan disclaimer SEBELUM memulai pengukuran:

```
┌─────────────────────────────────┐
│  ⚠️  Penting untuk diketahui    │
│                                 │
│  Pengukuran melalui kamera      │
│  adalah ESTIMASI dan tidak      │
│  bisa menggantikan alat medis.  │
│                                 │
│  Untuk hasil akurat, gunakan    │
│  alat tensi digital atau        │
│  konsultasi ke dokter.          │
│                                 │
│  ┌───────────────────────────┐ │
│  │  ✓ Saya Mengerti          │ │
│  └───────────────────────────┘ │
└─────────────────────────────────┘
```

### Desain Layar Pengukuran

```
┌─────────────────────────────────┐
│                                 │
│     ┌───────────────────┐      │
│     │                   │      │
│     │   📷 KAMERA        │      │
│     │   (area preview)  │      │
│     │                   │      │
│     └───────────────────┘      │
│                                 │
│   Tempelkan ujung jari telunjuk │
│   ke lensa kamera belakang     │
│                                 │
│   ┌───────────────────────┐    │
│   │   ████████░░░  60%     │    │
│   │   Menganalisa...       │    │
│   └───────────────────────┘    │
│                                 │
│   ♥ Detak: 72 BPM              │
│   (real-time dari PPG)          │
│                                 │
│   Durasi: 20/30 detik           │
│                                 │
└─────────────────────────────────┘
```

### Implementasi PPG (Photoplethysmography)
```javascript
async function startPPGMeasurement() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: 'environment',
            width: { ideal: 320 },
            height: { ideal: 240 }
        }
    });
    
    // Aktifkan flash/torch untuk pencahayaan konsisten
    const track = stream.getVideoTracks()[0];
    const capabilities = track.getCapabilities();
    if (capabilities.torch) {
        await track.applyConstraints({ advanced: [{ torch: true }] });
    }
    
    const video = document.createElement('video');
    video.srcObject = stream;
    await video.play();
    
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 240;
    const ctx = canvas.getContext('2d');
    
    let redValues = [];
    let startTime = Date.now();
    const DURATION = 30000; // 30 detik
    
    function analyze() {
        if (Date.now() - startTime > DURATION) {
            // Selesai — proses hasil
            processResults(redValues);
            stream.getTracks().forEach(t => t.stop());
            return;
        }
        
        ctx.drawImage(video, 0, 0);
        const frame = ctx.getImageData(0, 0, 320, 240);
        const data = frame.data;
        
        // Hitung rata-rata channel merah (R)
        // Channel merah paling sensitif terhadap
        // perubahan volume darah di kapiler
        let redSum = 0;
        let count = 0;
        
        // Sampel dari area tengah saja (jari)
        for (let y = 80; y < 160; y++) {
            for (let x = 100; x < 220; x++) {
                const i = (y * 320 + x) * 4;
                redSum += data[i]; // Red channel
                count++;
            }
        }
        
        redValues.push({
            red: redSum / count,
            time: Date.now() - startTime
        });
        
        // Update UI progress
        const progress = Math.min(
            (Date.now() - startTime) / DURATION * 100, 100
        );
        updateProgressBar(progress);
        
        // Hitung heart rate real-time
        // setiap 5 detik
        if (redValues.length > 150) {
            const hr = calculateHeartRate(redValues);
            updateHeartRateDisplay(hr);
        }
        
        requestAnimationFrame(analyze);
    }
    
    analyze();
}

function calculateHeartRate(values) {
    // Bandpass filter 0.7-4 Hz (42-240 BPM)
    // Deteksi peak dalam sinyal PPG
    // Hitung interval antar-peak
    // Return rata-rata BPM
    
    const filtered = bandpassFilter(values, 0.7, 4.0);
    const peaks = findPeaks(filtered);
    
    if (peaks.length < 2) return null;
    
    const intervals = [];
    for (let i = 1; i < peaks.length; i++) {
        intervals.push(peaks[i].time - peaks[i-1].time);
    }
    
    const avgInterval = intervals.reduce((a,b) => a+b) / intervals.length;
    const bpm = 60000 / avgInterval;
    
    return Math.round(bpm);
}

function estimateBloodPressure(heartRate, ppgFeatures) {
    // DISCLAIMER: Ini adalah estimasi kasar
    // berdasarkan korelasi statistik umum.
    // BUKAN pengukuran medis yang valid.
    
    // Faktor yang dipertimbangkan:
    // - Heart rate dari PPG
    // - Pulse Transit Time (PTT) estimation
    // - Augmentation Index dari waveform
    // - Health profile user (umur, BB, TB)
    
    const userAge = getUserAge();
    const userBMI = getUserBMI();
    
    // Model regresi sederhana 
    // (baseline + adjustments)
    let estSystolic = 110;
    let estDiastolic = 70;
    
    // Adjust berdasarkan HR
    if (heartRate > 80) {
        estSystolic += (heartRate - 80) * 0.3;
        estDiastolic += (heartRate - 80) * 0.15;
    }
    
    // Adjust berdasarkan umur
    if (userAge > 40) {
        estSystolic += (userAge - 40) * 0.4;
    }
    
    // Adjust berdasarkan BMI
    if (userBMI > 25) {
        estSystolic += (userBMI - 25) * 1.2;
        estDiastolic += (userBMI - 25) * 0.8;
    }
    
    return {
        systolic: Math.round(estSystolic),
        diastolic: Math.round(estDiastolic),
        confidence: 'low', // Selalu 'low' untuk PPG
        heartRate: heartRate,
        source: 'ppg_camera',
        accuracy: 'estimation'
    };
}
```

### Tampilan Hasil PPG

```
┌─────────────────────────────────┐
│  📊 Hasil Estimasi               │
│                                 │
│     ~125 / ~82 mmHg             │
│     ♥ 74 BPM                    │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ⚠️ Ini adalah ESTIMASI   │   │
│  │ Akurasi: Rendah          │   │
│  │ Gunakan alat tensi untuk │   │
│  │ hasil yang akurat.       │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌───────────────────────────┐ │
│  │  💾 Simpan Estimasi       │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │  🔄 Ukur Ulang            │ │
│  └───────────────────────────┘ │
└─────────────────────────────────┘
```

Angka estimasi harus ditampilkan dengan prefix "~" (tilde) untuk menunjukkan ini perkiraan. Font lebih kecil dari input manual (36px bukan 48px).

---

## RIWAYAT & GRAFIK TREN

### Tampilan di bawah semua tab

```
┌─────────────────────────────────┐
│  📈 Riwayat Tekanan Darah       │
│                                 │
│  ┌──────┬──────┬──────┐        │
│  │7 Hari│30Hari│Semua │        │
│  └──────┴──────┴──────┘        │
│                                 │
│  [===== GRAFIK LINE CHART =====]│
│  │    ╱╲    Sistolik            │
│  │   ╱  ╲  ──── 130            │
│  │  ╱    ╲╱                    │
│  │ ╱                           │
│  │╱        Diastolik            │
│  │         ---- 82              │
│  └──────────────────────────── │
│   Sen  Sel  Rab  Kam  Jum      │
│                                 │
│  Rata-rata: 125/82 mmHg        │
│  Tertinggi: 135/88 mmHg        │
│  Terendah : 118/76 mmHg        │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📅 18 Apr 2026 · 08:30  │   │
│  │ 125/82 · ♥72 · Manual   │   │
│  │ ● Elevated               │   │
│  ├─────────────────────────┤   │
│  │ 📅 17 Apr 2026 · 20:15  │   │
│  │ ~130/85 · ♥78 · Kamera  │   │
│  │ ● Hipertensi 1 (est.)   │   │
│  ├─────────────────────────┤   │
│  │ 📅 17 Apr 2026 · 07:00  │   │
│  │ 118/76 · ♥68 · Bluetooth│   │
│  │ ● Normal                │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

### Implementasi Grafik
Gunakan Canvas API (bukan library external) untuk membuat line chart:
- 2 garis: sistolik (warna teal #0A7B6C) dan diastolik (warna gold #C8860A)
- Area di antara 2 garis: fill transparan
- Zona bahaya (>140 sistolik): background merah transparan
- Zona normal (90-120 sistolik): background hijau transparan
- Dot pada setiap titik data
- Tap dot untuk lihat detail
- Animasi draw line saat pertama load

### Badge Sumber Data
Setiap entry riwayat menampilkan badge sumber:
- **Manual**: badge biru `📝 Manual`
- **Bluetooth**: badge teal `🔗 Bluetooth` + nama device
- **Kamera**: badge amber `📷 Estimasi` (selalu ada label "Estimasi")

---

## KLASIFIKASI WHO & ANALISIS

### Tabel Klasifikasi (gunakan standar WHO/JNC 8)

```javascript
function classifyBP(systolic, diastolic) {
    if (systolic < 90 || diastolic < 60) {
        return {
            level: 'hipotensi',
            label: 'Tekanan Darah Rendah',
            color: '#3498DB',
            icon: '💙',
            message: 'Tekanan darahmu di bawah normal. ' +
                     'Pastikan kamu cukup minum dan makan teratur.'
        };
    }
    if (systolic <= 120 && diastolic <= 80) {
        return {
            level: 'normal',
            label: 'Normal',
            color: '#6B9E78',
            icon: '💚',
            message: 'Tekanan darahmu dalam batas normal. ' +
                     'Pertahankan gaya hidup sehatmu!'
        };
    }
    if (systolic <= 129 && diastolic <= 80) {
        return {
            level: 'elevated',
            label: 'Sedikit Tinggi',
            color: '#C8860A',
            icon: '💛',
            message: 'Tekanan darahmu sedikit di atas normal. ' +
                     'Kurangi garam dan perbanyak aktivitas fisik.'
        };
    }
    if (systolic <= 139 || diastolic <= 89) {
        return {
            level: 'hypertension1',
            label: 'Hipertensi Tahap 1',
            color: '#E17055',
            icon: '🧡',
            message: 'Tekanan darahmu tinggi tahap 1. ' +
                     'Sebaiknya konsultasi dengan dokter ' +
                     'dan perhatikan pola makan.'
        };
    }
    if (systolic <= 180 && diastolic <= 120) {
        return {
            level: 'hypertension2',
            label: 'Hipertensi Tahap 2',
            color: '#D63031',
            icon: '❤️',
            message: 'Tekanan darahmu cukup tinggi. ' +
                     'Segera konsultasi ke dokter ' +
                     'untuk penanganan lebih lanjut.'
        };
    }
    return {
        level: 'crisis',
        label: 'Krisis Hipertensi',
        color: '#D63031',
        icon: '🚨',
        message: 'PERINGATAN: Tekanan darahmu sangat tinggi! ' +
                 'Segera ke IGD atau hubungi layanan darurat ' +
                 'jika kamu mengalami gejala seperti sakit ' +
                 'kepala hebat, sesak napas, atau nyeri dada.'
    };
}
```

---

## INTEGRASI DENGAN WELVRA AI

### Inject ke API calls
Setiap kali user melakukan konsultasi chat (Panel 3), data tekanan darah terakhir harus di-inject ke system prompt:

```javascript
function getBPContext() {
    const readings = JSON.parse(
        localStorage.getItem('welvra_bp_readings') || '[]'
    );
    
    if (readings.length === 0) return '';
    
    const latest = readings[readings.length - 1];
    const last5 = readings.slice(-5);
    const classification = classifyBP(
        latest.systolic, latest.diastolic
    );
    
    const avgSys = Math.round(
        last5.reduce((s, r) => s + r.systolic, 0) / last5.length
    );
    const avgDia = Math.round(
        last5.reduce((s, r) => s + r.diastolic, 0) / last5.length
    );
    
    return `
DATA TEKANAN DARAH USER:
- Pengukuran terakhir: ${latest.systolic}/${latest.diastolic} mmHg 
  (${classification.label})
  Sumber: ${latest.source}, Waktu: ${new Date(latest.timestamp).toLocaleString('id-ID')}
- Rata-rata 5 pengukuran terakhir: ${avgSys}/${avgDia} mmHg
- Total pengukuran tersimpan: ${readings.length}
${latest.source === 'ppg_camera' ? '- CATATAN: Pengukuran terakhir dari estimasi kamera (akurasi rendah)' : ''}
    `.trim();
}
```

### Saran Herbal Indonesia
Setelah setiap pengukuran, tampilkan saran herbal lokal yang relevan:

```javascript
const herbalSuggestions = {
    hipotensi: [
        { nama: 'Jahe', desc: 'Minum wedang jahe hangat untuk membantu meningkatkan sirkulasi darah' },
        { nama: 'Ginseng Jawa', desc: 'Teh ginseng jawa bisa membantu menaikkan tekanan darah rendah' },
        { nama: 'Kopi', desc: 'Secangkir kopi bisa membantu sementara, tapi jangan berlebihan' }
    ],
    normal: [
        { nama: 'Teh Hijau', desc: 'Minum teh hijau rutin untuk menjaga kesehatan pembuluh darah' },
        { nama: 'Kunyit', desc: 'Jamu kunyit asam baik untuk kesehatan jantung secara umum' }
    ],
    elevated: [
        { nama: 'Seledri', desc: 'Jus seledri mengandung phthalide yang bisa membantu menurunkan tekanan darah' },
        { nama: 'Daun Salam', desc: 'Rebus 5-7 lembar daun salam, minum airnya 2x sehari' },
        { nama: 'Mentimun', desc: 'Makan mentimun segar atau jus mentimun untuk efek diuretik alami' }
    ],
    hypertension1: [
        { nama: 'Bawang Putih', desc: 'Konsumsi 1-2 siung bawang putih mentah per hari bisa membantu menurunkan tekanan darah' },
        { nama: 'Daun Salam', desc: 'Rebus 7-10 lembar daun salam dengan 3 gelas air hingga tersisa 1 gelas' },
        { nama: 'Seledri', desc: 'Minum jus seledri setiap pagi sebelum makan' },
        { nama: 'Buah Mengkudu', desc: 'Jus mengkudu mengandung xeronine yang bisa membantu mengontrol tekanan darah' }
    ],
    hypertension2: [
        { nama: '⚠️ Konsultasi Dokter', desc: 'Pada tahap ini, herbal hanya sebagai pendamping. Utamakan pengobatan medis dari dokter.' },
        { nama: 'Bawang Putih', desc: 'Bisa dikonsumsi sebagai pendamping obat dokter (konsultasikan dulu)' },
        { nama: 'Daun Kemangi', desc: 'Teh daun kemangi bisa membantu relaksasi pembuluh darah' }
    ],
    crisis: [
        { nama: '🚨 SEGERA KE DOKTER', desc: 'Jangan mengandalkan herbal. Segera ke IGD atau hubungi 119.' }
    ]
};
```

---

## PENYIMPANAN DATA (localStorage)

### Struktur Data

```javascript
// Key: 'welvra_bp_readings'
const bpReading = {
    id: 'bp_' + Date.now(),
    systolic: 125,
    diastolic: 82,
    heartRate: 72,           // BPM, opsional
    source: 'manual',        // 'manual' | 'bluetooth' | 'ppg_camera'
    accuracy: 'high',        // 'high' | 'medium' | 'estimation'
    deviceName: null,        // nama device bluetooth jika ada
    position: 'sitting',     // 'sitting' | 'standing' | 'lying'
    notes: '',               // catatan user
    classification: 'elevated',
    timestamp: 1713426600000,
    date: '2026-04-18',
    time: '08:30'
};

// Simpan array of readings
function saveBPReading(reading) {
    const readings = JSON.parse(
        localStorage.getItem('welvra_bp_readings') || '[]'
    );
    readings.push(reading);
    localStorage.setItem('welvra_bp_readings', JSON.stringify(readings));
}
```

---

## NOTIFIKASI & REMINDER

### Reminder Pengukuran Rutin
Integrasikan dengan sistem notifikasi Welvra yang sudah ada:

```javascript
// Tambahkan reminder default untuk pengukuran BP
const defaultBPReminders = [
    {
        id: 'bp_morning',
        title: 'Cek Tekanan Darah Pagi',
        message: 'Selamat pagi! Yuk ukur tekanan darahmu sebelum sarapan 🩺',
        time: '07:00',
        days: ['Mon', 'Wed', 'Fri'],
        enabled: true
    },
    {
        id: 'bp_evening',
        title: 'Cek Tekanan Darah Malam',
        message: 'Waktunya cek tekanan darah sebelum tidur 🌙',
        time: '21:00',
        days: ['Mon', 'Wed', 'Fri'],
        enabled: false  // user bisa enable
    }
];
```

---

## ANIMASI & MICRO-INTERACTIONS

### Animasi yang harus ada:

1. **Angka counter** — saat menampilkan hasil, angka sistolik dan diastolik naik dari 0 ke nilai sebenarnya (animasi count-up 800ms, easing: ease-out)

2. **Pulse ring** — lingkaran yang berdenyut di sekitar angka saat klasifikasi tinggi (CSS animation, pulse setiap 1.5s)

3. **Progress bar PPG** — gradient fill dari kiri ke kanan saat pengukuran kamera (linear, smooth)

4. **Chart draw** — garis grafik digambar dari kiri ke kanan saat pertama load (CSS stroke-dasharray animation)

5. **Tab slide** — background pill tab bergerak smooth saat pindah tab (transform translateX, 300ms)

6. **Card entrance** — hasil card muncul dengan slide-up + fade-in (transform translateY(20px) → 0, opacity 0 → 1, 500ms)

7. **Heartbeat icon** — ikon jantung yang berdenyut sesuai BPM yang terdeteksi selama pengukuran PPG

```css
/* Contoh animasi pulse ring */
@keyframes pulseRing {
    0% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.15); opacity: 0.2; }
    100% { transform: scale(1); opacity: 0.6; }
}

.bp-pulse-ring {
    animation: pulseRing 1.5s ease-in-out infinite;
}

/* Contoh animasi heartbeat */
@keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    15% { transform: scale(1.15); }
    30% { transform: scale(1); }
    45% { transform: scale(1.1); }
    60% { transform: scale(1); }
}

.bp-heartbeat {
    animation: heartbeat 1s ease-in-out infinite;
}

/* Count-up animation via JS */
function animateCounter(element, target, duration = 800) {
    let start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        
        const current = Math.round(start + (target - start) * eased);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}
```

---

## DARK MODE SUPPORT

Semua elemen baru HARUS support dark mode. Gunakan CSS variables yang sudah ada di Welvra:

```css
/* Light mode (default) */
.bp-card {
    background: #FAFAF7;
    color: #2D3436;
    border: 1px solid rgba(10, 123, 108, 0.1);
}

/* Dark mode */
body.dark-mode .bp-card {
    background: #1e293b;
    color: #e2e8f0;
    border: 1px solid rgba(10, 123, 108, 0.2);
}

/* Grafik warna */
body.dark-mode .bp-chart-zone-normal {
    background: rgba(107, 158, 120, 0.15);
}
body.dark-mode .bp-chart-zone-danger {
    background: rgba(214, 48, 49, 0.15);
}
```

---

## ATURAN PENTING

1. **BAHASA INDONESIA** — Semua teks UI dalam Bahasa Indonesia
2. **TIDAK ADA KATA "AI"** — Tidak boleh ada kata "AI" yang terlihat user. Ganti dengan "Welvra" atau "Analisis"
3. **MOBILE-FIRST** — Desain untuk layar max-width 480px
4. **PERSONALITY** — Welvra berbicara dengan nada hangat, friendly, dan caring. Panggil user dengan namanya
5. **SINGLE FILE** — Semua code ditambahkan ke index.html yang sudah ada, bukan file terpisah
6. **PRESERVE EXISTING** — Jangan ubah atau hapus fitur yang sudah ada
7. **localStorage** — Semua data disimpan di localStorage
8. **RESPONSIVE** — Harus terlihat bagus di semua ukuran layar mobile
9. **PERFORMANCE** — Minimal dependency, animasi smooth, load cepat
10. **AKSESIBILITAS** — Kontras warna cukup, touch target minimal 44px

---

## CHECKLIST SEBELUM SELESAI

- [ ] Panel 4 muncul di home screen
- [ ] 3 tab berfungsi (Manual, Bluetooth, Kamera)
- [ ] Input manual bisa simpan data
- [ ] Klasifikasi WHO benar dan warna sesuai
- [ ] Bluetooth connect berfungsi (atau fallback message)
- [ ] PPG kamera bisa baca heart rate
- [ ] Disclaimer PPG muncul sebelum pengukuran
- [ ] Grafik tren 7/30 hari berfungsi
- [ ] Riwayat pengukuran tampil dengan badge sumber
- [ ] Saran herbal Indonesia muncul sesuai klasifikasi
- [ ] Data BP inject ke chat konsultasi API
- [ ] Semua animasi berjalan smooth
- [ ] Dark mode support
- [ ] Mobile responsive max-width 480px
- [ ] Tidak ada kata "AI" di UI
- [ ] Nama user dipanggil di pesan hasil

---

## MULAI KERJAKAN

Buka file `index.html`, pelajari struktur yang ada, lalu tambahkan fitur Pantau Tekanan Darah sesuai spesifikasi di atas. Pastikan konsisten dengan desain dan pola code yang sudah ada.
