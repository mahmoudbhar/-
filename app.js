const GAZA_LAT = 31.5017;
const GAZA_LON = 34.4668;

function fetchGazaPrayerTimes() {
    fetch(`https://api.aladhan.com/v1/timings?latitude=${GAZA_LAT}&longitude=${GAZA_LON}&method=5`)
        .then(res => res.json())
        .then(data => {
            const t = data.data.timings;
            const d = data.data.date;
            document.getElementById('fajr').innerText = t.Fajr;
            document.getElementById('sunrise').innerText = t.Sunrise;
            document.getElementById('dhuhr').innerText = t.Dhuhr;
            document.getElementById('asr').innerText = t.Asr;
            document.getElementById('maghrib').innerText = t.Maghrib;
            document.getElementById('isha').innerText = t.Isha;
            document.getElementById('hijri-date').innerText = `${d.hijri.day} ${d.hijri.month.ar} ${d.hijri.year} هـ`;
        })
        .catch(() => {
            document.getElementById('hijri-date').innerText = 'المواقيت تعمل بدون إنترنت';
        });
}

let currentPage = 1;
const totalPages = 604;
const quranImg = document.getElementById('quran-page-img');
const pageInput = document.getElementById('page-num-input');

function updatePage() {
    quranImg.src = `https://quran.ksu.edu.sa/png_big/${currentPage}.png`;
    pageInput.value = currentPage;
    localStorage.setItem('last_quran_page', currentPage);
}

function nextPage() {
    if (currentPage < totalPages) { currentPage++; updatePage(); }
}

function prevPage() {
    if (currentPage > 1) { currentPage--; updatePage(); }
}

function jumpToPage(num) {
    let p = parseInt(num);
    if (p >= 1 && p <= totalPages) { currentPage = p; updatePage(); }
}

let touchStartX = 0;
let touchEndX = 0;
const quranViewer = document.getElementById('quran-viewer');
quranViewer.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
quranViewer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) nextPage();
    if (touchEndX > touchStartX + 50) prevPage();
});

let count = 0;
function countUp() {
    count++;
    document.getElementById('counter').innerText = count;
}
function resetCount() {
    count = 0;
    document.getElementById('counter').innerText = count;
}

function switchAzkarTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.azkar-content-list').forEach(list => list.classList.remove('active'));
    if (tab === 'sabah') {
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        document.getElementById('azkar-sabah-list').classList.add('active');
    } else {
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        document.getElementById('azkar-massa-list').classList.add('active');
    }
}

window.onload = () => {
    fetchGazaPrayerTimes();
    const savedPage = localStorage.getItem('last_quran_page');
    if (savedPage) { currentPage = parseInt(savedPage); updatePage(); }
};

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}
