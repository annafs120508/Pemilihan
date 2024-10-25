// Inisialisasi variabel suara untuk setiap kandidat
let votes = {
    candidate1: 0,
    candidate2: 0,
    candidate3: 0
};

// Variabel untuk melacak apakah pemilih sudah memilih
let hasVoted = false;

// Konfigurasi awal Chart.js untuk Pie Chart
let ctx = document.getElementById("pieChart").getContext("2d");
let pieChart = new Chart(ctx, {
    type: "pie",
    data: {
        labels: ["Kandidat 1", "Kandidat 2", "Kandidat 3"],
        datasets: [{
            label: "Suara Kandidat",
            data: [votes.candidate1, votes.candidate2, votes.candidate3],
            backgroundColor: ["#4CAF50", "#FF6384", "#36A2EB"]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'  // Posisi legenda di atas
            }
        }
    }
});

// Fungsi untuk menambahkan suara ke kandidat yang dipilih
function vote(candidate) {
    if (hasVoted) {
        alert("Anda hanya dapat memilih sekali.");
        return;
    }

    // Tambahkan suara untuk kandidat yang dipilih
    if (votes.hasOwnProperty(candidate)) {
        votes[candidate]++;
    } else {
        console.error(`Kandidat ${candidate} tidak ditemukan.`);
        return;
    }

    // Tandai bahwa pemilih telah memilih
    hasVoted = true;

    // Nonaktifkan semua tombol setelah memilih
    disableButtons();

    // Perbarui hasil dan grafik
    updateResults();
    updateChart();
}

// Fungsi untuk menonaktifkan tombol setelah memilih
function disableButtons() {
    document.querySelectorAll("button").forEach(button => {
        button.disabled = true;
    });
}

// Fungsi untuk memperbarui tampilan hasil pemilihan
function updateResults() {
    // Urutkan hasil suara dari yang terbanyak
    const sortedVotes = Object.entries(votes).sort((a, b) => b[1] - a[1]);

    // Kosongkan konten hasil sebelumnya
    document.getElementById("results").innerHTML = "";

    // Tampilkan hasil yang diurutkan
    sortedVotes.forEach(([candidate, count]) => {
        const candidateNumber = candidate.charAt(candidate.length - 1);  // Ambil nomor kandidat
        const resultText = `Kandidat ${candidateNumber}: ${count} suara`;
        
        // Buat elemen baru untuk menampilkan hasil
        const resultElement = document.createElement("p");
        resultElement.textContent = resultText;
        document.getElementById("results").appendChild(resultElement);
    });
}

// Fungsi untuk memperbarui data di grafik lingkaran
function updateChart() {
    // Perbarui data suara di grafik
    pieChart.data.datasets[0].data = [
        votes.candidate1,
        votes.candidate2,
        votes.candidate3
    ];

    // Refresh grafik agar perubahan terlihat
    pieChart.update();
}
