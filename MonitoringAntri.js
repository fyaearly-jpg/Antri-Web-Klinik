// 1. Fungsi untuk memuat data dari localStorage ke tampilan
function muatData() {
    const antrean = JSON.parse(localStorage.getItem('antrianMasuk')) || [];
    const riwayat = JSON.parse(localStorage.getItem('riwayatPanggilan')) || [];
    
    // Render Daftar Antrean Masuk (Bagian Kiri)
    const containerAntrean = document.getElementById('daftar-antrean');
    if (containerAntrean) {
        if (antrean.length === 0) {
            containerAntrean.innerHTML = `<p class="text-center text-slate-400 py-10 italic">Belum ada pasien yang mendaftar...</p>`;
        } else {
            // Menggunakan p.nomorAntrian yang sudah disimpan di antri.js saat pendaftaran
            containerAntrean.innerHTML = antrean.map((p) => `
                <div class="flex items-center justify-between p-4 mb-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div>
                        <span class="text-[10px] font-bold text-blue-600 uppercase tracking-widest">${p.nomorAntrian}</span>
                        <h3 class="text-lg font-bold text-slate-800">${p.nama}</h3>
                        <p class="text-xs text-slate-400">Poli: ${p.poli} | ${p.waktu}</p>
                    </div>
                    <button onclick="panggilPasien(${p.id}, '${p.nama}', '${p.poli}', '${p.nomorAntrian}')" 
                            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition">
                        Panggil
                    </button>
                </div>
            `).join('');
        }
    }

    // Render Riwayat Panggilan (Bagian Kanan)
    const tabelRiwayat = document.getElementById('tabel-riwayat');
    if (tabelRiwayat) {
        if (riwayat.length === 0) {
            tabelRiwayat.innerHTML = `<tr><td colspan="4" class="p-10 text-center text-slate-400 italic">Belum ada riwayat panggilan</td></tr>`;
        } else {
            tabelRiwayat.innerHTML = riwayat.map(r => `
                <tr class="border-b border-slate-50 hover:bg-slate-50 transition">
                    <td class="p-4 text-sm text-slate-500">${r.jam}</td>
                    <td class="p-4 font-bold text-slate-700">${r.nama}</td>
                    <td class="p-4 text-xs font-bold text-slate-400 uppercase">${r.poli} (No: ${r.nomor || '-'})</td>
                    <td class="p-4 text-right">
                        <span class="bg-green-100 text-green-600 text-[10px] px-2 py-1 rounded-md font-bold uppercase">Selesai</span>
                    </td>
                </tr>
            `).join('');
        }
    }
}

function panggilPasien(id, nama, poli, nomorAntrian) {
    // 1. Kirim data lengkap ke LocalStorage
    localStorage.setItem('sedangDipanggil', JSON.stringify({ 
        id: id,  // ID ini harus dikirim agar cocok dengan sessionStorage pasien
        nama: nama, 
        nomor: nomorAntrian,
        poli: poli 
    }));

    // 2. Olah riwayat (Pastikan property-nya benar)
    let antrean = JSON.parse(localStorage.getItem('antrianMasuk')) || [];
    let riwayat = JSON.parse(localStorage.getItem('riwayatPanggilan')) || [];

    antrean = antrean.filter(p => p.id != id);
    riwayat.unshift({
        nama: nama,
        poli: poli,
        nomor: nomorAntrian, // Gunakan nomorAntrian, bukan nomor
        jam: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    localStorage.setItem('antrianMasuk', JSON.stringify(antrean));
    localStorage.setItem('riwayatPanggilan', JSON.stringify(riwayat));
    muatData();
}

// 3. Jalankan auto-refresh setiap 1.5 detik
setInterval(muatData, 1500);

// Jalankan sekali saat startup
muatData();