// KKN Rantak Pasisia - Core Logic & Storage (Vanilla JS)

// 1. DATA DEFAULT & STORAGE
const STORAGE_KEYS = {
  SETTINGS: "kkn_settings",
  LINKS: "kkn_links",
  SCHEDULES: "kkn_schedules",
  LETTERS: "kkn_letters",
  EMAIL_LOGS: "kkn_email_logs"
};

const DEFAULT_SETTINGS = {
  kkn_group_name: "KKN Rantak Pasisia",
  kkn_village: "Mandeh Kabupaten, Pesisir Selatan, Sumatra Barat",
  kkn_period: "Periode II Juli - Agustus 2027",
  kkn_university: "Universitas Negeri / LPPM",
  kkn_year: "2027",
  kkn_dpl_name: "Dr. Budi Santoso, M.Pd.",
  kkn_leader_name: "Rizky Firmansyah",
  kkn_secretary_name: "Annisa Rahmawati"
};

const TEAM_MEMBERS = [
  { name: "Hifzhan Azzam Naufal", study: "Manajemen 2024", role: "KORMANIT", tone: "bg-[#124b68]" },
  { name: "Rahma Khoirun Nisa", study: "Akuntansi 2024", role: "BENDAHARA", tone: "bg-emerald-700" },
  { name: "Fara Rona Azzahra", study: "Pembangunan Wilayah 2024", role: "SEKRETARIS", tone: "bg-amber-600" },
  { name: "Ravi Yoanda Putra", study: "Manajemen 2024", role: "KORMASIT", tone: "bg-indigo-700" },
  { name: "Gilang Rizki Anggara", study: "TPPAB 2024", role: "KORMASIT", tone: "bg-indigo-700" },
  { name: "Syahiela Anisa Fitri", study: "Proteksi Tanaman 2024", role: "KORMATER AGRO", tone: "bg-lime-700" },
  { name: "Alifia Yunika Khoirunnisa", study: "Keperawatan 2024", role: "KORMATER MEDIKA", tone: "bg-rose-700" },
  { name: "M. Fayyadh Muslih", study: "TRI 2024", role: "KORMATER SAINTEK", tone: "bg-cyan-700" },
  { name: "Farid Ali Fitriansyah", study: "BPW 2024", role: "KORMATER SOSHUM", tone: "bg-violet-700" }
];
const TEAM_PHOTOS_KEY = "kkn_team_photos";
const TEAM_ROLE_DESCRIPTIONS = {
  KORMANIT: "Koordinator Mahasiswa Tingkat Unit yang mengoordinasikan kegiatan dan jalannya organisasi mahasiswa di tingkat unit KKN.",
  KORMASIT: "Koordinator Mahasiswa Tingkat Subunit yang membantu mengatur koordinasi anggota dan pelaksanaan kegiatan di tingkat subunit atau posko.",
  KORMATER: "Koordinator Materi yang mengoordinasikan materi, program kerja, dan kebutuhan bidang pengabdian sesuai fokus keilmuan tim."
};

const DEFAULT_LINKS = [
  {
    id: 1,
    title: "Google Drive Arsip & Foto Dokumentasi",
    url: "https://drive.google.com",
    category: "Drive & Dokumen",
    description: "Folder cloud untuk upload foto kegiatan, video materi, dan modul warga",
    is_pinned: 1
  },
  {
    id: 2,
    title: "SIM KKN / Portal Logbook LPPM",
    url: "https://sim-kkn.kampus.ac.id",
    category: "Kampus & LPPM",
    description: "Website pengisian absensi harian dan logbook kegiatan wajib setiap mahasiswa",
    is_pinned: 1
  },
  {
    id: 3,
    title: "Google Form Presensi Kegiatan Warga",
    url: "https://forms.google.com",
    category: "Form & Presensi",
    description: "Daftar hadir digital untuk lokakarya, posyandu, dan sosialisasi desa",
    is_pinned: 0
  },
  {
    id: 4,
    title: "Kontak WhatsApp Kepala Desa & Bidan Desa",
    url: "https://wa.me/",
    category: "Kontak Desa",
    description: "Nomor darurat dan koordinasi cepat aparat pemerintahan desa & poskesdes",
    is_pinned: 1
  }
];

const DEFAULT_SCHEDULES = [
  {
    id: 1,
    title: "Lokakarya Awal & Silaturahmi Perangkat Desa",
    date: "2026-11-25",
    time: "09:00 - 12:00",
    category: "Proker",
    priority: "Tinggi",
    status: "Belum Dimulai",
    location: "Balai Pertemuan Desa",
    description: "Pemaparan rencana 5 program kerja unggulan KKN kepada Kepala Desa & Tokoh Masyarakat"
  },
  {
    id: 2,
    title: "Deadline Upload Logbook Mingguan LPPM",
    date: "2026-11-29",
    time: "23:59",
    category: "Deadline LPPM",
    priority: "Tinggi",
    status: "Belum Dimulai",
    location: "Portal Kampus",
    description: "Wajib submit laporan mingguan minggu ke-1 beserta 3 foto kegiatan"
  },
  {
    id: 3,
    title: "Penyuluhan Kesehatan & Cek Tensi Posyandu Lansia",
    date: "2026-12-02",
    time: "08:30 - 11:30",
    category: "Proker",
    priority: "Sedang",
    status: "Belum Dimulai",
    location: "Posyandu RW 03",
    description: "Kolaborasi bersama Bidan Desa dan kader posyandu setempat"
  },
  {
    id: 4,
    title: "Piket Harian Posko & Belanja Konsumsi",
    date: "2026-11-23",
    time: "06:30",
    category: "Piket",
    priority: "Rendah",
    status: "Sedang Berjalan",
    location: "Posko KKN",
    description: "Tim Piket: Divisi Konsumsi & Logistik"
  }
];

const LETTER_CATEGORIES = {
  "permohonan": "📋 Surat Permohonan",
  "bantuan": "💰 Surat Bantuan",
  "undangan": "✉️ Surat Undangan",
  "sponsor-mitra": "🤝 Surat Sponsor & Mitra",
  "klaim-presensi": "⏱️ Surat Klaim Presensi",
  "internal-eksternal": "🏢 Surat Internal & Eksternal"
};

const LETTER_TEMPLATES = [
  {
    "id": "izin-bappedalitbang",
    "category": "permohonan",
    "name": "Surat Permohonan Izin KKN - BAPPEDALITBANG",
    "showEvent": false,
    "defaultAttachment": "1 Lembar",
    "defaultNumber": "001/MENOREHMANDEH/KKN/I/2026",
    "regarding": "Permohonan Izin KKN",
    "defaultRecipientName": "Kepala Badan Perencanaan Daerah Penelitian dan Pengembangan",
    "defaultRecipientTitle": "Kabupaten Pesisir Selatan",
    "openingText": "Sehubungan dengan akan dilaksanakannya Kuliah Kerja Nyata - Pembelajaran Pemberdayaan Masyarakat Universitas Gadjah Mada (KKN-PPM UGM) Periode II Tahun 2026. Kami selaku tim pengusul KKN-PPM UGM Pesisir Selatan meminta izin kepada BAPPEDALITBANG Kabupaten Pesisir Selatan supaya kami dapat melaksanakan KKN-PPM UGM Periode II Tahun 2026 di Nagari Mandeh dan Nagari Sungai Nyalo, Kecamatan Koto XI Tarusan, Kabupaten Pesisir Selatan, Sumatera Barat, pada tanggal 20 Juni - 8 Agustus 2026.\n\nAdapun tema yang akan kami bawa dalam kegiatan KKN-PPM UGM Pesisir Selatan Periode II Tahun 2026 ini, yaitu \"Optimalisasi Potensi Lokal dan Digitalisasi dalam Mendukung Penguatan Pariwisata dan Ekonomi Agro-Marine Berbasis Community Empowerment dengan Dukungan Inovasi Energi Terbarukan di Nagari Mandeh dan Nagari Sungai Nyalo, Kecamatan Koto XI Tarusan, Kabupaten Pesisir Selatan, Sumatera Barat\".",
    "closingText": "Demikian surat permohonan ini kami sampaikan. Apabila terdapat hal teknis yang perlu dibicarakan lebih lanjut, Bapak/Ibu dapat menghubungi narahubung kami melalui nomor 0895710987500 (Muhammad Raja Alfaridzi). Atas perhatian dan kerja samanya, kami ucapkan terima kasih.",
    "defaultEventName": "Pelaksanaan Kuliah Kerja Nyata (KKN)",
    "defaultEventDate": "{periode}",
    "defaultEventTime": "Sesuai jadwal pelaksanaan KKN",
    "defaultEventLocation": "Wilayah {desa}"
  },
  {
    "id": "izin-tempat",
    "category": "permohonan",
    "name": "Surat Permohonan Izin Tempat / Peminjaman Balai",
    "showEvent": true,
    "defaultAttachment": "-",
    "defaultNumber": "014/MENOREHMANDEH/KKN/VII/2026",
    "regarding": "Permohonan Izin Penggunaan Fasilitas / Balai Warga",
    "defaultRecipientName": "Pengelola Gedung / Tokoh Masyarakat Setempat",
    "defaultRecipientTitle": "Nagari Sungai Nyalo & Mandeh",
    "openingText": "Dalam rangka merealisasikan program kerja pengabdian mahasiswa Kuliah Kerja Nyata (KKN), kami bermaksud memohon izin untuk menggunakan fasilitas tempat guna mendukung kelancaran kegiatan yang akan kami laksanakan pada:",
    "closingText": "Kami berkomitmen untuk menjaga ketertiban, kebersihan, dan fasilitas yang digunakan sebaik-baiknya. Demikian surat permohonan izin ini kami sampaikan, atas izin dan bantuan yang diberikan kami ucapkan terima kasih yang sebesar-besarnya.",
    "defaultEventName": "Penggunaan Fasilitas Balai Pertemuan untuk Sosialisasi KKN",
    "defaultEventDate": "Juli 2026",
    "defaultEventTime": "09.00 WIB s/d Selesai",
    "defaultEventLocation": "Aula Pertemuan Balai Nagari"
  },
  {
    "id": "narasumber",
    "category": "permohonan",
    "name": "Surat Permohonan Pemateri / Narasumber Penyuluhan",
    "showEvent": true,
    "defaultAttachment": "1 Lembar Term of Reference (TOR)",
    "defaultNumber": "025/MENOREHMANDEH/KKN/VII/2026",
    "regarding": "Permohonan Kesediaan Menjadi Narasumber / Pemateri",
    "defaultRecipientName": "Bapak/Ibu Pemateri / Praktisi Ahli",
    "defaultRecipientTitle": "Instansi / Lembaga Terkait",
    "openingText": "Dalam rangka meningkatkan wawasan serta pemberdayaan masyarakat desa melalui program kerja Kuliah Kerja Nyata (KKN), dengan hormat kami memohon kesediaan Bapak/Ibu untuk berkenan menjadi narasumber/pemateri pada kegiatan edukatif yang akan diselenggarakan pada:",
    "closingText": "Besar harapan kami agar Bapak/Ibu dapat berkenan meluangkan waktu serta berbagi ilmu yang sangat bermanfaat bagi warga masyarakat. Atas kesediaan dan kerjasamanya, kami sampaikan terima kasih.",
    "defaultEventName": "Pelatihan dan Edukasi Ketahanan Pangan serta Inovasi Olahan Pesisir",
    "defaultEventDate": "Juli 2026",
    "defaultEventTime": "08.30 WIB s/d Selesai",
    "defaultEventLocation": "Kantor Nagari / Balai Pertemuan Warga"
  },
  {
    "id": "bantuan-dana-landmark",
    "category": "bantuan",
    "name": "Surat Permohonan Bantuan Dana Pembangunan Landmark",
    "showEvent": false,
    "defaultAttachment": "1 Berkas Proposal Pembangunan",
    "defaultNumber": "160/MENOREHMANDEH/KKN/VII/2026",
    "regarding": "Permohonan Bantuan Dana Pembangunan Landmark Pantai Paku",
    "defaultRecipientName": "Bapak/Ibu Pimpinan PT Perusahaan Gas Negara Tbk",
    "defaultRecipientTitle": "PT Perusahaan Gas Negara Tbk",
    "openingText": "Sehubungan dengan pelaksanaan Kuliah Kerja Nyata - Pembelajaran Pemberdayaan Masyarakat Universitas Gadjah Mada (KKN-PPM UGM) Periode II Tahun 2026, kami dari Tim KKN-PPM UGM Unit Menoreh Mandeh sedang melaksanakan program kerja yang berfokus pada pengembangan wilayah, pelestarian lingkungan, dan pariwisata. Tema besar yang kami usung adalah \"Optimalisasi Potensi Lokal dan Digitalisasi dalam Mendukung Penguatan Pariwisata dan Ekonomi Agro-Marine Berbasis Community Empowerment dengan Dukungan Inovasi Energi Terbarukan di Nagari Mandeh dan Nagari Sungai Nyalo, Kecamatan Koto XI Tarusan, Kabupaten Pesisir Selatan, Sumatera Barat\".\n\nSebagai wujud nyata dari tema tersebut sekaligus melanjutkan keberlanjutan program pengembangan kawasan yang telah diinisiasi oleh tim KKN-PPM UGM Periode II Tahun 2026, kami bermaksud untuk menyelenggarakan program pembangunan infrastruktur pariwisata berupa Pembangunan Landmark Pantai Paku yang bertempat di kawasan Nagari Sungai Nyalo, Kecamatan Koto XI Tarusan, Kabupaten Pesisir Selatan.\n\nDemi kelancaran dan keberhasilan pelaksanaan program tersebut, kami mengajukan permohonan bantuan dana guna mendukung pembiayaan logistik operasional, pengadaan material bangunan, serta pelaksanaan teknis di lapangan. Mengingat komitmen PT Perusahaan Gas Negara Tbk dalam mendukung pembangunan daerah dan pemberdayaan masyarakat, kami sangat mengharapkan dukungan dan sinergi ini agar pembangunan landmark dapat berjalan secara optimal.",
    "closingText": "Demikian surat permohonan ini kami sampaikan. Untuk informasi lebih lanjut mengenai detail rencana pembangunan dan kemitraan, dapat menghubungi narahubung kami melalui WhatsApp +62 821-1411-1297 (Athan). Atas perhatian, kerja sama, dan dukungan yang Bapak/Ibu berikan, kami mengucapkan terima kasih.",
    "defaultEventName": "Pembangunan Landmark Pantai Paku Nagari Sungai Nyalo",
    "defaultEventDate": "Juli - Agustus 2026",
    "defaultEventTime": "Tahap Pembangunan Fisik",
    "defaultEventLocation": "Pantai Paku, Nagari Sungai Nyalo"
  },
  {
    "id": "bantuan-fasilitas",
    "category": "bantuan",
    "name": "Surat Permohonan Bantuan Sarana & Fasilitas Kegiatan",
    "showEvent": false,
    "defaultAttachment": "1 Lembar Daftar Sarana & Logistik",
    "defaultNumber": "042/MENOREHMANDEH/KKN/VII/2026",
    "regarding": "Permohonan Bantuan Sarana Kebersihan & Fasilitas Pesisir",
    "defaultRecipientName": "Kepala Dinas Lingkungan Hidup / Instansi Terkait",
    "defaultRecipientTitle": "Pemerintah Kabupaten Pesisir Selatan",
    "openingText": "Dalam rangka mendukung optimalisasi kebersihan pesisir, konservasi ekosistem mangrove, dan pengelolaan sampah terpadu di kawasan wisata Mandeh dan Sungai Nyalo, kami mahasiswa KKN-PPM Universitas Gadjah Mada bermaksud mengajukan permohonan bantuan sarana kebersihan dan fasilitas pendukung berupa tempat sampah pilah terpadu, bibit mangrove, serta papan edukasi lingkungan.\n\nBantuan sarana tersebut akan kami distribusikan langsung ke titik-titik kumpul masyarakat serta kawasan dermaga dan pantai wisata guna membangun kesadaran lingkungan yang berkelanjutan.",
    "closingText": "Besar harapan kami permohonan bantuan ini dapat disetujui demi kemajuan dan kelestarian ekosistem pesisir bersama. Demikian surat permohonan ini kami sampaikan, atas perhatian dan bantuan yang diberikan kami ucapkan terima kasih.",
    "defaultEventName": "Aksi Bersih Pantai & Konservasi Bahari",
    "defaultEventDate": "Juli - Agustus 2026",
    "defaultEventTime": "Sesuai Jadwal Penyaluran",
    "defaultEventLocation": "Kawasan Wisata Mandeh & Sungai Nyalo"
  },
  {
    "id": "undangan-festival-nyalo",
    "category": "undangan",
    "name": "Surat Undangan Festival Nyalo 2026 (Puncak Acara)",
    "showEvent": true,
    "defaultAttachment": "1 Lembar Susunan Acara",
    "defaultNumber": "184/MENOREHMANDEH/KKN/VII/2026",
    "regarding": "Undangan Festival Nyalo 2026",
    "defaultRecipientName": "Kagama Pesisir Selatan / Tokoh Masyarakat",
    "defaultRecipientTitle": "di Tempat",
    "openingText": "Assalamu'alaikum Warahmatullahi Wabarakatuh,\nDengan Hormat,\nSehubungan dengan pelaksanaan rangkaian Kuliah Kerja Nyata - Pembelajaran Pemberdayaan Masyarakat Universitas Gadjah Mada (KKN-PPM UGM) Periode II Tahun 2026 di Nagari Mandeh dan Nagari Sungai Nyalo, Kecamatan Koto XI Tarusan, Kabupaten Pesisir Selatan, Sumatera Barat, Tim KKN-PPM UGM Menoreh Mandeh 2026 bersama masyarakat setempat akan menyelenggarakan Festival Nyalo 2026. Festival ini merupakan puncak program kerja kami sekaligus etalase hasil Teknologi Tepat Guna (TTG), pengelolaan lingkungan, transformasi digital, dan pemberdayaan UMKM pesisir yang dikembangkan bersama masyarakat.\n\nBerkaitan dengan hal tersebut, dengan hormat kami mengundang Bapak untuk berkenan hadir pada Festival Nyalo 2026 yang mengangkat tema “Ranah Minang, Rumah Basamo: Muda Melestarikan Budaya, Tua Mewariskan Nilai”. Kegiatan ini akan dilaksanakan pada:",
    "closingText": "Kehadiran Bapak beserta jajaran sangat kami harapkan sebagai bentuk dukungan dan apresiasi untuk memeriahkan festival ini.\n\nDemikian undangan ini kami sampaikan. Untuk informasi lebih lanjut dapat menghubungi narahubung kami melalui WhatsApp +62 877‑3311‑2328 (Elfrida). Atas perhatian dan dukungan Bapak, kami ucapkan terima kasih.\nWassalamu'alaikum Warahmatullahi Wabarakatuh.",
    "defaultEventName": "Festival Nyalo 2026: Pameran TTG, Budaya & UMKM Pesisir",
    "defaultEventDate": "Sabtu, 1 Agustus 2026",
    "defaultEventTime": "15.00 WIB s.d. selesai",
    "defaultEventLocation": "Pantai Paku, Nagari Sungai Nyalo, Kecamatan Koto XI Tarusan, Kabupaten Pesisir Selatan, Sumatera Barat"
  },
  {
    "id": "undangan-sosialisasi-nagari",
    "category": "undangan",
    "name": "Surat Undangan Sosialisasi Pertanian Modern ke Wali Nagari",
    "showEvent": true,
    "defaultAttachment": "-",
    "defaultNumber": "112/MENOREHMANDEH/KKN/VII/2026",
    "regarding": "Undangan Kegiatan Sosialisasi Pertanian Modern",
    "defaultRecipientName": "Wali Nagari Mandeh beserta Perangkat Nagari",
    "defaultRecipientTitle": "di Tempat",
    "openingText": "Dengan hormat,\nSehubungan dengan pelaksanaan rangkaian Kuliah Kerja Nyata - Pembelajaran Pemberdayaan Masyarakat Universitas Gadjah Mada (KKN-PPM UGM) Periode II Tahun 2026 di Nagari Mandeh dan Nagari Sungai Nyalo, Kecamatan Koto XI Tarusan, Kabupaten Pesisir Selatan, kami berkomitmen untuk mendukung peningkatan kapasitas masyarakat, khususnya dalam sektor ketahanan pangan dan pengelolaan lahan.\n\nBerkaitan dengan hal tersebut, kami bermaksud mengundang Bapak/Ibu beserta seluruh perangkat Nagari Mandeh untuk dapat hadir dalam Kegiatan Sosialisasi Pertanian Modern dan Berkelanjutan. Kegiatan ini akan dilaksanakan pada:",
    "closingText": "Mengingat pentingnya materi yang akan disampaikan demi kemajuan dan efisiensi sektor pertanian di Nagari Mandeh, kehadiran Bapak/Ibu sangat kami harapkan.\n\nDemikian surat permohonan ini kami sampaikan. Untuk informasi lebih lanjut dapat menghubungi narahubung kami melalui WhatsApp +62 859-2902-7160 (Jundan). Atas perhatian dan dukungan Bapak/Ibu, kami ucapkan terima kasih.",
    "defaultEventName": "Kegiatan Sosialisasi Pertanian Modern dan Berkelanjutan",
    "defaultEventDate": "Kamis, 23 Juli 2026",
    "defaultEventTime": "08.00 WIB s.d. selesai",
    "defaultEventLocation": "Kantor Wali Nagari Mandeh, Kecamatan Koto XI Tarusan, Kabupaten Pesisir Selatan, Sumatera Barat"
  },
  {
    "id": "undangan-lokakarya",
    "category": "undangan",
    "name": "Surat Undangan Lokakarya Awal / Rapat Koordinasi Desa",
    "showEvent": true,
    "defaultAttachment": "1 Lembar Matriks Program Kerja",
    "defaultNumber": "005/MENOREHMANDEH/KKN/VII/2026",
    "regarding": "Undangan Lokakarya Awal Program Kerja KKN",
    "defaultRecipientName": "Bapak Wali Nagari / Kepala Desa",
    "defaultRecipientTitle": "Kantor Balai Pertemuan Nagari",
    "openingText": "Sehubungan dengan telah tibanya mahasiswa Kuliah Kerja Nyata - Pembelajaran Pemberdayaan Masyarakat (KKN-PPM) di wilayah Nagari Mandeh dan Nagari Sungai Nyalo, kami bermaksud mengundang Bapak/Ibu seluruh jajaran perangkat nagari, Bamus, kepala jorong, dan tokoh masyarakat untuk dapat hadir dalam kegiatan Lokakarya Awal guna pemaparan dan koordinasi program kerja kemasyarakatan, yang insya Allah akan dilaksanakan pada:",
    "closingText": "Mengingat pentingnya acara ini demi kelancaran sinergi program pengabdian bersama masyarakat, kami sangat mengharapkan kehadiran Bapak/Ibu tepat pada waktunya. Atas perhatian dan kerjasamanya, kami haturkan terima kasih.",
    "defaultEventName": "Lokakarya Awal & Silaturahmi Tim KKN dengan Perangkat Desa",
    "defaultEventDate": "Juli 2026",
    "defaultEventTime": "09.00 WIB s/d Selesai",
    "defaultEventLocation": "Aula Pertemuan Balai Nagari"
  },
  {
    "id": "sponsor-resort",
    "category": "sponsor-mitra",
    "name": "Surat Permohonan Pengajuan Dana & Sponsor (Kulik Kayu Resort)",
    "showEvent": true,
    "defaultAttachment": "1 Bundel Proposal Pengajuan Dana",
    "defaultNumber": "161/MENOREHMANDEH/KKN/VII/2026",
    "regarding": "Permohonan Pengajuan Dana",
    "defaultRecipientName": "Bapak Edi (Pemilik Kulik Kayu Resort)",
    "defaultRecipientTitle": "Kulik Kayu Resort",
    "openingText": "Dengan hormat,\nSehubungan dengan pelaksanaan program Kuliah Kerja Nyata – Pembelajaran Pemberdayaan Masyarakat (KKN-PPM) Universitas Gadjah Mada Periode II Tahun 2026 dengan tema \"Optimalisasi Potensi Lokal dan Digitalisasi dalam Mendukung Penguatan Pariwisata dan Ekonomi Agromarine Berbasis Community Empowerment\", kami akan menyelenggarakan acara puncak berupa Festival Nyalo - Menoreh Mandeh 2026 yang akan dilaksanakan pada:\n\nFestival Nyalo - Menoreh Mandeh 2026 merupakan wadah promosi potensi wisata, budaya, serta produk unggulan masyarakat yang menampilkan hasil program pemberdayaan dan inovasi Tim KKN-PPM UGM Menoreh Mandeh 2026 bersama masyarakat Nagari Mandeh dan Nagari Sungai Nyalo.\n\nMelalui surat ini, kami bermaksud mengajukan permohonan dukungan dan kerja sama kepada Kulik Kayu Resort sebagai mitra kegiatan. Besar harapan kami Kulik Kayu Resort dapat berpartisipasi dalam menyukseskan Festival Nyalo 2026. Sebagai bentuk apresiasi, kami akan memberikan publikasi dan eksposur kepada mitra sesuai dengan bentuk dukungan yang diberikan sebagaimana tercantum dalam proposal terlampir.",
    "closingText": "Demikian surat permohonan ini kami sampaikan. Untuk informasi lebih lanjut, dapat menghubungi narahubung kami melalui WhatsApp +62 813-1738-5442 (Adena). Atas perhatian, dukungan, dan kerja sama yang diberikan, kami mengucapkan terima kasih.",
    "defaultEventName": "Festival Nyalo - Menoreh Mandeh 2026",
    "defaultEventDate": "Sabtu, 1 Agustus 2026",
    "defaultEventTime": "07.00 – 22.00 WIB",
    "defaultEventLocation": "Pantai Paku, Nagari Sungai Nyalo, Kecamatan Koto XI Tarusan, Kabupaten Pesisir Selatan, Sumatera Barat"
  },
  {
    "id": "mitra-bpbd-siaga",
    "category": "sponsor-mitra",
    "name": "Surat Permohonan Kerja Sama Program Siaga Mandeh (BPBD)",
    "showEvent": false,
    "defaultAttachment": "1 (satu) berkas",
    "defaultNumber": "097/MENOREHMANDEH/KKN/VI/2026",
    "regarding": "Permohonan Kerja Sama Program Siaga Mandeh",
    "defaultRecipientName": "Kepala Pelaksana BPBD Provinsi Sumatera Barat",
    "defaultRecipientTitle": "Jl. Jend. Sudirman No.47, Padang Pasir, Kec. Padang Bar., Kota Padang, Sumatera Barat 25129",
    "openingText": "Dengan hormat,\nKami yang bertanda tangan di bawah ini, selaku Tim Kuliah Kerja Nyata – Pembelajaran Pemberdayaan Masyarakat (KKN-PPM) Menoreh Mandeh Kabupaten Pesisir Selatan, Sumatera Barat, dengan ini mengajukan permohonan kerja sama kepada Badan Penanggulangan Bencana Daerah (BPBD) Provinsi Sumatera Barat dalam rangka mendukung pelaksanaan Program Kerja \"Siaga Mandeh\", yaitu program edukasi pertolongan pertama pada kecelakaan laut dan peningkatan keselamatan wisata bahari di wilayah Mandeh, Kabupaten Pesisir Selatan.\n\nKawasan wisata bahari Mandeh merupakan salah satu destinasi unggulan Kabupaten Pesisir Selatan yang memiliki potensi ekonomi besar, tetapi juga memiliki risiko kecelakaan laut yang perlu mendapat perhatian serius. Minimnya pengetahuan masyarakat dan wisatawan tentang prosedur keselamatan dan pertolongan pertama di perairan, serta masih terbatasnya sarana keselamatan di titik-titik wisata, menjadi latar belakang utama dirancangnya program ini.\n\nMengingat BPBD Provinsi Sumatera Barat memiliki kompetensi, sumber daya, dan mandat kelembagaan dalam bidang kebencanaan dan keselamatan masyarakat, kami memandang BPBD Provinsi Sumatera Barat sebagai mitra strategis yang paling tepat untuk mendukung keberhasilan program ini. Adapun maksud dan tujuan dari permohonan kerja sama ini adalah:\n1. Mendapatkan dukungan narasumber/pemateri dari BPBD Provinsi Sumatera Barat yang berkompeten untuk memberikan pelatihan dan demonstrasi teknik pertolongan pertama pada kecelakaan laut (water rescue dan Basic Life Support) kepada masyarakat pesisir, pelaku wisata, dan pemuda desa.\n2. Mendapatkan dukungan sarana keselamatan laut (K3) berupa pelampung, ring buoy, tali rescue, dan rambu keselamatan yang akan ditempatkan secara permanen di titik-titik wisata Mandeh sebagai upaya mitigasi kecelakaan.\n3. Mendapatkan dukungan pengadaan kotak P3K beserta isinya yang akan didistribusikan ke beberapa titik wisata strategis, guna memperkuat kesiapsiagaan penanganan cedera ringan sebelum bantuan profesional medis lanjutan tiba.",
    "closingText": "Detail rincian kebutuhan dukungan yang kami ajukan terlampir pada Lampiran I surat ini. Seluruh sarana dan prasarana yang diterima akan dikelola dan diserahkan kepada pemerintah desa/pengelola wisata setempat sebagai aset keberlanjutan program pasca-KKN.\n\nDemikian surat permohonan ini kami sampaikan. Untuk informasi lebih lanjut dapat menghubungi narahubung kami melalui WhatsApp +62 813-2815-0907 (Nabila). Kami siap untuk berdiskusi lebih lanjut mengenai teknis pelaksanaan kerja sama pada waktu yang Bapak/Ibu tentukan. Atas perhatian dan dukungan Bapak/Ibu, kami ucapkan terima kasih.",
    "defaultEventName": "Program Kerja Siaga Mandeh: Edukasi Keselamatan Bahari",
    "defaultEventDate": "Juni - Juli 2026",
    "defaultEventTime": "Sesuai Kesepakatan Pelatihan",
    "defaultEventLocation": "Kawasan Wisata Bahari Mandeh, Kec. Koto XI Tarusan"
  },
  {
    "id": "klaim-presensi",
    "category": "klaim-presensi",
    "name": "Surat Pengantar Klaim Presensi Mahasiswa KKN (ke DPKM)",
    "showEvent": false,
    "defaultAttachment": "-",
    "defaultNumber": "196/MENOREHMANDEH/KKN/VII/2026",
    "regarding": "Pengantar Klaim Presensi",
    "defaultRecipientName": "Direktorat Pengabdian Kepada Masyarakat UGM",
    "defaultRecipientTitle": "Bulaksumur UGM, Yogyakarta",
    "openingText": "Dengan hormat,\nYang bertanda tangan dibawah ini:\nNama : {kormanit_nama}\nNIM : {kormanit_nim}\nJabatan : Koordinator Mahasiswa Unit (Kormanit)\nUnit : {kkn_unit}\n\nDengan ini menerangkan bahwa:\nNama : [Nama Lengkap Mahasiswa]\nNIM : [NIM Mahasiswa]\nUnit : {kkn_unit}\n\nbenar telah mengikuti dan melaksanakan kegiatan KKN-PPM UGM pada Kamis, 3 Agustus 2026 sesuai dengan jadwal pelaksanaan KKN. Namun, yang bersangkutan tidak melakukan presensi pada sistem karena terkendala sinyal ketika melakukan presensi.",
    "closingText": "Demikian surat keterangan ini dibuat dengan sebenar-benarnya untuk dapat dipergunakan sebagai pendukung untuk melakukan klaim presensi KKN kepada Direktorat Pengabdian Kepada Masyarakat Universitas Gadjah Mada.",
    "defaultEventName": "Kegiatan Pelaksanaan KKN-PPM di Lapangan",
    "defaultEventDate": "3 Agustus 2026",
    "defaultEventTime": "Sepanjang Hari Kegiatan",
    "defaultEventLocation": "Nagari Sungai Nyalo & Mandeh"
  },
  {
    "id": "internal-dispensasi",
    "category": "internal-eksternal",
    "name": "Surat Permohonan Dispensasi Kuliah/Ujian Mahasiswa (Internal)",
    "showEvent": false,
    "defaultAttachment": "1 Berkas Jadwal Program Kerja Lapangan",
    "defaultNumber": "078/MENOREHMANDEH/KKN/VII/2026",
    "regarding": "Permohonan Dispensasi Akademik Mahasiswa KKN",
    "defaultRecipientName": "Dekan / Wakil Dekan Bidang Akademik",
    "defaultRecipientTitle": "Fakultas / Program Studi Mahasiswa Bersangkutan",
    "openingText": "Dengan hormat,\nSehubungan dengan penugasan dan keikutsertaan mahasiswa di bawah ini dalam program Kuliah Kerja Nyata - Pembelajaran Pemberdayaan Masyarakat (KKN-PPM) Universitas Gadjah Mada Periode II Tahun 2026 di lokasi pengabdian Pesisir Selatan, Sumatera Barat:\n\nNama Mahasiswa : [Nama Lengkap Mahasiswa]\nNIM : [NIM Mahasiswa]\nFakultas / Departemen : [Fakultas / Departemen]\nUnit KKN : {kkn_unit} ({kkn_group})\n\nDengan ini kami memohonkan dispensasi dan izin bagi mahasiswa tersebut atas ketidakhadiran dalam kegiatan perkuliahan tatap muka / praktikum / evaluasi akademik pada rentang tanggal pelaksanaan KKN, dikarenakan sedang bertugas penuh mengawal program kerja strategis di lapangan.",
    "closingText": "Demikian surat permohonan dispensasi ini kami sampaikan. Besar harapan kami permohonan ini dapat dimaklumi dan dikabulkan. Atas bantuan, perhatian, dan kerja sama yang baik, kami ucapkan terima kasih.",
    "defaultEventName": "Pelaksanaan Program Pengabdian KKN di Lapangan",
    "defaultEventDate": "{periode}",
    "defaultEventTime": "Jadwal Penuh Kegiatan",
    "defaultEventLocation": "Wilayah {desa}"
  },
  {
    "id": "pemberitahuan-kegiatan",
    "category": "internal-eksternal",
    "name": "Surat Pemberitahuan Pelaksanaan Program Kerja (Eksternal)",
    "showEvent": true,
    "defaultAttachment": "-",
    "defaultNumber": "088/MENOREHMANDEH/KKN/VII/2026",
    "regarding": "Pemberitahuan Pelaksanaan Program Kerja KKN",
    "defaultRecipientName": "Ketua Pemuda / Kepala Dusun / Tokoh Masyarakat",
    "defaultRecipientTitle": "Nagari Sungai Nyalo & Mandeh",
    "openingText": "Bersama surat ini kami beritahukan kepada Bapak/Ibu bahwa mahasiswa KKN akan menyelenggarakan agenda pengabdian masyarakat yang ditujukan bagi seluruh warga sekitar, yang direncanakan berlangsung pada:",
    "closingText": "Demikian surat pemberitahuan ini kami sampaikan agar dapat diketahui bersama dan dapat dikoordinasikan dengan segenap lapisan warga. Atas perhatian serta dukungannya, kami ucapkan terima kasih.",
    "defaultEventName": "Aksi Bersih Lingkungan & Penanaman Bibit Tanaman Obat Keluarga (TOGA)",
    "defaultEventDate": "Juli 2026",
    "defaultEventTime": "08.00 WIB s/d Selesai",
    "defaultEventLocation": "Area Pantai & Fasilitas Umum Nagari"
  },
  {
    "id": "terima-kasih",
    "category": "internal-eksternal",
    "name": "Surat Ucapan Terima Kasih & Apresiasi Kemitraan (Eksternal)",
    "showEvent": false,
    "defaultAttachment": "-",
    "defaultNumber": "210/MENOREHMANDEH/KKN/VIII/2026",
    "regarding": "Ucapan Terima Kasih atas Dukungan Kegiatan",
    "defaultRecipientName": "Bapak/Ibu Pimpinan Instansi / Mitra Kerja Sama",
    "defaultRecipientTitle": "di Tempat",
    "openingText": "Sehubungan dengan telah terlaksananya seluruh rangkaian program kerja Kuliah Kerja Nyata (KKN) dengan sukses dan lancar, kami segenap panitia mahasiswa bermaksud menyampaikan apresiasi dan penghargaan yang setinggi-tingginya atas partisipasi, kemitraan, dan bantuan yang Bapak/Ibu berikan pada agenda pengabdian kami di wilayah Pesisir Selatan.",
    "closingText": "Semoga kontribusi serta jalinan silaturahmi yang telah terbangun dapat memberikan kemanfaatan yang berkelanjutan bagi kemajuan desa dan kesejahteraan masyarakat. Demikian surat ucapan terima kasih ini kami sampaikan dengan penuh rasa hormat.",
    "defaultEventName": "Penutupan Rangkaian Program KKN-PPM Menoreh Mandeh 2026",
    "defaultEventDate": "Agustus 2026",
    "defaultEventTime": "Puncak Penutupan Program",
    "defaultEventLocation": "Nagari Sungai Nyalo & Mandeh"
  }
];

const LETTER_SIGNERS_KEY = "kkn_letter_signers";
const LETTER_SIGNATURES_KEY = "kkn_letter_signatures";
const KKN_LOGO_PNG_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS4AAAEuCAYAAAAwQP9DAACcUElEQVR4nO1dB3wUVfc922uy6SGkkNB7LypNUBHEgg3sBUX97B1FRUFFQf3bO6JYwYoCKoiANOm9t5AG6XX77O78f/ftbkzZTXa2pLHn+8aQzc7Mm5n3ztx3373nihBGGF4gEok0HTp0SO7evfuQ9PT0PqNGjUpv165dSlRUVKxCoVDpdDq5G1IXaDeFQkE/q2GxWDj6abPZ7BzHWTn6j9XKVVRUmM1ms6mioqK0qKjozJo1a05mZmbuzczM3H3s2LEsnuf14YcThieIPH4axtkAcUxMTGLHjh37DB48uHf//v0H9O/ff3CvXr06aLValcPhgFgsbtYGutug1+tNBw8ezNq1a9f2nTt37ti5c+eBU6dOHSouLs4DwDdrI8MII4zQQCKRyCIjI9vfeeedzxw9evSEw+HgCe6frRE1r+HkyZNZ06ZNmxEREZFM1xruR20fYYurDSI5ObnbtGnTbhw7duzFffr06RUVFaXBWYTy8nLDvn37Dqxdu3bVp59++k1OTs7B5m5TGGGEUQNSqVTev3//gc8+++zckpKS8tZsRYUCdD84jnMUFxeXPffcc3PpXonFYnm4E4URRhNDLBarXnjhhTfy8/NLrFarPUxWwojMYrHY6d69+OKLb4vFYmW4A4cRRmggGj58+EWLFy/+xWAwWGjwhckqONYYwWQyWb/77rufRo4cOT7cgcMII8Ap4MCBA4ft3bv3kM1mC8//mpDM9u/ff7R3797DwlPKMMLwEX379r3o33//3UnTmbBV1Xygl4XVanVs3rx5V79+/cKWWBhh1EXXrl17zp8//2siqrB11fJAz4Sezfvvv/9tt27deoV7cBhnNe644477aWCELavWA/ezuvvuux9p7v4TRhhNhtTU1O7Lli1bRZ2/zVlXNKjt9tpbGw3PoGdHYRZLliz5MzU1tUd4CDUtwgGoTYQRI0aM++OPP5ao1WpVc6fSNAae52GxcqgwWlBSZURBhRH7sgtxIKsQR0v0yKw0Ir/cCBtEcFB6olQCiEWAWAJRzWvjeXYs2OyAww5wNkhsHFRyKdprFegUrUGHaC26pcSia1Is2sdGIlqrQqRKAY1KDhlLfWz5oNQkk8lknjhx4lX//PPPn+E0pNAjTFwhxvTp01987rnnHldQ5rFU2uLuNxHLgcx8rDyQhR+2n0CWiUMlZ4dZJgckYkq0pmxriBwO9n0hF8B7I2ieh4gIre4IJ6KjHw4eYo6DkrNCJ+aRppFjYu80nN+/M4Z0T4NMIkFLhN1upxgx7pVXXnnzpZdeeqq529OW0eIGUluAUqnUzpo168VHHnnkQalUKmaDvwUQVHZ+KdYdzcO67Uew8cBJ5BZUQCQRQSoRQ0ptJELxtLPDgdLevavJy6fziUSIPny4mqBqHU4kQnm3boI6n0MsRtTBg+AcDtjtPCLUcvRKTcSFg7tieJ+O6N8pGVpVywiIp3vNcZz9o48++mz69OmPmM1mY3O3qa2h+UdUG4JcLlctXrx4yRVXXDGuOcmKBo6ZsyGnsBxvLd+GhbsyYZQpIIlQQ2K3I+rECUHHI8Iq7dFDOHEdPer5b5RP2KWLMOuNjnfkCLP+PMFotsBqd6Bz+zg8Mfl8XHFeL0SqlZBIml/h4ocffvjtlltuuc5qtZqatTFtCGHiChK+//77X6+55prLadVJIpE0+X21OxxYs+s4PvhtI7YeyEJBh3SKYoWYfE81QOSja4PEVeu7PA+b3dnWxIwUXNozBfdeMhQZyfForikktemHH3748YYbbpjcLI1oYwgTVwCQyWTK559/fvb06dMfJwurKQmLBsKRnCJ8t3oX5v++GRUGMzQqhfOPDgcjBnjwMZ0NxPXfTjzKu3Zl57PT7yVlGB6rxkMThmBMvwzE6LTsb6ImJDD6+eabb75HfcbhcFib6NRtDmHi8hMPPvjg8/PmzZtJDvemJKyjuUW47qWvcOBkAXQRzvzgetPSMHHVIq6aYMxBvjyDAZLjJ/G/ScMx786J9NJpoifoJDCO4/jHHnvsmQ8++ODVJjtxG0KYuATiqquumrJgwYLPdDpdk2hcORw8Vu44gtcXrcGOY7lsgDXqtwkTl1fickNqNEKbRwKqgMVqg0IuwaTzeuPxKeejSxNOKUtLSyvvvPPOu3755ZfFTXbSNoAwcfmIpKSk5D179uzV6XRRcrk8pB5fB88jq6AMj33wK5b9exDRXjjSLpWCi4ys/weehyk2tr4lxv7mgLKk1OOUS1ZRwZz39RvkgCk+3uMKoV2hAKfVemyfsrjY43ko6MESG+dxH3l5OcQe2kBTRZWX41nVKjiUqvoHo0WKuFiP3VzMWSGvrKp/PQ4e/Jl8PH7t+bjviuFIiPZ8bcEE5UTq9fqq3r179zpz5oyTTcNoEGHi8gHr1q3bdO65554T6jgscrA/s+B3fLZsCxwiiutsePrCqVQwpKQE7fzanBxIzWZB+1h1OhgTEoLXhuxsSC0WQfuY4uJgiY4OyvmJmqOOH2dkTQ5+lUyKF28fj9snDHXGsyF000da2Nm4cePGMWPGjArRadoMWnYIdzPj2muvvYGE+kaOHHluqEiLnOz/HsjCmEc/gO7SGfj8z+0QSyWNklYYoQVZqzKpBDaex9Of/QHtJU/jmue/YD7GUID8pDKZTHz++eePpBiwKVOm3BSSE7URhC0uD5DJZIrS0tIyjUajClU8FllXX/21A1Nf+Q7xcR6mez4gbHGFzuLyNC12w2A0Y/mr0zCyT0eIQ9Q/bDYbCRya4uLioq1Wa3j1sQ7CFlcdvPzyy68ajUYTlegKNmnRUOBsdkydtwjxV83Ek58s85u0wmg+aNRKXPPCQrS7+gU8t4BSE4NfI40s/IiICDWVZps9e/bLQT58q0fY4nIhKSkpdffu3bujo6OjZTJZ0O9LdmE5Hn5/CVZsOwytOjgy52GLq3ksrrqo1Jvw4NUj8exNF0GrVAgKNfPV+iosLCwcMGDAwMLCwtPBPXrrRNjiAnDfffc9lpmZeTI2NjaopEVdv8poRscbX8LAu/8PGw+c8ou0RBznefO0AhgARDYv5+FYIWqPoNU+UojwtHndhxYqBe7DYq+8tY2UJ4IIscD7EKlVMd9k6nUv4ta531FTg2qBkfWVmJiYkJ2dnf3000+/EMRDt1qc1RaXRCJRbtmyZWe/fv26B9P5TrFXp4srcN3LX2PfyTNQKgKoUcrzKO3e3fODqqGyEAwQCXkyFygpOvbAAbphHttAK3D1d3KgvEcPz5HuvANRh71EwVO0v6fP3dH7nhrucASxI/PgRZ7bILLbEHXseKPR+waTFfdfcR5evvMS5gMLpsuBVh937dp18Jxzzhlit9vP2tzHs9biGjJkyHCTyWQcNGhQj2CSVqXRjAlPfYKB/3sTx/KKAyMtFyjVxuMWRNJi5yEi9HAeMRGTt8FHnxOhedq87YKG9hEJvw9Buv7q1nm5DyzlyQcSIi2xz1duh3Lck/jhn91OqZ4grj4OHjy4l8lkMlAfxlmKs5K4lixZ8tvGjRvXB3taePvc79Dh+pew++SZoL5lw2idiInS4r53liD52lk4kl3gFFUMEmQymYj68JIlS5biLMRZNbri4+MTMzMzsxQKhTwYVhZ7k/I8vvt7J+7+vx+hUbuSnIMJnkdZ167N+qDc2lqekra9gqaK3SjdxsOUi+ehO3ZMWMK0w4EygRpewQZNFXUnM/3a1+ZwoE+HRPzy4lREaZRBe7HZbDaewiXS09M7FBUVFeAswVljcY0aNWpMXl7eaY1GE7ASKXMuO3iUVRmhHj8dj360NDSkFUabgVQsxqGcInS66WU89elyptMVDANMKpWK1Gq1gvr24MGDx+IswVlBXJ999tnCVatW/U2RyYEey0ES6jY7Lp3xKTrfNAe6CHVwGhnGWQHS0f9i5Xa0u2YW1u4+HrzjymTiTZs2rZo/f/7nOAvQ1qeK0n379u3t3r17wKuG7mnhrxv34caXv0WEJjixWG5YoqJg9ZKsbFd5SCBupK0RuTkePcK8CDCkpApsHQ+JyXMOo0yvh7K83OPfbEov94h3QGrxHAxuSEyEQ1Z/QYPuvUMt8CUhEkGbleVxSkrJ4SahOZY8D4mXXE5VUaHXa/J6OADp8TqsfO0e6DSqoMR/2Ww2/ujRo1SJuzcVI0IbResoo+IHoqKionNzc/OUSqUyGHpZVs6GrjfNgdFmDzppEewymWCC8goSNTRbPK46spAH4Qf02jZxA9koQhO2CQ6FgpFKsOAtYduv+yDyfh+owpHgwwHIKqpAxg0v4bmbx+GRa0YF7PuSSqWibt26dSW1iaSkpKTKykrPb5VWjjY5VTz//PMvKCwsLAkGadHQf3fJBpaiY7Y7QpabFsbZC7lchrmL16DLzXOQX1oZcOiERCIRUVWp4uLi0jFjxlyENog2R1yjRo2a/Ndff/1Fy8WBkBZNTQxmK5KufQEvfb0KKkXLqCATRttFlZlDz6mvYc7Xq5zR9wF47yVOtQnRihUr/hwzZswUtDG0KeL69NNPF6xevXpRMPxZn6/YhpQps4Oy8hNGGL6CpHTe/mU9Ot7wIqqMlsCPJ5OJ//rrr+/mz5//RVt6Cm2FuOjh/HPrrbfeGpiV5ZSbufCxD/D0p8shl7VZF2AYLRjk5zJydrSfPAuf/7HVY0aVENCYuOWWW25evXr1BnFLL6PuI9qEw6a4uLhcp9NFBmppUX4hJURHRmhCc2O85fVRXcDERFj9UDjgPejPOwNGj3h1zjsDQz3ALjx9RlZWBk2Bl7hHb2KI3u4Dz6MqIwN2b6uRXsAc7XXKsLHP4SpK60VZQ98hzfMB7XZnWpJQ5Vaj0fO1NpQ83ghouhitVuLwl08HvOpos9n40tLS0sTERM+62a0IrZ64jh8/np2enp4SkKUFYN53q/HKd39DIQ88t9DreRqJghd6AVKDobrgg+cDejmip/kvz0OflgabHyubvBcyiWmgPFmZl/Jk/jxEZVERlGVlgd8D1+feSrs1BG8eBYdEjLj9B8AHQF7sOHY7tnzwMNLbxQS0QETklZWVldu5c2cvrN060GrNRrVarTYYDKZASctqs2PYvW/ijR/XhZS0GFya5d42f47X4ObPfv40w4/rCdo9qD5Yy7wHIla4MXD7QCyRoP+0N/DnlsMBHYdmJTRmjEajmcYQWilaK3GJ8vPzi2jJNxDSomIIqdfOQlZhRdDF38III9hQKeW4dd53uOGlrwJaNKIxI5fL5TSG0ErR6ohLKpVKS0tLy0nW1l/Some+6cApxFz+DNBYjcIwwmhBIN/637tPoPedr8Fs9T8wnsYOjaGSkpIKqVTa6mJ9WtWolUqlMpPJZI2Ojo4MxM80f/lmXPbsAqjcJevDCKOVobjCgIgJT7EaBoHEe8XExERSUQ4yCNCK0KqIq7CwsDjQlUMys5+e/zukobS0nNGD9bdA1rU9OFCCHWLGB9v5RNfr6T74i6A6xprwPN7uQ4BBgjHRWiRcNRPlelNAfUEqlYop06Q18UGr8OwolUoVkRaZtv7s7+wfPC549AMcyAn9tL4yLZXl3AXrlkcdJZljsecLC6ZzztvxSAuLZJMFE29Dw0lYu1mIxxEvcs9NdB8cYjEqO3Xy54AeP5VVVUGTH7iElsFkwYpXp2F4n44BHaeqqsrYrl27eKPRU1xHy0KrYNiSkpJSrVbr9woIlXzvMGU29mcXoukQzNd2A7LJwYSX4/l/lqCuoTZwmiY6nt/nCe190KgUuHzmF/jm7x0BGXFqtVpVVFRElleLR4snrhMnTmTT6qG/WfNVJgsSr3oeFgcfllMOo81CKhHjwXeX4LXFq5nIZSDJ2TTm0MLRkomLzbvT0tL8itOiR2c0c2h/7SyIwyuHYZwFkEolLB7x5W9WMYVVf0BjrUOHDimlpaUVLZkfWmzD/v7773UxMTHR/jrjSysMSJ78AtTKVrfSG3Q4RRDdG1+9kZKrxWqDhbPBYLGyrdJgQaWx/mYzmsHRT6rlyA4UYAJdGCHDO7+sZ6Xx/J02ukIltKtWrVqLFooWuQT62WeffT5q1Khz/Y3Tyi2uQLeb50CrCZIwXwsBdUQiDjuRh0gEqUQCmVSMSJUSEUo5ojVKxMdEID5ai3idhhUqpcIMsZEaRKqVUCtliNKqoJLLoJTL2PRCxm4xHcv5DiPrtO5NN5qt2H7iDH7aehSLD+SgSioH7y0PMYwWEeu1dvcJTHtjMT59bLJfLhJaaRw1atTw+fPnL7jzzjunooWhxa0qjh49evKqVav8lqYhE1l36TNQN2PxCpIf5j2kDzErR6Vu8Ka7X5J2sRgOvQGi4jJkiK24ZGhPXDOyL3plJCJO51niOag5lVVmPPzBL/hq+RbExkTA0Lmjs76ih5U2hzx491psNkPsYRWOVhUjsrKD74ivdyIenFLhcbDzYjEMySnCDkerhyajx3ZLTWYoi4sRSpzbIxW/zJ7qt3+XchvHjRt3/Zo1axajBaFFEdeYMWMuXLFixUp/6x3mFVeg+62vQt1CA0uJEMrrJFnTgCQLiq+oQpJCgiu6tsPFA7ugd2o8OrSLYX6LkLfLRfg/rtuHD5dswJ5TZ1giL1l0jcGqi4QxITFobWEqC17klpsE9Iw6dxacZO0NROxUBTzQJGu/z+/gMbRbCpbNudNv8uI4znHxxRdfvGbNmlVoIWgxxBUZGRlFUrP+kBZNofQmMxKvfh4RLXh66FZFAGeDjOPQQ8bj2kGdcPtFg5AYp2vytthsDmw/mo2H31+CfSfyodV4tjQaglWng1Fo0YmzjbgOHmz2qfVlw7rj08ev89tg5TiOT0hIiC0vL/ciw3F2+rikp0+fPuOvxhkVski/4eUWTVqVVUbE6LT4YHhHTBrRB7GRauaLaGoQyVs5Dje++i1W7zwOiVjE2hGhDX4BkDBaDn7bfAiFz36GX1/yb9pIBkVubu5pctrzPG9HM6NFENeBAwf2K5VKv5QeKFcr4eqZULYwTXi73QHO7sD5fTJwx8RhuGRojyaZ9jVkYa3fewKPfbQUR3OKoFDImExwGGcHRCIR/j2UjSc+WYZ50y6F2IPwYmOgMbp37959ffr06Ymznbg+/fTTz3v06NFN6FvAncbT6caXWwxpOXgeFguHHukJ+Gr6jeiSGt/sc3GSoj55uhiD//c2FHIp68BKRYh1x8JokRCLRfjqrx3QqZV45qYLBQsSkmFBNUo///zzr26//fab0Yxo1nE1ePDgMZs2baIK034FmPa+fS6Kq0y1PhdRqIC3fULkZzCYLUhPjME7903CyL4dmWXV3IRFxE6lrs5/5H2UVJkgCTAI19t9pUK2xnbtECxEnDrlsR4je08F8/nxvOfcS1pR7dZNuAKqFxFC8nHF7dvXbM55T8+PdOjefvAq3HDhIL/6Ka00XnDBBReuW7duNZoJzTa+4uLiEsmv5a8z/ra53+HP7Ufq/aEiI8NjgrN7dSdYTld6+FKRCLePH4LZUydA3kKmXbxrmvr0/OX4dPnmoKi60gAv7tXLYzgEI4AglkJqiADIyR1oOAStnlJGDKdSQp+axq6N2k8b2e3krJDRdbpOQ8Odo++7g3ip/4jFTj8RKdqKnaq2tKgg86I53+ykxXEo6dsHopqpQFWVWDvtIpzbO8MvnxetNKakpCQXFhbmoxnQbHc0Kysryz/S4vH4x0vx57bDHjsx64QeBliw3OAmixWxEWpseu9BtIuOqJZjbglwKuc4oHnkc0SezgmqFDWRlnB1COFgJOiBCMUCyZEyAowmC8RSMbQKOYb2SMOoPhkY3K0Dm8rHaNXMCiVXDw1c9r8GHiRrFv2P3WOeBi5Oni7BP/szsezwaWwyWVCpt0CplEHd0qbiIhFEVAil5j3UaDHy9Z9R9uH9iFAJX02msmcnTpzIjIiIUJ01xLVkyZKlCoVwxxSR1g/r9uCLP7c1qaObyIAWAR69ZjQevnoUIjTKFkNWblCXPF5Qit6v/wZeq3J2xDZcFJKsSkpZsjt4KBVSdE2OxeDuHTC0Wyp6ZSShQ0I0ooM4ppzj2vXUJYBcJkGfzslsu7/G9/QmCw5lF2DNrhNY+u8B7D6ex/pqSyx1J2mfhA53v43Czx/3a6FGpVIpaCxPmjTpMjQxmnz8DR48ePimTZvWC7W2aAzuPpGLMY99BIW3TsDzqExPh0NenxPJxI8+dEjAVJFn00GNTIb5T07BRYO6tWhd+j05xRj49u+QyiRsuhV17FjQpnBkaZX6pcflP9wt5+0O8DYOETY7EitLkNEuBhcN7IYLBnVB74x2kLSCMoEVehOe/3IFFq3ezYqzNPVqrshmQ2nPnh77g7KkBFx2HqqWv+KXH5SmjCNGjBi9devWDWhCNOlQlEgkSrPZbPQnnYesLd1lM6BSNhAVHyTi4jgb0hKj8dPzt6FTcixaOmjqonz8C4hcRmxrIi4WtQ8RHBwHvkqPSDuH0WmxuKBPR4zt1xEJURroNKo2sRJKfbigTI8Z85fjm793Iso/XcygE5eytBSDuyRj2SvT/CIECk5VqVRqu91ef1UlRGhK+1W0efPm7f6QltnKIW3y7IZJKwigUIYx/Tvj3QevRHJ8VIubDnoCdcVuL/9YTVotFUR5vIMHbzJDxdvRVavA4NRYnNMxEYM6t0fP9HaQtS7Zc8Gg6Xu7mAgsePI6fPLYtfhk2Wa88MWflNne7Nb8liM5eO/n9bjvyhGCwyRo9rRly5adgwcPbrL4ria7XU8//fTzL7744vNCg0zpLZVxw8swcb5VNLFERHhdNnd4nGLysNodGKwU4Z+37odYRCtGaDXILCxHv6cW1IrCJzJjBVKFXAjPw6yLAu/JsnHwsMTE+HYYtxVFiyRmKxQVZRiSFIWbzu2J68b2g1bTakv5hQw//rMHt81dBLVK3riTnOdhSogXfA6xl/EjMZurw0/INbL9g4dY0VmhznoKkXj44Ycff//99/8PTYAmGaIJCQlJOTk5uXK5XPAk+n9v/oifN+4PvBGkm969ey1z2W614iKtGF8+fBXioiNahYVVF+Of/Bi7Tp4J/EDuStZKYak/dloD4OzgSyvQVafA+B7JuGRgF/RMjUf7OF2zpDW1Tr00Hu/8vJ6FsUQ2krpWTvmuAuCQSBBDoSQ+PAuDwYzyZS/7lGBfF1ar1Z6enp5x5syZHIQYTTJW8/Ly8hMTExOEWltrdh3HNbMX+nUTGyIuO8dhkMOM5TNvQqxO26osrLpQjHsCUZGakBOXm+4dFg4y3oYOYh7npsbimnO64oL+XaEMCzYG/ghcz2HijPnYfOAUZF7CWcpDSFyEtDgdtn74sGCry2638yUlJWWJiYkhdwyH3Kkwa9asl+Lj4+OFklZRuR5Xzvyc5dQFC+Sglx06ghMfPoj28VGC5/ItEaIQqg7YIYLdZIKksAiTeqbi0cvPYcv/aoU84Ej8MOrDGXEhwrKX78Dpkkp0ufFlRAbjpSQQWUXlePHrVXju5osEWTY0xkm1eM6cOXNnzJgxHSFESEcuVcg1GAwmoVNEevNkXPciTLZgJaFTZDTwzYwbMHZg1zZVNEMx7klERQbmN2I+KbsDFTFxiNAoMCwhApf174hRPdOY0zw83Wt6OANegecW/I53f9kAVQ2LtjzEFpdbcWXL+w+ha4pwf5rVanVQVS6O40KmTxTSEVxZWWkQWguRHtbjHy3F16t2BKUNJOHyyp2X4u7Lzm2VPqzGcPkzn2Hz4WyfyJj5Uhz8f9LPYhFS4qNwzeh+LHWJMgHaEqm3BZDvy2ThkHH9S+ApvUgkahLiIpgtHMp+fdGvF5fBYDBrtdqQRdWHrJdOnjz5pm+++eZLoeEPlUYzOlz3EuTywGaxFiuHmy8ahNfvvpypIrTlCPK3f1qPl7/7G1UGE1m5zGdHIVd2m429utsnRKFrSgIuGtwV5/XsgA6JMYiP0ngP5A2jxZEXxeo9+uFv+Pbvnajs3q1JiIswolc6fnj+VsEyOLTKeMMNN9z4ww8/fIfWRFwcx9lJcF/oA0q97kWmY+X3eW12dE+Nw/I5d0KnIbG+s8uCoPQksqzoqsNTvLb3bMlpf8HC9V5Ce4JPXDbOjtVv3IN+nZOF72uzOWQyWUicsCHxsK5Zs2a9UNIibNif6TdpsQIPFQYc/+ppbHz3IURHaM460oKLrCgNJkxabQ/0TM/r0xHG12+F1GxtklxUSiEbfM+bbHwJ3lcqFa9fv35TqyCupKSk9uedd955/ux766v+WZV6gwnP3HghzCvnISai4So6YYTR2iEiVZo3bsNjwzrD4WNgdiCIidLi+he/8mvfc84555ykpCTh5lpTE9e+ffsO+CPBfDS3CBVGi+BpYdf2sdD/PhcPXjWyTYQ3hBGGLxCLRXhp0jCsuWcc7NbQk9eKnUdx4nSxh8JxDYMWE/bs2bOvRRPXpEmTJkdERET6Q1yXPfVpdVFSX2DUm7Dzo4ex7u0HmDM6TFlhnG0Qi0QY3ikJFXOuh5IWYkIIuVSKQX5MGYkLdDqd7qqrrprSYonrs88++9SftB690YLCKg/qkR5A4nD3X34eKv+cy1bHwkZWGGczRCJALZej/LVbMap9dEjPRavQT3+6TDB5EScsWLDgsxZJXPfee+90nU4X4c++/x461ahGEatQrZSjcvkrePbmcczCCscchREGqmccK++fgAsUdkScPIHIzJPVW9TxY8GRLBeJ8NGyzSirMgqeMlJA6kMPPfR8sJ5XUGZYYrGYIuSNSqXSr6XPS2fMx9YjuV6tJ73ehF/n3IkLBnYJTwnDCKMBkCrH1TO/wKZDWQgV4iPV2PvZE4J9ymaz2R4ZGakJRkR9UCyuuXPnvk4a1P7u/8+eEx5Jy2q1YXTvDOj/nIsLBoRJK4wwGoNYJMLPs2+HMoS5pAXlemzYlyk4GoM44vnnn3+xxVhcFGjmj0PeDcXFT9ZTg6zSm3D6xxegI/30YDQyjDDOEvCuXMPEq18IWdZIWaURlhVz/dHtCkpQasC0/M033ywO9BiSGgoHJrMVd08cBsMfc5lkb5i0wghDGETkEJdJsWLuNFhDtNoYHanGU58uY6llgtomEol++OGH3wI9f0C8IJPJlBaLxRSok1w1YTq0aiWUUgmOfvk0lHJZeLUwjDCCYHnd+NLX+Hv38ZDcS73BjOIlLwoer5THGBERoaX6E81icX311VeLHZT9GSBsZg4v3TYeWYueg0oRJq0wwggGRAC+eOp6lJVVheSGajVKXPDYB4L3I7fS4sWLfw7k3H6bSnK5XGM2m/WBWlu8Sz6DCCuMMMIILniex8YDmbjiuc+DoyTsoSLWvvmPs+IyQsAKF2s0EcQhTWpxzZs3741gxFHREcKkFUYYoYFIJMJ5vTKQECIlVZlMigF3U0S98ITx2bNn+73C6DfzWCwWm1wub9rKlmGEEYZfoOraIx58LyQV4Cl27NfZt+O8XumCi8n6yyF+WVwzZsx4JVQ6O2G0UvB2clYCVj1grgRMFc6N/m01ADYT4KAVrtBLsYRRH91TE9AxybcSc/7Ejk17/XvBqUAU1zV9+vSXm8riEun1epNGowltddYwWh54B1B4EMjaCWTvAUqLAZuFlokAkdi5sdQSykFxdS3WmUlA3cHqM1IJDlb3UqoCYmKBlH5AxmAgobtz/zBChuyCMgy4501BYgZCfFYb33lAsEY9cYlQeXe/iGvUqFET1q5d+3s4T7CNw1QOZO8ATuwA8o8CxioXMUmCk/dWE0RqpINPP1VaoH03oOMgIG0goApt4vDZBJ4VoXkJJl9juxoK0vLQBzgrh5JfXxYUGkElzcaOHTth3bp1K0JKXHq93hy2ttogyHIqOwVs/ArIPghIFCR/2cxt4gC7BejQEzjvNiA6FZCGDf1AcDy3GOc++G7j6sCkKNzVc0UsscmEyOzsepXSaar456vTMLBLiqA2VVVVmSIjhZWqEkRcqamp3U+dOnUoLAvcRkDTuGPrgH+/AwyVNaZ6LRD09ic/miYaOG8K0GVUU9UzbnNof+0s2BvzR/E8yrt29fgnidmEiOycesRFUCtlOPnVDEGpQDTNzMjI6JmdnX3I132E9FLRu++++1aYtNoAqvYDhx4Ato8Fdn0ImIyARNpySYtAbZPIAAr7Wf0Z8O5k4KengfzDzd2yVocnpowJ2bEr9GZk5pcKctQTp3z44YfvCTmPSOjypdByY2G0BLiqixYuBbLmAdKawYI8sEcHWKSt14AxVgDj7gJ6XuLRCgijNsxWDu0nz25YA89Pi4vQMS4Kmz58SHACNuUx+vpdn1+xd9999yOBKECE0UygEITMecCOi4HcT+qQFkEE9K8ANFzrjVRQ64ANi4EPbwT+ftMVdhGGN1BuYYQqdL7CQ3lFsAgs4kFO+jvuuOMBX7/vMxHx/tQnCqOZwDud2tnvAcXLAInWt312RwNWCmtA64ZFD/QeC4y60+XMb+0XFHxs2J+Jq57/wrtVFIDFRRg/uBu+mH6dIKuLyMvXsoY+falr1669wrzVipD9MbB7ElC6xkfSclteZYCqDVgrCi1wdAvwyVRg3UfN3ZoWiUFdkplml10mg1Wjqb9pqd94tlV4sdjzPhpNtW+LKm77kQYk6tq1a0+fvuvLlx566KFnw3FbrQCl64Ht451Wloh8VkItDRHQtxyItrTeaaMbdO204HDoX+DDG4CTW5u7RS0KCrkMCVFacBERMLZv73HzZqk65AoYk5Prfd/Qvj14VyJ3jE6Db/7eIahNxDHTp09/xqfv+vIlkq4JE1cLht0E7L0J4AOW8naBB7LVwBlViGqdNxMkcuCWdwG5qrlb0iLw0HtL8MXebJhjY4NyPHrX6U6cgNgVuKpWynHy6xmCJuq+Thcb/UK/fv3Gh0mrpYIH8r4Edl0RRNIiiIA0E9CtkmXotBnYrcD8qcA2koJq7SZl4Lj14sHOLKwQoazKgLJKg+D9+vTpc1HAxPXJJ5/MEXzmMEKOXzYeAX/wdqDge0AsD81JomzA0FJXjmEbAcWC7VwCLLwf4Mw4m9G/U3sYzcF84dWGQibDLXMXCdqHIhc+/fTTeQERl1gslvXv37+foDOHEVKQ8/OGl77CPf/3DfblhUbZsl4POa8EELch8iKYq4CPbwUKQiNr3BogFoshCXHQ8eYDmbDZhQnTDxgwoK9UKm3wbdxgq3v27DkwHLvVcgiLs9vRc+o8/L37BEvPmftXatOc3C4GBpcCKQbA3oZCC2QK4KeZwF/vuVQszj50bx8c/5YbIvJv1dx4YOfRXMGVr/v16zewwfM09Mf9+/cf6dWrl+dgjjCaDDSkMs+UovtNcxAd/V94g9EqRuUrmyCiqPemAk0bt8U6e04b4jCGO+a7Esvb2oV5x/D3V2B7bjGCBYcHeeheRXnY9fFjgu7q/v37D/fp06eHXxZXmLRahqX1y/p9GPi/N2uRFkElc+CHHQlN2yBSFRhWDCQZgTYQ8lULn9zmVKQ4i6yvvu10QV2mENvttTaR3Y69pSbwAuuY9ejRo1tDbxCvxDVixIjxAtscRpBBHeq6rzfgrje+h8JDXhmFKj26NB28WGBxu4AhBlLNTse91DkdaBOguK+PbgZKc3C2IDFCGdLnR8wj65SOn9fvE7QfuaiGDx9+kWDiuu+++6YJbGMYQdbx7vnKz1hyMBuSBhQrzXYxsoyhmyry4OEQeenZxKUDyoFeFQAnahsERn6vRU8Ap31WWGnViFSQDzy0D44XifD2j/8I3u/BBx+819vfvI6IK6644jLBZwojKLDY7EiauRgnKxqvl0mLQnd8Q7LHoel8FokDC3c0IsersQPnFQHp+rYxfaT8xl9eBE5uQ1uH2Rb6QD2yurZVcoL3u+yyyyYIIi6RSKRQqVThQodNDKIeq92B1Bd/Qjll14tEznch+Vy8bKxT5GhhCIFfxiFyoO+8QZj7TwrQ6HRUDCRYgeHFQDuTq31ovZBKgRVvASe2oC3DaHX2s1DDHhONozmFgvZRKpVysVis8pm4Zs+ePTecVN0M4IFznvwMtqxsaPLzoTlzBprTp6FPToa+fft6mynWWbVFJXdg2uKuQeeJLKMMZSYpTlfKYPM1jstB/i+j0//VpQqgF21rJTDS11/xDnBqdyu+iIZxusrk9W/q06edfbDOpiwqEnw3xAo5bnv1W0H7UMbOCy+8MMdn4po2bdpN4TSfpgW9KGYsWI6czFzI9PrqTa7Xg9NqYfOw2VX/yXQvPxwdZGUHHo/80IlNRVUyHi+uTBMweF2xEtEcMLwE6E16X7bWGQNGy/u/zwVKc9vkauPJkiqvS3cyg6FWX6zezGa//FzbsooFlzC7++67b/WJuMRisTwmJkZYPe0wAgI9y0VrdmPBH9saL2LgBUoZj4kf9SJXelCehlnCY/XJ/7rB/M3t4PAnep4XAWo70LPSOY1MMzj5j5rZGniA2iiSAV8/BHDlaGs4VdZwLiERTUpsJGwB+sKoV0u7ZuBUfqmg/aKjo3WeoujrEVefPn16SUNR7jYMrx2juFyPe976MeA7tDkrAqetwVhh5HH1gh5sCuqGyS5GsTXAbkEWV6IFGFYCDCkFOlY5fWe2FkhWrE0O54IDtXWkBdh7XSthW9+RV65v8O8cZ8M/b96HHR89gkqD92mlL7Cp1Phzi7DVWlKK6Nu3b59Gievyyy+fQjI2AbUwDJ9htHDofOPLTE43UMikwBWf9PLBkd4wDGIeG7Miax9bwuPu77oEZ+CSFUY9L44DBpU7p5M9KoBYCyChGotNaJG5rT86J507xgL0rHC2aUiZc8FB7G6zDNhxqbPaUBuB3dzwap9MJsXrP6xFWkIMDi54UrAkc910oI//3C5oH+KiiRMnTql3rLofFBUVlcXFxTXrVLHmPNi5quaMJ6J6oTaHHSaLDVUGIyr0JtgdDhhMVk9HYdnpSoUMkRoltEoFNCo5i4kSicUQ0f9qXH1z+PToMrvf9irKDebG69t5+JPUaIQ2L6/21wF8d8MRjE2vZNcouE3gMW9dMv5vAwnJ1UalWQzDq5sgDopV1wCIeIkoymRAgRIoqzFTYCTiZ1aOq6h29b+JpOKtQJzVeTxffXDavkDX1i+aYuJs0D7zLaQe0nQIumPH2G0przLB9Oer7N9rdh3HVfO+hzEj3a9HYM88Bdsin7QCq1FaWloRGxtbi5Pq9UCdTqdDExJUYUklthzLw/qjuTheakB2qR7FJisqeDFEx487/aEuUhGLnEOR8qH0XTpXH6fmAKX+XuMErp+u/7CO62DnFdmdZeElvANRJiNizUa0S4hCp6Q4DOiSjHN7dkCX5DhoQlRUgNowb/EalOlNPpCmF9PDg6OTjjT5y+44/eJmKDg/pnYyB55fmQod+aXqIFLpwNfbE3BLX2F+CsGglUm3rE4UTWV454Ux60jkJBiLGODEgE3kDH6lfdy3kXeRHxmxFNkvcwA07ZXwgLRmn3DtQMcUgqpdQNEfQDwll7TCBQcX1mUWMYUIz/3rv+uKilDhq7924NZxgzFmYBc8cs0ozNmR5WGf2vt5gjghHplnSpCRFCvIz9XgWVJTU6ko4wGECOTgO5RXjMUbDuCDLUdRDjnkNjN0hYWey33TgPY2qL3kPlVmpDNpWU862TEHDrCfvpyHiIXKOFGbZRIJendMwoheGRg3pBsykmLQLiYCKrnML0uNuonBZEHKlNlMQjfYpdAJCRoOex/dBREpOwjAshMRuGMxpYl5RoTcjuNP7viPXM5WOCzAgN8AibLVkte9v2zFN7//C2VJSaN9SyWT4tR3z1aPjR43z0GZsY6WF8+jokuXavlmb6uLj3aIwKt3C4tvT0lJ6ZaXl3fUo8U1bdq0GxECbNx7AtO+34jjRjtNmlmirkgT4XwhVrmmeUJ1gTx932meed2FkZaP5yFCUlE6hIsDj58uwbG8YixYuY09OCYzY7UhKU6Hsf0749bxQzCse5pPREbfiL/yOURqfaw67odmUoFexiynF8bmsbxoXzHrzw4N/r3MJEGlVYJIt+VytkKsALZfCAzbiNaKNQeznS9sH/pXpckCvdnCXC7Uxw9+NQNxk2ZCJqtBUj6GOizfckQwcVFYxMyZM6vnmLVafP7551+IAOFu+pYjObj0tZ8gfWQBzv9uM07YJRAp5BARaaF1gh4YTVdJfI38AiqVgvmnft64H5c98xl0lz0D3WUz0PfO1/HAe79g+ZaDqDTW9V/xePnLX3wnLb/bCry/KQkL98SxvEefoOJwuLDhdtF680Uf9wqu57y1Ortl0UD2h2iNsDkcOFnp+yohFY+98aVvqn+ncbD1g4dgtnjyL3uHiOeRxdmZb1oIxowZUyvhWlo3FAIBwGC24v3ft+KplfsgjY5kBCVRhq7wZEsC+QpUSqcTuaBcj+/X7mEbrcLo9Wb075qMGddfgNH9U/Dq4u1QN0FGFZHM9N/TIRM5cGO/kgad9eSUf29NCtSKxjvU0RIVyh1AVDBmi1wFkHoXkL8YrRIFPwFJNwEykhxqPa/kChMHocED/+w9yQjHrZraMSkGr999OWYs+N3lK/MNZp0OlQYzoiN8f3n36dOnVtmy6rNJJBJZVFSUBn4gt7AUw1/+HlHPLcKz27Igc5FWGKS7LUVstBY5RRW4++2f0OWWN5uEtNyg5/Dw0o64flEX8DLvlo1IzONlHxVVKTRizsq0wG0uuxkY+BsgjUaoQdcekskt+bj2hcTDElI8/9ceiAWGa0olIhzLLar+ncjqjonDECHQOOE1amw6kCloH51OpyGOqj63+x8ajSZR0MnBY/XeTKQ9/SU6vLEc2/UcuxGiRlai627BBh/sczWQ4Cx0o5stI4kab98JEeiUa05GIf75Ycg2SjzeC5tDBDPv+zT0vY1JsEsDmOI5bEDnWc7plrwR9YkAQLe1xC6C/NEREFGcVkhOYgMKl6M14f01+wWPC4lEgg9+3VTrM5oynvhmRvWU0ZfxJxJL8M7P6wW3WaPRJNSbKk6ZMuUWIQf5YMNhPLJsB0QiCXwpmh11vAmKEohEiMzO9vo3TyuU1eoLdb4rcpch79y5SaxHSlxVVFaG9BxEYH1fH4hbBxbi7SszneEELuRaqXCC78eKUDkwa0UHvHgBie4JvEN0u9tNBqLPc/4eIouLTkNT2tQXhkKuCqEfTSQGTr0GxF/i/HcLR5XJgpjcbEho1UbgC/PTpf/inQeurPf5J49eiwffWwLdyZMex5lDLEZVx47Vv68/4C2cwnu9xSlTptz26aefvlyLuJ5++um7hRxo6b5s30MBiAjsdr9Wx4SAGS4UoGq1wW61QalSIEItR/tYHdISopCRGI3kBB0SoyMRpVFBKZeyAFUlhZzXAPmlKBTCbLGhQq5AkcGMggoTiqqMyCo3IrfShNwKAwxWG6wWm3PYyiVs7u93IGsTBcAqpDwW7Y3HN7vjMH/ycUzqVQpwEhzJ1gpafSSQ1fXCxExIzAKnvrJYIGVqjd+jnRaYOHiBrbzIgR8Px2Daoi6IUNlhsIRY6FAaARx/AegyGy0dHyzZCCmLixN+Q+RKOStppq4xPaQ+P/n8AXhuwR+ooGBwT/GFFD3u/jeNMY22lr/MF0XUJ5988o56xJWenk7p/z5jYw7NdZvWk0UhCHSxdF/Y6p5EDK1Mil6d2qNLShxG9O6Iod1TkRilRVOnW5abrDhYUI4VR05jS04xjmYVodhmh8lBEf88RBIxa3NLAb1t7/6xC25fJMKfd+3HxkydYO6US3nc911XfHTlSd/7AvXpvl/U/kxG8YWUehI4cbFpidiBZ1Z0wIJtiVDInIOoSQyh8n8BhxkQU2xXy8UbP/7j9wuWXvbfr92L28YPqfU5HW7Xp48jZfIsyH2ITZQlJSC7oExQIGqnTp0y3P929xSR0Asxmm2QKkLnZGZB0nYHyisNiIuOwLAeabhmVF8M7ZaGuCgNItVKSCl9p4WQQZRKjvPSE9hWk2hNnB0lRgsO5pfj0y1HseLIGRgqDJBGqvxKyQk2iHwmzu8Fkiz0xyBevD8Wsy49hUQXQTS6gjh4RX2SoxzAGm/kQMDLbeg1ZxCKLbJaFqTTwgjx/ZYogL23Af2/a7ErjHtOnmYv/kCGDUXR1yUuglohxy0XD8aiNXsaPYZDo8G/B7IEEZdrrFMvdTDiiouLS2ZpMD5eTaXZyiyIYMJkskIulyKjXTRG9euEMf06Y3S/johQt+y3V0Og+6mWS9mWGqXBxd2T2ec0xIuqTFh2KBdL92RhU14xKq0cxBSl3wzCHM5H6V9PlkuA8R/2wY5Hd0Nsa6BP0FSw9wJA4knQUrivpd7heSDTKMXgWUMgl/H1pr0JWuHSwf6At1UA5jOAsn2Loy6eBy6bMd9v6SQ39mQS+dXnC/r1rXuvxILft0LdWKqcSIR/D5zEDRc2WD6xHmJiYhJLS0vPMOJKT0/vLsRy+ePwaYh98ch7AV00BUUaKg0Y0qcjZt0yDqP7d25RU6lQgq4yIUKFqUO7sM2N0go93vhxPT5fsQ1VJjNLB6K73FKsSm84rZfjjbXt8fiI0xB50qakEdP+FkBD+aWioAehkj/rt4MxuO2HLtVTw7roFk9y0n6fwrd2wIGVRWm45OavwS1+nCXztyQczimE0WJrsPiKL+BsdhbASqlwdUFd9Z0HJuHJT39vcDyTUsTmw8IKxRI6duzYp5q4Bg4cWE/vpiH8sPeUsGkOz8MmlzMJl/M6J+GRq0exJObYSL/CxtosYnRavHzHBLZRxzicVYBv/t6J+b9vhcXKVQe4tkS8siYFYzpXYFAiJY3X+WPEAKD99Q1bdRLhmQTMSFPYcP57fXGwSO2VtAiDkkgwL3QvAIecwyXLLsDagnjIOojw0W+bcO+kEWgp4HlgwvSPAyYtd2zisn8P4coRvT3+/aYLB+O+j5ZDrVbUylGsi2M+FIOpi6FDh/bdvn37SkZcgwYNGiBk5x2nfBe9d9js6BcfiVenTsWFXdr7rUhytkEqFqN3RhJeuXMi24wWK179bjW+XLENFSYL5FTMoQWBUtbGftQHX914BJd3LYfI7U9ycEDXFxt/6ooUgCsQVMhjc4Ea4z7oC43C0eCKKE0jh6ZWIVSodAD9Xx4KA2eEDs5l/ueOncDdl5/n86pZqLH03/3M3xoM0Azg7Z/+8UpctDD28N2T8Ma6hkUDjaxquDD079+/H/1kd7Vfv371PW0NoMxQJyvcC+JUMlS8fD22PzmJkRYhTFr+gRyfs24bj8xvn8Wpb57BVSP7oLSiYdndpgYppt75fReM/bQXeKUNcFiBgct821ndcHK3G8ym0lox8sPeuGJ+b0ZajYHS4kZ2Db7sMrXlj+ORSHmRSKv2tEksEeHXjfvREuDggdvmLgrqMdfv8h6XSWP85fEDYGtEpBBqNZt2CoGbqxhx9erVy7deQxHWdgeM9sY7S+/YCOTMnAx1EJQ9w6hRgkIkgk6jwocPXQ3rX6/hy+nXIS1eB5NZWLJrqECWz8FCNXSPD4a953xXbJYPrytlw8U4WJiDzI53tyQg4tEROF6q9jnuzM6T0kfwoubpSAYRjzEf98RNi7pCRXpfdUDpMDe89LXvCe4hAs/zuOjxD5mSaTAhU8kbKXwhwoVd2jV8ELUK+06eEXTenj17plUTl1ar9Vi7zBMMVg72RpzFnNmKzY9c6r3abBhBAT2Fi4d0x9YPH0HRL7MxcVgPWK2UPBui1BYfwfMOfPH0ZIjU1Md8ZBdluhfe4mGTOPDnER00T52Hl/9Og1op7PrkEgfEQsUCPbaESMuBdVlaxD17Dg6VqBvMGtFFqLH1sJdMjiYAzwNr9xzH/qz8oB+bpMbJiPEGoohZEwc2SG4iuRz/CsxZdHMVo2EhoRDlBgskDXyXjvV/Vw5jMVatFeQYN1hsOFGqx+HCClbC6VSpHjnlRhSX6Vn1X5PNAc7hAAmpEujtr5VJMGVIZ7xwcf8mnRKLXA7Tzx6fgvmPXctidW6duwgn84qhaYZwkgsGdMGVI/oKuge8Oh0iBVcdKepwiLA7R4vZq1Kx4VQku78UAe8P+rYzQERKqQGAhmgVz2Po6wNRZpEi0se2zPr8T/wxT1BSSlDA806Z88ufWdB4aIIfIL4gNZioBmyeYWnxsFWaIdOpvOrj/bP7OO67cqTP53W/lKUikUgrZLm9rNIAnkjJ0z50txw8/ndutxbnyyIl0+IKPQrL9MgrLkdWQTmOnS7CoaxCnLQ4cEqhBUeKjrTEKxE5ZTpYeiNp04sav5l2BwZ3T8b0MQEpAwUEZzqmGAM6p2Dvp4+ztKXXv1+LT5ZvRpXRAnmQpwsMdd6oKXE6fPPMTYIDHM8YY9D5iXNZAi7V55ZKHZBLeBZjFug78L7hZHH41yNJTMAq4fHM0nR8sjURKjkvKAp//X5hFkUw+3v6lFlQ00o09c9gLhKQoUNimo18jcbNhAHpWHXS+6LLgUxh1iCNS5FIpJF27tzZZ/8W4XRxOWIOHfI4mA2JiRjavysUNVURmwhOVVLKM+Sw5XAOflq/B2t3HcfRrELwUgkUYhEM/fsSU9feURIBkWvqIdUIs06IsGgRf+1DEzGgfUyLWzElc/7Zmy5iG5HY3f/3I75dvQvREc43YDDiwyxRUTC2c/oyOL0Z+W/d5tdxVWolrH27QJebA6nFt8UfX1BlFmNS32JAYIEPNixVdrzyRxpm/Z2CKJWDkZZQqJQKrN19Auf374SmgoPnEfvstzD36OH8XSpB7L79QSMvu0qFiuRUn1J75kwciJVvLYfYw9uHsjXKG3Pge0B6enp7aceOHdnyoq8ghmSa0p4ywEUizJ/syvgPMaxWG/7ZdxJLNx3AvwdPIbuwgklrSGVSFvjmjg6OitJWLy1ZXIFvwSLK724chav7dqgmq5ZEWp5IbOFT1+OL6ddh57FcvPLN3/hj62GoVXJBInAeFwxoyszZcPrFKX7nksgpfYsS8YMMcpwL0t0XO2DlgWf/TMfHmxNZUjqRlr+gfvjMZ8ux8d0H0VQriMPeXAoLWSauvi4KQQVx3maD0ocg9C5xEQ0UewH0bl+LAHTr1m2YNCMjQxBxke66t87pMHPIiHERRRChN1lYBdy1e07g61U7sOf4aZYaQ8oO1W93EaBswgBNOu91X/4Dh80GjUaBeI0KUQoZ5FIxtIUFEFkbfpNolXJIpWJEqOQs8JSmWKQomZYQjYQoLeJ0mpBM7ajdg7qm4sdZt7HfNx/Kwoz5y7Hr+GkWnOhP3BFvd+Dn28ciKdJ/OWrSKSPpk2CCLPAre5YCHonL7ZzkWZGfApMEG45FY+bKVORWyKGW86w6eDBwOKeIWUGhzgwxWjmkP78YFQG+Qqmd5/XqgHV7T3p9qfFWzqe+QlEFcVIJSr3cSk4uh93uEBQYm5GR0Vc6ZsyY/0RyfABldHu7LQlBIi2r3YHvdmfi3U9/w6kzJaxWpzuhmrZI3xdBQwqJTMI2qwPIqzKxjRCRnQ+Jj1rcThdRjTqSTFOQh81uZ2/rlFgdbr54MG67eAjidcF/KZzTowNWv3EvO9/J06W4/92fsG5vJiK1Sp+zI7rGRuDSnr6pp3qDhF48QR7XdFdvO4/yBp1FTK2cGEXlchwqVGNbnharj+twuFCFCrOE+dOYW1NEgy24IQw07Swqr2JySqEAzwMbjubhwo9XAlTgJQDoDRYUL5nNFnuSp8z2Gs6hUPl+nuHdU7D0kOf0Hl4uh9Vmh0oAcY0ePTpdmpCQ0EiwRW2cKfUegTymk6BDVSOvwogf95zC4h0nsTWn2FkFSCZFTFE5JDIpmt5j1nRwvoRF9X53v4EKKgx4/ft/8Mq3f8NqcyA5NhKXDOvBAlApbcpbMU+hoON0TY3Hynn3sM66/UgOPvxtE37bdIARQEPJ3yMzEgRredUFvb1VYnFQ0wmpTRM/7Q2eJwp2Jl6LRDwjyZrGgj++KwhUDt13Mh+Jg4JPXJkF5Zj8+d/YXWqEOEDSohfmS1PHQ+VSfdGpFSjzUqz4piH/1TVtDLcP7ojfDuZ49H3ySgXTv3Of0xckJiYmSyMjI33XlQBQWO6duC7qVr/6sSeQSH9mqR6P/bYNv+7JhFguq9bPkrguwFNu09kMmVQKmjlSVSFysNNGBQcUUgkeuXY07rnsXJb7GYwwFJoqDO2exjaCwWzBzM//xMKV22F38IzEmDXmekSDa0j5BIIojQJlQc6EVrIyas0bBEr388Olm3DhoK5BOR4PoLjCgHPn/YJTHM9ecp6c30JhsdrwwFU1QhO8jEHSxHvlEt+zBMd1TYbdZmf+57rgFXKYLA2HVdSFTqeLkSqVSkHzrjKpEjqrqd5FkVOwT0bDFhdnt+Oen7bgux0nmGwczZ/l3uKMqCBrNFXd9hR24YCyvMLjjbVERHguSMn0noLYgR12KLy0QSQwjcFfRLpWQT/4bRPe+WU9mzJ0SorFnROHYer4oUGTyNEoFXjjf1ewrazKiH8PZuG579YiN7cAIosFvRKDY0lEqRQojIiAzVOMlEgEZWlpkynFBhtrdgdHuvznbUfw5NIdyDLbGVlJyHxsBOSkN0dHe7x3UpOJreLSdO2PV6dV+63I+qpQqGCW1o8Bs/BAnID4QBk58a02KKoq6/MGZ4PJ4pzK+wriLKlOpxMUncYlJgI5p+p/brOhS4rnogeF5Xrc8cNm/H4wB1JyoIvFjUbV0+WZ4z2/yWn1iRFXXfA8LDExcMg9m8yiIPKWyMFDVex9oaKp4Z4yZheVY+YXK/D4h7+xYp1XDe+D2yYMxeCuKWxlMVBQSSmaqp44XYyXvikArzegeyytHAWOGLUclugYj3/j3cTVSkFyMkICvd0g9dw9OYV47c9dWHQwDxI1+R4hyMKimCtzguexRFWsibjunDAU5/ZKrzYTmF5/VLTHBZPuVAxM4HXE69Tg3QVo61hvJCAgBJGRkXKpTCYTNjH20l6Thaun3U5Twmtmf4nVO4/C2Kunk7TCaBK4o6V/23yQbWYLxxJ/n5wyBo9NPh+KANUl3L5Oig8jNdpAQQMlNoBVyZYOlVyKSqMFOh9jBY9l5eOaBX9jf6kJEtpHJII0RFkQvdISMPeuS2sNbRq7FHLkaczeN7qn4HXL/u2jsetg/c+JyPUC82zlcjkjLoGvYc9Ntlm46rcJTVm+XLkND72/hInh0WakvzVzwmljKz/u5rkj4dn81+5w+tskEkhlYrbS5yzCRiuczgFHOVscZ2crczxNE2kFVCJmS/wktuZcDW0eQUD3Od1aXm//vAHzFq1laVs9OiTgujEDcP3YAYjVCdNGyypwWj9WkzVgRU247uHPuzOdVWzbIGjavuVQFsYN7lbvb9Rvth/Jxfdrd+OPLYdwpqQC+t692SKCNIQr6A6HAzcN74X3bhlbr29ynA0iD8+CM1hwx7D/xC99xdDUOOzy8DmdtcLLAkCDxCX3JfzVF1ARC9cFD3/oPWQVljPCak6w6GdXeAGREMXryEQiyMViRErFiFRIkZoQhS7xOnSLj0T3hEj0TNQhWqVgTm9Wvsnfc/M88+lZrHacKanEifxiHM8tQWZ+CU6cLsHJ7EJUWm1sRYWz0b1zsLaS34+mAaGkOIXcaW0dO12CF79ZhecW/skssgnDeuCxa0ajT8ckRKgUDRJthUvaaHDv9KC06bcD2SyVrGVMvIMPupebD2ahZ4d2yC+rxOqdx/HThr04mJkPm4Ov9lcSaNyY/CgdJgT0gn1v0jDcNdxzeh6RbD15dp7HIxf09iserX+y9xJ0ReV6QceSEiQSibA5g5c2KzUqlgvY7ZZX2QpYUxsXRBRWzg5LhQHyGCl6JUVjbJd2GNuxHTLiIhCtoqBCKVQUe+VD/mGgoOOT2B9tEep4FmqAId4qF/FsZcVg5lBSqcfBUwVYvecEywg4nlcEs8XuLA4iDU1xEHc7N+4/hfV7TzK/ipgUM8/rgRdvn8CCYuuitMqpBXaxBwtCKOgeTP5sNSQ1FDPbIt5ZsgFv/7KBjQ0a/KwmQQgSoBuDzWRF1qwpSGYFWzzj/SUbIRbJ6pHdS5cM9OvlkhGt9ZoSV1plFE5cfg0ED28CrUqObre+2rDuT91z+fVGcQZnUu1EijAf3CUZ5w/owmKaeqQlhCaROISg+0+lzakoCG3tYiLQKz0J157fv9b3zFYbDmUX4MCpfGw7nMN+Hj1djEq9mYplQqGQORNQA2mMO7rbtVL159Yj+H3zYVjMFnS4YDhuHtSRpTh1io1ApcHC4r2uH1O7nf6uuMVmZ7I3vCkhAUa5GmJljayIGu3ziJawQOJDX2aqKiIf9gmRpeVwOHBBegKW3X0RU9htCL9t2AcMHVjr5fLeNefW82P7irRoLXMHeFrp9kcQU8Q3rAZWC/RF6aMLIfESNavOz4eiwsNqH8FLjqA1IgLG9u0bSZ7mIeLsaBelwYMje+Ge87pCq2hdBBVq5JdWMqJZsnE/dhzJQXGVHiq53DXt9MHHxvOo6tABNpVnn4o7741NgSuN0DoskJwpRMEPz1dPPf1Fv2mvI79MD73RDMPvr7LPdueV4oW/dmPVniyYydKkgUaWvIf9VYUFUJYFX+HUZ9C9S0uDTR28xYVg5dS6wZut2PL45ejfPrZRnjdYOETMXAxZDVdJxwgVDs64yu8XIzn7dZc/41SrqAFinxvG9sdb900SdDxpMG8qLbt6hTeG9yKPQxIzHZOi8cTonrioWzLLgWzp1W6aE+1iIlmtu5r17kgWt6CsCjnFFdh+KBurdh3D9qM5KC7VQ61WOgNJRbWfX2MDhk2BdRpYoQGnjQy48C7loWYXlrO20GqnezrRPzkGS24by75Db2oKWN59uhS/7svCn0dPo5QKLdCCSYCkGSxQpeZgk00wYLNwuG94N7x2xVDI2UJR4/v8tC+rFmlxRjO2vTA5IGueFnCoWE5d4qL2kI9XKFrGU3cFomnlMozu0g7PXtgXg1PjmrtJrR5EBinxUWw7t0eHWlHRRBibDpzCn1sPY92uY8gr17NYPPJjiH0kI6oiHsiCIpHU2Mc+YNN7K8fh8WvP9zg4KBugS3wk267t999igMVmx/HiSqzZcxIHDp/C7kM5KNQb2fI6kR0l79JZ2IKH2KmxJqS5NBWmiG/6SRafvBWteDpsNgxIjMaf917MAnuFPKdZf+6qNS5zZl8PTTCKP1s9B5pWGpw5vq2GuMgisFg4zL6oH+5l0z8Pfo0wQgKtSsGW5t3L8zQFtNgcKDNa8OO+LLzxz0FknS4B1EqmeOHJrZocoQzoeVXqTTiaW8Kmmuf2TIdWYJwSrfz2aheNXu0GARcPqr4Od2Aj5yIvg8mK/LIqFJRV4lR+OU6XVLKVrEqjifkOa4JST5LjotAlORadkuLQOSWWZQ6YOQ4ZN85hycctHVoAR2dNQUwjK8OeYOQ4ZFWYIJFKWCX5Ff8bh/Y6dVBWe1NTYj1GyftzbKnFYuEU5Nn1AXSCxnUPGyYq6lADOyVj6sRhuHpEn3qmYxjNA+rgSpkESTo1HhjRg20EM2fDjtxSrD2Rjz8OZGNrXinsnANShZSRRiCYt3gN5DIJC8VYNufOgBO13dfhziRwZxMQSSfGUHS/b7m0NZ3ZX/+9k5WFKyitatGkZbfa0D1BhwXXD8fQNM8ZLI2BRvaED/9ipEWE/9GVQzGmU1LQQlQ6t4/DPoGKp55AnBX8J1HHz0VL/XSSa8f2x8ybL0Y8pQuE0WpAq0jDMxLY9syFfdlnNHVad6IAFQJTNWqCLKM3Fq2BLlINlUIK+UVPID5ag/MnjMTUET3QIyEa0Wo51DJnAG9TgNpUVmXC1sNZePzjZTh5ppStltPZWfJ6Q6uAzRBbzdMU1u5A3+QY/HX3OEQJkJrxhEqzFRtyikET6k+mnIvbB3cOalxdh4QYj1V95H74KaU2m83mq8XFdsjJgcZL7AmtSOmTk9m/rUYLnh8/APdcNICJ4oXRdkAhE+d39k/CiEBj/I2/90LSvQv0rpGhaA9UUgjG+t34c+1OJk5oB88cylFyKXq0i0L/EQMxqmMChqXFIYLCPwIkNBr4RXoLFm4/ge+3Hsbx0yXQW21OX5ZGB1FnHXxbqOdhD1BSRgg4M4eYCAW+un4kzu+cxCzlQAmGnsmNX68jsXr8ff9EjOyUGPRg4NTu6dBnl9VbkFMJvHc2m83OiEvITlKDATLes/oBp9WCU6kxsVsSfrp9bMgVH8NopeB5vLL2AGxajdek35rQG4FtpeVYaVdg7tr9bJSR0xiUXiWXIkIpg04hR7xWwfw6FCoToXBaStXHsFpRabGhsMqE01UmlOpNTDBELJdCRPpv9G21BmI1IEyroGlA0tgJagVuO7crnrmgLwumDuboKjGYsWp/Dk7OnIw0WsFH8JEUHwVOo6llQVM6XYJAw4bjOCv5uKiX+J7eT/l7XsFjct8O+OrGkW02dSOMwJFdXIlKjhRehWtIsZchRZ7TJME1UTDZeZiMFuRTlSYfIfGiINJS4M6okHA2zJw4GDMu6O3MeQ3FuQBc/slfML11O/s9VGM3OdLD4gvPo4NAXynHcZyU/iNkp4ZitUR2PkxaYTSKSKUcH191Lt5bf5DFZlH4hRDN8bYKWgywW+3o1S4KT4/rhwnd27O82VCD54H1D9VWhwgFPNo8PM9UfQUTV0VFhTXZ5ZfyBRERKq9+yLvO7Rq2tMJoFFQebeqwzmwj5JQZ8PHmo1i2Pwens0hOhSR4nIU72mp4jDsjhLfzaKeQYkT3FDxzYR/0SYpu8jJ3YiZ20kz32W5HTKSwqWJ5ebmFpoqCor8oxiW32HNazwUBFkwI4+xEarQGL00YwDaev4xpu5XpTVi+5RCWrN+HDfszYbFYwVltkAXZt9OUIOUU3mpjsWIPjOqJ24d1QVKEijnXa6K1Xl9jqPBUQ9HhECTbTCDOklZWVpYI2al9nA45pbT+Ux9qZdvO7g8j9GCKCUo52+6aeA7b3DByNpwq1eNAQQUOnCnDgfxynMgvR47ehPJKA6vrSZYD8wW5rLVgaIX5Ajo3s6BoPuSSUUqIVKNvog7ndEzEeenxLBskpo0rYDQEWhihtKiaVrTYZGJxdkJQUVFRKs3Ly8sTslNq/x5YYVd4fCsUtel6PGE0N9QyKXomRrHt2r5eCrCTTLGFQ05hGU4VlOFYXhGrhEN1Oemz8ioT01dnmyuy3mG3w2GjAVW7SAubsjlIbhlMuUIsljBpIVKPVcolrGYgyZWTZFHPPl3QJy2eBYFScdsw6qPgaCaiTpyo9ZmFs0MjMAi9qKjojHT9+vWnbrjhBp93YtHS9EbxMCemKtfXeOtQYYTRFKAMAKUcXdIS2XbRkO7h+95CcCi7sB5vkICmUmAA6urVq0+KT506tVfITj2TqPKOZ6zceVRQA8III4yzB/s9pPuQLpjQsJjMzMw90sOHD28TslOCVunV4tp6xHO12jCc0iwHC8qxPbcEO/NKset0KU4VVaLCaAFH05H8fIhLy1jsTmOxciTnQmCFTUXOh05lqqgTyMRipLSLQtfkePTOSEKfjCQM7JKM9rGRbXaFLozWgey8YsTF6Wp9ptMK1zDLzMzcLc3KyhLk44qlfCgv44oyh8r1JsGrBG0FpEZAlbiXHsjB1lNFOFJYgQK92Uny9H/mMK4j6EckJAGUCjkUQaqWk1NYwba/dx1nAm4O3sF+stw2HtBoFEiM1KJnxyT0SW+HIT1S2U8qKBsmtzBCAcpvVXiocJQcJ7wm5/Hjx7OlPM8bhNR7o+BBO897dMNTIuoLC1cIVjNsrai0cNiVV4o31uxnNSNJR06qpPl6jVUTD/N3j3F4IWoj06Gip1XjgZFwW25pJdtWbj/CPrNYOVQmtYdIq0V6XCSu7JWCS3qmolNcBBI0SqbVH0YY/iKnoIwp8tbF2P5dBAfpOhyOKjaqhLxlqQNrjx6HXCnzWKj1+zV78OZ9k9psLArhxVV78f6q3bAeP+kUpxOJEJjAC61eNU31a28gyZbYshKgvBSVucDC3fvxBQuSBHhadevcGYnRWlzcvT1uHdIZ/dvHBFQFKYyzC6szC8Fk3WqAZgHD+wirEuX2hzHi0uv1Jq3Wt/kdDdIIpZSV3vIEElwj8XuhdfpaKpglxPP4dlcmZv2xCydKqiAlwUM7Dx2L12l5cr1+gWKevElyg0epTIpTlUZ8vPU4Pth8FDzLNRSxwhmkFHFBt2SMSI9HUhsu6hqGf6Be9cFGp2VfE1T0Zlj3NEHHqqpylgRixHXgwIHsYcOG+VxnKiFKg7wSZyXjuqAqP79vOYSbxw1Ga4eJs+Henzbjiw2HIY9w8jqRVlOT5n//dv6HWUFOVcfqsu7/pZC6f3f+rM7mcCfoBiFRl1JxoHC++TIrTcjcmYnPd2YyP4atygyVVoGbhnTC/YMy0KV9HFM4DSuFnH3g2X94fLDxMPYUlNebldgcDug0wvzhhw4dyqkmrj179mwVQlzjh/bAZ39s9fr3GQv+aLXERW+HSpMFk+avxsbsQoip5qCLtEINSnWJ1CiQGq9Dp/bx6JIch5S4SCRERyBKq4RWqWQkQHEvpBlFmvJEIsyPJRKxRGUyv0lllkkXkzS21Q6jxYpKgxnZReWstNnfu46y4Eyj0QKNWsn2Cwax0DHkkSqQLf7FzlP4+Zs/WTtI5bR9VATGn9MDN180iBVFDaPtk9bpCgMuePcPnKwye+xfDRbX8YK9e/duryauXbt27QFws687XzykGz5Zvtn55vUAKqlNzt7mrmQtBHQPS4xmXP/lP1h9PJ9VjyHSakpEa1VoHxfJxPMq9CYczytGWaUBOk05YqM0iNdpEROpRqRKCbVSxiKOI9QKqOQKyGQSyKgUWQMEdC6AKfXqNXLYl3kGG/adwvYj2awYbVGVAUYzxzTHScZX6ienESG6VR9Ol+ux4M9tmP/HVlTpzRAP7IureqbgukEdMSglDkmRZ+dKdFtEdpkBdy7agNUn8iGROfXO2NusDpJia4dG+IIdO3awSh5sZG7fvl1QEOrwXumw2xyQyD0Tl1Iuw4/r9+HGC/4rKBlKBJpNT/tf/9U/+HFvFiSy5it5RfruJBdcr3113kzu31g4nes3lsLC2Zm4nkIlR7tYHRKjNRjcJRXn9UrH4G6pbOnZrcNe81kN6ZbGtprno3gyOmZppQHr957A5ydLseVUESpLqyDSqvy20mifyAgVqAriDwdz8f2BHFbHQGTikBgbgUfP74V7zu0WXsVsZeBdYoR95/2KYgvHXqBEWg2hV7pwy3vHjh2Mq1jPi46OTiopKTktZHUxYuLT9cqH22QyVrST0C0pBhvnTQvp6iINsKuf+Qw/z7nT7/1/O5iLa79YDZFQ68puh/b0aY+BuBKz2S8zOJSgnDxaUHHYeWadkbWWFqdDl9R4DOyagv6dkjGgc3tWTduXeLWjRZU4WFCBrZkFWJdZiL0F5UyuW6SUs2BYHiJE5HoOSKY7o09J8dg3xGYzeCvH3tKpOg1GdUrExO7JuKBvR0R6iAMKo3lBfeG9jYcx5689KDNzzEL3tmquyftvvFAfePaKYXj0mvMFnS8+Pj6tuLg4R1SjorWg5bGUKbNZo2vCmJAAq85p/tmtHGxv3IZQgUjnmlkL2XRqz6ePC9vXldw56M2lOFaqD3rQZUR2FiQBFJJoDhDPkj+qosqASK0ag7ok47oxA3DhoK6sZoDax9JxxQYzFu05he92ZeJYVjGzrJhF5aO2ljY7u550szt+p6xcj7T2sbhh7EBcM6ov0hKjEaVR+qWkGob/IKc6qXRM+fIf7DpVBJnGD8ULnseqG87DyL4dBe0mEomIGR3VPcnhcPBCBvAlT32KHcfzvBIXEcueRy5Fj0TvuY2B4I+th3HL3O8w4/qxeOSa0T7vRytf/2YVYex7f1DF1JC0rTUSlyewKaPdwawnUjwgid2bxw3CrRcNYb41X0Avt7wKI7bnFOOdDYfx78kzsPMiVt7M0/qmN+KqC2oXBUJT0HMEVSLq34m5Jkb37Si4+EIYvoF0+B567xesPnoa+pRUJvbYEGxWzunj8sArjpIyFLw+lflshfRHsUunqPqIx44dO9m5c+cMXw/yfz/8g7mL13glLkKXaA32Pxn8KHpyKMdOmgmVUo5dHz2C1IQony2tmb/vwNzVByAKYSR4WyEub/eQ4+yw2+1sinnzpedh3MAuSBVQds5qt2NrdgkW787EP4fzcLjMwCwq6uS+EldDfYME+9rHRWFErw64aEg39OuUjK7Jcaxidhi+gyzwzQez8NFvm7B080G2ik3WrV2pRGVqqlc3kJ3jcEnXZCy8eTR+3ZeFu37ZWu+7toNHYP91ttAcxeyOHTsy+ZnqJzlv3rzPPvzwwxcl5KDwAaP7d8Kri1Y3aP4fKqhgF+9t9dEfEOtOfHo+tGoFiorKfSItGmy8w4Fec5fgZKUxpKTVlPDVjRbMmTAdisIbIJMwmZLHv1kDw8r94CqN6NOpHb66bjh6J0UzJ7y3vkGrpiMyEtjmBi0GfLnzBF5bUIyjh4sQFaV1HcN9Vt9Aiw20VZks+GP7Ubax+DK7A+VlVejUIRFXjeiDaZcMQ3pSDCQiD/mjZyl41336bvUuPPnpMlRRuIySqmGj0QgBZp1XmfD4JQMxd+Kg6gWz19ceqPf06G9au6BSFwyvvvrqJ+5/Vx8zMjIyuaKiwmd5BwtnQ/QVz9Zy5ta1uOgtuvmBSzAoJRbBAq1ydbrlVRbHdMGAzvhmxk2NDkyKZ+pxyyvIzujIhOFCjWBZXLRIaObEbKqmkDrYFqfmkBzJIUnLIV5jRbzGhmiNDTqlDUqpAzIZz/YzWSWoMElRaJChsFKG7Eo5ssoVOFMph8kmho0TQyZzQCkL7H7Q86bnXqsDczakRKpxaZ80PDqqJzr5kUhbUmnAzmO5+HntXizdegilFXoWcxYsfxaRmdVCzmQpEwXoFK/DiAGdMaxHGs7r2QGRAgMjWytyCstYBMCv6/bhYF4hLBYblI0EWde0uGwWDt3bReGdK4fhgi5Jtb5HQ03y0GeQ11lUIbHGmyJFWPDU9YLaqtPpUisrKSGtBnGJRCKpw+EQRIOqCdMRWZe4ompbQFN6pWLhjaOC9taPu/I5SCQS9mbY+v4DLFCzsaDO+KtmQqOQobRHD4+rfcFeAYzIOuWduGrcCFrbIH8PDUW51I54pR29kgzon6LH8A56dIk1IT7SCrHCDnASgGMSnQEEf/CAmAdklA3uQFW5AkeLlVh9Qoct2RHYm6NFuU0Cm8PpfZKIneqfjRGXITHR86VSriN42AwWjOzaHs+N64+habEsUd+fEJYTp4ux4I+t+GPrIeQWV7JkccqXDGaFIIdLfrnKYGb69l2SY3HBoK4Y0SsDXVPiEa/TIDpC7axs3Urg4HkWgHymtBIHMwuw5N/9WLv7BApKKqGLUDszLAQ8DE6ugCElBTcN6ogPrzkHMonngrTf7jqJ277/t97fSHF2zU0jMEKgY14qlcrtdqepVuuYZWVl+qgo350VI95fga15NSTrKc2kzndsFivs/+es1xYoDpzKx5jHPmQ3miy+/B+eZ9MCb6C3f7trXnCSRQPkZInSwZTgefD5AxqscOlkVX8mEsEBEcTbjyFBZ8OUPkW4rl8punSohMYByKjzsDktfbs5pi0sKIwt15h4HuVGGVYeiMH7W9phf74KNE61ivoLzyy1yNPhHA6Ud+tWi6jpuxTZH2V34OEB7fH45DGC1S//OzwPvcmCY3nFmL98Mxb/sxt6vRlROm3QC9a4U1eYRJAr5Yr+QwLm3Tq2Q//OyRjSLRUjeqejXXQky25o6qknz4NlSBw/XYyN+zOx6cApbDucjeJypxY/tYam3uTbDqRtVQYTfpk9FRcO6tKgC4h6Svc5PyGryly/rVVVKHr1VugEyF9VVFQYosh/4EKtK/jnn3+2jBo1aqivB1txJA+XLljdoPlO08XjT12JDtHV5/T7wUyY/jF2nTzDflcpZMj8eobXh0AWWc/b5zKhvsbAiCv+v+lOMEBERe8GhVGPMdo8TO55CuM7liIh2gYRJ3ZZTq0BPCB3wGwRY3OuFsv2xeL3o9HIrVBAIuIhl3p5ITDi6uqRhMkSizx2jE3hyeF72bk9cdv4oRjes0PAU8GsgjKs2X0cK7YextYjOSiq0LNLYPmSIQybYIUyXP2Orovm61KlDFqZBPZ+fRCvkLJCGdFqOXQKGXRKOSNtpasSN/VvFWUpSMSotFjZiqvBysFqc8BotkJvsaHUZEWZyYISgwXFRguqrDZWQERktZOmFDR5uZBztG9wfXYGsxVDuqRg7t2XYqiPSdEVJitiZy7yGNclz8tD2eePC7JaN2zYsG3kyJHV3FTrdbd27dqVQojr3A4JTmpt4PzUWZ5ctgOLb/Y9ZMETKMxs44FT1UGvpBnl7eFQJ7jx5a99Iq1gwvUihqakBFO7lOHFsVugUfAAEZV7AFsbWxioQQR1L8/9e02uqMcbwSZEEWuzUgScn2pg2+sTswCFHQVlCry+NhmL9sSiwiqFXMyzGn2+jBmnk9/Z/ZZtPoSl/x5EpcGC7mnx+Ojha9CnYxILkhU6peyQGI3bLh7CtpoqBBS688s/+7Bi+2Fk55eC44l0pU6Bx+pkdP/vnfsY5HulDcr/zl1q4VBKfbHMgGBDStfgCp4mIhDbAn/+zDImRz1nx31XDseLt08QlCVBz6zLSz96JC16XydLnGEsQrB27dq/a/5eqzXJycndcnNzD/t6MLKmdDO+hbWRi6JnWD7nhoA6xqvf/o03f15f/fut4wZh3l2X1fseEcd3f+/Ag+//6rPvI2CLSyyGLb8I9w7sgCeuHonUdjGA3QjRrkmkJNjIviSNIwLKpUCFHKgiX5bY+Zm9hj+r1hTSOa2r/jddpoTmmw5A7QAiOUBrA1R25/cYo4bQwhM7wDmATL0cv+2Mx0fbEnGmTApLv66QeJBIJItLd+yYV4ajgUMhDeRLmjJmAJ66foxgFQFf4sDIkigor8Lp4gpsP5qLbYeysSfzDE6T/8zuYO0ktROy1vwFadSV9uoJUZ1g7VBAG2AoCVl29OK569Jz8L/LhyOD+rEfaiJHiyrQ6/WlHkvD0UxkaowEHz0+RdAxO3To0Cs7O/ug+/d6RxYaiDrq3d+x5XRZg99xcHbkvXAtEgKQdE6ePAu2GiuCj14zGtOvG1Pve2Smx101s0HfVzCIi1risNmQbDbixUsG4OYJ59S/mXtuBOw1iueSE4sIySgBihRAqRwwi53qpIH43D01zv2TyE9pd5JZFOf86fZVhYrMRA52jkO5anx4sCNWnOmI43YdxBLysfCNElddUM4kZ7HiqtH9cc9l57LpSlM4x4lAi8r1yC2qwKGcQhzPpVJnpcjKL0dhcQUqrRxb/LHR1JDVciSVDpf1Rf4k+tmSiIsnR72DWVMUfsKeg0aF3h3b4epR/XDNqD6IUAWeVpU263sUeCr+SuCs2DDtglq5sY2BxfjVCdOq9yopKyuriImJ8Sltm8bFvSN7YMviTQ1+TyyT4OFft+EbWl30ubk12lRlZAnINROEyQT35owXQlr+wGa2oIe+FP++dT+LJ/P8VuKBDo8AJ18AJDyQrwBO0LoHVbhwfYV2CkVTqxO5XBadXQyUElEqXNaXK2ki3gKk6wElfSeIJMaLGSH3iLPinVGHANEhOOQ2lJZJMX19H3ye2xsmTgQqX+ALnNMvFVZsO4w/tx1mlgHVNpx7z2WYevGQkBV9JfIhSSHaKNjWW/I7Xz29AvQmM7LyS3HyjLOm49GsAuxS6XCmVI8yg5lZejYmqOaKFyBfC3O3iF39wuU8Z9dUY5HH9Tv1NJHreh21jgPozRaIjGZmKNAjoNV3yniIilDhnB7pGNo9lQkk9M5IhFqhqL5vwfKHUXOe/XMHCkxWry8l2+lCDO4qrOJ9WVkZZY6hQeJ66623Pn7++eef8CUQlb5wdZ803PjlWkgbSbNYtGwTvr1xFPzB5kPZ9ebYpU4hxDrfy/Ka5NkQKClaUVpflYF6hSXaaS6zVcGScjw4IAXP33glW0ZuGCIgahBQZgcOxzutquaMe61JZgQi03I5sCvGOXCkDiDKBrQzAZG2IE4vaUUXEFtkiFMDn128D59J96DKKsGGzAgs2NwOq45HgRfxUDQ2I3O9IDQuP+eM+cvx2Ie/slCXMQO6YOqEoRjTr3OTVa92D3i3QCM93mitGtGd1ejfuT7RNQTGP6ywyX9OfhZKYnepf9DUVQRWEYp3ERULBRE7qzvRT7n7300cqkGtyS0qw+Uz5uM4L4OijgIJg0gEc2QkFtxMSdW+Px+73c6//fbbn9b9vF5XWbZs2fezZs160tcDUwwHVfRtMNxSJEK8xYhtR3LYsrFQfLR0U70VITLf6+KGl7/xy6KTmi1s81gVOSYWjio97u+WgDfJTyfoyCJg0DPA4U+aJ8LBF7CALZeVVCZ3Tl/JmJU7gGST0yojkgvaBYgAmwQRYmBCpyq2QWaHkRPhnXXJ+GxbIor1MkgllJfWyJGo+KtcBhrbq3Yew187jsFoNrMAynsuG44bLxyI9MRoqFqBLpwzbo7Iz3mfW0M1bB5AXlEFrnz+cyZ2QIst3l7n9IzuG9ABt0wYJqgnUW7i0qVLF9X9XOQpyMtoNJpkMpnPd27Gsh14fcMh7yanSISow4cxsm8GfnxBeEyXbuIMKOvMKzrF6bDpo0eqb+COozmY8NSnQV3ytnI2jD+nJxY+Ppk5aUX+2s9/jgeyElsueXlDdVwZRdVyQEc9WNBZMKeVdU8oolkmj4OnNZi+LB3rTkUiUml3zpT8WBmjqRmFzgzr0QEPXTUC5/frHKK2n10oLNdj9MPvo7BCX0/jzRNuvnAg5t19mWANN47jHEqlUuVwOGrZRh6Pkp+fX5KYmBjj68EP5pej/1vLGiUuk8WGyuVzIBSq8dMRWcexH6FS4PhXT1f/PmDa6zhdpkewIBGJsOGdB5CRFBM431SsB7792OnHaM1w+8YirUAKTSndDthQOfl58DIH9uRp8PHGJPy4P4ZlGvibakpOXnL00+A5p3sarh7dD2MHdEbHpOClpLVV8K779+3qnXhm/h/Qm60sBq8x0IvjwatG4NmbLvJLeLKwsLDMExd59Cp8/PHHC5977rlHfHXa9WwXBYfBAglVuW4AKpUcP23Yi6uG9/U5upku3NN3yw0m9jeaz5OzNquowqcb2RjIzzCydwZ+mnVb8CKwdSOBrm8Dx9TCxri3YH/3zM3T32t+7ulcokDnMzxgkAFHZICN5jQ80L3SGX4R7Kh/XgSRVYL+8WZ8OCkTH04+Dr1ZjP/92AlLDsRBKXMw37WvZyRrXOlS7d154jTb6HlXGkzsRfjY5NG4c+I5iNKogtKX2gJ4nmckdc///Yif1u2GLsKZWOPL/aEV/rnTLsGdE8/1u1d89tlnX3v63OPxRCKRym63G4WsNvR77VccLtU3aHGRxUHLwvm/+C5nQeoSEZfNqLdMS5r2OYueY0nef+84iute/jrgaSJNDT959BpcM6pf8FM2DHuBhfPIkdHwtMy9UciC2kZp9M54LDltlLXq+C90gsIrajbTTRzun+SropgwC82/JIBeBhgkzn+T4535roLANe42U3s7GIBozrmSGTLw4CU8jlXI8e7qFCzYngC1wiF4OulZTNHOyCxarcTgHmm46cKBTExRfZZpfDl4Hq9/vwYfLdmEcpNFMJFTatCKuXdhRJ+OAY0liUSidDgc9RzQXo9oNBotKjKRBASd9XztN88rGtXEJWJEtO39R9gUzBeQVRVx2dOIUNePAZs6fgjm3HEJ0q5/iU0BnGgoYdr7DSQi/OaZGzFhSI/QrUrtvBnYQoE+NZpJCdQ05aLBruMAdwoNEUvIylu7DkwzPSIzcshXyJxR/e5MiADyuBlhRluBDiYnmYU6vUluw948LWb83gEbsyIo+yVgEqsJI8VGkWGZloirRvbBBf27oFtaAiLVJPnS2hyX3kFFblZuP4wXFq5kIR2kxuEPaBp3/JsZbOEkkPtjNps5bxzk9aiLFi36ZcqUKZOE9Ff54wsh9ibWVuNMQ9vHYN39E3weG+rx0xHhIXiVlouNFhvU7qRWyoLPSIfDQ6lvXixG9MFDHv1M9IZd9OyNGNO/a2jdUDY98OMtQDwPxNBLpCY5NfcAcM0/KXi0SgbkqoESOUCyNwGTGAd0r3JaiCEkMeoPDrkDB3O0uPqrbigwSqEMsnagO3aLXsBGgwUxURpcNLgrbr5oMIb3ToeS6i60Ilg5G/7vp3/w2qK17NFQOIW/ZEP3pldaIla9cQ/ELp2zQLBo0aKfr7/++qs9/c3roUeMGHHR+vXrVwo50ei3lmFzQf0whbqwWW3InzUF8Y34xNxQjJ/ONJMaBRFXegPEdag+cZHD8YkpY/DE5POb4O3JAzmfAEVL0SrAIv3J7pcChUpnuATlwrkj/YWAWXI8kGh2hlmQZRniNCSzXYQvdybgtTXJyDfIoaaUqBCB+MzKcSwWVCYVIzEqghUj6dWpPTolxSA1IZrNMtpFRzDZa0UzqLHaHA4cKazEbwdz8MfeLGw9UwZxYREiqioDPrbJZMF3M2/BJUN7BM03PGrUqAnr16//09PfGjqFyGaz2X1VRCX8svcUpny3waOWeF2MSI7BKh+tLvUlT/umce4HcfVOTcCqN+9tQnuHB3ZeSd0IrQ8u64sssSwNYCWVCz8Ca4k/6DgUXhFrcUdwhqbJ7NAO5hN7+LcMfLMzHjxp3jeT791ZpNfGcjEJCoWMxZ3RrCE5Tof2sTqkxFNpOS1iI53aXxGkKKFWse9RaAdIsKPG0iorS8fzMFo5lFWZUFRhQFFZJY7nl+JwdgEOHstDXoeOLJhKppLVimpXlpRA6TH42tfrsWFE7wz8+tIdQX2CNfXlPaHBc+3du/dQnz59ugs6GVM8bNw6orQE07ybmGnaGGIuf5aJugWbuMorDdD//gpkTVz4FdYiYO+NjSdg1wVzpteYutWyWFzJ1tUOfpe4VqinljQVPKMETquc5xNCCO620qJDmh5IsITeqS/iWTL4o790xO8HoxFNix8tFG6pHOrX1R4FtwsU/6H6Kbvcp+5cyeqPbTaU9uzpUTDTX+IyW2yYMLQb3n/wKsToNEF/7Rw4cOBY7969SRfJIxo838CBA4ft2LFjs5ATjnrvd2zJazjp2g0Nz6P01Zsa/d7Yxz7AgazCoBIXpVT8Ne8uDOjiub5fyJH/I5C3oIbgoIt4aBxZJIBFDFRKAaPUmYjNHOdk4dSYYok8WTIuYmP5bjwgtQNKh3NlUmN3OstpxZL5rlxJ38EAU7lwWWNnVIDB9TIQC4wRU3NAmgmIony30KpaOGR2/LQ/Fq+sTMXxYhVUHoQS2wJEQSQuk9mCCUO648unb2RB2aFYx6I0nwEDBgzft2/fv96+0+BpxWKx3GQymeRyLyWrPYAKhfZ67ddGSxcxUEHW28diXNf2Dc6LXyFJm5/W1fZBeVI0dROXQuHFOX+wmrjS4qOw5YOHmyyvrT54p3qEpQrIVwIFCsBERSjcxBPaUzOScStHkKVDqT0RNqc8NEOADSBSJBI+pXUmmAtVwKCZFN2LbpVOVYuaEj+hgMaKV39Px3Mr0qBT2yAWeVF2bcmriDzvnbh69fJMXMXF3onLXbyV9PmpDmnXZKycdzcLOwrlXbBarQ6VSlUvWr5W0xo7yObNm3cNGzasv68npdUW3fSvwPk4/ZKYLDC8NbXBhuw+nocLn/y4WiqWpGiN7ZM8hgvYVCqPK4f0VZlezx6GrbAYVV892czlqshC4YAlk4DCuJaxqMhmfyQX6nCGMxCZaVzhDIFYPozESHNMBpxWApVy57RXLIBkKY4tyeJ07lNCOFmfIQAvseNEpRyfb0rB2yd7wiZXQSJy+qNIokZTUICWCmNcnMfZBhEap9V67GJiqxVizrMEDVVqr9KbcN8Vw/HsLeNYJfGm6KZbtmzZfc455wxo6DuNtqNPnz7j9u7du8LXkxKp3/LtOny/P8fXXXBJl3b4ZeoFDcradLnlFSbTQXCIxajs1Mnn49dqn1iM57pG49lbxzc7VzBYcoGFjwN8CwxwZDIFIqdAYYIZSLQ4486YLy2Au0dBtGRd5qmAEoWT1Hw1qOyu78WbgfYm5zQ4VFNKmR16vQhzd3fG9yd64BSvhubESebYb4nxW1WpqawCT6Cg8CBFVSUeHNABc6ZNRFOCpomDBw++ZPfu3R5XE93w6e7bbDaHkNVF8h8pnljYqNSNG7zdgaNPXYn0GM+69GSqxl7xXLWDPhDisp7Mgu3bp5pc+sM7HEDFWuCbBd6j6lsKqh3/PNDeDKQanWENATnUXVNjElfMdsWO0fvJV2vM/Q+yDinMgvx4bLob1DUudjgONpQlzcBPW6V4d8lGHDl5BtoINas52BJ4rCpA4nLYHYg6cxrLn56CQd3TgloPNViriW74NFdauHDht1OnTr3R15MTKXRPjMLx8vqaWZ4gkojRcfb3sLxxG2QeBi+93fp3TcaBUwUB35RnLuzXgkiLIAZ0Y4Hxe4Hfdzn9Oi0V1XwgAgpUTic8gSL/yfrR2fwIMnUF4aocQDe9S/iQwrhlztgx+mkjVTwPgbA1l9OKlUCR0iXJwzvVLGi6S347ssrouH5rjDnbKIu+CAntRuN/l4NJGxPMVhv2ZZ5h7oz1e45j18l8VgbMbKaajWJnxZ+WYdvXgjMrTAR7pR6JPId7h3fH/y4ZitioCDQnPvroo8W+fM+nO9qlS5eeR44cOSDEPF52MAdXf7UOQjCyfTT+uv8Sj2+vrYezMfGZz1iGub8Wl6O0HMb372mhCbQ8sHcqsNE1FfNxF78QinHk9kWRBdZBDyRanb8H44Q0VaUgWJpauoNgaxpVIh/aRfsQOapsTmc/ERpNe6m91WlWNfapeUz6tyIV6PGhoGuh5P+9J89gycb9+PdgFo7lFkJvskJKpeyZOKVb9DTwYh2eLK7/DFJnSTV2PouVBZz2T4zE81cPx6iB3dBSQIZFjx49+hw5cmR/Y9/1+U7x7lwHAUmakns/hdz3Mo3gHQ68cflg3D+8h8eGRUx8mlX58Ze4+lQUY/sHD6HFgrcDm6cCuyiZ2uXPoRABsmLYqpyzVBhzntNPcliTv0jiGtysaIaHxGvyIdFGUyibK7SCwi0o2ZqCSGlgsxgsHx3mjV6HiyxkrilcimtKGYzQC2bRua6J/GSUZ0lkRtdCnwlx+tclKm/Ns3HA5DlAQkbQytxTeXtS8S3TG5ko5pHsApw4U4rM/FKcLqlkfl0q2EFFb+12O+yu4eewOX16Itc0TspUUMVsFd8RHwe5XIZYtRwpEWp0jdOiY0IUenZIRFq8Dgk6DWKomG2LfHE7/VtSqdSnHujzstqdd9754Pz589/x9fvUB+Zdew6eXbHb6TsVN36z6GE8smQbxndNRmdWfqz23y8c3A0bD+cwGWWhoH0euOwcvyooNxlEEuDcL0jLFRDpnYPdnaZCgz4UDmgiAvc0ikjMJHXGj1VInf8momPfE3Dj6HsSV5sLlM4AVfosyeSUhqapnL/X4t6Pjk/Bo1qTM+5L7HLSEyEToeldMXAmNzm7AnK9SQGxY9f4ne4JbSoNcM4DQEK6f+2teyqRiFn8MZFqthGGMKOnD85m2O12/v7773/M1+8L6j1CrS6qfhJ/1UwopBKUdu/uc6l7jgT/376j3uc7c0tw7gcrXKv2wuZJtvIKVL11BysS0OLBO4CtIwBZTHM2osYgpsBSGZCtccriuInJn0O6raU4M9DVLYMUqldJ3fjyGjFyokasReaNLwGGbqxXlTyM5nPKuyHkiYiWL19eqyhjYyCT9NJze7IQBCGQqZXo8MJiZxWTGhiYEgu7wSyYtAiS8orWQVoEGijDNgLS6OZshMsp7ZpmUiGNvhXAeSXAsBKgZwWQ4LJ0KMzJl0fiJkGaQlYogC2xwNYY4LgWMFGVm2AvTNRlKdf1uGtWetrYdJamnFHAsE1h0moiLF26VJCgg6BXXUpKSvesrKxDQgT7KKE07srnYOnXRzDhdIxS48CTk2pJvq4/WYCxH68UJBpIZ008nYuchdPRukAO+1sArrRlR2yTn42mZnlqoEzm8ssJ7F3umLEY0vEyOFOUGJr4uqmPyqKBvl+1ZKdCmwIptGRkZPTMzs4+5Os+gkwhqnJtMBhMQvaRySS4cKDXXMkGcbLcgNu+Xl/rZX5eejz8KSs7sEMAlaqbDSKgz0JA2yOAJcQmAMVx0YpdZz0wpBQ4pwToXQ7orK4FBh+OIXJZYpUyYF8UsDkW2BENFMmdlliTcAgPaHoBfcKk1ZQwmUxmIaRFEDx5nzhx4pVCXF1kLX346NXgPRRwbRwifLc/G/f9sKl62JKl9dGU4dWCbr6iM5UTb42gaWO314DEyc4UoWq4kqTdOYHkgCarh9JqKIiz2LWRBUTOdnJa06qiO62HttA02DkdUzucPqxzS5xklkEVgjjXCmYDPCyq6dwXA5laYFMssCUaOKlxhkW4rz2YoHubOAXoPrdlW7dt0Cl/6aWXehQLbAh+PaGqqiqjVuuLsp8T1MV6z/sFx8qMfjaCx73DuuL/Jg1l3yWxNu0TC2H3kGvoqTtTbuNLfdvhqevGovWCB8xngJ23AQU6oEjh1JOv6cZp7EZWO55dDnKKZSI9rDiLM9m6WpE1hAPXrV5BOYukskpk6nb0+3pad5gItZtWKuk6XAq4wg7kPp4F6P0FoEoWtl8YAcNgMFhcXCLoTeRXlvHLL7/8f3PmzHnG14A5+tbORy9D7NWzoFLWTgPiNBqYEhMbPcL7/x6F0cIxa4vWHlY/MAGjPlxZL2hPm5MDSZ2kUbojUecGHoPTvCAlh/bA0O+BP6c5p2dCn17N1UCKdyL5HPJL0eaOE6HYMIo4J8UIqtwTbH0st5Z+OwvQzuz8jAiYLEUKnSDZaHfcmjewquDk4Jc7q3G7uzyFjpBvjLT7SRaHIuZrBZfWCYdwil0B/X8AZFHBvc4wGgXNml599dW3/fGD+P1qtVqtdiFFY8lKmvb6YizbUnsqa9VqYUxK8vEoPAYlxWDdfeNZ2k77Z75BaR3/ScSpU/WJi+fx/C3jWJZ72wAP7J8JrDsBSEKkcOHWx5LZnUGktDWFw9yt60WBpcUK59TQn1iymtalu6IRERspS1RHy5uBa34M3T0Mo1EOUSgUft18v1+nb7755ruCTiQCPnj4KhYx7D9E2HGmDNrHvkBRlRlXDvK9KjGlWrQdiIDes4CpMwFxSWj89sw6IxIRA/kql8M8BtgaC+Qp/wvQDDbc4QgxHNC1ChhUBpxXDAwtAXpUANEWl5aYa2vIV8YsM1caEv1OBGiWOq06eQ9g8s+UWBv8awjDJ3z00UefwU/4/epUKpVao9FYJSS/ivrYi1+uxHu/bqye4gmzuP6Dg5z9lOpQ5/weLS4A147sg/cfEuwDbOGgCHQbsP0FYOspNJmQenW6DO+clpFOVpS7alFTOLZdRMS7ppkUHU+KqxQLRtH+tFBRKy7LHX/KCk0Clz8LpJ7dkerNDZoFqVQqrcViMfizv982stls1i9dunTFxIkTx/kqeUNfmnHjBXj7l/WQBvimEwvYn857ONcH6edWB4qXkgFDXgb6nAC+nw4YVL6viomCoBJRJXduXIQzhzLNCMRaXdZYqEishq+KQihkNiCyTvERd9oOI3f6wAZ0/xhQtnZfZ+sHrST+/PPPS/0lLQTas+RyuVKv1xtlMpmAZG3g61Xb8fjHywKyuLzBk8VFoODX/J9moU2Dbm7u98DuzwG5pv48ym2F0JSJgj3JOW+ln2ShiGs7xUUBWmNEGrTq18HonHI2iSXmAbYqIO1BIPGqcJhDCwo4VavVaovFIigmtCYC8kparVbzb7/9tnTSpEmX+Wx1iYCbLhqMGfN/h9XugMhug8Tkof08D7vamYTq6W9sH0+WhcNzvFhlm/JxeQHdj9TJQPJVQOarQMlaQNpI1IqoztTLrbrAEq1lzkRlmnrBxwrXNa0x0sgiTS0ChV0kmZ0rlU1BYnYzED0a6DhdeDWlMEJqbX3//fc/BUJahKD0II7j7L7KUbix81guxj/1qXcNIp5HWbduHtOESPtbd+KEoDeoyWLF6e+fh1bVSvIVgwIeOHQ/YDgOiKX+P27mpCf2lzrLkJHcMiuVJnClj0BxW7S610XvtMjsQY4ds3OAtjPQ/b2whdXKpWsaQlCCdObOnfuG0Ej2AZ1TEBfhT/KOf1Ap5Fi18xjOLoiAHu8D/X8E4i4BuHL/DsPIhQJW7U6V0uHFzkTrAWVAeo2I+IZW+dxgCq8i4GgEsCEO2BYNHItwkmIgEfFcGRA7Hhjwk/Oaw9HvLZK03n777feDcaygvOZkMpmysrJSr1QqBXncieyir3iWaXaH2uIiDO+Vjp9n3YazGoW/ArmfAw5jcKdQpBJBK3hEQG7JZfKbOXycYhJsru+SFDQ5+CnXkYiO7V8nkNSdpiPRAMm3AQmXe5AuDaMlwWw22zUajbqhsmO+IiiRdxzHmZ966qmXXn/99ZlSqdR3Rz2A/116Hhas3IamwMb9mYwsW2KFliZDwhVA/OWAvQo49RZQ/Dsgiw3cQnGXC4u0A5EunS33Iculzqj4MqroU6PX1T2l+3O9zBlrBU2NAh20GuQqZCvmSPoTuOYjQKar0faz+Lm2Amvr0UcffS4YpBX0J11eXq7X6XQaoQthkZfNgLpOKlAoLC6OsyFn8Uxo6p7rbAbdX+NRZ2Xt8n8BhwWQhMgP6LaayM9FTn9K83ErlbpjrmoqQbh/OhyA1QzEpwP9xgPdRgHS8DNsTSgtLa2MjY3VBet4QSWuq6++esq33377rZDK14Q9J07jgsc/ql19x+FAGammeqnM6w9xEa4Z1RfvP3iV4P3OGtitQNGvQP5PTr8R0z1jIuehPS/TyucBeh9TiIaB1CziAPlgYNAkIDqcAB1q8LT+YjDhgXd+wZdP3xC043Ic57juuutu/PnnnxcF65hBt60LCwtLY2JiooTUYSQMvOsN5JVW1frMm8cikOleWbkB1lWv+bXvWQeSkCaHvikbqNgMlK4FuCKA5wCxmqKAAwv4otAV8rVREK08CYg+D9CdA6g6OMX8wpLJTQqDyYrU62YxI7zst5eDNkUsLy+viIuLC6qcb9CJq127dsk5OTk5QnxdbpLSXTqjnnpEKLBw+nUYP6R7yM/TZkE9225yVuE2nwIshU6VVmsJ4NA7ZWJ4lytDREKACkAa4dTQJ3+aIhFQdgAU7QGJOrwC2ALAk+LwDS/BaLVBIZMi+7tng3Jcq9XqyMjISDt9+nQegoigp8Xn5+fn/fvvv/+OHDnyPCH7Ecu9+8CVePLT5Qg1/vfWT8j85pmQn6fNgqxdqRqQdgU0/qnbhtGySGvCU5/AYLGxR9unY7ugHXvz5s3/Bpu0CCFxXIwaNWq4zUYF4IThlnFDENEEFlel0YzdJ/JashhyGGE0GSZM/xg7j+VVu4ynjO4flOMSB4wePXoEQoCQeVxvuOGGG202myBuoBu3d/7jsFrr5xoGE5TgPf6Jj+tVEQojjLMJnM2OgdPewK4TZ6p9xgajFdeO7hfwsWns33zzzSELmgwZcf3www+LzGazS+LSd6gUMrz34FX/qfCGCHaI8M3KHaE9SRhhtEDwPA+LlUP7ybOQV1Z7QUwhF7MxGCho7C9atIiqjoQEIV3jjomJiaalUCH7EPNff8FA9O+YJLgghhBQ7cn73v4J+aWVITtHGGG0NPAAfly3F7FXPFevxJ/DweO1eygDIXCHfGxsbEi1sENKXBzHWV5//fXXhU4ZSRzwz7l3obIqoATyRqFWK9D/rjfYlDE8aQyjLYPnAZvdjiH/exP3vfsLNBqXakcdcU6KcwwEZKi89tpr86xWa0jlWJokR6KgoKAkNjY2WkhsF1lbp0sq0WvqPM+5jEFErFqBA18+HU4YCaPNktaf2w7jxpe/hsxDZSw3EnQa7PvsiYBitvLz8wtTUlKCtyzZnMTVrl27lKysrFNyuVxwEvYb36/FvMVrISLR+hAiIUKFrR89AqVCHiawNgorZ0NJhQH5FQacLq1CXkEpjuQWI6+4HGWVRnA2ByI1CnRKjsO4QV0xbjDF+rXe3FaeB8r1Rox/6hOcOF1aOzOlDsgaW/fmfeiV3i6gKWJqampKYWHhGYQYTfZE7r///kffeuut14VG1NMUbvRD7+FIXjFCDZPZgp0fP8Y6buvsqmE4waO4rAo/bdiHJQfz8O/xApjUGtilEvBSCSRiEaRGI7S5ua7vi6pDAZxS+k7HQVVRBUzr3mqVN5XngdlfrcD/ff8PlORsb4R86a/5P77g9/nIHfT888/PnjNnjv8HEYAmHZ/bt28/OGjQIKonLwj0Juxw3WwmLNAUS8Sj+2Tgx1m3QSwSh2WdWjCYO6GoDOuOnMaqQznYnF2ME3orbGIxRHI5e3beOjgjrryG4yLNVg4lv7wIaQOWSkvE6l3HMXnWQogl1H99G+L/97/LceMFAwMa20OGDOmFJkKTEpdEIlGZTCaDEI36mp006rJnoAwkQJVUBnx8kFUGMz54+GrcPG4Ie0OH0bywU9K93oSDWYWYv2Yvfj6UC6NCDSikkNVZHasJ3svzlhoMiGiEuMoqDbCsmNcqpoo8+ZJLq3DOvW/BYLHWXjEk86uBe1RaWgVu9RsBWVtKpVJjt1MeWNOgyZ/IkCFDRmzcuPEfIcVk3cSVVVCG3ne+Bo3SD9kV6vg9eniUyfG6C1XAPngIb94/ib2NWkMHbks4mVOId/7eg+VHzyDX7AAnFVdXd/K1wEHUkcPev93I8+wQH4WtHz6Mlg4Hz2Pc//2GtQWVEEvFNPGt/XeJBDEHDngkL0pwWf3G3ejbsb1f/ZtIa/jw4aO2bt26AU2IZhmJS5YsWXrppZdOFOzv4oFNB07h8mfmQ9rA6ohHuGVyBMaGRR07xk5sszvw0h0TMO2Sc1rd1KE1gPyLm4+dxpKdJ/DDwVwUWBwQKeSBWbtEXEeP+rWr2WJlVaFUIV7R9he8u0L7L/9izvojkDYwE2HEdfCgR+JKi9OxRSmRn6uIy5cvX37FFVdchiZGs5kQer3epPEUTNIIiHc+WroJzy9cIewNEQhx1QDFlp3TuwOWvnQHEyQMW2HCQQPO7uBx6kwxpi/egCXHCsBr1JDJg5zz7ydxUftuuWgQXrv78hbp4+R5Hn/sPoGJC9ZCrm28boM34qqsNMLIpsL+tcNoNFr8GcMtUh3CV2RkZKTn5eWdEervopt896XnoMJgwps/rWty7o2MUDE/S9r1L0EuFeOSoT3x+JTz0bNDYpO2o7WB8k//3H0cX24+hk25ZSi08xBJpSyDQRodiZaEvunt8Nrdl7U40qJ37opth3Dzz9tRDpFPpOX9WDx+nO1/KiHHcXx6enoHNBOajbiKiooKLrzwwgv//vvvVUK1u8jx+OSUMdh74jT+2nmcdf6mhoyW1gEs33oIv20+CKPJgr6d2uPeK87DiN4ZSI2PYt85G0ES2SQKue1kPr7YcAArT5XArpCz6QxTb5ZIEWAh85AVKh3cJQV/zL2ruZtSC3TLjucV48LHPmQrnZXdugWU8kKkNbRbGi4Z1sMvcibSGjFixIU0htFMaPZ3yvz587+45ZZbbhbqrHc7JW955Vv85UvZsSBNFX3pFCyJlbNDrZBiaPc03HrxUIwf3BWaNlrT0Wy2YsPeE3hj9V5sPVOJSqkMIrcPUlTXVdyEEDBVJB/mMzeMxSPXjG7eNteB0WzF4HveRGGlARLXVK+8SxdBx6g7VdQqpDj+zbN+XSP17c8///zLO+6441Y0I1rE89m/f/+h7t27dxPqrHffyNvnLcLyLYcbtryaiLi8wWK1MaKVyyTISIxGr4wkDO6agj4ZSejRIRGxEeoGI5ubGxZyVpfqseNUPrZlFWLHiXzsLjehlGTXJERUktAmvjYAeXkZ5HpXZaE6kJoaFyjh7Q5seO8BdGkf3yKmh7yLsO5643ss23yQZXPURHkAxGW2cCj46QUo/Vh0IGf80aNHj/Xs2bMbmhkt4DExRQhJVVUV1WVU+ENeRAiTnl2AzYezvTvLm5m4Gmt/pd7EsvNjIlXolZ6EMf06YWDXFPTKaMfCP5QyCRQU9S2RMIJ2Vrn3//G5LUNyklttdpYOY+ZsyC0qx74Tp7HxVCHWnyxEtpGDheodalWQqhQQUyxcC4OyuAjKsnK/go2vHdkXHz16bYshLLPVhmfmL8dHy/5FhNqz37vcT+Ky2BzIXvQsIr0ctzEYjUazRqOJcFXAbFa0gMflRGRkZFRxcXGpP8GpBOKjaa9/j6VbDrY64mqI0Bx2Byq6dnHGEPI8JLwDaocdKp6HwmyG3GhgQbkapay6xBuFa5D1RlYeXG9vo8XGrCaLyQIrz4Mj0rI7GFk67wgPY2oa7Gp1dV5oi+kcQSYuuu4uKXFsZThWp2n263T3SLKwflq/jz2/hlary/0gLsW2nTi5eCYSorR+tZH8WnFxcTGVlZV+lkNvI875uqAbcvHFF49bsWLFSn/Ii57zJ49fi+tmfYnVe09U+wNaM0jeh9I2KOhSVKOTG1yblAe0xSXETP4dXyz+b4WcSJEWHNpwlgCtbHZqH4fvZ96CjKTYZrey2LM0WfHiVyvw3i8bodUog76gw9OWnYv9C58KiLTGjx9/cUshrRZFXIQ1a9asGjdu3HV//fXXIqErje6BvmjmLXjs49/w7d+7QtPIMFodyPFOoSs5i56DxjVNErWANk146lNsOZTFkqCJtEIBR+4ZmD9/FBKq/O0HKDJ+woQJN6xevfovtCC0OLNk7dq13y9cuPALocqpbpD/5427L8ej14xiy9thnL2o0htx9cg+2P/Z4zjzwwvQqpWMsJqTtLYczsawe99C7JXPYW/mGVaOLxRBzDxNiTOzcOqNOyFlaUD+Fbv46quvvvz777+DVsi1TVpcbtx5551T09PTO48ePXq4lO66H+T1xJQxiInQ4KnPljOHNusc5ChqoQUyiGKFdmDmYPe0DxXMpev043ge708jSbpNAVYcmArUehqCNdps5ezQyKSYedvFuOvSc7wWFW5KlFWZ8M2q7Zj+yfJqy8qfVT0G16KKqJGvKXPzkPvZo4j005KjFcQNGzZsnjp1asgKXgSC5n6mDUFcUlJSqtPpIv1ZaSRQp6Xct6sXbYJEJkXswYPghQ7AJnKEGOPjYYnyLNPtrQXeKJjILPrYMcELEd5IXeRwoLRnT/azucCu6fBhr8+jpKwKd152LmbfPgHx5HBvZgcWLax8s2oHZn72B6osnHMlOFht4ht+rtTDT333HORyqb+WFl9WVlaWkJAQ73qntji0SIvLBSa4f/z48ez09PQUf8iLdpg0oBO2Rqlx7oernNZJc3tkG4DQlgX9Srzdm5Zyz2o8P5K5oXCGET3T8diU8zF2gLCVtlDgTEkllm4+gA9/+xdHswuh0SiYUkPQ4/NEIq98lhIbga0fPuK3EABZWtnZ2XmdOnVKRQtGC+mRDcNgMJhVKpXC3zcWvZ8qjRakXPU81NpmyQn1yeKyerG4hIIIOsofi8sLmMVFkkDNaHE56JoOHYbVZmMrgwufup4F7zYXaLpmtHDYd/I0nvplM9at34MYtazZVrN5nke/jklYOe8ev98zRFpU5EKt9jPQqwnRki2uasTHx8fk5+cXRUREqP3Zn55jpEqOU98/h5Srn0ekzr9l4TCaFrwIsHF2yEvLcEvP9rhv3l3o2zGJFfRtalAFnENZhfhh+zH8vj8Lh80OGDgHxEo5m5pFx0dBYmoyHb1aoPfTg1eOwIwbLwzIODYajaZ27drR9LDFo1UQl9FoNEZGRkaUlpaWRUf7JyVA1lpMhBqmv15Hxg0vwegKzgyjZUJeVoYkzoR5t12MtHYxiFQpEKFRsshylVwUdJ8RDX4LZ0NplRGFlUacLChlktB/HsnDsQoTeKUKEoXMtQwvBiRitIQceitnw/sPXoXrxw4I6H6UlZVVxsTE6NBK0Cqmim5IpVKpyWSy+hPjVRPkH+l266uoMoW09JsghKeKtcEmudUrwYBdIoLuwEGquQOK9bfbnelKlBEhpkVPhwNytYKFPESqFVAopJB7sMwqDWbozVZUcHZYVFo45HI45DLY1arqldNqrXoBydZUeEPaxBZXRaUBhxY+jfSkmIAGMjnjyRVjs9k4tBK0KuIiSKVSWWFhYbG/llfNVZ+7Xv8ev2za32RTD/JDVHTq6PGm8yKx4JADidEITX6+p6NBZLMH1SJxMPOi/vG4yAiY4oI3u9Dk5kLisZYoD7HdEdyIck/PnfJGO2YA9DyEwG5nlFrvcGIxog4foY4bQGs9nI6z49jXTyNKqwrY0kpMTIzjOK7VkFarmSrWBL0VyKStqqoyqFQqlb+hEhRl/+njU3DOHx1YfI20Kex+kQi8JHi3nC5cbLeHfiWQUo+8kIaIrJ4gghYAvF5TMM9Dm6fzuCw8wa90iVOfrS4cVHGInjuCh2itEoe+eCogq4Mc8SaTyRQTE0MrQi0zuLE1Rc77isTExHhaAaEH4O8xaGxPHT8Mm959AAajJbgNDCOMIIMS4kf1ysCBBdMDJi0aOzSGWiNptWriIoc9LdtmZWXl0hzd3+OQk7drSjzO/PgCVC1YDyuMsxsWC4dZt47D9y/cGlABESKtrKysPBo7NIbQStHqR2qnTp3SysvLywMhLzLlI9QKZC56DumJ0c7UlzDCaCGo0Juw/7Mn8L/LhwfkAbDb7XxlZaW+pQeXnhXERYiPj49bv379JpLfCOQ4RGD/vvcQ3rlvEgw+KGeGEUao0T5ai8qlc5AcHxUQaXEc5/jnn382unxarR6tblWxISxYsOCLm2+++ZZAwyXI4qoyWdBr6jymHS901cYml3teIaTjpqUJvOk8JGbPJEqfq4uKEXJQXUmV54oynEYNS0xs0E6lys+HxMMCF72RZBRuEOr0I3pGqSleziOCXakUHPEfmXmSFQipdzSbDRKbzWvBkbsuPRdz7ryELSQFArvdzn/xxRcL77zzztvRRtCmiIswZsyY61asWPGtv0qqbjiFEnjc/87P+H79XkgEdJ7KtFQ4FMHLmog6cqRZ8whppa+kR49mlW0mAohp6D4EE15cBaQkWtmpU9BOI6uq8hjOUlllxMnvnkW7mMiAByjHcfzFF19845o1a75DG0KbmCrWxJo1axaRWiM9sEBXHMlx//5DV2H9/90b9GV/wY3xtjVVE5rsTC3g/M10v8nKumBAJ1QufwVJAZKW3W7nXaQ1rq2RVkvojyFDREREVH5+/hmFQuFXAY6aYJTF87hpzjf4c9uRRmO+gm5xUYmtZlRoaAlJ1kzWpqksLi9gFlfHjkG3uMiyt1o4rH/3AVb9KVBrwm638xaLxZKcnNy+vLy8DG0Qbc7icqOqqqqcKpIcOXLkaCArjtXBiiIRvppxI3Z+/CgCm4SGEcZ/oAKv14zog6IlLzK1i0AHJM/zOHTo0BHq+22VtNo0cblg69WrV/cvv/zyq0BXHAnkJO2QGI2cH17A09ePBWdtVVkSYbQgkKx4qtWEA/OfwAePXBOUIhkcx/ELFy78uk+fPj1aQgmxUOKssR2GDBkyduPGjX/5UzHbu/+Wx+XPfIbNh3NqFaNlU0VPq098C3fOB1sBVah0awAKqE1xHyh9p7JzZ+HHq9E0ShK3ncjC9hduQP9uaQ0XMRYY7nDRRReN++eff/4OygFbOM4a4iLEx8cnZmZmZikUCnmgIRNuUBfPLijDpJmfI7uoHFIKg/Ci905mfHnXrkG76RKjARF5p4MYBpAKu5ewB8GHI+G/o0eYAmi9v7lqA4qauSCsR9AzInIKkiAgkV3MgQMsyVpvMGPePZfh7kvPZaqowbh+m81G/ixrx44dMwoLC8/gLEFbnyrWQlFRUYFWq1UuX758ub9VhOqCOh9NH3d+9Cj+eeN/UEgksHuLvA+yY9l30RUfj9fC29cqIRIxienJI/tC/8eruO+K4c6Cr0E4NMdxPPVl6tNnE2mddcTlxqRJky4bMWLE6GD4vdygMd87IwlZi5/DjzNvQUlpVbAOHUYrBHUsa3klHmivRN5Ps/HuQ1cFlcY5juNHjRo1ivoyzkKclcRF2Lp16waVSqXZvn37wUDiveqCOufofp3B/f06nr/5IthtoZdoCaPlgKbIjpJSPNIxCtZ378Lr906CSuFnKTIvU8OdO3cepr67efPmDThLcdYSF8Fut5uGDBnS67nnnpvlVMgJDoE5YxVFuPeK4She8iLm3DEBZrOlxdZ0DCMIooSsnl4pnkzXgvvkAcydNpGtFAZrgLmkaGyPPvrok4MGDepBfRdnMcJOCBcSEhLa79q1a2dCQkJCsBz3NZ3yJDP8w9rduGXJToi1wXGAS41GaPPygnIsIlV9WhpsAnPxGlwFpMBZT39rQ855UjgVZ+Xgm7vG47Jze0EuC74gJU0LSQGlX79+/c6cOZMT9BO0QoSJqw5mz54956mnnpoerLCJmnALa7755w7M/Gk9K7XpXg7nNBrBK3oijoO8yrMvTVlS4lkimoIeYz0lRfOwRkaClwqb1ojNZsj1+vpHE4mgKi31vBPPwxTjWSediuLyAmWOJQYDpBbPQpCqkhKPn9ulUlh1nmpD8DBHR0PUgHQz3UOHlUNHswHv3nQ+Lj63V8gqZhNpvf7666/PmDHjyRAcvtUiTFweIJPJFFRFW6vVqkNREdmpDsxj4/5MjHn4fcRERcCU0DR1FelvFf7EInmBrKICmsLCoB2P1DPsCkVwDsZCMjxbfZxKBUNKiuBD8g4eHYrPYOub9yEqIjC9dx/CHCzR0dFRHMeF5Xnr4Kz2cXkDdZTIyEjN9ddff7PNZgt6gh5L4BaJMLJPR3Cr3sAPM29Ghk4NW7hkWosEkb29pBT3pEWg8JmrcOyzJxAdqQ4ZaVGozk033XSzVqtVhUnLM8IWlw9Ys2bN+uHDh58nFotFgSZsNwSr2Ypr5q/EiqxSOCRiv3WYwhZX4BYXc7jbeUSXFuPFiYNw16QRISOqmlbW5s2bt4wcOfLckJ6oDaDVVflpDowZM2Zk+/btU/bu3bsvIiIiUi6Xh8RSlSvl+PX+S8Fxdmw8lI3rFq5BkUgKWQgcvmF4d7Zz+cUY106Djx+8Ah3axQiqr+ivhVVRUVHet29fcr7nhp9N4whPFX3E6dOnc+Pi4qKvu+66G0pLQxddSgOEVqbG9M1AwRtTUTXrWjxzTickinjYOVvrLMnSwsGLAJvRjM6mKnwysiO4T+7FipenIj0plllZoSItCnGoqKgwXH/99TfEx8fHhknLd4Snin7if//731NvvvnmyxQ6EcrpY92wijd+3YTn/z4Ii0YDMRwepy9EbtGHDnkpPCtCeffugs/t8LLSpygrhSa/wOuqp7ecTcg8r15WpKd7Xl3lqSCs8GDe6EMHPReyVatRnpoGVV4eXrp0MB6aMjbkU8GahEXTwunTp7/09ttvP98kJ21jCBNXABCLxfK5c+e+8cgjj9xHvzcVgRGqDGasPZKLd1btxuq8ckCpcCZ41yAob/C02tgQ6FiUKOyx8jPBU8wTKUp07+YlX5FH9BEv4oheFCiqxQwFtbzGfRABVNOWL6/EEJ0cT1w6FBcP6IQITXBi6nyBO8CZ+swLL7zwHMdx4YosfiJMXEHCt99++8O11157Nb21m5LA3DhdVI63/tqJ3/bn4bjVAREl8lIV5SAcu1pSRohigsOB8m5dPXYxIk7dsWPCks4dDpR1IyL08esUcmK3Q2K1oKPYgfHdk/HgpcOQkUw1UJsWRFikv7V06dJlV1999eVN3oA2iDBxBREKhUL11VdfLbrmmmsub6pphyeQGkGZ3oSPV+7A3DX7YZApINWqIObbLnGRfIxNb4SksgKj2kfh3osG4YLBXRGhkkPqzVJsAtC0eOnSpSsnT548yWKxnNVpOsFEmLhCALlcrnnttdfevOeee6bKZDJJc5IYA8/jaG4R/jyYjeV7srCpoBJGkgyTSpkuVGshrtLu3cHbHeCtHERmMzI0MgxJicX53dpjZLc0dE6Nh0zW/AvlRFYU//fWW2+9O3PmzGfNZnP91IIwAkKYuEKMZ5999tWnn376EYVCIWuOKWRDKCipwNLtx/DdtuM4XG5EBcfDIpOyKeZ/lW1cPq4QE5e7ejiLn3LwcNDGO1gsGwV79kpLxGXDumPMgC7olBLfZI50oVNCk8lkmTNnzv+98sorzzR3e9oyWt7Tb5sQjR49esLy5ct/UqlUSnGQ1DVDAYuVY8Vwy/RmFFUakF1SiX1ZRTiVmYfc0ioUllWhsNwAk9HMiIzl6LlIhNIuq/nE7oCxRw8mVQzeQaPauTkcrOCr6swZxEVHoF1MBNLjo9E9PRE9OyQyUcZ4nQZRWhW0zTzN8xXkvzIajaZLLrnkyvXr169o7vaEEUbQkZaW1uPXX39dQUGHNJ3g2xgcDkf1xtvtzo3+3cbgfna///776tTUVCpOEUYYZwfuvvvuR2gAsEEeRqsAPSt6ZtOmTXuguftPGGE0K7p169b7gw8++M49KJp7cIZRG/RMaFuwYMG39KzCwyWMMOqgf//+47ds2bLbarWGLbFmBL1ELBaLffPmzbv69OkzLtxRwwjDx6j8vn37nrN///6j4alk04Esq3379h0aNGjQuRKJJEjCYGGEcZZi5MiRExYtWvSTyWSyui2CMAKDexHBaDRaFi9evGTEiBEXh1fawwgjRBCLxYqXXnrpncLCwlIq8hEmMd+tKfcUkO7d7Nmz3xSLxepwRw0jjGaYUg4YMGDgzJkz5xUXF5dTmEWYyOpbViUlJeXPPffc3AEDBgySSqXycEdt3QgHoLZBpKam9rr77rtvGj169IW9e/fuGRUVdVZZFeXl5cb9+/cfWL169cpPPvnkq7y8vCPN3aYwwghDICQSiUyn06Xcddddz5w8eTLLbZG1Zsus5jUcPXr0xLRp057R6XTJdK3hDtL2Eba4zl6I4+Pjkzt06NBj8ODBvQcNGjSwb9++g3v27JlGRRoojaW5U5Mof5HSiQwGg/nAgQNZe/fu3b5z587d27dv33fixIl9paWl+ZRx06yNDKNZECauMLx3DpEookuXLmkZGRn9MzIy+o4dO7ZTXFxcu6ioqFilUqnS6XQKuVwul0qlMrlcTknklFgoUigUtSQaqAKzSzGBs9lsdqvVauE4jquoqLCS1EtFRUUpFTpdt27dqczMzL1HjhzZdurUqdM8z4dVFcKAJ/w/RzBaqx3XbR8AAAAASUVORK5CYII=";
const UGM_LOGO_PNG_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOIAAADsCAYAAABpGnqnAACXrElEQVR4nO3dB5RdV3kv8CtZZdSrpVHvvdqWu2xjG5sWOpjQjIkhoYQSeMCjkwAhleQBISSmJPQAoYTy6MVAaMaATTEGGwzuvcjdmnnrd57+k63je+/ckTQzkj3fWmfNzJ1zz9nl6203GiNwwMNpp512+rJly9YO9zhGYM9h9F58dwT2Ezj//PO3jx49+uXDPY4RGIH7LYwfP37CokWLrp0wYcLd06dP3zTc4xmBEbhfwoYNG54yZsyY3kaj0btgwYL3Dfd4RmAE7ndw0EEHHXTKKaf8aNSoURUhTp8+/fb58+dvHO5xjcAI3K/ggQ984GmLFi3qDSH6edxxx31tzJgxY4Z7bCMwAvcLWLx48fLt27dfjgDLa8qUKb1PeMIT3jDc4xuBEbjPw8KFC5efdNJJvx09evRuREgiug477LCepz3taf9ruMc5AiNwn4VVq1YdtW3btt9GHUWMhx9+eO/8+fP7CNJn27dv7z3jjDNeNNzjHYERuE/BpEmTphx++OGv7e7uvjWSz/Unf/Invbfddlvvj3/8494lS5b0fe5at25d77Oe9az3TZ8+fcZwj38ERuCAhiVLlqw47rjj/uqEE064VpiilIRnnHFG7x133NHb09PTu3Pnzt6f/vSnvWvXrt1NVe3q6up92MMedv3DH/7wV0yZMmXqcM9nBEbggIFly5ZtPuyww164ffv2L0XKlTYg4nrFK17Re/fdd/eWgCCvvPLK3pNOOqnv3hDl2LFje48//vg7TjnllE8cccQRf9jd3d093PMcgf+BUcXvIzCEsGTJkmWjR4/uuu666xpz5sw5tLu7+7C777573e23337YRRddNPu2227bbW96e3sbXV1djVNPPbXxvOc9r3HyySf//w0cNar6Xwm33npr421ve1vjP/7jPxo/+clPqv+7LzBu3LjG8uXLdx500EG/GjNmzC/uvvvu3+/YseO3EyZMuNY7rr322t/ffPPNV02dOrW6d/To0dX3e3p6Gtdcc83lN998801DtU73FxghxEGABQsWrBg7duysefPmLb/hhhsaV199deOee+6Z2tXVtW7KlCmH3HXXXcvuuOOOhbfffvvoO++80/+q79UJCvKPHTu2sXXr1ooAn/CEJzTWr19fEUbAd97xjndU73jNa17TR3A+v/322xsf/ehHG1/84hcbX/rSlxDRvRGgINDy74MOOqgiwoQkfW6c99xzz50zZ868Z8qUKbfdeeedP280Gj/s6en59s033/zfN95445WDsJz3CxghxL1dwFGjRi1YsGDb6NGjHzJx4sTj7r777m3XXHPNtLvuumsUxN25c2cfgdWRvgTE5ZowYUJj5syZjWOPPbZx2GGHNR760Ic2Vq5cWRFGHTz3t7/9bePoo49u7Nixo/HlL3+5ceSRR97rPe67/vrrG//93/9dXT/+8Y8bv/71rxuXX355Ray5p5SuzZ7RZg0aU6dOlev6466urg/fcMMNH7n66qsvHeBS3q9hhBD3AMaNG9c1e/bsYyZMmPCHPT09D7n88ssX3n333ZXq1nSRR42qLtKFujdjxozGokWLqmvTpk3VzxUrVjSmTZtWEeGkSZMqSVgSQzMiJk0f//jHNz772c9WhLJ06dLG1772NWpv03GUxGS8JOSFF15YXQjysssuq1TZm2++uZqLn7fcckt1r9/bzbGc59y5c++aOnXqNw466KB/ufDCCz91T0T+CLSEEUIcAMyePXtZV1fX6Y1G4/SrrrpqOfwqkTuIOH369MbGjRslZFeq5LJly9iBFZH5yQ5DlO0kZDvwTnbgi170osY73/nO3aTYAx7wgMYnP/nJxpQpU/bo+Z6F2HyXNI9UZ8tee+21jZtuuqlx6aWXNs4999yKcL/+9a9X/yu/Hxg/frz5n3fNNdf86aWXXvrNPZrsCIxAYNasWUtXrlz5rzNnzry9jNO5DjrooCpk8NKXvrT3P//zP6t43k033VSFE+LJdO0LyLOuvvrq3gc/+MF9YxDWmDp1ahXS8PdjHvOYagx7+958vz6H8vfrr7++98tf/nLvc57znN45c+bstjbx2hrbli1bPtbd3b10BKtGYMAwZcqUGUcfffQ/dnd3VwRYppMtXLiwQr6zzz67984779ynBNcKhCv+7d/+TblT3zgwgte85jW9l19+ee+jH/3oPgI48sgje//7v/+795577hn0cQHvuOGGGypmhEmMGzfuXul3S5YsuWndunXPVDUygo4j0C+MHj169MqVKx+zcuXKy0ruTuLIVvn7v//7fSJxOkVwBEjSPu5xj7tXbPDlL395XzyRpDz66KOrcboQA+L8/ve/PySMIkAbOOecc6rx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";

const KKN_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220"><circle cx="110" cy="110" r="101" fill="#fffdf4"/><circle cx="110" cy="110" r="92" fill="#124b68"/><path fill="#438fb5" d="M0 72h220v18H0zM0 143h220v15H0z" opacity=".65"/><path fill="#f6c453" d="M68 106c11-19 38-29 61-20 17 6 28 17 39 29-25-9-44-7-58 8-10 11-27 9-42-17z"/><path fill="#f38d3d" d="M68 106c18-12 43-15 63-5 10 5 18 12 25 20-21-7-38-5-51 7-10 9-24 1-37-22z"/><path fill="#fffdf4" d="M-8 116c33-26 62-25 86-15 18 8 34 23 61 25 26 2 48-10 70-28 6-5 11-3 9 6-19 30-48 45-80 43-30-2-48-19-72-25-23-6-44 0-66 15zM-11 145c31-18 57-19 82-10 26 10 43 30 76 28 31-2 54-17 78-39 5-5 10 0 7 7-21 34-52 54-88 55-34 0-54-22-80-31-22-8-44-5-69 7zM29 77c18-22 42-35 69-38 17-2 38 1 53 10 12 7 22 19 22 29 0 12-14 18-30 17-18-2-30-13-45-16-20-4-43 3-69 18z"/><path fill="#124b68" d="M111 75l10-25 8 25 25-14-9 24 25 3-23 10z"/><circle cx="110" cy="110" r="92" fill="none" stroke="#fffdf4" stroke-width="7"/></svg>`;
const DEFAULT_LETTER_TABLE_ROWS = [];
let letterTableRows = DEFAULT_LETTER_TABLE_ROWS.map((row) => ({ ...row }));
let letterSignatureImages = {};

const EMAIL_TEMPLATES = [
  {
    id: "undangan-rapat",
    name: "Undangan Rapat / Sosialisasi ke Tokoh Masyarakat",
    subject: "Undangan Resmi: {kegiatan} - KKN {kelompok}",
    body: `Yth. {nama},

Salam sejahtera kami sampaikan, semoga Bapak/Ibu senantiasa dalam keadaan sehat walafiat.

Sehubungan dengan program Kuliah Kerja Nyata ({kelompok}) di {desa}, kami mengharapkan kehadiran Bapak/Ibu dalam acara {kegiatan} yang akan dilaksanakan pada:

📅 Hari/Tanggal : {tanggal}
⏰ Waktu        : Sesuai Undangan
📍 Tempat       : {lokasi}

Kehadiran dan masukan dari Bapak/Ibu sangat berarti bagi kelancaran program kemajuan desa kita bersama.

Hormat kami,
Tim Pelaksana KKN {kelompok}
{desa} - {kampus}`
  },
  {
    id: "reminder-presensi",
    name: "Pengingat Jadwal & Piket Posko KKN",
    subject: "Pengingat Agenda Kegiatan: {kegiatan}",
    body: `Halo Rekan-rekan Tim KKN,

Mengingatkan kembali agenda penting tim kita hari ini/besok:

📌 Kegiatan : {kegiatan}
📅 Waktu    : {tanggal}
📍 Lokasi   : {lokasi}

Mohon untuk hadir tepat waktu dan mempersiapkan perlengkapan divisi masing-masing. Jangan lupa untuk mengisi logbook dan absensi harian setelah kegiatan selesai.

Semangat mengabdi!

Salam hangat,
Koordinator KKN {kelompok}`
  },
  {
    id: "ucapan-terima-kasih",
    name: "Ucapan Terima Kasih atas Bantuan Kegiatan",
    subject: "Apresiasi & Terima Kasih - KKN {kelompok}",
    body: `Yth. {nama},

Alhamdulillahirobbil'alamin, kegiatan {kegiatan} yang diselenggarakan oleh Tim KKN {kelompok} di {desa} telah berjalan dengan baik dan lancar.

Kami segenap mahasiswa KKN {kampus} mengucapkan terima kasih yang sebesar-besarnya atas bimbingan, arahan, serta dukungan penuh yang telah Bapak/Ibu berikan kepada kami.

Semoga silaturahmi dan manfaat dari kegiatan ini senantiasa terjaga.

Hormat kami,
Seluruh Mahasiswa KKN {kelompok}`
  }
];

// 2. HELPER LOCALSTORAGE
function getStorage(key, defaultVal) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultVal;
}

function setStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
  const changedAt = Date.now();
  localStorage.setItem(`kkn_local_changed_${key}`, String(changedAt));
}

// 3. TOAST NOTIFICATION
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  const isSuccess = type === "success";
  toast.className = `flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl border text-sm font-medium transition-all duration-300 transform translate-y-2 opacity-0 ${
    isSuccess
      ? "bg-emerald-50 border-emerald-200 text-emerald-900"
      : "bg-rose-50 border-rose-200 text-rose-900"
  }`;
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full ${isSuccess ? "bg-emerald-500" : "bg-rose-500"}"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove("translate-y-2", "opacity-0");
  }, 10);

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

async function initRequiredAuth() {
  const gate = document.getElementById("auth-gate");
  gate?.classList.add("hidden");
  document.body.classList.remove("auth-locked");
  return true;
}

function initializeAppAfterAuth() {
  initTabs();
  loadSettings();
  initLetterGenerator();
  initEmailAutomation();
  initLinks();
  initSchedules();
  initTeamAndProfile();
  updateStats();
  document.getElementById("settings-form")?.addEventListener("submit", handleSaveSettings);
}

function initTeamAndProfile() {
  const grid = document.getElementById("team-structure-grid");
  if (grid) {
    const photos = getStorage(TEAM_PHOTOS_KEY, {});
    const memberCard = (member, index, extraClass = "") => {
      const photo = photos[index];
      const avatar = photo
        ? `<img src="${photo}" alt="Foto ${member.name}" class="h-full w-full object-cover">`
        : `<span class="text-xl font-extrabold text-white">${member.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}</span>`;
      return `
        <article class="team-person-card ${extraClass}">
          <div class="team-person-photo ${member.tone}">${avatar}</div>
          <div class="min-w-0 flex-1">
            <h3 class="font-bold leading-tight text-slate-900">${member.name}</h3>
            <p class="mt-0.5 text-xs text-slate-500">${member.study}</p>
            <span class="mt-2 inline-flex rounded-full bg-[#eff9fc] px-2 py-1 text-[10px] font-bold tracking-wide text-[#266a94]">${member.role}</span>
            <label class="mt-2 block cursor-pointer text-[10px] font-semibold text-[#438fb5] hover:text-[#124b68]">
              <input type="file" accept="image/*" class="team-photo-input hidden" data-team-index="${index}">
              ${photo ? "Ganti foto" : "Masukkan foto"}
            </label>
          </div>
        </article>`;
    };
    grid.innerHTML = `
      <div class="team-tree">
        <div class="team-tree-root">${memberCard(TEAM_MEMBERS[0], 0, "team-person-card-lead")}</div>
        <div class="team-tree-connector"></div>
        <div class="team-tree-branches">
          <section class="team-tree-branch"><h3>Pengurus Inti</h3><p class="team-role-description">${TEAM_ROLE_DESCRIPTIONS.KORMANIT}</p><div class="team-tree-branch-cards">${memberCard(TEAM_MEMBERS[1], 1)}${memberCard(TEAM_MEMBERS[2], 2)}</div></section>
          <section class="team-tree-branch"><h3>Koordinator Lapangan</h3><p class="team-role-description">${TEAM_ROLE_DESCRIPTIONS.KORMASIT}</p><div class="team-tree-branch-cards">${memberCard(TEAM_MEMBERS[3], 3)}${memberCard(TEAM_MEMBERS[4], 4)}</div></section>
          <section class="team-tree-branch team-tree-branch-wide"><h3>Koordinator Materi</h3><p class="team-role-description">${TEAM_ROLE_DESCRIPTIONS.KORMATER}</p><div class="team-tree-branch-cards">${TEAM_MEMBERS.slice(5).map((member, index) => memberCard(member, index + 5)).join("")}</div></section>
        </div>
      </div>`;

    grid.querySelectorAll(".team-photo-input").forEach((input) => input.addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      const index = event.target.dataset.teamIndex;
      if (!file || !file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => {
        const updatedPhotos = getStorage(TEAM_PHOTOS_KEY, {});
        updatedPhotos[index] = reader.result;
        setStorage(TEAM_PHOTOS_KEY, updatedPhotos);
        initTeamAndProfile();
      };
      reader.readAsDataURL(file);
    }));
  }

  const modal = document.getElementById("profile-pdf-modal");
  const frame = document.getElementById("profile-pdf-frame");
  const close = document.getElementById("profile-pdf-close");
  const inputs = [document.getElementById("profile-pdf-input"), document.getElementById("profile-pdf-input-tab")].filter(Boolean);

  const openProfile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      showToast("Pilih file profil dalam format PDF.", "error");
      return;
    }
    const url = URL.createObjectURL(file);
    frame.src = url;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    modal.dataset.objectUrl = url;
  };

  inputs.forEach((input) => input.addEventListener("change", openProfile));
  close?.addEventListener("click", () => {
    const url = modal.dataset.objectUrl;
    if (url) URL.revokeObjectURL(url);
    frame.src = "about:blank";
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) close.click();
  });

  const fullscreenButton = document.getElementById("btn-team-fullscreen");
  const teamTab = document.getElementById("tab-tim");
  fullscreenButton?.addEventListener("click", async () => {
    if (!document.fullscreenElement) {
      await teamTab?.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  });
}

// 4. TAB NAVIGATION
function initTabs() {
  const tabButtons = document.querySelectorAll("[data-tab-target]");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab-target");
      switchTab(target);
    });
  });
}

function switchTab(tabId) {
  // Update button active state
  document.querySelectorAll("[data-tab-target]").forEach((btn) => {
    const isTarget = btn.getAttribute("data-tab-target") === tabId;
    if (isTarget) {
      btn.classList.add("border-blue-600", "text-blue-600", "bg-blue-50/50");
      btn.classList.remove("border-transparent", "text-slate-600");
    } else {
      btn.classList.remove("border-blue-600", "text-blue-600", "bg-blue-50/50");
      btn.classList.add("border-transparent", "text-slate-600");
    }
  });

  // Show target content
  document.querySelectorAll(".tab-pane").forEach((pane) => {
    if (pane.id === `tab-${tabId}`) {
      pane.classList.remove("hidden");
    } else {
      pane.classList.add("hidden");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// 5. RENDER SETTINGS & HEADER
function loadSettings() {
  const settings = getStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);

  // Update header text
  document.querySelectorAll(".kkn-group-text").forEach((el) => {
    el.textContent = settings.kkn_group_name || "Kelompok KKN";
  });
  document.querySelectorAll(".kkn-village-text").forEach((el) => {
    el.textContent = settings.kkn_village || "Mandeh Kabupaten, Pesisir Selatan, Sumatra Barat";
  });
  document.querySelectorAll(".kkn-period-text").forEach((el) => {
    el.textContent = settings.kkn_period || "Periode II Juli - Agustus 2027";
  });
  document.querySelectorAll(".kkn-univ-text").forEach((el) => {
    el.textContent = settings.kkn_university || "Universitas";
  });
  document.querySelectorAll(".kkn-leader-text").forEach((el) => {
    el.textContent = settings.kkn_leader_name || "Ketua KKN";
  });
  document.querySelectorAll(".kkn-secretary-text").forEach((el) => {
    el.textContent = settings.kkn_secretary_name || "Sekretaris KKN";
  });
  document.querySelectorAll(".kkn-dpl-text").forEach((el) => {
    el.textContent = settings.kkn_dpl_name || "DPL";
  });

  // Populate settings form
  const form = document.getElementById("settings-form");
  if (form) {
    for (const [k, v] of Object.entries(settings)) {
      const input = form.elements[k];
      if (input) input.value = v;
    }
  }

  updateLetterPreview();
  updateEmailPreview();
}

function handleSaveSettings(e) {
  e.preventDefault();
  const form = e.target;
  const newSettings = {
    kkn_university: form.kkn_university.value,
    kkn_group_name: form.kkn_group_name.value,
    kkn_village: form.kkn_village.value,
    kkn_period: form.kkn_period.value,
    kkn_dpl_name: form.kkn_dpl_name.value,
    kkn_leader_name: form.kkn_leader_name.value,
    kkn_secretary_name: form.kkn_secretary_name.value
  };

  setStorage(STORAGE_KEYS.SETTINGS, newSettings);
  loadSettings();
  showToast("Pengaturan identitas KKN berhasil disimpan!");
}

// 6. GENERATOR SURAT RESMI (WORD & PDF)
function initLetterGenerator() {
  const tplSelect = document.getElementById("letter-template-select");
  if (tplSelect) {
    // Render templates grouped by category with optgroup
    const groups = {};
    LETTER_TEMPLATES.forEach((tpl) => {
      const cat = tpl.category || "permohonan";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(tpl);
    });

    tplSelect.innerHTML = Object.entries(groups).map(([catKey, items]) => {
      const groupLabel = LETTER_CATEGORIES[catKey] || catKey.toUpperCase();
      return `
        <optgroup label="${groupLabel}">
          ${items.map((t) => `<option value="${t.id}">${t.name}</option>`).join("")}
        </optgroup>
      `;
    }).join("");

    tplSelect.addEventListener("change", (e) => {
      const found = LETTER_TEMPLATES.find((t) => t.id === e.target.value);
      if (found) {
        const settings = getStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
        const replacePlaceholders = (text) => (text || "")
          .replaceAll("{universitas}", settings.kkn_university || "Universitas Gadjah Mada")
          .replaceAll("{desa}", settings.kkn_village || "Nagari Mandeh & Sungai Nyalo")
          .replaceAll("{periode}", settings.kkn_period || "Periode II Tahun 2026")
          .replaceAll("{kkn_group}", settings.kkn_group_name || "Menoreh Mandeh")
          .replaceAll("{kkn_unit}", "SB-004")
          .replaceAll("{kormanit_nama}", settings.kkn_leader_name || "Muhammad Raja Alfaridzi")
          .replaceAll("{kormanit_nim}", "23/521302/PA/22415");

        if (found.defaultNumber) {
          const numInput = document.getElementById("letter-number");
          if (numInput) numInput.value = found.defaultNumber;
        }
        if (found.defaultAttachment !== undefined) {
          const attInput = document.getElementById("letter-attachment");
          if (attInput) attInput.value = found.defaultAttachment;
        }
        document.getElementById("letter-regarding").value = found.regarding || "Surat KKN";
        document.getElementById("letter-recipient-name").value = found.defaultRecipientName || "Bapak/Ibu yang kami hormati";
        document.getElementById("letter-recipient-title").value = found.defaultRecipientTitle || "di Tempat";
        document.getElementById("letter-opening").value = replacePlaceholders(found.openingText);
        document.getElementById("letter-closing").value = replacePlaceholders(found.closingText);
        document.getElementById("letter-event-name").value = found.defaultEventName || "Kegiatan KKN";
        if (found.defaultEventDate) document.getElementById("letter-event-date").value = replacePlaceholders(found.defaultEventDate);
        if (found.defaultEventTime) document.getElementById("letter-event-time").value = replacePlaceholders(found.defaultEventTime);
        if (found.defaultEventLocation) document.getElementById("letter-event-location").value = replacePlaceholders(found.defaultEventLocation);
        
        const eventToggle = document.getElementById("letter-show-event");
        if (eventToggle) eventToggle.checked = found.showEvent !== false;
        
        updateLetterPreview();
      }
    });

    tplSelect.value = "izin-bappedalitbang";
    tplSelect.dispatchEvent(new Event("change"));
  }

  initLetterSignerFields();
  initLetterSecondPage();
  [
    "letter-show-header",
    "letter-show-meta",
    "letter-show-recipient",
    "letter-show-event",
    "letter-show-body",
    "letter-show-signatures"
  ].forEach((id) => {
    document.getElementById(id)?.addEventListener("change", updateLetterPreview);
  });

  // Bind input listeners for live preview
  [
    "letter-number",
    "letter-attachment",
    "letter-regarding",
    "letter-date",
    "letter-recipient-name",
    "letter-recipient-title",
    "letter-event-name",
    "letter-event-date",
    "letter-event-time",
    "letter-event-location",
    "letter-opening",
    "letter-closing",
    "letter-secretary-name",
    "letter-secretary-role",
    "letter-leader-name",
    "letter-leader-role",
    "letter-second-page-title"
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", () => {
      if (id.includes("secretary") || id.includes("leader")) saveLetterSignerFields();
      updateLetterPreview();
    });
  });

  // Download buttons
  const btnWord = document.getElementById("btn-download-word");
  if (btnWord) btnWord.addEventListener("click", downloadWordDocument);

  const btnPdf = document.getElementById("btn-download-pdf");
  if (btnPdf) btnPdf.addEventListener("click", downloadPdfDocument);

  renderLetterHistory();
  updateLetterPreview();
}

function initLetterSignerFields() {
  const settings = getStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  const signers = getStorage(LETTER_SIGNERS_KEY, {
    secretaryName: settings.kkn_secretary_name || "Sekretaris KKN",
    secretaryRole: "Sekretaris KKN",
    leaderName: settings.kkn_leader_name || "Ketua Kelompok KKN",
    leaderRole: "Ketua Kelompok KKN"
  });
  const values = {
    "letter-secretary-name": signers.secretaryName,
    "letter-secretary-role": signers.secretaryRole,
    "letter-leader-name": signers.leaderName,
    "letter-leader-role": signers.leaderRole
  };
  Object.entries(values).forEach(([id, value]) => {
    const input = document.getElementById(id);
    if (input) input.value = value || "";
  });

  letterSignatureImages = getStorage(LETTER_SIGNATURES_KEY, {});
  ["secretary", "leader"].forEach((role) => {
    const input = document.getElementById(`letter-${role}-signature`);
    input?.addEventListener("change", () => handleSignatureUpload(role, input.files?.[0]));
  });
}

function saveLetterSignerFields() {
  setStorage(LETTER_SIGNERS_KEY, {
    secretaryName: document.getElementById("letter-secretary-name")?.value || "",
    secretaryRole: document.getElementById("letter-secretary-role")?.value || "",
    leaderName: document.getElementById("letter-leader-name")?.value || "",
    leaderRole: document.getElementById("letter-leader-role")?.value || ""
  });
}

function handleSignatureUpload(role, file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    letterSignatureImages[role] = reader.result;
    setStorage(LETTER_SIGNATURES_KEY, letterSignatureImages);
    updateLetterPreview();
  };
  reader.readAsDataURL(file);
}

function initLetterSecondPage() {
  const checkbox = document.getElementById("letter-second-page-enabled");
  const editor = document.getElementById("letter-second-page-editor");
  const addButton = document.getElementById("btn-add-letter-row");
  const storedRows = getStorage("kkn_letter_table_rows", DEFAULT_LETTER_TABLE_ROWS);
  letterTableRows = storedRows
    .filter((row) => [row.activity, row.time, row.location, row.notes]
      .some((cell) => String(cell || "").trim() !== ""))
    .map((row, index) => ({
      no: row.no || String(index + 1),
      activity: row.activity || "",
      time: row.time || "",
      location: row.location || "",
      notes: row.notes || ""
    }));
  setStorage("kkn_letter_table_rows", letterTableRows);
  renderLetterTableEditor();

  checkbox?.addEventListener("change", () => {
    editor?.classList.toggle("hidden", !checkbox.checked);
    updateLetterPreview();
  });
  addButton?.addEventListener("click", () => {
    letterTableRows.push({ no: String(letterTableRows.length + 1), activity: "", time: "", location: "", notes: "" });
    renderLetterTableEditor();
    updateLetterPreview();
  });
}

function renderLetterTableEditor() {
  const container = document.getElementById("letter-table-rows");
  if (!container) return;
  container.innerHTML = letterTableRows.map((row, index) => `
    <div class="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1.5fr_auto] gap-2 items-start border border-slate-200 rounded-lg p-2" data-letter-row="${index}">
      <input data-letter-cell="no" value="${escapeHtml(row.no)}" placeholder="No." class="w-full px-2 py-1.5 text-xs border rounded">
      <input data-letter-cell="activity" value="${escapeHtml(row.activity)}" placeholder="Kegiatan" class="w-full px-2 py-1.5 text-xs border rounded">
      <input data-letter-cell="time" value="${escapeHtml(row.time)}" placeholder="Waktu" class="w-full px-2 py-1.5 text-xs border rounded">
      <input data-letter-cell="location" value="${escapeHtml(row.location)}" placeholder="Tempat" class="w-full px-2 py-1.5 text-xs border rounded">
      <input data-letter-cell="notes" value="${escapeHtml(row.notes)}" placeholder="Keterangan" class="w-full px-2 py-1.5 text-xs border rounded">
      <button type="button" data-remove-letter-row class="px-2 py-1.5 text-xs text-rose-600 border border-rose-200 rounded hover:bg-rose-50">Hapus</button>
    </div>
  `).join("");

  container.querySelectorAll("[data-letter-row]").forEach((rowElement) => {
    const index = Number(rowElement.dataset.letterRow);
    rowElement.querySelectorAll("[data-letter-cell]").forEach((input) => {
      input.addEventListener("input", () => {
        letterTableRows[index][input.dataset.letterCell] = input.value;
        setStorage("kkn_letter_table_rows", letterTableRows);
        updateLetterPreview();
      });
    });
    rowElement.querySelector("[data-remove-letter-row]")?.addEventListener("click", () => {
      letterTableRows.splice(index, 1);
      letterTableRows.forEach((item, itemIndex) => { item.no = String(itemIndex + 1); });
      setStorage("kkn_letter_table_rows", letterTableRows);
      renderLetterTableEditor();
      updateLetterPreview();
    });
  });
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[char]));
}

function getFilledLetterTableRows() {
  return letterTableRows.filter((row) =>
    [row.activity, row.time, row.location, row.notes]
      .some((cell) => String(cell || "").trim() !== "")
  );
}

function updateLetterPreview() {
  const settings = getStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);

  const num = document.getElementById("letter-number")?.value || "001/KKN-RP/VII/2027";
  const att = document.getElementById("letter-attachment")?.value || "-";
  const reg = document.getElementById("letter-regarding")?.value || "Surat KKN";
  const date = document.getElementById("letter-date")?.value || "Juli 2027";
  const rName = document.getElementById("letter-recipient-name")?.value || "Bapak Kepala Desa";
  const rTitle = document.getElementById("letter-recipient-title")?.value || "Kantor Balai Desa";
  const eName = document.getElementById("letter-event-name")?.value || "Kegiatan KKN";
  const eDate = document.getElementById("letter-event-date")?.value || "Juli - Agustus 2027";
  const eTime = document.getElementById("letter-event-time")?.value || "09.00 WIB s/d Selesai";
  const eLoc = document.getElementById("letter-event-location")?.value || "Balai Desa";
  const op = document.getElementById("letter-opening")?.value || "";
  const cl = document.getElementById("letter-closing")?.value || "";
  const showHeader = document.getElementById("letter-show-header")?.checked !== false;
  const showMeta = document.getElementById("letter-show-meta")?.checked !== false;
  const showRecipient = document.getElementById("letter-show-recipient")?.checked !== false;
  const showEvent = document.getElementById("letter-show-event")?.checked !== false;
  const showBody = document.getElementById("letter-show-body")?.checked !== false;
  const showSignatures = document.getElementById("letter-show-signatures")?.checked !== false;
  const secretaryName = document.getElementById("letter-secretary-name")?.value || settings.kkn_secretary_name || "Sekretaris KKN";
  const secretaryRole = document.getElementById("letter-secretary-role")?.value || "Sekretaris KKN";
  const leaderName = document.getElementById("letter-leader-name")?.value || settings.kkn_leader_name || "Ketua Kelompok KKN";
  const leaderRole = document.getElementById("letter-leader-role")?.value || "Ketua Kelompok KKN";
  const secondPageEnabled = document.getElementById("letter-second-page-enabled")?.checked === true;
  const secondPageTitle = document.getElementById("letter-second-page-title")?.value || "Lampiran Rencana Kegiatan KKN";

  const city = (settings.kkn_village || "Desa").split(",")[0].trim();

  // Populate preview elements
  const elPrevNum = document.getElementById("prev-letter-number");
  if (elPrevNum) elPrevNum.textContent = num;

  const elPrevAtt = document.getElementById("prev-letter-attachment");
  if (elPrevAtt) elPrevAtt.textContent = att;

  const elPrevReg = document.getElementById("prev-letter-regarding");
  if (elPrevReg) elPrevReg.textContent = reg;

  const elPrevDate = document.getElementById("prev-letter-date");
  if (elPrevDate) elPrevDate.textContent = `${city}, ${date}`;

  const elPrevRName = document.getElementById("prev-recipient-name");
  if (elPrevRName) elPrevRName.textContent = rName;

  const elPrevRTitle = document.getElementById("prev-recipient-title");
  if (elPrevRTitle) elPrevRTitle.textContent = rTitle;
  document.getElementById("letter-header-block")?.classList.toggle("hidden", !showHeader);
  document.getElementById("letter-second-page-header")?.classList.toggle("hidden", !showHeader);
  document.getElementById("letter-meta-block")?.classList.toggle("hidden", !showMeta);
  document.getElementById("letter-recipient-block")?.classList.toggle("hidden", !showRecipient);
  document.getElementById("letter-event-block")?.classList.toggle("hidden", !showEvent);
  document.getElementById("letter-body-block")?.classList.toggle("hidden", !showBody);
  document.getElementById("letter-signature-block")?.classList.toggle("hidden", !showSignatures);

  document.getElementById("prev-letter-secretary-name")?.replaceChildren(document.createTextNode(secretaryName));
  document.getElementById("prev-letter-secretary-role")?.replaceChildren(document.createTextNode(secretaryRole));
  document.getElementById("prev-letter-leader-name")?.replaceChildren(document.createTextNode(leaderName));
  document.getElementById("prev-letter-leader-role")?.replaceChildren(document.createTextNode(leaderRole));
  [["secretary", "prev-letter-secretary-signature"], ["leader", "prev-letter-leader-signature"]].forEach(([role, id]) => {
    const image = document.getElementById(id);
    if (!image) return;
    if (letterSignatureImages[role]) {
      image.src = letterSignatureImages[role];
      image.classList.remove("hidden");
    } else {
      image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      image.classList.add("hidden");
    }
  });

  const elPrevOp = document.getElementById("prev-letter-opening");
  if (elPrevOp) elPrevOp.textContent = op;

  const elPrevEName = document.getElementById("prev-event-name");
  if (elPrevEName) elPrevEName.textContent = eName;

  const elPrevEDate = document.getElementById("prev-event-date");
  if (elPrevEDate) elPrevEDate.textContent = eDate;

  const elPrevETime = document.getElementById("prev-event-time");
  if (elPrevETime) elPrevETime.textContent = eTime;

  const elPrevELoc = document.getElementById("prev-event-location");
  if (elPrevELoc) elPrevELoc.textContent = eLoc;

  const elPrevCl = document.getElementById("prev-letter-closing");
  if (elPrevCl) elPrevCl.textContent = cl;

  const secondPage = document.getElementById("letter-second-page");
  secondPage?.classList.toggle("hidden", !secondPageEnabled);
  const secondPageTitleElement = document.getElementById("prev-letter-second-page-title");
  if (secondPageTitleElement) secondPageTitleElement.textContent = secondPageTitle;
  const tableBody = document.getElementById("prev-letter-table-body");
  if (tableBody) {
    tableBody.innerHTML = getFilledLetterTableRows().map((row) => `
      <tr>
        <td>${escapeHtml(row.no)}</td>
        <td>${escapeHtml(row.activity)}</td>
        <td>${escapeHtml(row.time)}</td>
        <td>${escapeHtml(row.location)}</td>
        <td>${escapeHtml(row.notes)}</td>
      </tr>
    `).join("");
  }
}

function saveLetterHistoryRecord() {
  const letters = getStorage(STORAGE_KEYS.LETTERS, []);
  const newLetter = {
    id: Date.now(),
    number: document.getElementById("letter-number")?.value || "001/KKN",
    title: document.getElementById("letter-regarding")?.value || "Surat",
    recipient: document.getElementById("letter-recipient-name")?.value || "Penerima",
    date: new Date().toLocaleDateString("id-ID")
  };
  letters.unshift(newLetter);
  setStorage(STORAGE_KEYS.LETTERS, letters.slice(0, 30));
  renderLetterHistory();
  updateStats();
}

function renderLetterHistory() {
  const container = document.getElementById("letter-history-list");
  if (!container) return;

  const letters = getStorage(STORAGE_KEYS.LETTERS, []);
  if (letters.length === 0) {
    container.innerHTML = `<p class="text-slate-400 py-3 text-center text-xs">Belum ada riwayat surat.</p>`;
    return;
  }

  container.innerHTML = letters
    .map(
      (l) => `
    <div class="py-2.5 flex items-center justify-between border-b border-slate-100 last:border-0 text-xs">
      <div>
        <p class="font-semibold text-slate-800">${l.title}</p>
        <p class="text-slate-400 text-[11px]">${l.number} &bull; ${l.recipient}</p>
      </div>
      <span class="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">${l.date}</span>
    </div>
  `
    )
    .join("");
}

// Download formatted Word (.doc / .docx compatible blob)
async function downloadWordDocument() {
  const settings = getStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  const city = (settings.kkn_village || "Desa").split(",")[0].trim();
  const num = document.getElementById("letter-number")?.value || "";
  const att = document.getElementById("letter-attachment")?.value || "-";
  const reg = document.getElementById("letter-regarding")?.value || "Surat_KKN";
  const date = document.getElementById("letter-date")?.value || "";
  const rName = document.getElementById("letter-recipient-name")?.value || "";
  const rTitle = document.getElementById("letter-recipient-title")?.value || "";
  const eName = document.getElementById("letter-event-name")?.value || "";
  const eDate = document.getElementById("letter-event-date")?.value || "";
  const eTime = document.getElementById("letter-event-time")?.value || "";
  const eLoc = document.getElementById("letter-event-location")?.value || "";
  const op = document.getElementById("letter-opening")?.value || "";
  const cl = document.getElementById("letter-closing")?.value || "";
  const showHeader = document.getElementById("letter-show-header")?.checked !== false;
  const showMeta = document.getElementById("letter-show-meta")?.checked !== false;
  const showRecipient = document.getElementById("letter-show-recipient")?.checked !== false;
  const showEvent = document.getElementById("letter-show-event")?.checked !== false;
  const showBody = document.getElementById("letter-show-body")?.checked !== false;
  const showSignatures = document.getElementById("letter-show-signatures")?.checked !== false;
  const secretaryName = document.getElementById("letter-secretary-name")?.value || settings.kkn_secretary_name || "Sekretaris KKN";
  const secretaryRole = document.getElementById("letter-secretary-role")?.value || "Sekretaris KKN";
  const leaderName = document.getElementById("letter-leader-name")?.value || settings.kkn_leader_name || "Ketua Kelompok KKN";
  const leaderRole = document.getElementById("letter-leader-role")?.value || "Ketua Kelompok KKN";
  const secondPageEnabled = document.getElementById("letter-second-page-enabled")?.checked === true;
  const secondPageTitle = document.getElementById("letter-second-page-title")?.value || "Lampiran Rencana Kegiatan KKN";
  const filledLetterTableRows = getFilledLetterTableRows();
  const [ugmLogo, kknLogo] = await Promise.all([
    getAssetDataUrl("assets/logo-ugm-template.png"),
    getAssetDataUrl("assets/logo-mandeh.png")
  ]);

  const wordHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${reg}</title>
      <style>
        @page { size: A4 portrait; margin: 2.5cm 2cm 2cm 3cm; }
        body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.15; color: #000; margin: 0; }
        .center { text-align: center; }
        .right { text-align: right; }
        .justify { text-align: justify; }
        .bold { font-weight: bold; }
        .kop-title { font-size: 14pt; font-weight: bold; margin: 0; }
        .kop-sub { font-size: 12pt; font-weight: bold; margin: 2pt 0; }
        .kop-address { font-size: 9pt; color: #444; margin: 0; }
        hr { border: none; border-bottom: 3px double #000; margin-top: 5px; margin-bottom: 15px; }
        table { width: 100%; border-collapse: collapse; margin: 8pt 0; }
        td { vertical-align: top; padding: 2pt 0; }
      </style>
    </head>
    <body>
      ${showHeader ? `
      <table style="width: 100%; border-bottom: 3px double #000; margin: 0 0 12pt;">
        <tr>
          <td style="width: 16%; text-align: left; vertical-align: middle;"><img src="${ugmLogo}" alt="Logo UGM" style="width: 70px; height: 70px; object-fit: contain;"></td>
          <td style="width: 68%; text-align: center; vertical-align: middle;">
            <p class="kop-title">KULIAH KERJA NYATA - PEMBELAJARAN<br>PEMBERDAYAAN MASYARAKAT</p>
            <p class="kop-sub">${(settings.kkn_university || "UNIVERSITAS GADJAH MADA").toUpperCase()}</p>
            <p class="kop-sub">PESISIR SELATAN PERIODE II TAHUN 2026</p>
            <p class="kop-address">Sekretariat / Posko: ${settings.kkn_village || "Desa"}<br>Instagram: @menorehmandeh | Email: menorehmandeh@gmail.com</p>
          </td>
          <td style="width: 16%; text-align: right; vertical-align: middle;"><img src="${kknLogo}" alt="Logo KKN" style="width: 70px; height: 70px; object-fit: contain;"></td>
        </tr>
      </table>
      ` : ""}

      ${showMeta ? `
      <div class="right">
        <p>${city}, ${date}</p>
      </div>

      <table style="width: 100%;">
        <tr>
          <td style="width: 15%;">Nomor</td>
          <td style="width: 2%;">:</td>
          <td style="width: 83%;">${num}</td>
        </tr>
        <tr>
          <td>Lampiran</td>
          <td>:</td>
          <td>${att}</td>
        </tr>
        <tr>
          <td><b>Hal</b></td>
          <td>:</td>
          <td><b>${reg}</b></td>
        </tr>
      </table>
      ` : ""}

      ${showRecipient ? `
      <p style="margin-top: 15pt;">Kepada Yth.<br/>
      <b>${rName}</b><br/>
      ${rTitle}<br/>
      di Tempat</p>
      ` : ""}

      ${showBody ? `
      <p style="margin-top: 12pt;">Dengan hormat,</p>
      <p class="justify">${op}</p>
      ` : ""}

      ${showEvent ? `
      <table style="margin-left: 20pt; width: 90%;">
        <tr>
          <td style="width: 28%;">Hari, Tanggal</td>
          <td style="width: 3%;">:</td>
          <td style="width: 69%;"><b>${eDate}</b></td>
        </tr>
        <tr>
          <td>Waktu</td>
          <td>:</td>
          <td>${eTime}</td>
        </tr>
        <tr>
          <td>Tempat</td>
          <td>:</td>
          <td>${eLoc}</td>
        </tr>
        <tr>
          <td>Acara / Kegiatan</td>
          <td>:</td>
          <td><b>${eName}</b></td>
        </tr>
      </table>
      ` : ""}

      ${showBody ? `
      <p class="justify" style="margin-top: 12pt;">${cl}</p>
      ` : ""}

      ${showSignatures ? `
      <p class="center" style="margin-top: 25pt;">Hormat kami,<br/>Panitia Pelaksana KKN ${settings.kkn_group_name || "KKN"}</p>

      <table style="width: 100%; margin-top: 15pt;">
        <tr>
          <td style="width: 50%; text-align: center;">
            ${secretaryRole},<br/>
            ${letterSignatureImages.secretary ? `<img src="${letterSignatureImages.secretary}" alt="Tanda tangan sekretaris" style="display:block; width:110px; height:55px; object-fit:contain; margin:4pt auto;">` : "<br/><br/><br/>"}
            <b><u>(${secretaryName})</u></b>
          </td>
          <td style="width: 50%; text-align: center;">
            ${leaderRole},<br/>
            ${letterSignatureImages.leader ? `<img src="${letterSignatureImages.leader}" alt="Tanda tangan ketua" style="display:block; width:110px; height:55px; object-fit:contain; margin:4pt auto;">` : "<br/><br/><br/>"}
            <b><u>(${leaderName})</u></b>
          </td>
        </tr>
      </table>

      ${
        settings.kkn_dpl_name
          ? `
        <div class="center" style="margin-top: 20pt;">
          Mengetahui,<br/>Dosen Pembimbing Lapangan (DPL)<br/><br/><br/><br/>
          <b><u>(${settings.kkn_dpl_name})</u></b>
        </div>
      `
          : ""
      }
      ` : ""}
      ${secondPageEnabled ? `
        <div style="page-break-before: always; padding-top: 2.5cm;">
          <h2 class="center" style="font-size:14pt; border-bottom:3px double #000; padding-bottom:6pt;">${secondPageTitle}</h2>
          <table style="width:100%; border-collapse:collapse; margin-top:12pt;">
            <thead><tr>${["No.", "Kegiatan", "Waktu", "Tempat", "Keterangan"].map((heading) => `<th style="border:1px solid #000; padding:6pt; text-align:center;">${heading}</th>`).join("")}</tr></thead>
            <tbody>${filledLetterTableRows.map((row) => `<tr>${[row.no, row.activity, row.time, row.location, row.notes].map((cell) => `<td style="border:1px solid #000; padding:6pt; vertical-align:top;">${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
          </table>
        </div>
      ` : ""}
    </body>
    </html>
  `;

  const blob = new Blob(["\ufeff", wordHtml], {
    type: "application/msword"
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const safeFilename = (reg || "Surat_KKN").replace(/[^a-zA-Z0-9_-]/g, "_");
  a.download = `${safeFilename}.doc`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  saveLetterHistoryRecord();
  showToast("Surat Microsoft Word (.doc) berhasil diunduh!");
}

async function getAssetDataUrl(path) {
  const cleanPath = (path || "").split("?")[0].toLowerCase();
  if (cleanPath.endsWith("logo-mandeh.svg") || cleanPath.endsWith("logo-mandeh.png")) {
    return KKN_LOGO_PNG_BASE64;
  }
  if (cleanPath.endsWith("logo-ugm-template.gif") || cleanPath.endsWith("logo-ugm-template.png") || cleanPath.endsWith("logo-ugm-template.svg")) {
    return UGM_LOGO_PNG_BASE64;
  }
  try {
    const response = await fetch(path);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return path;
  }
}

// Download PDF directly in the browser
async function downloadPdfDocument() {
  const firstPage = document.getElementById("a4-letter-preview");
  const secondPage = document.getElementById("letter-second-page");
  const isSecondPageVisible = secondPage && !secondPage.classList.contains("hidden");
  const exportTarget = isSecondPageVisible
    ? document.getElementById("print-area")
    : firstPage;
  if (!exportTarget) return;

  if (typeof html2pdf !== "function") {
    showToast("Generator PDF belum siap. Periksa koneksi internet lalu coba lagi.");
    return;
  }

  saveLetterHistoryRecord();

  const settings = getStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  const safeFilename = (settings.kkn_group_name || "Surat_KKN")
    .replace(/[^a-zA-Z0-9_-]/g, "_");
  const pdfOptions = {
    margin: 0,
    filename: `${safeFilename}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff", scrollY: 0 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] }
  };

  const images = [...exportTarget.querySelectorAll("img")];
  const originalSources = images.map((image) => image.getAttribute("src"));
  const originalExportStyle = exportTarget.getAttribute("style");
  const originalFirstPageStyle = firstPage.getAttribute("style");
  const originalSecondPageStyle = secondPage ? secondPage.getAttribute("style") : null;
  const paperWidth = firstPage?.getBoundingClientRect().width || 793.7;

  try {
    // Bersihkan border dan shadow agar tidak memicu halaman kedua kosong (1 baris kosong)
    firstPage.style.boxShadow = "none";
    firstPage.style.border = "none";
    firstPage.style.minHeight = "296mm";

    if (isSecondPageVisible && secondPage) {
      secondPage.style.boxShadow = "none";
      secondPage.style.border = "none";
      secondPage.style.minHeight = "296mm";
      secondPage.style.marginTop = "0";
    }

    if (exportTarget.id === "print-area") {
      exportTarget.style.width = `${paperWidth}px`;
      exportTarget.style.display = "block";
      exportTarget.style.alignItems = "initial";
      exportTarget.style.gap = "0";
      exportTarget.style.overflow = "visible";
    }

    await Promise.all(images.map(async (image) => {
      const source = image.getAttribute("src") || "";
      if (!source || source.startsWith("data:")) return;
      image.src = await getAssetDataUrl(source.split("?")[0]);
      if (typeof image.decode === "function") await image.decode().catch(() => {});
    }));

    await html2pdf().set(pdfOptions).from(exportTarget).save();
    showToast("Surat PDF berhasil diunduh!");
  } catch (err) {
    console.error("PDF export error:", err);
    showToast("PDF gagal dibuat. Silakan coba lagi.");
  } finally {
    images.forEach((image, index) => {
      const originalSource = originalSources[index];
      if (originalSource === null) image.removeAttribute("src");
      else image.setAttribute("src", originalSource);
    });
    if (originalExportStyle === null) exportTarget.removeAttribute("style");
    else exportTarget.setAttribute("style", originalExportStyle);
    if (originalFirstPageStyle === null) firstPage.removeAttribute("style");
    else firstPage.setAttribute("style", originalFirstPageStyle);
    if (secondPage) {
      if (originalSecondPageStyle === null) secondPage.removeAttribute("style");
      else secondPage.setAttribute("style", originalSecondPageStyle);
    }
  }
}

// 7. OTOMASI EMAIL & BROADCAST
function initEmailAutomation() {
  const tplButtons = document.querySelectorAll("[data-email-template]");
  tplButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tplId = btn.getAttribute("data-email-template");
      const found = EMAIL_TEMPLATES.find((t) => t.id === tplId);
      if (found) {
        document.getElementById("email-subject").value = found.subject;
        document.getElementById("email-body").value = found.body;
        tplButtons.forEach((b) => b.classList.remove("border-blue-600", "bg-blue-50/70", "text-blue-800", "font-semibold"));
        btn.classList.add("border-blue-600", "bg-blue-50/70", "text-blue-800", "font-semibold");
        updateEmailPreview();
      }
    });
  });

  // Input listeners
  ["email-subject", "email-body", "email-event-name", "email-event-date", "email-event-location"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updateEmailPreview);
  });

  // Action Buttons
  document.getElementById("btn-send-gmail")?.addEventListener("click", sendViaGmailWeb);
  document.getElementById("btn-send-client")?.addEventListener("click", sendViaEmailClient);
  document.getElementById("btn-send-wa")?.addEventListener("click", sendViaWhatsApp);
  document.getElementById("btn-copy-email-text")?.addEventListener("click", copyEmailMessage);

  renderEmailLogs();
}

function getFormattedEmail() {
  const settings = getStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);

  const rawSub = document.getElementById("email-subject")?.value || "";
  const rawBody = document.getElementById("email-body")?.value || "";
  const eName = document.getElementById("email-event-name")?.value || "Kegiatan KKN";
  const eDate = document.getElementById("email-event-date")?.value || "Waktu yang ditentukan";
  const eLoc = document.getElementById("email-event-location")?.value || "Balai Desa";

  const replaceVars = (txt) => {
    return txt
      .replace(/{kegiatan}/gi, eName)
      .replace(/{tanggal}/gi, eDate)
      .replace(/{lokasi}/gi, eLoc)
      .replace(/{kelompok}/gi, settings.kkn_group_name || "Kelompok KKN")
      .replace(/{desa}/gi, settings.kkn_village || "Desa")
      .replace(/{kampus}/gi, settings.kkn_university || "Universitas")
      .replace(/{nama}/gi, "Bapak/Ibu/Rekan");
  };

  return {
    subject: replaceVars(rawSub),
    body: replaceVars(rawBody)
  };
}

function updateEmailPreview() {
  const { subject, body } = getFormattedEmail();
  const elPrevSub = document.getElementById("prev-email-subject");
  if (elPrevSub) elPrevSub.textContent = subject;

  const elPrevBody = document.getElementById("prev-email-body");
  if (elPrevBody) elPrevBody.textContent = body;
}

function saveEmailLogRecord(recipient, subject) {
  const logs = getStorage(STORAGE_KEYS.EMAIL_LOGS, []);
  logs.unshift({
    id: Date.now(),
    recipient: recipient || "Broadcast Tim",
    subject,
    status: "Terkirim",
    time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
  });
  setStorage(STORAGE_KEYS.EMAIL_LOGS, logs.slice(0, 30));
  renderEmailLogs();
  updateStats();
}

function renderEmailLogs() {
  const container = document.getElementById("email-logs-list");
  if (!container) return;

  const logs = getStorage(STORAGE_KEYS.EMAIL_LOGS, []);
  if (logs.length === 0) {
    container.innerHTML = `<p class="text-slate-400 py-4 text-center text-xs">Belum ada email yang dikirim.</p>`;
    return;
  }

  container.innerHTML = logs
    .map(
      (l) => `
    <div class="py-2.5 flex items-center justify-between gap-2 border-b border-slate-100 last:border-0 text-xs">
      <div>
        <p class="font-medium text-slate-800">${l.recipient}</p>
        <p class="text-[11px] text-slate-400 truncate max-w-[200px]">${l.subject}</p>
      </div>
      <div class="text-right shrink-0">
        <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">${l.status}</span>
        <p class="text-[10px] text-slate-400 mt-0.5">${l.time}</p>
      </div>
    </div>
  `
    )
    .join("");
}

function sendViaGmailWeb() {
  const recipients = document.getElementById("email-recipients")?.value.trim() || "";
  const { subject, body } = getFormattedEmail();

  // Buka Gmail Compose di tab baru
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    recipients
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.open(gmailUrl, "_blank");
  saveEmailLogRecord(recipients || "Gmail Web Compose", subject);
  showToast("Jendela Gmail Compose telah dibuka!");
}

function sendViaEmailClient() {
  const recipients = document.getElementById("email-recipients")?.value.trim() || "";
  const { subject, body } = getFormattedEmail();

  const mailtoUrl = `mailto:${encodeURIComponent(recipients)}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoUrl;
  saveEmailLogRecord(recipients || "Email Client", subject);
  showToast("Membuka aplikasi email perangkat Anda...");
}

function sendViaWhatsApp() {
  const { body } = getFormattedEmail();
  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(body)}`;
  window.open(waUrl, "_blank");
  showToast("WhatsApp Web telah dibuka!");
}

function copyEmailMessage() {
  const { body } = getFormattedEmail();
  navigator.clipboard.writeText(body);
  showToast("Teks pesan disalin ke clipboard!");
}

// 8. LINK PENTING KKN
let currentLinkCategory = "Semua";
let currentLinkSearch = "";

function initLinks() {
  document.getElementById("btn-open-add-link-modal")?.addEventListener("click", () => {
    openLinkModal();
  });

  document.getElementById("btn-close-link-modal")?.addEventListener("click", () => {
    document.getElementById("add-link-modal")?.classList.add("hidden");
  });

  document.getElementById("add-link-form")?.addEventListener("submit", handleAddLink);

  // Filter Buttons
  document.querySelectorAll("[data-link-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentLinkCategory = btn.getAttribute("data-link-filter");
      document.querySelectorAll("[data-link-filter]").forEach((b) => {
        b.classList.remove("bg-blue-600", "text-white");
        b.classList.add("bg-white", "text-slate-600");
      });
      btn.classList.add("bg-blue-600", "text-white");
      btn.classList.remove("bg-white", "text-slate-600");
      renderLinks();
    });
  });

  // Search input
  document.getElementById("link-search-input")?.addEventListener("input", (e) => {
    currentLinkSearch = e.target.value.toLowerCase();
    renderLinks();
  });

  renderLinks();
}

function renderLinks() {
  const container = document.getElementById("links-grid");
  if (!container) return;

  const links = getStorage(STORAGE_KEYS.LINKS, DEFAULT_LINKS);

  const filtered = links.filter((l) => {
    const matchCat = currentLinkCategory === "Semua" || l.category === currentLinkCategory;
    const matchSearch =
      l.title.toLowerCase().includes(currentLinkSearch) ||
      (l.description && l.description.toLowerCase().includes(currentLinkSearch));
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300">
        <p class="text-slate-500 font-medium text-sm">Tidak ada link ditemukan.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered
    .map(
      (item) => `
    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition flex flex-col justify-between space-y-4">
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
            ${item.category}
          </span>
          ${
            item.is_pinned
              ? `<span class="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">★ Tersemat</span>`
              : ""
          }
        </div>
        <h3 class="font-bold text-slate-900 text-base">${item.title}</h3>
        ${item.description ? `<p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">${item.description}</p>` : ""}
      </div>

      <div class="flex items-center justify-between border-t border-slate-100 pt-3">
        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800">
          <span>Buka Link</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>

        <div class="flex items-center gap-2">
          <button onclick="copyToClipboard('${item.url}')" class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition" title="Salin URL">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          </button>
          <button onclick="editLink(${item.id})" class="p-1.5 text-slate-400 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition" title="Edit Link">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-9.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 7.5-7.5z"></path></svg>
          </button>
          <button onclick="deleteLink(${item.id})" class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition" title="Hapus Link">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  renderDashboardLinks();
  updateStats();
}

function openLinkModal(link = null) {
  const modal = document.getElementById("add-link-modal");
  const form = document.getElementById("add-link-form");
  const title = document.getElementById("link-modal-title");
  const submit = document.getElementById("link-modal-submit");
  if (!modal || !form) return;

  form.reset();
  if (link) {
    form.dataset.editingId = String(link.id);
    form.title.value = link.title || "";
    form.url.value = link.url || "";
    form.category.value = link.category || "Lainnya";
    form.description.value = link.description || "";
    form.is_pinned.checked = Boolean(link.is_pinned);
    if (title) title.textContent = "Edit Link Penting KKN";
    if (submit) submit.textContent = "Simpan Perubahan";
  } else {
    delete form.dataset.editingId;
    if (title) title.textContent = "Tambah Link Penting KKN";
    if (submit) submit.textContent = "Simpan Link";
  }

  modal.classList.remove("hidden");
}

function editLink(id) {
  const links = getStorage(STORAGE_KEYS.LINKS, DEFAULT_LINKS);
  const link = links.find((item) => String(item.id) === String(id));
  if (link) openLinkModal(link);
}

function handleAddLink(e) {
  e.preventDefault();
  const form = e.target;
  const links = getStorage(STORAGE_KEYS.LINKS, DEFAULT_LINKS);

  const editingId = form.dataset.editingId;
  const newLink = {
    id: editingId || Date.now(),
    title: form.title.value,
    url: form.url.value,
    category: form.category.value,
    description: form.description.value,
    is_pinned: form.is_pinned.checked ? 1 : 0
  };

  if (editingId) {
    const index = links.findIndex((item) => String(item.id) === String(editingId));
    if (index !== -1) links[index] = newLink;
  } else {
    links.unshift(newLink);
  }
  setStorage(STORAGE_KEYS.LINKS, links);
  form.reset();
  delete form.dataset.editingId;
  document.getElementById("add-link-modal")?.classList.add("hidden");
  renderLinks();
  showToast(editingId ? "Link penting berhasil diperbarui!" : "Link penting berhasil ditambahkan!");
}

function deleteLink(id) {
  if (!confirm("Hapus link ini?")) return;
  let links = getStorage(STORAGE_KEYS.LINKS, DEFAULT_LINKS);
  links = links.filter((l) => l.id !== id);
  setStorage(STORAGE_KEYS.LINKS, links);
  renderLinks();
  showToast("Link berhasil dihapus");
}

function copyToClipboard(txt) {
  navigator.clipboard.writeText(txt);
  showToast("URL disalin ke clipboard!");
}

// 9. JADWAL & AGENDA KKN
let currentScheduleCategory = "Semua";
let editingScheduleId = null;

function initSchedules() {
  document.getElementById("btn-open-add-schedule-modal")?.addEventListener("click", () => {
    openScheduleModal();
  });

  document.getElementById("btn-close-schedule-modal")?.addEventListener("click", () => {
    closeScheduleModal();
  });

  document.getElementById("add-schedule-form")?.addEventListener("submit", handleAddSchedule);

  // Filter Buttons
  document.querySelectorAll("[data-schedule-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentScheduleCategory = btn.getAttribute("data-schedule-filter");
      document.querySelectorAll("[data-schedule-filter]").forEach((b) => {
        b.classList.remove("bg-blue-600", "text-white");
        b.classList.add("bg-white", "text-slate-600");
      });
      btn.classList.add("bg-blue-600", "text-white");
      btn.classList.remove("bg-white", "text-slate-600");
      renderSchedules();
    });
  });

  renderSchedules();
}

function renderSchedules() {
  const container = document.getElementById("schedules-list");
  if (!container) return;

  const schedules = getStorage(STORAGE_KEYS.SCHEDULES, DEFAULT_SCHEDULES);

  const filtered = schedules.filter((s) => {
    return currentScheduleCategory === "Semua" || s.category === currentScheduleCategory;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300">
        <p class="text-slate-500 text-sm">Tidak ada agenda di kategori ini.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered
    .map(
      (item) => `
    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="space-y-1.5">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
            item.category === "Deadline LPPM"
              ? "bg-rose-100 text-rose-700"
              : item.category === "Proker"
              ? "bg-blue-100 text-blue-700"
              : "bg-emerald-100 text-emerald-700"
          }">
            ${item.category}
          </span>
          <span class="text-[11px] font-semibold px-2 py-0.5 rounded ${
            item.priority === "Tinggi"
              ? "bg-red-50 text-red-600 border border-red-200"
              : item.priority === "Sedang"
              ? "bg-amber-50 text-amber-600 border border-amber-200"
              : "bg-slate-50 text-slate-500 border border-slate-200"
          }">
            Prioritas ${item.priority}
          </span>
          <span class="text-xs text-slate-500 flex items-center gap-1">
            <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            ${item.date} ${item.time ? `&bull; ${item.time}` : ""}
          </span>
        </div>

        <h3 class="font-bold text-slate-900 text-base">${item.title}</h3>
        ${item.description ? `<p class="text-xs text-slate-600 leading-relaxed">${item.description}</p>` : ""}
        ${
          item.location
            ? `<p class="text-xs text-slate-400 flex items-center gap-1 pt-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            ${item.location}
          </p>`
            : ""
        }
      </div>

      <div class="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
        <button onclick="editSchedule(${item.id})" class="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition" title="Edit Agenda">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-9.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 8.5-8.5z"></path></svg>
        </button>
        <button onclick="toggleScheduleStatus(${item.id})" class="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
        item.status === "Selesai"
          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
          : item.status === "Sedang Berjalan"
          ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      }">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          <span>${item.status}</span>
        </button>

        <button onclick="deleteSchedule(${item.id})" class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition" title="Hapus Agenda">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
    </div>
  `
    )
    .join("");

  renderDashboardSchedules();
  updateStats();
}

function openScheduleModal(schedule = null) {
  const modal = document.getElementById("add-schedule-modal");
  const form = document.getElementById("add-schedule-form");
  if (!modal || !form) return;

  editingScheduleId = schedule?.id ?? null;
  form.reset();
  form.querySelector('[name="priority"]').value = schedule?.priority || "Sedang";
  document.getElementById("schedule-modal-title").textContent = schedule
    ? "Edit Agenda Kegiatan KKN"
    : "Tambah Agenda Kegiatan KKN";
  document.getElementById("schedule-modal-submit").textContent = schedule
    ? "Simpan Perubahan"
    : "Simpan Agenda";

  if (schedule) {
    ["title", "date", "time", "category", "priority", "location", "description"].forEach((field) => {
      if (form.elements[field]) form.elements[field].value = schedule[field] || "";
    });
  }

  modal.classList.remove("hidden");
}

function closeScheduleModal() {
  editingScheduleId = null;
  document.getElementById("add-schedule-modal")?.classList.add("hidden");
}

function editSchedule(id) {
  const schedules = getStorage(STORAGE_KEYS.SCHEDULES, DEFAULT_SCHEDULES);
  const schedule = schedules.find((item) => item.id === id);
  if (schedule) openScheduleModal(schedule);
}

function handleAddSchedule(e) {
  e.preventDefault();
  const form = e.target;
  const schedules = getStorage(STORAGE_KEYS.SCHEDULES, DEFAULT_SCHEDULES);

  const scheduleData = {
    title: form.title.value,
    date: form.date.value,
    time: form.time.value,
    category: form.category.value,
    priority: form.priority.value,
    location: form.location.value,
    description: form.description.value
  };

  if (editingScheduleId !== null) {
    const found = schedules.find((item) => item.id === editingScheduleId);
    if (!found) return;
    Object.assign(found, scheduleData);
    showToast("Agenda berhasil diperbarui!");
  } else {
    schedules.unshift({
      id: Date.now(),
      ...scheduleData,
      status: "Belum Dimulai"
    });
    showToast("Agenda kegiatan baru berhasil disimpan!");
  }

  setStorage(STORAGE_KEYS.SCHEDULES, schedules);
  closeScheduleModal();
  renderSchedules();
}

function toggleScheduleStatus(id) {
  const schedules = getStorage(STORAGE_KEYS.SCHEDULES, DEFAULT_SCHEDULES);
  const found = schedules.find((s) => s.id === id);
  if (!found) return;

  if (found.status === "Belum Dimulai") {
    found.status = "Sedang Berjalan";
  } else if (found.status === "Sedang Berjalan") {
    found.status = "Selesai";
  } else {
    found.status = "Belum Dimulai";
  }

  setStorage(STORAGE_KEYS.SCHEDULES, schedules);
  renderSchedules();
  showToast(`Status kegiatan diubah ke: ${found.status}`);
}

function deleteSchedule(id) {
  if (!confirm("Hapus jadwal kegiatan ini?")) return;
  let schedules = getStorage(STORAGE_KEYS.SCHEDULES, DEFAULT_SCHEDULES);
  schedules = schedules.filter((s) => s.id !== id);
  setStorage(STORAGE_KEYS.SCHEDULES, schedules);
  renderSchedules();
  showToast("Jadwal berhasil dihapus");
}

// 10. DASHBOARD SYNC & STATS
function updateStats() {
  const links = getStorage(STORAGE_KEYS.LINKS, DEFAULT_LINKS);
  const schedules = getStorage(STORAGE_KEYS.SCHEDULES, DEFAULT_SCHEDULES);
  const letters = getStorage(STORAGE_KEYS.LETTERS, []);
  const logs = getStorage(STORAGE_KEYS.EMAIL_LOGS, []);

  const statLinks = document.getElementById("stat-links-count");
  if (statLinks) statLinks.textContent = links.length;

  const statSchedules = document.getElementById("stat-schedules-count");
  if (statSchedules) statSchedules.textContent = schedules.length;

  const statLetters = document.getElementById("stat-letters-count");
  if (statLetters) statLetters.textContent = letters.length;

  const statEmails = document.getElementById("stat-emails-count");
  if (statEmails) statEmails.textContent = logs.length;
}

function renderDashboardSchedules() {
  const container = document.getElementById("dashboard-schedules-list");
  if (!container) return;

  const schedules = getStorage(STORAGE_KEYS.SCHEDULES, DEFAULT_SCHEDULES);
  if (schedules.length === 0) {
    container.innerHTML = `<p class="p-6 text-center text-slate-400 text-xs">Belum ada agenda terdekat.</p>`;
    return;
  }

  container.innerHTML = schedules
    .slice(0, 4)
    .map(
      (item) => `
    <div class="p-4 hover:bg-slate-50/80 transition flex items-start justify-between gap-4 border-b border-slate-100 last:border-0">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            item.category === "Deadline LPPM"
              ? "bg-rose-100 text-rose-700"
              : item.category === "Proker"
              ? "bg-blue-100 text-blue-700"
              : "bg-emerald-100 text-emerald-700"
          }">
            ${item.category}
          </span>
          <span class="text-xs text-slate-400 flex items-center gap-1">
            ${item.date} ${item.time ? `&bull; ${item.time}` : ""}
          </span>
        </div>
        <h4 class="font-semibold text-slate-900 text-sm">${item.title}</h4>
        ${item.description ? `<p class="text-xs text-slate-500 line-clamp-1">${item.description}</p>` : ""}
        ${item.location ? `<p class="text-xs text-slate-400">${item.location}</p>` : ""}
      </div>

      <div class="flex flex-col items-end gap-2 shrink-0">
        <span class="text-xs px-2.5 py-1 rounded-lg font-medium ${
          item.status === "Selesai"
            ? "bg-emerald-100 text-emerald-700"
            : item.status === "Sedang Berjalan"
            ? "bg-amber-100 text-amber-700"
            : "bg-slate-100 text-slate-600"
        }">
          ${item.status}
        </span>
        <button onclick="toggleScheduleStatus(${item.id})" class="text-[11px] text-blue-600 hover:underline">
          Ubah Status
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

function renderDashboardLinks() {
  const container = document.getElementById("dashboard-links-list");
  if (!container) return;

  const links = getStorage(STORAGE_KEYS.LINKS, DEFAULT_LINKS);
  if (links.length === 0) {
    container.innerHTML = `<p class="p-4 text-center text-slate-400 text-xs">Belum ada link tersimpan.</p>`;
    return;
  }

  container.innerHTML = links
    .slice(0, 4)
    .map(
      (link) => `
    <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="group p-3.5 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition flex items-center justify-between">
      <div class="space-y-1">
        <div class="flex items-center gap-1.5">
          <span class="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            ${link.category}
          </span>
          ${link.is_pinned ? `<span class="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">★ Pin</span>` : ""}
        </div>
        <h4 class="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition">
          ${link.title}
        </h4>
      </div>
      <svg class="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
    </a>
  `
    )
    .join("");
}

// 11. INITIALIZATION ON DOM READY
document.addEventListener("DOMContentLoaded", () => {
  (async () => {
    if (!(await initRequiredAuth())) return;
    initializeAppAfterAuth();
  })();
});
