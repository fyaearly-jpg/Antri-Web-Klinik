// DISPLAY ANTRI TV
function tampilkanPanggilan() {
    const data = JSON.parse(localStorage.getItem('sedangDipanggil'));
    
    if (data) {
        // Update teks di layar
        document.getElementById('display-nomor').innerText = data.nomor || "--";
        document.getElementById('display-poli').innerText = "POLI " + (data.poli || "---");
        document.getElementById('display-nama').innerText = data.nama || "Pasien";

        // Efek Visual (Opsional)
        console.log("Menampilkan panggilan untuk:", data.nama);
    }
}

// MENDENGARKAN PERUBAHAN DATA SECARA REAL-TIME
// Event ini akan otomatis jalan setiap kali Petugas klik "Panggil" di tab lain
window.addEventListener('storage', (event) => {
    if (event.key === 'sedangDipanggil') {
        tampilkanPanggilan();
    }
});

// Jalankan saat pertama kali dibuka jika sudah ada data yang tersimpan
tampilkanPanggilan();