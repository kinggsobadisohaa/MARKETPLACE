# PRD — Landing Page "King Motor"

**Produk:** Landing page jual beli sepeda motor bekas
**Brand:** King Motor
**Basis operasional:** Mojokerto, Jawa Timur
**Versi dokumen:** 1.0 (Draft)
**Tanggal:** 22 Oktober 2026
**Status:** Untuk direview pemilik bisnis
**Pemilik produk:** (diisi) — Pemilik King Motor
**Disusun oleh:** Tim produk

---

## 1. Ringkasan Produk

King Motor adalah landing page satu halaman (single-page) yang berfungsi sebagai **etalase digital + mesin leads** untuk bisnis jual beli sepeda motor bekas di Mojokerto.

Landing page ini **bukan** marketplace multi-penjual dan **bukan** aplikasi transaksi online. Tujuannya adalah:

1. Menampilkan stok motor yang tersedia secara meyakinkan dan up-to-date.
2. Meyakinkan calon pembeli bahwa King Motor aman, legal, dan terpercaya (surat lengkap, garansi, lokasi jelas).
3. Mengarahkan pengunjung ke satu aksi utama: **chat WhatsApp** (atau isi form minat) untuk test ride / nego / booking.
4. Menangkap leads penjual motor (orang yang ingin menjual motornya ke King Motor).

### One-liner

> "King Motor — showroom motor bekas terpercaya di Mojokerto. Stok ready, surat lengkap, bisa tukar tambah, harga transparan. Chat dulu, cek unitnya hari ini."

---

## 2. Latar Belakang & Masalah

### Kondisi saat ini (asumsi awal, perlu konfirmasi)

- Penjualan masih mengandalkan mulut ke mulut, WhatsApp pribadi, dan posting manual di Facebook Marketplace / Instagram.
- Calon pembeli sering bertanya hal yang sama berulang: harga, tahun, surat, bisa kredit, lokasi, bisa tukar tambah.
- Tidak ada satu halaman yang bisa dikirim sebagai "kartu nama digital" saat orang bertanya "motornya apa saja, Bang?"
- Kredibilitas showroom kecil sering diragukan: takut motor hasil curian, surat tidak lengkap, odometer diputar, atau DP tidak jelas.

### Masalah yang ingin diselesaikan

| # | Masalah | Dampak |
|---|---------|--------|
| M1 | Info stok tersebar & cepat basi | Leads bertanya unit yang sudah terjual, waktu sales habis |
| M2 | Tidak ada bukti kredibilitas terpusat | Calon pembeli ragu, harga dianggap tidak wajar |
| M3 | Tidak ada funnel terukur | Tidak tahu channel mana yang menghasilkan penjualan |
| M4 | Leads penjual motor tidak tertangkap | Kehilangan pasokan unit (supply) |
| M5 | Tidak muncul di pencarian lokal "motor bekas Mojokerto" | Kehilangan traffic organik berniat beli tinggi |

### Peluang

- Pencarian lokal seperti "motor bekas Mojokerto", "showroom motor Mojokerto", "jual motor Mojokerto" punya niat beli tinggi dan kompetisi konten masih rendah.
- Mayoritas transaksi motor bekas di daerah tetap ditutup lewat WhatsApp, sehingga halaman yang cepat mengarah ke WA akan konversi lebih baik daripada katalog dengan checkout.

---

## 3. Tujuan & Metrik Keberhasilan

### Tujuan bisnis (6 bulan pertama)

| ID | Tujuan | Metrik | Target |
|----|--------|--------|--------|
| G1 | Menghasilkan leads pembeli berkualitas | Jumlah klik WhatsApp dari halaman | ≥ 150/bulan pada bulan ke-3 |
| G2 | Menghasilkan leads penjual motor | Submit form "Jual Motor Anda" | ≥ 30/bulan pada bulan ke-3 |
| G3 | Meningkatkan kepercayaan | Klik ke Google Maps / arah lokasi | ≥ 80/bulan |
| G4 | Terlihat di pencarian lokal | Posisi 1–5 untuk 3 keyword utama | Dalam 90 hari |
| G5 | Konversi halaman | Conversion rate (visit → WA click) | ≥ 4% |
| G6 | Kecepatan & kualitas | Lighthouse Performance (mobile) | ≥ 90 |

### Metrik pendukung

- Scroll depth 50% / 90%
- View pada kartu unit (unit mana paling diminati)
- Rasio klik "Lihat Detail" vs langsung WA
- Bounce rate < 55%
- Waktu muat LCP < 2,5 detik pada 4G

> **Catatan:** karena transaksi terjadi offline, metrik akhir (unit terjual) dicatat manual oleh pemilik dan direkonsiliasi bulanan dengan sumber lead.

---

## 4. Target Audiens

### Persona 1 — "Budi, pekerja pabrik" (pembeli utama, ±55% traffic)

- Usia 24–40, karyawan pabrik/wiraswasta kecil di Mojokerto & sekitarnya.
- Budget Rp 8–20 juta, sering pakai kredit/angsuran.
- Prioritas: **harga masuk, DP ringan, motor tidak rewel, surat jelas**.
- Perangkat: Android mid-range, koneksi tidak selalu stabil. **Mobile-first wajib.**
- Perilaku: menemukan dari Facebook/IG/TikTok atau Google, lalu langsung chat WA. Malas mengisi form panjang.

### Persona 2 — "Sari, ibu rumah tangga / pekerja kantor" (±25%)

- Butuh motor matic harian yang irit dan ringan.
- Prioritas: kondisi mesin, matic, warna, tahun muda.
- Sering minta rekomendasi dan membandingkan 2–3 unit.

### Persona 3 — "Pak Andi, penjual motor" (±20%)

- Ingin cepat menjual motornya tanpa ribet diurus sendiri.
- Prioritas: proses cepat, harga wajar, dibayar tunai, diurus surat-suratnya.
- Butuh halaman/form yang meyakinkan bahwa datanya aman.

### Segmentasi geografis

- Primer: Kota Mojokerto (Magersari, Prajurit Kulon, Kranggan) & Kabupaten Mojokerto (Puri, Sooko, Trowulan, Bangsal, Mojoanyar, Dlanggu, Jetis, Ngoro).
- Sekunder: Jombang, Sidoarjo, Gresik, Surabaya (untuk unit tertentu).

---

## 5. Scope

### In scope (MVP)

1. Landing page single-page responsif.
2. Hero + value proposition + CTA WhatsApp.
3. Grid stok motor (maks. 12–24 unit unggulan) dengan filter sederhana.
4. Halaman/modal detail unit.
5. Section keunggulan & bukti kepercayaan.
6. Section alur pembelian (4 langkah) + opsi kredit/tukar tambah.
7. Section "Jual Motor Anda" (form leads penjual).
8. Testimoni pembeli.
9. Lokasi + jam operasional + Google Maps.
10. FAQ.
11. Floating CTA WhatsApp.
12. SEO dasar + schema markup + analytics.

### Out of scope (fase berikutnya)

- Checkout / pembayaran online.
- Akun pengguna & wishlist tersimpan.
- Dashboard admin penuh (MVP: kelola stok via file JSON/CMS headless).
- Simulasi kredit dengan integrasi leasing (MVP: tabel estimasi statis + CTA).
- Multi-bahasa.
- Aplikasi mobile native.
- Marketplace multi-seller.

### Asumsi yang dipakai (harus dikonfirmasi)

- A1: Transaksi & nego tetap via WhatsApp/offline.
- A2: Stok berkisar 10–40 unit, dikelola 1–2 orang.
- A3: Belum ada domain; akan dibeli (mis. `kingmotor-mojokerto.com`).
- A4: Belum ada foto profesional; akan difoto dengan panduan yang disediakan.
- A5: WhatsApp Business tersedia atau akan dibuat.
- A6: Pembayaran: tunai, kredit via leasing partner, dan/atau tukar tambah.

---

## 6. User Journey

### Jalur A — Pembeli (utama)

```
Google / IG / FB / WA broadcast
        ↓
Landing page (Hero: "Motor bekas berkualitas di Mojokerto")
        ↓
Lihat stok  →  filter (matic/bebek/sport, harga, tahun)
        ↓
Klik kartu unit  →  Modal/halaman detail (foto, spesifikasi, harga, surat)
        ↓
CTA "Chat WhatsApp" (pesan otomatis terisi nama unit)
        ↓
Chat → Test ride / cek unit di showroom → Deal → Serah terima
```

### Jalur B — Penjual motor

```
Iklan/Google "jual motor Mojokerto"
        ↓
Section "Jual Motor Anda"
        ↓
Form singkat (merk, tipe, tahun, KM, harga harapan, WA, foto opsional)
        ↓
Konfirmasi sukses + tombol WA (opsional langsung chat)
        ↓
Tim menghubungi ≤ 1x24 jam → survei unit → penawaran
```

### Titik gesek yang harus dieliminasi

- Jangan paksa isi form untuk pembeli → WA satu klik.
- Jangan tampilkan harga "Hubungi kami" untuk semua unit → tampilkan harga atau rentang.
- Jangan sembunyikan lokasi → tampilkan alamat & Maps.
- Jangan pakai gambar stok/generik → foto unit asli.

---

## 7. Information Architecture (Urutan Section)

Single page, urutan dirancang untuk alur **Tarik perhatian → Bukti → Pilihan → Aksi**.

| # | Section | Anchor | Tujuan |
|---|---------|--------|--------|
| 1 | Header / Navbar sticky | — | Navigasi + CTA WA selalu terlihat |
| 2 | Hero | `#home` | Jelaskan value dalam 5 detik + CTA utama |
| 3 | Trust bar | `#trust` | Angka & badge kepercayaan (unit terjual, tahun berdiri, rating) |
| 4 | Stok Motor | `#stok` | Inti halaman: katalog unit |
| 5 | Kenapa King Motor | `#keunggulan` | Jawab keraguan (surat, garansi, tukar tambah) |
| 6 | Cara Beli | `#cara-beli` | Kurangi ketidakpastian proses |
| 7 | Kredit & Tukar Tambah | `#kredit` | Menangkap pembeli budget terbatas |
| 8 | Jual Motor Anda | `#jual` | Funnel supply |
| 9 | Testimoni | `#testimoni` | Bukti sosial |
| 10 | Lokasi & Jam Buka | `#lokasi` | Kunjungan fisik |
| 11 | FAQ | `#faq` | Menangani objection + SEO |
| 12 | CTA penutup | `#kontak` | Konversi terakhir |
| 13 | Footer | — | NAP, sosial media, legal |
| — | Floating WA button | — | Konversi persisten (mobile) |

### Wireframe kasar (desktop)

```
┌──────────────────────────────────────────────────────────────┐
│ LOGO King Motor    Stok  Keunggulan  Cara Beli  Lokasi  [WA] │ sticky
├──────────────────────────────────────────────────────────────┤
│  Motor Bekas Berkualitas,                                │
│  Surat Lengkap, Harga Jujur.        [foto motor hero]    │
│  Showroom di Mojokerto.                                  │
│  [Chat WhatsApp]  [Lihat Stok]                           │
│  ✓ 500+ unit terjual  ✓ garansi mesin  ✓ bisa kredit     │
├──────────────────────────────────────────────────────────────┤
│  TRUST BAR:  8 Tahun | 500+ Unit | 4.9★ | 100% Surat     │
├──────────────────────────────────────────────────────────────┤
│  STOK MOTOR                            [Semua][Matic][...] │
│  ┌────────┐ ┌────────┐ ┌────────┐                        │
│  │ foto   │ │ foto   │ │ foto   │   ← kartu unit          │
│  │ nama   │ │ nama   │ │ nama   │                        │
│  │ harga  │ │ harga  │ │ harga  │                        │
│  └────────┘ └────────┘ └────────┘                        │
├──────────────────────────────────────────────────────────────┤
│  KENAPA KING MOTOR  (4–6 kartu keunggulan)                 │
├──────────────────────────────────────────────────────────────┤
│  CARA BELI  (1 Cek Unit → 2 Nego → 3 Bayar → 4 Serah)      │
├──────────────────────────────────────────────────────────────┤
│  KREDIT & TUKAR TAMBAH  [tabel estimasi] [CTA]             │
├──────────────────────────────────────────────────────────────┤
│  JUAL MOTOR ANDA  [form]                                   │
├──────────────────────────────────────────────────────────────┤
│  TESTIMONI  (3–6 kartu)                                    │
├──────────────────────────────────────────────────────────────┤
│  LOKASI  [maps embed]  Alamat, jam buka, WA                │
├──────────────────────────────────────────────────────────────┤
│  FAQ (accordion)                                           │
├──────────────────────────────────────────────────────────────┤
│  CTA PENUTUP: "Siap cek unitnya hari ini?" [WA]            │
├──────────────────────────────────────────────────────────────┤
│  FOOTER: logo, alamat, jam, sosmed, © , Kebijakan Privasi  │
└──────────────────────────────────────────────────────────────┘
```

---

## 8. Kebutuhan Fungsional

Prioritas memakai MoSCoW: **M** = Must, **S** = Should, **C** = Could.

### 8.1 Header & Navigasi

| ID | Requirement | Prioritas | Acceptance Criteria |
|----|-------------|-----------|---------------------|
| FR-01 | Navbar sticky dengan logo, menu anchor, dan tombol "Chat WhatsApp" | M | Tetap terlihat saat scroll; tinggi ≤ 72px; CTA tidak pernah terpotong di 360px |
| FR-02 | Mobile: menu hamburger dengan drawer | M | Buka/tutup tanpa reload; body tidak ikut scroll saat drawer terbuka |
| FR-03 | Nomor telepon/WA bisa diklik (`tel:` / `wa.me`) | M | Di mobile langsung membuka aplikasi terkait |

### 8.2 Hero

| ID | Requirement | Prioritas | Acceptance Criteria |
|----|-------------|-----------|---------------------|
| FR-04 | Headline, subheadline, 2 CTA (utama WA, sekunder "Lihat Stok") | M | Teks terbaca di atas gambar (contrast ≥ 4.5:1) |
| FR-05 | Menampilkan 3–4 poin kepercayaan singkat | M | Ikon + teks, maks. 1 baris per poin di mobile |
| FR-06 | Gambar hero unit asli, `loading="eager"`, ukuran < 200KB (WebP/AVIF) | M | LCP < 2,5s pada simulasi 4G |
| FR-07 | CTA WhatsApp membawa pesan otomatis: "Halo King Motor, saya mau tanya stok motor di Mojokerto." | M | Pesan terisi otomatis di WhatsApp |

### 8.3 Stok Motor (inti)

| ID | Requirement | Prioritas | Acceptance Criteria |
|----|-------------|-----------|---------------------|
| FR-08 | Grid kartu unit: foto, nama (merk + tipe), tahun, KM, transmisi, harga, badge status | M | Semua field wajib tampil; harga diformat `Rp 12.500.000` |
| FR-09 | Badge status: `Ready`, `Booking`, `Terjual` | M | Unit terjual tidak bisa diklik ke WA (tombol disabled + label jelas) |
| FR-10 | Filter: jenis (Matic/Bebek/Sport), rentang harga, tahun | S | Filter bekerja client-side tanpa reload; bisa dikombinasikan; ada tombol reset |
| FR-11 | Empty state saat filter tidak menghasilkan unit | S | Menampilkan pesan + CTA WA "cari unit lain" |
| FR-12 | "Lihat Semua Stok" jika unit > 6, atau tampilkan maks. 12 unit dengan tombol muat lebih banyak | S | Tidak ada layout shift saat memuat tambahan |
| FR-13 | Urutan default: unit terbaru/unggulan di atas | M | Field `featured` dan `dateAdded` di data |
| FR-14 | Kartu bisa diklik untuk membuka detail (modal di mobile, halaman `/motor/{slug}` di desktop) | C | Modal dapat ditutup via Esc/backdrop; fokus keyboard terkunci |

### 8.4 Detail Unit

| ID | Requirement | Prioritas | Acceptance Criteria |
|----|-------------|-----------|---------------------|
| FR-15 | Galeri 3–8 foto dengan thumbnail + swipe di mobile | M | Semua foto unit asli; ada alt text deskriptif |
| FR-16 | Spesifikasi: merk, tipe, tahun, warna, KM, transmisi, bahan bakar, pajak berlaku sampai, status surat | M | Data konsisten dengan sumber; tidak ada field kosong tanpa label "-" |
| FR-17 | Harga tunai + estimasi kredit (DP & angsuran) jika tersedia | M | Estimasi diberi disclaimer "simulasi, bukan penawaran resmi" |
| FR-18 | CTA "Chat WhatsApp" dengan pesan berisi nama & tahun unit | M | Format: "Halo King Motor, saya tertarik dengan {unit} {tahun} seharga {harga}. Masih ready?" |
| FR-19 | CTA "Booking / Test Ride" | S | Membuka WA dengan template berbeda |
| FR-20 | Catatan kondisi (bekas/baru, ban, servis terakhir) | S | Ditampilkan sebagai list, bukan paragraf panjang |
| FR-21 | Unit serupa (maks. 3) | C | Ditampilkan berdasarkan jenis & rentang harga |

### 8.5 Keunggulan & Kepercayaan

| ID | Requirement | Prioritas | Acceptance Criteria |
|----|-------------|-----------|---------------------|
| FR-22 | 4–6 kartu keunggulan dengan ikon | M | Konten: surat lengkap & terverifikasi, garansi mesin, bisa tukar tambah, proses cepat, harga transparan, after sales |
| FR-23 | Section "Surat & Legalitas" yang menjelaskan BPKB, STNK, pajak, cek keaslian | M | Minimal 1 paragraf + 3 bullet |
| FR-24 | Trust bar angka: tahun berdiri, unit terjual, rating, jumlah testimoni | M | Angka harus benar dan bisa dipertanggungjawabkan |
| FR-25 | Badge/logo partner leasing (jika ada) | C | Hanya tampilkan partner resmi |

### 8.6 Cara Beli & Kredit

| ID | Requirement | Prioritas | Acceptance Criteria |
|----|-------------|-----------|---------------------|
| FR-26 | 4 langkah bernomor: Cek unit → Nego & deal → Pembayaran → Serah terima surat | M | Mobile tampil vertikal, desktop horizontal |
| FR-27 | Penjelasan opsi pembayaran: tunai, kredit, tukar tambah | M | Masing-masing punya CTA WA dengan template berbeda |
| FR-28 | Tabel estimasi angsuran (contoh, statis) | S | Minimal 3 skenario DP (20%, 30%, 40%) untuk 2–3 tenor |
| FR-29 | Disclaimer jelas bahwa estimasi bukan penawaran resmi | M | Teks terlihat, bukan di tooltip tersembunyi |
| FR-30 | Kalkulator tukar tambah sederhana (input merk/tahun → "estimasi") | C | Jika tidak ada data harga, ganti dengan CTA "minta penilaian" |

### 8.7 Jual Motor Anda (form)

| ID | Requirement | Prioritas | Acceptance Criteria |
|----|-------------|-----------|---------------------|
| FR-31 | Form: nama, WhatsApp, merk, tipe, tahun, KM, transmisi, harga harapan, catatan, foto (opsional) | M | Maks. 6 field wajib; sisanya opsional |
| FR-32 | Validasi: nomor WA 10–15 digit, tahun 1990–tahun berjalan, KM numerik | M | Pesan error spesifik di bawah field, bukan alert |
| FR-33 | Submit → tersimpan + notifikasi ke pemilik (email/WA) | M | User melihat state sukses dalam < 2 detik; data tidak hilang saat error |
| FR-34 | Anti-spam: honeypot + rate limit | M | Bot sederhana tidak bisa submit berulang |
| FR-35 | Upload foto maks. 5 file, maks. 5MB/file, JPG/PNG/WebP | C | Error jelas jika melebihi batas |
| FR-36 | Link Kebijakan Privasi di dekat tombol submit | M | Terbuka di tab baru |

### 8.8 Testimoni, Lokasi, FAQ

| ID | Requirement | Prioritas | Acceptance Criteria |
|----|-------------|-----------|---------------------|
| FR-37 | 3–6 testimoni dengan nama, foto/initial, unit yang dibeli, rating | M | Hanya testimoni asli; ada izin penggunaan |
| FR-38 | Google Maps embed (lazy load) + tombol "Buka di Google Maps" | M | Peta tidak memblokir render awal; alamat sesuai Google Business Profile |
| FR-39 | Jam operasional + indikator "Buka sekarang / Tutup" | S | Dihitung dari waktu lokal WIB |
| FR-40 | FAQ accordion 6–10 pertanyaan | M | Konten menjawab objection: surat, garansi, kredit, tukar tambah, test ride, pembayaran |
| FR-41 | FAQ memakai markup `FAQPage` schema | S | Lolos validasi Rich Results Test |
| FR-42 | Floating WhatsApp button di mobile | M | Tidak menutupi CTA lain; muncul setelah scroll 300px |

### 8.9 Footer & Legal

| ID | Requirement | Prioritas | Acceptance Criteria |
|----|-------------|-----------|---------------------|
| FR-43 | NAP konsisten (Nama, Alamat, Telepon) di footer & halaman kontak | M | Sama persis dengan Google Business Profile |
| FR-44 | Link: Kebijakan Privasi, Syarat & Ketentuan, Disclaimer | M | Halaman tersedia, tidak 404 |
| FR-45 | Sosial media (IG, FB, TikTok) | S | Link valid, `target="_blank"` + `rel="noopener"` |
| FR-46 | Copyright dengan tahun dinamis | C | — |

---

## 9. Kebutuhan Non-Fungsional

| Kategori | Requirement | Target |
|----------|-------------|--------|
| Performa | Lighthouse Performance (mobile) | ≥ 90 |
| Performa | LCP / INP / CLS | < 2,5s / < 200ms / < 0,1 |
| Performa | Total halaman awal (tanpa gambar) | < 500KB |
| Responsif | Breakpoint | 360, 390, 768, 1024, 1280, 1440 |
| Responsif | Tanpa horizontal scroll di 360px | Wajib |
| Aksesibilitas | WCAG 2.1 AA: kontras, alt text, focus state, label form | Wajib |
| Aksesibilitas | Navigasi keyboard penuh (nav, modal, accordion) | Wajib |
| SEO | Meta title/description unik, H1 tunggal, sitemap.xml, robots.txt | Wajib |
| SEO | Structured data: `AutoDealer`, `Product`/`Vehicle` per unit, `FAQPage` | Wajib |
| SEO | URL unit: `/motor/honda-vario-125-2021` (slug, tanpa ID acak) | Wajib |
| Kompatibilitas | Chrome, Safari, Firefox, Edge versi 2 tahun terakhir; Android 9+ | Wajib |
| Keamanan | HTTPS, form terproteksi, tanpa menyimpan data sensitif di client | Wajib |
| Privasi | Patuh UU PDP No. 27/2022: consent, tujuan penggunaan data, hak hapus | Wajib |
| Ketersediaan | Uptime ≥ 99,5% | Wajib |
| Maintainability | Update stok tanpa deploy kode (CMS/file data) | Wajib |

---

## 10. Konten & Copywriting

### 10.1 Nada komunikasi

- Bahasa Indonesia sehari-hari, sopan, tidak lebay.
- Hindari klaim berlebihan ("termurah se-Indonesia") tanpa bukti.
- Pakai "Anda" untuk pembeli, "Bang/Mas" boleh di testimoni agar terasa lokal.
- Sebut "Mojokerto" secara natural di beberapa bagian untuk SEO lokal.

### 10.2 Copy utama (draft)

**Headline hero (pilih 1):**
1. "Motor Bekas Berkualitas di Mojokerto, Surat Lengkap, Harga Jujur."
2. "Cari Motor Bekas di Mojokerto? Cek Unitnya Langsung, Bawa Pulang Hari Ini."
3. "Showroom Motor Bekas Terpercaya di Mojokerto."

**Subheadline:**
> "Stok matic, bebek, dan sport siap pakai. Semua unit dicek mesin dan suratnya. Bisa tunai, kredit, atau tukar tambah dengan motor lama Anda."

**CTA utama:** "Chat WhatsApp Sekarang"
**CTA sekunder:** "Lihat Stok Motor"

**Poin kepercayaan hero:**
- ✓ Surat lengkap & terverifikasi
- ✓ Garansi mesin 7 hari
- ✓ Bisa kredit & tukar tambah

**CTA penutup:**
> "Stok berubah cepat. Chat dulu untuk memastikan unit favorit Anda masih tersedia."

### 10.3 Panduan foto unit (untuk pemilik)

- 6–8 foto: depan 45°, samping kiri, samping kanan, belakang, dashboard/odometer, mesin, jok, detail goresan (jika ada).
- Cahaya siang, latar bersih, tanpa filter berlebihan.
- Wajib mencantumkan foto kondisi apa adanya (termasuk lecet) → mengurangi komplain & meningkatkan kepercayaan.
- Resolusi 1200×900, format WebP, < 300KB per foto.

### 10.4 Data wajib per unit

```json
{
  "slug": "honda-vario-125-2021",
  "brand": "Honda",
  "model": "Vario 125",
  "year": 2021,
  "type": "matic",
  "color": "Hitam",
  "mileageKm": 18500,
  "priceCash": 17500000,
  "priceCreditFrom": 1500000,
  "installmentFrom": 720000,
  "taxValidUntil": "2027-03",
  "documentStatus": "Lengkap (BPKB + STNK)",
  "conditionNotes": ["Ban belakang baru", "Servis rutin di AHASS", "Lecet halus di cover kiri"],
  "warranty": "Garansi mesin 7 hari",
  "status": "ready",
  "featured": true,
  "images": ["/img/vario-2021-1.webp", "..."],
  "dateAdded": "2026-10-20"
}
```

---

## 11. Design Guidelines

| Aspek | Arahan |
|-------|--------|
| Kesan | Terpercaya, rapi, "showroom beneran", bukan toko pinggir jalan |
| Warna primer | Biru tua / navy (kepercayaan) — mis. `#0B2A4A` |
| Warna aksen | Kuning/emas (premium & "King") — mis. `#F5A623` |
| Warna sukses/WA | Hijau WA `#25D366` khusus tombol WhatsApp |
| Netral | `#FFFFFF`, `#F5F7FA`, `#1A1A1A`, `#6B7280` |
| Tipografi | Heading: Plus Jakarta Sans / Poppins; Body: Inter / system font |
| Skala | Body 16px mobile, 17–18px desktop; H1 32–40px mobile, 48–56px desktop |
| Radius | 12px kartu, 8px tombol |
| Bayangan | Halus, 1 level; hindari bayangan berat |
| Tombol | WA = hijau solid; sekunder = outline; tinggi min. 48px (touch target) |
| Ikon | Satu set konsisten (Lucide/Phosphor), stroke 1.5–2px |
| Foto | Rasio 4:3 untuk kartu unit, konsisten, tanpa background ramai |

**Prinsip:** satu aksi utama per layar (WhatsApp), CTA harus terlihat tanpa scroll di mobile.

---

## 12. Rekomendasi Teknis

| Komponen | Rekomendasi | Alasan |
|----------|-------------|--------|
| Framework | **Astro** (atau Next.js App Router) | HTML statis → cepat & SEO-friendly; cocok untuk landing + katalog |
| Styling | Tailwind CSS | Konsisten, cepat, mudah maintain |
| Data stok | JSON/Markdown + Content Collections (Astro) atau headless CMS (Sanity/Decap) | Update tanpa deploy jika pakai CMS |
| Hosting | Vercel / Netlify / Cloudflare Pages | Gratis–murah, HTTPS otomatis, CDN |
| Form | Serverless function + Resend (email) / Google Sheets + WA notif | Sederhana, tanpa backend berat |
| Gambar | `astro:assets` / `next/image` + WebP/AVIF | Optimasi otomatis |
| Analytics | GA4 + Google Search Console + Meta Pixel (opsional) | Ukur funnel & iklan |
| Maps | Google Maps Embed (lazy) | Ringan & familiar |
| Domain | `.com` atau `.id` dengan nama brand + kota | Kredibilitas & SEO |

**Alternatif no-code (jika ingin cepat & murah):** WordPress + Elementor, atau Framer/Webflow. Kelebihan: pemilik bisa edit sendiri. Kekurangan: performa & biaya bulanan.

**Keputusan yang disarankan untuk MVP:** Astro + Tailwind + data JSON, form ke Google Sheets + notifikasi WA. Estimasi 2–3 minggu.

---

## 13. Integrasi

| Integrasi | Fungsi | Prioritas |
|-----------|--------|-----------|
| WhatsApp Click-to-Chat (`wa.me`) | Konversi utama, pesan terisi otomatis per unit | M |
| Google Maps Embed | Lokasi showroom | M |
| Google Business Profile | Konsistensi NAP + ulasan | M |
| GA4 | Pageview, klik WA, submit form, filter, scroll | M |
| Google Search Console | Indexing & keyword | M |
| Meta Pixel / TikTok Pixel | Retargeting iklan (jika beriklan) | S |
| Email/WA notification | Notifikasi leads | M |
| Google Sheets | Penampung leads sederhana | S |
| Instagram feed embed | Bukti aktivitas | C |

### Format link WhatsApp

```
https://wa.me/62XXXXXXXXXX?text=Halo%20King%20Motor%2C%20saya%20tertarik%20dengan%20Honda%20Vario%20125%202021%20seharga%20Rp17.500.000.%20Masih%20ready%3F
```

Gunakan satu nomor utama. Jika ada 2 sales, gunakan rotasi atau satu nomor CS.

---

## 14. Analytics & Event Tracking

| Event | Trigger | Parameter |
|-------|---------|-----------|
| `page_view` | Halaman dimuat | `page_location` |
| `wa_click` | Klik CTA WA mana pun | `location` (hero/nav/card/detail/floating/footer), `unit_slug`, `unit_price` |
| `unit_view` | Modal/halaman detail dibuka | `unit_slug`, `unit_type`, `unit_price` |
| `filter_apply` | Filter diubah | `filter_type`, `price_range` |
| `form_start` | Field pertama difokuskan di form jual | `form_name` |
| `form_submit` | Form jual berhasil | `form_name`, `motor_brand` |
| `maps_click` | Klik buka Google Maps | `location` |
| `faq_open` | Accordion dibuka | `question` |
| `scroll_depth` | 50% & 90% | `percent` |

**Dashboard minimal:** leads WA per sumber, leads form jual, unit paling banyak dilihat, conversion rate per section.

---

## 15. SEO Lokal

### Keyword target

| Tipe | Keyword |
|------|---------|
| Primer | motor bekas mojokerto |
| Primer | showroom motor bekas mojokerto |
| Sekunder | jual beli motor bekas mojokerto |
| Sekunder | motor bekas murah mojokerto |
| Sekunder | jual motor mojokerto |
| Long-tail | motor bekas vario mojokerto |
| Long-tail | motor bekas kredit mojokerto |
| Long-tail | tukar tambah motor mojokerto |

### Meta dasar

- **Title:** `King Motor — Showroom Motor Bekas Mojokerto | Surat Lengkap, Bisa Kredit`
- **Description:** `Jual beli motor bekas berkualitas di Mojokerto. Stok matic, bebek, sport. Surat lengkap, garansi mesin, bisa kredit & tukar tambah. Chat WhatsApp sekarang.`

### Checklist

- [ ] H1 tunggal memuat "Motor Bekas Mojokerto"
- [ ] Halaman unit punya title & description unik
- [ ] `AutoDealer` schema: nama, alamat, telepon, jam buka, geo, sameAs
- [ ] `Vehicle`/`Product` schema per unit: nama, harga, kondisi, gambar
- [ ] `FAQPage` schema
- [ ] Sitemap & robots.txt
- [ ] Google Business Profile terhubung & konsisten
- [ ] Internal link dari halaman unit ke beranda & stok
- [ ] Kecepatan mobile ≥ 90 (ranking factor)

---

## 16. Legal & Kepatuhan

| Item | Kebutuhan |
|------|-----------|
| Kebijakan Privasi | Wajib — jelaskan data yang dikumpulkan (nama, WA, data motor), tujuan, retensi, hak pengguna |
| Syarat & Ketentuan | Wajib — termasuk disclaimer bahwa harga dapat berubah, unit dapat terjual lebih dulu |
| Disclaimer kredit | Wajib — estimasi angsuran bukan penawaran resmi; tunduk pada persetujuan leasing |
| Disclaimer kondisi | Wajib — unit dijual "sebagaimana adanya" dengan catatan kondisi yang sudah diinformasikan |
| Consent form | Checkbox persetujuan pemrosesan data sebelum submit |
| Izin foto/testimoni | Simpan persetujuan tertulis (WA screenshot cukup) |
| Klaim garansi | Tulis jelas cakupan & pengecualian garansi mesin 7 hari |
| Pajak & legalitas unit | Pastikan setiap unit memiliki dokumen sah; jangan menampilkan unit tanpa dokumen jelas |

> **Catatan:** dokumen ini bukan nasihat hukum. Untuk operasional skala besar, konsultasikan dengan ahli hukum.

---

## 17. Timeline & Milestone

Asumsi 1 developer + 1 desainer part-time, 2–3 minggu.

| Fase | Durasi | Deliverable |
|------|--------|-------------|
| F0 — Discovery & konfirmasi | 2 hari | Jawaban atas Open Questions, data stok awal, nomor WA, alamat |
| F1 — Desain | 4 hari | Wireframe → high-fidelity mobile & desktop, design token |
| F2 — Development | 8 hari | Semua section M, katalog + filter, form, SEO dasar |
| F3 — Konten & foto | paralel | Foto 10–15 unit, copy final, testimoni |
| F4 — QA | 2 hari | Uji 5 device, Lighthouse, form, link WA, aksesibilitas |
| F5 — Launch | 1 hari | Domain, HTTPS, Analytics, Search Console, GBP |
| F6 — Iterasi | 30 hari | Pantau event, perbaiki copy, tambah unit, A/B test CTA |

### Definition of Done

- [ ] Semua requirement prioritas **M** berfungsi
- [ ] Lighthouse mobile: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 95
- [ ] Diuji di Android Chrome, iOS Safari, desktop Chrome
- [ ] Tidak ada link rusak / 404
- [ ] Semua CTA WA terkirim dengan template benar (diuji di device nyata)
- [ ] Form jual tersimpan & notifikasi diterima
- [ ] Analytics event terverifikasi di GA4 DebugView
- [ ] Legal pages live
- [ ] Pemilik bisa update stok sendiri (dokumentasi 1 halaman)

---

## 18. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|--------|--------|----------|
| Stok tidak di-update | Leads bertanya unit terjual, kepercayaan turun | CMS mudah + jadwal update harian + badge status jelas |
| Foto unit buruk | Konversi rendah | Panduan foto + checklist + contoh |
| Nomor WA tidak responsif | Leads hilang | SLA balas < 15 menit di jam kerja; auto-reply di luar jam |
| Klaim garansi disalahgunakan | Biaya & sengketa | Syarat garansi tertulis & dicatat saat serah terima |
| Harga tidak kompetitif | Bounce tinggi | Riset harga pasar bulanan; tampilkan value (garansi, surat) |
| Traffic awal sepi | Tidak ada leads | Kombinasi SEO lokal + konten IG/TikTok + iklan Meta kecil + WA broadcast |
| Form spam | Data kotor | Honeypot, rate limit, validasi server-side |
| Ketergantungan 1 orang | Website stagnan | Dokumentasi + akses CMS untuk pemilik |

---

## 19. Open Questions (perlu jawaban sebelum F1)

1. **Nama legal & alamat lengkap** showroom? (untuk NAP, Maps, footer)
2. **Nomor WhatsApp** utama dan apakah sudah WhatsApp Business?
3. **Jam operasional** per hari, termasuk Minggu/libur?
4. **Berapa unit** yang siap difoto dan dijual saat launch?
5. **Skema pembayaran:** tunai saja, kredit via leasing mana, tukar tambah diterima?
6. **Garansi:** benar ada garansi mesin? Berapa lama dan apa cakupannya?
7. **Range harga** stok (Rp … – Rp …) untuk filter?
8. **Angka kredibilitas:** tahun berdiri, total unit terjual, rating Google — boleh ditampilkan?
9. **Domain:** sudah punya? Preferensi `kingmotor.id`, `kingmotor-mojokerto.com`, dll.?
10. **Bahasa & brand:** apakah ada logo, warna brand, dan foto showroom existing?
11. **Leads penjual** ingin masuk ke WA, email, atau spreadsheet? Siapa PIC?
12. **Iklan:** akan beriklan Meta/Google sejak awal atau organik dulu?

---

## 20. Lampiran

### 20.1 Struktur URL

```
/                          → landing page
/motor/[slug]              → detail unit
/stok                      → semua stok (opsional, fase 2)
/jual-motor                → halaman form penjual (opsional, fase 2)
/kebijakan-privasi
/syarat-ketentuan
```

### 20.2 Template pesan WhatsApp

| Konteks | Template |
|---------|----------|
| Hero / umum | "Halo King Motor, saya mau tanya stok motor di Mojokerto." |
| Kartu unit | "Halo King Motor, saya tertarik dengan {unit} {tahun} seharga {harga}. Masih ready?" |
| Kredit | "Halo King Motor, saya mau tanya simulasi kredit untuk {unit}. DP saya sekitar {dp}." |
| Tukar tambah | "Halo King Motor, saya mau tukar tambah {motor_lama} {tahun} dengan unit di showroom." |
| Jual motor | "Halo King Motor, saya mau jual motor {unit} {tahun}. Bisa minta penilaian?" |
| Test ride | "Halo King Motor, saya mau booking test ride {unit}. Kapan bisa datang?" |

### 20.3 Checklist konten sebelum launch

- [ ] 10–15 unit dengan 6–8 foto masing-masing
- [ ] Harga & status valid
- [ ] 4–6 testimoni dengan izin
- [ ] 8 FAQ final
- [ ] Alamat, jam buka, Maps valid
- [ ] Nomor WA diuji
- [ ] Logo & favicon
- [ ] Legal pages
- [ ] Foto hero / suasana showroom

### 20.4 Istilah

| Istilah | Arti |
|---------|------|
| Leads | Calon pembeli/penjual yang meninggalkan kontak |
| CTA | Call to Action, tombol aksi |
| NAP | Name, Address, Phone — konsistensi data bisnis lokal |
| LCP | Largest Contentful Paint, metrik kecepatan muat |
| Tukar tambah | Menukar motor lama + sejumlah uang untuk unit baru |

---

**Akhir dokumen — PRD v1.0**
Dokumen ini adalah draft. Bagian bertanda asumsi perlu dikonfirmasi pemilik sebelum masuk desain.
