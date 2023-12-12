// Ketika dokumen HTML selesai dimuat
document.addEventListener('DOMContentLoaded', function () {
    // Mendapatkan referensi ke elemen body, ikon bulan, dan semua gambar pada kategori
    const body = document.body;
    const moonIcon = document.querySelector('.moon-icon');
    const dataImages = document.querySelectorAll('.Data .Category img');

    // Memeriksa apakah mode gelap telah diaktifkan sebelumnya
    if (localStorage.getItem('dark-mode') === 'enabled') {
        enableDarkMode();
    }

    // Menambahkan event listener untuk mengaktifkan atau menonaktifkan mode gelap saat ikon bulan diklik
    moonIcon.addEventListener('click', function () {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // Fungsi untuk memeriksa apakah path gambar valid
    function isPathExist(path) {
        const img = new Image();
        img.src = path;

        return new Promise((resolve) => {
            // Menggunakan Promise untuk menangani asynchronicity saat memuat gambar
            img.onload = () => {
                // Gambar berhasil dimuat
                resolve(true);
            };

            img.onerror = () => {
                // Gambar gagal dimuat
                resolve(false);
            };
        });
    }

    // Fungsi untuk mengaktifkan mode gelap
    async function enableDarkMode() {
        body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', 'enabled');

        // Mengganti ikon matahari menjadi ikon bulan
        const iconPath = await isPathExist(getIconPath('sun')) ? getIconPath('sun') : getIconPath2('sun');
        moonIcon.src = iconPath;

        // Mengganti sumber gambar untuk mode gelap
        dataImages.forEach(async (image) => {
            const currentSrc = image.src;
            const newSrc = await isPathExist(getDarkModeSrc(currentSrc)) ? getDarkModeSrc(currentSrc) : getNormalModeSrc(currentSrc);
            image.src = newSrc;
        });
    }

    // Fungsi untuk menonaktifkan mode gelap
    async function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('dark-mode', null);

        // Mengganti ikon bulan menjadi ikon matahari
        const iconPath = await isPathExist(getIconPath('moon')) ? getIconPath('moon') : getIconPath2('moon');
        moonIcon.src = iconPath;

        // Mengembalikan sumber gambar ke mode normal
        dataImages.forEach(async (image) => {
            const currentSrc = image.src;
            const newSrc = await isPathExist(getNormalModeSrc(currentSrc)) ? getNormalModeSrc(currentSrc) : getDarkModeSrc(currentSrc);
            image.src = newSrc;
        });
    }

    // Fungsi untuk mendapatkan path ikon dengan tingkat direktori relatif
    function getIconPath(iconName) {
        return `../../assets/icons/${iconName}.png`;
    }

    // Fungsi untuk mendapatkan path ikon dengan tingkat direktori lebih tinggi
    function getIconPath2(iconName2) {
        return `../../../assets/icons/${iconName2}.png`;
    }

    // Fungsi untuk mengubah path gambar mode gelap
    function getDarkModeSrc(src) {
        return src
            .replace('categories.png', 'categories2.png')
            .replace('flowers.png', 'flowers2.png')
            .replace('herbs.png', 'herbs2.png')
            .replace('poisonivy.png', 'poisonivy2.png');
    }

    // Fungsi untuk mengubah path gambar ke mode normal
    function getNormalModeSrc(src) {
        return src
            .replace('categories2.png', 'categories.png')
            .replace('flowers2.png', 'flowers.png')
            .replace('herbs2.png', 'herbs.png')
            .replace('poisonivy2.png', 'poisonivy.png');
    }
});
