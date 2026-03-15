// Fungsi Pendaftaran di Antri.js
function validasiData() {
    const namaInput = document.getElementById('nama').value;
    const poliInput = document.getElementById('poli').value;

    if (namaInput && poliInput) {
        let antreanMasuk = JSON.parse(localStorage.getItem('antrianMasuk')) || [];
        
        let totalHariIni = parseInt(localStorage.getItem('counterAntrian')) || 0;
        totalHariIni++; 
        
        const idPasien = Date.now().toString(); // Simpan sebagai string agar mudah dibandingkan
        const prefix = (poliInput === 'Umum') ? 'A-' : (poliInput === 'Gigi') ? 'B-' : 'C-';
        const nomorFix = prefix + totalHariIni;

        const pasienBaru = {
            id: idPasien,
            nama: namaInput,
            poli: poliInput,
            nomorAntrian: nomorFix, 
            waktu: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        antreanMasuk.push(pasienBaru);
        
        // --- PERBAIKAN DI SINI ---
        localStorage.setItem('antrianMasuk', JSON.stringify(antreanMasuk));
        localStorage.setItem('counterAntrian', totalHariIni.toString());
        sessionStorage.setItem('myID', idPasien); // WAJIB ADA AGAR BISA DIPANGGIL
        // -------------------------
        
        document.getElementById('section-input').style.display = 'none';
        document.getElementById('section-antrian').style.display = 'block';
        document.getElementById('no-saya').innerText = nomorFix; 
        
        alert("Berhasil! Nomor Antrean Anda: " + nomorFix);

        // Mulai mendengarkan panggilan
        const intervalPanggil = setInterval(() => {
            cekPanggilanPetugas(intervalPanggil);
        }, 2000);

    } else {
        alert("Mohon isi nama dan pilih poli!");
    }
}

// Fungsi Mendengarkan Panggilan
function cekPanggilanPetugas(intervalId) {
    const myID = sessionStorage.getItem('myID');
    const sedangDipanggil = JSON.parse(localStorage.getItem('sedangDipanggil'));

    // Pastikan sedangDipanggil ada isi dan ID-nya cocok
    if (sedangDipanggil && sedangDipanggil.id == myID) {
        const statusNotif = document.getElementById('notif-panggil');
        
        if (statusNotif) {
            statusNotif.innerText = "SILAKAN MASUK KE POLI!";
            statusNotif.style.background = "#117a55";
            statusNotif.classList.add("animate-bounce");
        }

        // Suara Panggilan (Perbaikan: pastikan data tidak undefined)
        const nomorSuara = sedangDipanggil.nomor || "";
        const namaSuara = sedangDipanggil.nama || "";
        const poliSuara = sedangDipanggil.poli || "";

        const teksPanggilan = `Nomor antrian ${nomorSuara}, atas nama ${namaSuara}, silakan masuk ke poli ${poliSuara}`;
        
        const msg = new SpeechSynthesisUtterance(teksPanggilan);
        msg.lang = 'id-ID';
        msg.rate = 0.8;
        window.speechSynthesis.speak(msg);

        clearInterval(intervalId);
        
        // Hapus tanda panggilan setelah 5 detik agar tidak bentrok
        setTimeout(() => {
            localStorage.removeItem('sedangDipanggil');
        }, 5000);
    }
}

function selesai() {
    if(confirm("Apakah Anda sudah selesai berobat?")) {
        sessionStorage.clear();
        location.reload(); 
    }
}