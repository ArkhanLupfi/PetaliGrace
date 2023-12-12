document.addEventListener('DOMContentLoaded', async function () {
    const body = document.body;
    const moonIcon = document.querySelector('.moon-icon');
    const dataImages = document.querySelectorAll('.Data .Category img');

    if (localStorage.getItem('dark-mode') === 'enabled') {
        enableDarkMode();
    }

    moonIcon.addEventListener('click', function () {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // Fungsi untuk memeriksa apakah path gambar valid
    async function isPathExist(path) {
        const img = new Image();
        img.src = path;

        return new Promise((resolve) => {
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

        // Mendapatkan path ikon dengan validasi
        let iconPath;

        if (await isPathExist(getIconPath('sun'))) {
            iconPath = getIconPath('sun');
        } else if (await isPathExist(getIconPath2('sun'))) {
            iconPath = getIconPath2('sun');
        } else if (await isPathExist(getIconPath3('sun'))) {
            iconPath = getIconPath3('sun');
        } else {
            iconPath = getDefaultIconPath();
        }

        moonIcon.src = iconPath;

        // Mengganti sumber gambar untuk mode gelap
        for (const image of dataImages) {
            const currentSrc = image.src;
            const newSrc = await isPathExist(getDarkModeSrc(currentSrc)) ? getDarkModeSrc(currentSrc) : getNormalModeSrc(currentSrc);
            image.src = newSrc;
        }
    }

    // Fungsi untuk menonaktifkan mode gelap
    async function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('dark-mode', null);

        // Mendapatkan path ikon dengan validasi
        let iconPath;

        if (await isPathExist(getIconPath('moon'))) {
            iconPath = getIconPath('moon');
        } else if (await isPathExist(getIconPath2('moon'))) {
            iconPath = getIconPath2('moon');
        } else if (await isPathExist(getIconPath3('moon'))) {
            iconPath = getIconPath3('moon');
        } else {
            iconPath = getDefaultIconPath();
        }

        moonIcon.src = iconPath;

        // Mengembalikan sumber gambar ke mode normal
        for (const image of dataImages) {
            const currentSrc = image.src;
            const newSrc = await isPathExist(getNormalModeSrc(currentSrc)) ? getNormalModeSrc(currentSrc) : getDarkModeSrc(currentSrc);
            image.src = newSrc;
        }
    }

    // Fungsi untuk mendapatkan path ikon dengan tingkat direktori relatif
    function getIconPath(iconName) {
        return `../../assets/icons/${iconName}.png`;
    }

    // Fungsi untuk mendapatkan path ikon dengan tingkat direktori lebih tinggi
    function getIconPath2(iconName2) {
        return `../../../assets/icons/${iconName2}.png`;
    }

    // Fungsi untuk mendapatkan path ikon dengan tingkat direktori lebih tinggi lagi
    function getIconPath3(iconName3) {
        return `../../../../assets/icons/${iconName3}.png`;
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

    // Fungsi untuk mendapatkan path ikon default
    function getDefaultIconPath() {
        return 'path/to/default/icon.png';
    }
});
