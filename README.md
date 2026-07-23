# SafeDep 🛡️

**SafeDep** adalah CLI sederhana berbasis Node.js dan TypeScript untuk membandingkan dependency dari dua file `package.json` dan memberi tahu dependency yang **ditambahkan**, **dihapus**, atau **diperbarui**.

---

## 📁 Struktur Project

```text
safedep/
├── src/
│   ├── compare.ts      # Logika utama perbandingan package.json
│   ├── types.ts        # Definisi interface dan TypeScript types
│   └── index.ts        # Entry point aplikasi CLI
├── tests/
│   └── compare.test.ts # Unit test menggunakan Vitest
├── examples/
│   ├── package-old.json # Contoh file package.json versi lama
│   └── package-new.json # Contoh file package.json versi baru
├── package.json        # Konfigurasi project & dependensi npm
├── tsconfig.json       # Konfigurasi kompilator TypeScript
└── README.md           # Dokumentasi petunjuk penggunaan
```

---

## 🛠️ Cara Menginstal Dependensi

Jalankan perintah berikut di terminal:

```bash
npm install
```

---

## 🧪 Cara Menjalankan Unit Test

Aplikasi ini menggunakan **Vitest** untuk pengujian otomatis:

```bash
npm test
```

---

## 🚀 Cara Menjalankan Aplikasi

Kamu dapat menjalankan aplikasi dengan perintah `npm start` diikuti oleh lokasi dua file `package.json` yang ingin dibandingkan:

```bash
npm start -- ./examples/package-old.json ./examples/package-new.json
```

Atau menggunakan `npx tsx`:

```bash
npx tsx src/index.ts ./examples/package-old.json ./examples/package-new.json
```

---

## 📄 Penjelasan Singkat File Project

1. **`src/types.ts`**: Menyimpan tipe data TypeScript (interface) agar struktur data perubahan dependency dan package.json konsisten.
2. **`src/compare.ts`**: Berisi fungsi pemroses data seperti membaca file JSON, membandingkan `dependencies` & `devDependencies`, serta penanganan error jika file hilang atau JSON tidak valid.
3. **`src/index.ts`**: Menangani argumen dari terminal CLI, memanggil fungsi perbandingan, dan menampilkan hasil perbandingan ke layar.
4. **`tests/compare.test.ts`**: Pengujian otomatis untuk memastikan semua logika pembandingan dan penanganan error berjalan sesuai kriteria.
5. **`examples/package-old.json` & `package-new.json`**: File contoh untuk mencoba aplikasi langsung.
