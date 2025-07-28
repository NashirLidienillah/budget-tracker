# Proyek Capstone: Aplikasi Budget Tracker

Aplikasi web CRUD (Create, Read, Update, Delete) sederhana yang dibuat untuk melacak pemasukan dan pengeluaran pribadi. Proyek ini dikembangkan sebagai bagian dari Capstone Project HACKTIV8.

**Link Deployment:** [MASUKKAN LINK DEPLOYMENT ANDA DI SINI]

## 📜 Deskripsi

Budget Tracker adalah aplikasi yang memungkinkan pengguna untuk mencatat transaksi keuangan mereka, baik pemasukan maupun pengeluaran. Aplikasi ini menyediakan ringkasan saldo, daftar riwayat transaksi yang detail, serta analisis pengeluaran berbasis kategori dalam bentuk grafik.

## ✨ Fitur Utama

- **Manajemen Transaksi (CRUD):** Pengguna dapat menambah, melihat, mengedit, dan menghapus catatan transaksi.
- **Pemisahan Pemasukan & Pengeluaran:** Form input yang intuitif dengan sistem tab untuk membedakan jenis transaksi.
- **Kategorisasi:** Setiap transaksi dapat diberi kategori (misalnya: Gaji, Makanan, Transportasi) untuk analisis yang lebih baik.
- **Penyimpanan Lokal:** Data disimpan di `localStorage` browser, sehingga tidak hilang saat halaman ditutup.
- **Halaman Riwayat Terpisah:** Daftar transaksi lengkap ditampilkan di halaman terpisah untuk menjaga kebersihan antarmuka.
- **Visualisasi Data:** Grafik lingkaran (doughnut chart) di halaman riwayat untuk menganalisis persentase pengeluaran per kategori.
- **Filter & Pencarian:** Pengguna dapat mencari transaksi berdasarkan deskripsi dan memfilter berdasarkan kategori.
- **Desain Responsif:** Tampilan aplikasi dapat menyesuaikan diri dengan berbagai ukuran layar, mulai dari ponsel hingga desktop.

## 💻 Teknologi yang Digunakan

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Tailwind CSS:** Untuk styling dan desain responsif.
- **Chart.js:** Library untuk membuat grafik analisis.

## 🚀 Cara Menjalankan Proyek

1.  Clone repositori ini:
    ```bash
    git clone [https://github.com/NAMA_USER_ANDA/budget-tracker-app.git](https://github.com/NAMA_USER_ANDA/budget-tracker-app.git)
    ```
2.  Masuk ke direktori proyek:
    ```bash
    cd budget-tracker-app
    ```
3.  Buka file `index.html` di browser pilihan Anda.

## 🤖 Penjelasan Dukungan AI

Dalam pengembangan proyek ini, AI (model bahasa Gemini) digunakan sebagai asisten pemrograman (*pair programmer*) untuk beberapa tujuan:
- **Scaffolding & Ideasi:** AI membantu memberikan struktur awal kode HTML, CSS, dan JavaScript, serta menyarankan ide-ide fitur tambahan seperti visualisasi data dan filter.
- **Debugging & Refactoring:** AI membantu mengidentifikasi dan memperbaiki bug, seperti masalah pada fungsi edit dan logika kategori yang kosong. Selain itu, AI juga membantu merapikan kode (refactoring) agar lebih bersih dan mudah dibaca.
- **Implementasi Fitur Kompleks:** AI memberikan contoh dan panduan untuk mengimplementasikan fitur-fitur baru, seperti integrasi library Chart.js dan pembuatan sistem filter yang dinamis.
- **Dokumentasi:** AI membantu membuat template untuk file `README.md` ini.

Penggunaan AI secara signifikan mempercepat proses pengembangan dan memungkinkan eksplorasi fitur yang lebih canggih dalam waktu yang terbatas.

---

### Tampilan Aplikasi

![Tampilan Halaman Utama](https://github.com/NashirLidienillah/budget-tracker/blob/main/dashboard.png)
*Tampilan Halaman Dashboard*

![Tampilan Halaman Riwayat](https://github.com/NashirLidienillah/budget-tracker/blob/main/history.png)
*Tampilan Halaman Riwayat dengan Grafik dan Filter*
