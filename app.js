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

const LETTER_TEMPLATES = [
  {
    id: "izin-bappedalitbang",
    name: "Surat Permohonan Izin KKN - BAPPEDALITBANG",
    regarding: "Permohonan Izin Pelaksanaan Kuliah Kerja Nyata (KKN)",
    defaultRecipientName: "Kepala BAPPEDALITBANG Kabupaten Pesisir Selatan",
    defaultRecipientTitle: "BAPPEDALITBANG Kabupaten Pesisir Selatan",
    defaultEventName: "Pelaksanaan Kuliah Kerja Nyata (KKN)",
    defaultEventDate: "{periode}",
    defaultEventTime: "Sesuai jadwal pelaksanaan KKN",
    defaultEventLocation: "Wilayah {desa}",
    openingText: "Sehubungan dengan akan dilaksanakannya kegiatan Kuliah Kerja Nyata (KKN) oleh mahasiswa {universitas} di wilayah {desa}, kami bermaksud memohon izin dan dukungan untuk melaksanakan kegiatan tersebut sesuai dengan program kerja yang telah disusun.",
    closingText: "Demikian surat permohonan izin ini kami sampaikan. Besar harapan kami agar permohonan ini dapat disetujui. Atas perhatian, izin, dan kerja sama yang diberikan, kami ucapkan terima kasih."
  },
  {
    id: "undangan-lokakarya",
    name: "Surat Undangan Lokakarya / Rapat Koordinasi Desa",
    regarding: "Undangan Lokakarya Awal Program Kerja KKN",
    openingText: "Sehubungan dengan pelaksanaan program Kuliah Kerja Nyata (KKN) mahasiswa di wilayah Desa, kami bermaksud mengundang Bapak/Ibu untuk dapat hadir dalam kegiatan Lokakarya Awal guna pemaparan dan koordinasi program kerja kemasyarakatan, yang insya Allah akan dilaksanakan pada:",
    closingText: "Mengingat pentingnya acara ini demi kelancaran sinergi program pengabdian bersama masyarakat, kami sangat mengharapkan kehadiran Bapak/Ibu tepat pada waktunya. Atas perhatian dan kerjasamanya, kami haturkan terima kasih.",
    defaultEventName: "Lokakarya Awal & Silaturahmi Tim KKN dengan Perangkat Desa"
  },
  {
    id: "izin-tempat",
    name: "Surat Permohonan Izin Tempat / Peminjaman Balai",
    regarding: "Permohonan Izin Penggunaan Fasilitas / Balai Warga",
    openingText: "Dalam rangka merealisasikan program kerja pengabdian mahasiswa Kuliah Kerja Nyata (KKN), kami bermaksud memohon izin untuk menggunakan fasilitas tempat guna mendukung kelancaran kegiatan yang akan kami laksanakan pada:",
    closingText: "Kami berkomitmen untuk menjaga ketertiban, kebersihan, dan fasilitas yang digunakan sebaik-baiknya. Demikian surat permohonan izin ini kami sampaikan, atas izin dan bantuan yang diberikan kami ucapkan terima kasih yang sebesar-besarnya.",
    defaultEventName: "Penggunaan Fasilitas Balai Pertemuan untuk Sosialisasi KKN"
  },
  {
    id: "narasumber",
    name: "Surat Permohonan Pemateri / Narasumber Penyuluhan",
    regarding: "Permohonan Kesediaan Menjadi Narasumber / Pemateri",
    openingText: "Dalam rangka meningkatkan wawasan serta pemberdayaan masyarakat desa melalui program kerja Kuliah Kerja Nyata (KKN), dengan hormat kami memohon kesediaan Bapak/Ibu untuk berkenan menjadi narasumber/pemateri pada kegiatan edukatif yang akan diselenggarakan pada:",
    closingText: "Besar harapan kami agar Bapak/Ibu dapat berkenan meluangkan waktu serta berbagi ilmu yang sangat bermanfaat bagi warga masyarakat. Atas kesediaan dan kerjasamanya, kami sampaikan terima kasih.",
    defaultEventName: "Penyuluhan dan Edukasi Pola Hidup Bersih & Sehat (PHBS) Warga"
  },
  {
    id: "pemberitahuan-kegiatan",
    name: "Surat Pemberitahuan Pelaksanaan Program Kerja (Proker)",
    regarding: "Pemberitahuan Pelaksanaan Program Kerja KKN",
    openingText: "Bersama surat ini kami beritahukan kepada Bapak/Ibu bahwa mahasiswa KKN akan menyelenggarakan agenda pengabdian masyarakat yang ditujukan bagi seluruh warga sekitar, yang direncanakan berlangsung pada:",
    closingText: "Demikian surat pemberitahuan ini kami sampaikan agar dapat diketahui bersama dan dapat dikoordinasikan dengan segenap lapisan warga. Atas perhatian serta dukungannya, kami ucapkan terima kasih.",
    defaultEventName: "Aksi Bersih Lingkungan & Penanaman Bibit Tanaman Obat Keluarga (TOGA)"
  },
  {
    id: "terima-kasih",
    name: "Surat Ucapan Terima Kasih & Apresiasi Kegiatan",
    regarding: "Ucapan Terima Kasih atas Dukungan Kegiatan",
    openingText: "Sehubungan dengan telah terlaksananya rangkaian program kerja Kuliah Kerja Nyata (KKN) dengan sukses dan lancar, kami segenap panitia mahasiswa bermaksud menyampaikan apresiasi dan penghargaan yang setinggi-tingginya atas partisipasi dan bantuan Bapak/Ibu pada agenda:",
    closingText: "Semoga kontribusi serta jalinan silaturahmi yang telah terbangun dapat memberikan kemanfaatan yang berkelanjutan bagi kemajuan desa tercinta. Demikian surat ucapan terima kasih ini kami sampaikan dengan penuh rasa hormat.",
    defaultEventName: "Rangkaian Festival Anak Sholeh & Penutupan Bimbingan Belajar Desa"
  }
];

const LETTER_SIGNERS_KEY = "kkn_letter_signers";
const LETTER_SIGNATURES_KEY = "kkn_letter_signatures";
const DEFAULT_LETTER_TABLE_ROWS = [
  { no: "1", activity: "", time: "", location: "", notes: "" }
];
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
    tplSelect.innerHTML = LETTER_TEMPLATES.map(
      (t) => `<option value="${t.id}">${t.name}</option>`
    ).join("");

    tplSelect.addEventListener("change", (e) => {
      const found = LETTER_TEMPLATES.find((t) => t.id === e.target.value);
      if (found) {
        const settings = getStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
        const replacePlaceholders = (text) => (text || "")
          .replaceAll("{universitas}", settings.kkn_university || "universitas")
          .replaceAll("{desa}", settings.kkn_village || "desa")
          .replaceAll("{periode}", settings.kkn_period || "periode KKN");
        document.getElementById("letter-regarding").value = found.regarding;
        document.getElementById("letter-recipient-name").value = found.defaultRecipientName || "Bapak/Ibu yang kami hormati";
        document.getElementById("letter-recipient-title").value = found.defaultRecipientTitle || "Di tempat";
        document.getElementById("letter-opening").value = replacePlaceholders(found.openingText);
        document.getElementById("letter-closing").value = replacePlaceholders(found.closingText);
        document.getElementById("letter-event-name").value = found.defaultEventName;
        if (found.defaultEventDate) document.getElementById("letter-event-date").value = replacePlaceholders(found.defaultEventDate);
        if (found.defaultEventTime) document.getElementById("letter-event-time").value = replacePlaceholders(found.defaultEventTime);
        if (found.defaultEventLocation) document.getElementById("letter-event-location").value = replacePlaceholders(found.defaultEventLocation);
        updateLetterPreview();
      }
    });

    tplSelect.value = "izin-bappedalitbang";
    tplSelect.dispatchEvent(new Event("change"));
  }

  initLetterSignerFields();
  initLetterSecondPage();
  document.getElementById("letter-show-recipient")?.addEventListener("change", updateLetterPreview);

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
  letterTableRows = getStorage("kkn_letter_table_rows", DEFAULT_LETTER_TABLE_ROWS).map((row, index) => ({
    no: row.no || String(index + 1),
    activity: row.activity || "",
    time: row.time || "",
    location: row.location || "",
    notes: row.notes || ""
  }));
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
  const showRecipient = document.getElementById("letter-show-recipient")?.checked !== false;
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
  document.getElementById("letter-recipient-block")?.classList.toggle("hidden", !showRecipient);

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
      image.removeAttribute("src");
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
    tableBody.innerHTML = letterTableRows.map((row) => `
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
  const showRecipient = document.getElementById("letter-show-recipient")?.checked !== false;
  const secretaryName = document.getElementById("letter-secretary-name")?.value || settings.kkn_secretary_name || "Sekretaris KKN";
  const secretaryRole = document.getElementById("letter-secretary-role")?.value || "Sekretaris KKN";
  const leaderName = document.getElementById("letter-leader-name")?.value || settings.kkn_leader_name || "Ketua Kelompok KKN";
  const leaderRole = document.getElementById("letter-leader-role")?.value || "Ketua Kelompok KKN";
  const secondPageEnabled = document.getElementById("letter-second-page-enabled")?.checked === true;
  const secondPageTitle = document.getElementById("letter-second-page-title")?.value || "Lampiran Rencana Kegiatan KKN";
  const [ugmLogo, kknLogo] = await Promise.all([
    getAssetDataUrl("assets/logo-ugm-template.gif?v=full-3"),
    getAssetDataUrl("assets/logo-mandeh.svg?v=full-3")
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
      <hr/>

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

      ${showRecipient ? `<p style="margin-top: 15pt;">Kepada Yth.<br/>
      <b>${rName}</b><br/>
      ${rTitle}<br/>
      di Tempat</p>` : ""}

      <p style="margin-top: 12pt;">Dengan hormat,</p>
      <p class="justify">${op}</p>

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

      <p class="justify" style="margin-top: 12pt;">${cl}</p>

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
      ${secondPageEnabled ? `
        <div style="page-break-before: always; padding-top: 2.5cm;">
          <h2 class="center" style="font-size:14pt; border-bottom:3px double #000; padding-bottom:6pt;">${secondPageTitle}</h2>
          <table style="width:100%; border-collapse:collapse; margin-top:12pt;">
            <thead><tr>${["No.", "Kegiatan", "Waktu", "Tempat", "Keterangan"].map((heading) => `<th style="border:1px solid #000; padding:6pt; text-align:center;">${heading}</th>`).join("")}</tr></thead>
            <tbody>${letterTableRows.map((row) => `<tr>${[row.no, row.activity, row.time, row.location, row.notes].map((cell) => `<td style="border:1px solid #000; padding:6pt; vertical-align:top;">${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
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
  const letterPreview = document.getElementById("print-area");
  if (!letterPreview) return;

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
    html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] }
  };

  const exportArea = letterPreview.cloneNode(true);
  exportArea.style.width = `${letterPreview.getBoundingClientRect().width}px`;
  exportArea.style.position = "absolute";
  exportArea.style.left = "-100000px";
  exportArea.style.top = "0";
  exportArea.style.background = "#ffffff";
  document.body.appendChild(exportArea);

  try {
    await Promise.all([...exportArea.querySelectorAll("img")].map(async (image) => {
      const source = image.getAttribute("src") || "";
      if (!source || source.startsWith("data:")) return;
      image.src = await getAssetDataUrl(source.split("?")[0]);
    }));
    await html2pdf().set(pdfOptions).from(exportArea).save();
    showToast("Surat PDF berhasil diunduh!");
  } catch {
    showToast("PDF gagal dibuat. Silakan coba lagi.");
  } finally {
    exportArea.remove();
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
