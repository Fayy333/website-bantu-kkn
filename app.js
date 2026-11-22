// KKN Hub - Core Logic & Storage (Vanilla JS)

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
  window.KKN_CLOUD?.push(key, val);
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

function initCloudAuth() {
  const authButton = document.getElementById("cloud-auth-button");
  const modal = document.getElementById("cloud-auth-modal");
  const form = document.getElementById("cloud-auth-form");
  const closeButton = document.getElementById("cloud-auth-close");
  if (!authButton || !modal || !form || !window.kknSupabase) return;

  const updateAuthButton = async () => {
    const session = await window.KKN_CLOUD.getSession();
    const label = authButton.querySelector("span:last-child");
    const dot = authButton.querySelector("span:first-child");
    if (session) {
      label.textContent = "Cloud Aktif";
      dot.className = "w-2 h-2 rounded-full bg-emerald-500";
      authButton.title = session.user.email || "Cloud aktif";
    } else {
      label.textContent = "Login Cloud";
      dot.className = "w-2 h-2 rounded-full bg-amber-400";
    }
  };

  authButton.addEventListener("click", async () => {
    if (await window.KKN_CLOUD.getSession()) {
      await window.kknSupabase.auth.signOut();
      await updateAuthButton();
      showToast("Logout cloud berhasil.");
      return;
    }
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  });

  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });

  form.addEventListener("click", async (event) => {
    const actionButton = event.target.closest("[data-auth-action]");
    if (!actionButton) return;
    event.preventDefault();
    const email = document.getElementById("cloud-auth-email").value.trim();
    const password = document.getElementById("cloud-auth-password").value;
    if (!email || password.length < 6) {
      showToast("Isi email dan password minimal 6 karakter.", "error");
      return;
    }

    const result = actionButton.dataset.authAction === "signup"
      ? await window.kknSupabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.href } })
      : await window.kknSupabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      showToast(result.error.message, "error");
      return;
    }

    await window.KKN_CLOUD.seedOrPull();
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    await updateAuthButton();
    window.location.reload();
  });

  window.kknSupabase.auth.onAuthStateChange(updateAuthButton);
  updateAuthButton();
}

async function initRequiredAuth() {
  const gate = document.getElementById("auth-gate");
  const form = document.getElementById("auth-gate-form");
  const message = document.getElementById("auth-gate-message");
  if (!gate || !form || !window.kknSupabase) return false;

  const session = await window.KKN_CLOUD.getSession();
  if (session) {
    gate.classList.add("hidden");
    document.body.classList.remove("auth-locked");
    return true;
  }

  form.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-gate-action]");
    if (!button) return;
    event.preventDefault();
    const email = document.getElementById("auth-gate-email").value.trim();
    const password = document.getElementById("auth-gate-password").value;
    if (!email || password.length < 6) {
      message.textContent = "Masukkan email dan password minimal 6 karakter.";
      message.className = "mt-4 text-center text-xs text-rose-600";
      return;
    }

    button.disabled = true;
    message.textContent = "Memproses...";
    message.className = "mt-4 text-center text-xs text-slate-500";
    const result = button.dataset.gateAction === "signup"
      ? await window.kknSupabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.href } })
      : await window.kknSupabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      button.disabled = false;
      message.textContent = result.error.message;
      message.className = "mt-4 text-center text-xs text-rose-600";
      return;
    }

    if (!(await window.KKN_CLOUD.getSession())) {
      button.disabled = false;
      message.textContent = "Pendaftaran berhasil. Periksa email untuk konfirmasi, lalu login.";
      message.className = "mt-4 text-center text-xs text-emerald-600";
      return;
    }

    await window.KKN_CLOUD.seedOrPull();
    gate.classList.add("hidden");
    document.body.classList.remove("auth-locked");
    initializeAppAfterAuth();
  });

  return false;
}

function initializeAppAfterAuth() {
  window.KKN_CLOUD?.subscribe();
  initCloudAuth();
  initTabs();
  loadSettings();
  initLetterGenerator();
  initEmailAutomation();
  initLinks();
  initSchedules();
  updateStats();
  document.getElementById("settings-form")?.addEventListener("submit", handleSaveSettings);
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
        document.getElementById("letter-regarding").value = found.regarding;
        document.getElementById("letter-opening").value = found.openingText;
        document.getElementById("letter-closing").value = found.closingText;
        document.getElementById("letter-event-name").value = found.defaultEventName;
        updateLetterPreview();
      }
    });
  }

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
    "letter-closing"
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updateLetterPreview);
  });

  // Download buttons
  const btnWord = document.getElementById("btn-download-word");
  if (btnWord) btnWord.addEventListener("click", downloadWordDocument);

  const btnPdf = document.getElementById("btn-download-pdf");
  if (btnPdf) btnPdf.addEventListener("click", downloadPdfDocument);

  renderLetterHistory();
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
function downloadWordDocument() {
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

  const wordHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${reg}</title>
      <style>
        body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.4; color: #000; }
        .center { text-align: center; }
        .right { text-align: right; }
        .justify { text-align: justify; }
        .bold { font-weight: bold; }
        .kop-title { font-size: 13pt; font-weight: bold; margin: 0; }
        .kop-sub { font-size: 12pt; font-weight: bold; margin: 2pt 0; }
        .kop-address { font-size: 9pt; font-style: italic; color: #444; margin: 0; }
        hr { border: none; border-bottom: 2px solid #000; margin-top: 5px; margin-bottom: 15px; }
        table { width: 100%; border-collapse: collapse; margin: 8pt 0; }
        td { vertical-align: top; padding: 2pt 0; }
      </style>
    </head>
    <body>
      <div class="center">
        <p class="kop-title">KULIAH KERJA NYATA (KKN) ${(settings.kkn_university || "UNIVERSITAS").toUpperCase()}</p>
        <p class="kop-sub">${(settings.kkn_group_name || "KELOMPOK KKN").toUpperCase()} - ${(settings.kkn_village || "DESA").toUpperCase()}</p>
        <p class="kop-address">Sekretariat / Posko: ${settings.kkn_village || "Desa"} | Email: kkn.official@univ.ac.id</p>
      </div>
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

      <p style="margin-top: 15pt;">Kepada Yth.<br/>
      <b>${rName}</b><br/>
      ${rTitle}<br/>
      di Tempat</p>

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
            Sekretaris KKN,<br/><br/><br/><br/>
            <b><u>(${settings.kkn_secretary_name || "Sekretaris"})</u></b>
          </td>
          <td style="width: 50%; text-align: center;">
            Ketua Kelompok KKN,<br/><br/><br/><br/>
            <b><u>(${settings.kkn_leader_name || "Ketua Kelompok"})</u></b>
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

// Download PDF directly in the browser
function downloadPdfDocument() {
  const letterPreview = document.getElementById("a4-letter-preview");
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
    margin: [10, 10, 10, 10],
    filename: `${safeFilename}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] }
  };

  html2pdf()
    .set(pdfOptions)
    .from(letterPreview)
    .save()
    .then(() => showToast("Surat PDF berhasil diunduh!"))
    .catch(() => showToast("PDF gagal dibuat. Silakan coba lagi."));
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
    document.getElementById("add-link-modal")?.classList.remove("hidden");
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

function handleAddLink(e) {
  e.preventDefault();
  const form = e.target;
  const links = getStorage(STORAGE_KEYS.LINKS, DEFAULT_LINKS);

  const newLink = {
    id: Date.now(),
    title: form.title.value,
    url: form.url.value,
    category: form.category.value,
    description: form.description.value,
    is_pinned: form.is_pinned.checked ? 1 : 0
  };

  links.unshift(newLink);
  setStorage(STORAGE_KEYS.LINKS, links);
  form.reset();
  document.getElementById("add-link-modal")?.classList.add("hidden");
  renderLinks();
  showToast("Link penting berhasil ditambahkan!");
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

function initSchedules() {
  document.getElementById("btn-open-add-schedule-modal")?.addEventListener("click", () => {
    document.getElementById("add-schedule-modal")?.classList.remove("hidden");
  });

  document.getElementById("btn-close-schedule-modal")?.addEventListener("click", () => {
    document.getElementById("add-schedule-modal")?.classList.add("hidden");
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

function handleAddSchedule(e) {
  e.preventDefault();
  const form = e.target;
  const schedules = getStorage(STORAGE_KEYS.SCHEDULES, DEFAULT_SCHEDULES);

  const newSchedule = {
    id: Date.now(),
    title: form.title.value,
    date: form.date.value,
    time: form.time.value,
    category: form.category.value,
    priority: form.priority.value,
    status: "Belum Dimulai",
    location: form.location.value,
    description: form.description.value
  };

  schedules.unshift(newSchedule);
  setStorage(STORAGE_KEYS.SCHEDULES, schedules);
  form.reset();
  document.getElementById("add-schedule-modal")?.classList.add("hidden");
  renderSchedules();
  showToast("Agenda kegiatan baru berhasil disimpan!");
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
    await window.KKN_CLOUD?.pull();
    initializeAppAfterAuth();
  })();
});
