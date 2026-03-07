let nomorAntrian = 0;

function validasiData() {
    const nama = document.getElementById('nama').value;
    const poli = document.getElementById('poli').value;

    if (nama !== "" && poli !== "") {
        // Kunci input agar tidak bisa diubah saat antrian muncul
        document.getElementById('nama').disabled = true;
        document.getElementById('poli').disabled = true;
        document.getElementById('btn-kirim').style.display = 'none';

        // Generate Nomor Antrian Acak
        nomorAntrian = Math.floor(Math.random() * 100) + 1;
        tampilkanAntrian(nama, poli);
    } else {
        alert("Data tidak lengkap! Mohon isi nama dan pilih poli.");
    }
}

function tampilkanAntrian(nama, poli) {
    const areaAntrian = document.getElementById('section-antrian');
    areaAntrian.style.display = 'block'; // Menampilkan bagian nomor di halaman yang sama
    
    document.getElementById('no-saya').innerText = "A-" + nomorAntrian;
    document.getElementById('info-poli').innerText = "Pasien: " + nama + " | Poli: " + poli;

    // Simulasi Delay Panggilan (3 detik)
    setTimeout(() => {
        const statusNotif = document.getElementById('notif-panggil');
        statusNotif.innerText = "NOTIFIKASI: SILAKAN MASUK KE POLI!";
        statusNotif.style.color = "green";
        statusNotif.style.background = "#e8f5e9";

        // Suara Panggilan Otomatis
        const teksPanggilan = "Nomor antrian " + nomorAntrian + ", atas nama " + nama + ", silakan masuk ke poli " + poli;
        const msg = new SpeechSynthesisUtterance(teksPanggilan);
        msg.lang = 'id-ID';
        window.speechSynthesis.speak(msg);
    }, 3000);
}

function selesai() {
    if(confirm("Apakah Anda sudah selesai berobat? Sistem akan meriset data.")) {
        location.reload(); // Refresh halaman untuk pendaftaran baru
    }
}