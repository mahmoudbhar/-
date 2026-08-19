const GAZA_LAT = 31.5017;
const GAZA_LON = 34.4668;

// قائمة بداية الصفحات لكل سورة من سور القرآن الكريم (114 سورة)
const surahPages = [
    { name: "الفاتحة", page: 1 }, { name: "البقرة", page: 2 }, { name: "آل عمران", page: 50 }, { name: "النساء", page: 77 },
    { name: "المائدة", page: 106 }, { name: "الأنعام", page: 128 }, { name: "الأعراف", page: 151 }, { name: "الأنفال", page: 177 },
    { name: "التوبة", page: 187 }, { name: "يونس", page: 208 }, { name: "هود", page: 221 }, { name: "يوسف", page: 235 },
    { name: "الرعد", page: 249 }, { name: "إبراهيم", page: 255 }, { name: "الحجر", page: 262 }, { name: "النحل", page: 267 },
    { name: "الإسراء", page: 282 }, { name: "الكهف", page: 293 }, { name: "مريم", page: 305 }, { name: "طه", page: 312 },
    { name: "الأنبياء", page: 322 }, { name: "الحج", page: 332 }, { name: "المؤمنون", page: 342 }, { name: "النور", page: 350 },
    { name: "الفرقان", page: 359 }, { name: "الشعراء", page: 367 }, { name: "النمل", page: 377 }, { name: "القصص", page: 385 },
    { name: "العنكبوت", page: 396 }, { name: "الروم", page: 404 }, { name: "لقمان", page: 411 }, { name: "السجدة", page: 415 },
    { name: "الأحزاب", page: 418 }, { name: "سبأ", page: 428 }, { name: "فاطر", page: 434 }, { name: "يس", page: 440 },
    { name: "الصافات", page: 446 }, { name: "ص", page: 453 }, { name: "الزمر", page: 458 }, { name: "غافر", page: 467 },
    { name: "فصلت", page: 477 }, { name: "الشورى", page: 483 }, { name: "الزخرف", page: 489 }, { name: "الدخان", page: 496 },
    { name: "الجاثية", page: 499 }, { name: "الأحقاف", page: 502 }, { name: "محمد", page: 507 }, { name: "الفتح", page: 511 },
    { name: "الحجرات", page: 515 }, { name: "ق", page: 518 }, { name: "الذاريات", page: 520 }, { name: "الطور", page: 523 },
    { name: "النجم", page: 526 }, { name: "القمر", page: 528 }, { name: "الرحمن", page: 531 }, { name: "الواقعة", page: 534 },
    { name: "الحديد", page: 537 }, { name: "المجادلة", page: 542 }, { name: "الحشر", page: 545 }, { name: "الممتحنة", page: 549 },
    { name: "الصف", page: 551 }, { name: "الجمعة", page: 553 }, { name: "المنافقون", page: 554 }, { name: "التغابن", page: 556 },
    { name: "الطلاق", page: 558 }, { name: "التحريم", page: 560 }, { name: "الملك", page: 562 }, { name: "القلم", page: 564 },
    { name: "الحاقة", page: 566 }, { name: "المعارج", page: 568 }, { name: "نوح", page: 570 }, { name: "الجن", page: 572 },
    { name: "المزمل", page: 574 }, { name: "المدثر", page: 575 }, { name: "القيامة", page: 577 }, { name: "الإنسان", page: 578 },
    { name: "المرسلات", page: 580 }, { name: "النبأ", page: 582 }, { name: "النازعات", page: 583 }, { name: "عبس", page: 585 },
    { name: "التكوير", page: 586 }, { name: "الانفطار", page: 587 }, { name: "المطففين", page: 587 }, { name: "الانشقاق", page: 589 },
    { name: "البروج", page: 590 }, { name: "الطارق", page: 591 }, { name: "الأعلى", page: 591 }, { name: "الغاشية", page: 592 },
    { name: "الفجر", page: 593 }, { name: "البلد", page: 594 }, { name: "الشمس", page: 595 }, { name: "الليل", page: 595 },
    { name: "الضحى", page: 596 }, { name: "الشرح", page: 596 }, { name: "التين", page: 597 }, { name: "العلق", page: 597 },
    { name: "القدر", page: 598 }, { name: "البينة", page: 598 }, { name: "الزلزلة", page: 599 }, { name: "العاديات", page: 599 },
    { name: "القارعة", page: 600 }, { name: "التكاثر", page: 600 }, { name: "العصر", page: 601 }, { name: "الهمزة", page: 601 },
    { name: "الفيل", page: 601 }, { name: "قريش", page: 602 }, { name: "الماعون", page: 602 }, { name: "الكوثر", page: 602 },
    { name: "الكافرون", page: 603 }, { name: "النصر", page: 603 }, { name: "المسد", page: 603 }, { name: "الإخلاص", page: 604 },
    { name: "الفلق", page: 604 }, { name: "الناس", page: 604 }
];

// تعبئة قائمة السور تلقائياً
function populateSurahSelect() {
    const select = document.getElementById('surah-select');
    surahPages.forEach((s, idx) => {
        const option = document.createElement('option');
        option.value = s.page;
        option.textContent = `${idx + 1}. سورة ${s.name}`;
        select.appendChild(option);
    });
}

// 1. مواقيت الصلاة وتخزينها لحالة عدم وجود إنترنت
function fetchGazaPrayerTimes() {
    fetch(`https://api.aladhan.com/v1/timings?latitude=${GAZA_LAT}&longitude=${GAZA_LON}&method=5`)
        .then(res => res.json())
        .then(data => {
            const t = data.data.timings;
            const d = data.data.date;
            
            // حفظ التوقيت محلياً
            const prayerData = { timings: t, hijri: d.hijri };
            localStorage.setItem('cached_prayers', JSON.stringify(prayerData));
            
            applyPrayerTimes(t, `${d.hijri.day} ${d.hijri.month.ar} ${d.hijri.year} هـ`);
        })
        .catch(() => {
            // استرجاع المواقيت المحفوظة في حال عدم وجود انترنت
            const cached = localStorage.getItem('cached_prayers');
            if (cached) {
                const parsed = JSON.parse(cached);
                applyPrayerTimes(parsed.timings, `${parsed.hijri.day} ${parsed.hijri.month.ar} ${parsed.hijri.year} هـ (بدون إنترنت)`);
            } else {
                document.getElementById('hijri-date').innerText = 'المواقيت تعمل بدون إنترنت عند الاتصال الأول';
            }
        });
}

function applyPrayerTimes(t, dateStr) {
    document.getElementById('fajr').innerText = t.Fajr;
    document.getElementById('sunrise').innerText = t.Sunrise;
    document.getElementById('dhuhr').innerText = t.Dhuhr;
    document.getElementById('asr').innerText = t.Asr;
    document.getElementById('maghrib').innerText = t.Maghrib;
    document.getElementById('isha').innerText = t.Isha;
    document.getElementById('hijri-date').innerText = dateStr;
}

// 2. التحكم في المصحف والتصفح
let currentPage = 1;
const totalPages = 604;
const quranImg = document.getElementById('quran-page-img');
const pageInput = document.getElementById('page-num-input');

function updatePage() {
    quranImg.src = `https://quran.ksu.edu.sa/png_big/${currentPage}.png`;
    pageInput.value = currentPage;
    localStorage.setItem('last_quran_page', currentPage);
}

function nextPage() { if (currentPage < totalPages) { currentPage++; updatePage(); } }
function prevPage() { if (currentPage > 1) { currentPage--; updatePage(); } }
function jumpToPage(num) {
    let p = parseInt(num);
    if (p >= 1 && p <= totalPages) { currentPage = p; updatePage(); }
}
function jumpToSurah(page) {
    if (page) jumpToPage(page);
}

// السحب يمين ويسار لتغيير الصفحات
let touchStartX = 0;
let touchEndX = 0;
const quranViewer = document.getElementById('quran-viewer');

quranViewer.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
quranViewer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    // التصفح باتجاه القرآن الصحيح (السحب لليمين يرجع صفحة للخلف، السحب لليصار يتقدم)
    if (touchStartX - touchEndX > 40) nextPage();
    if (touchEndX - touchStartX > 40) prevPage();
}, {passive: true});

// 3. المسبحة والأذكار
let count = 0;
function countUp() { count++; document.getElementById('counter').innerText = count; }
function resetCount() { count = 0; document.getElementById('counter').innerText = count; }

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

// التهيئة عند الفتح
window.onload = () => {
    populateSurahSelect();
    fetchGazaPrayerTimes();
    const savedPage = localStorage.getItem('last_quran_page');
    if (savedPage) { currentPage = parseInt(savedPage); updatePage(); }
};

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}
