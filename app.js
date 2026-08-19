// --- 1. المسبحة الإلكترونية ---
let count = 0;
function countUp() { count++; document.getElementById('counter').innerText = count; }
function resetCount() { count = 0; document.getElementById('counter').innerText = count; }

// --- 2. جلب القرآن الكريم ودعم العمل بدون إنترنت ---
const surahSelect = document.getElementById('surah-select');
const surahContainer = document.getElementById('surah-container');

async function fetchSurahs() {
    try {
        const res = await fetch('https://api.alquran.cloud/v1/surah');
        const data = await res.json();
        surahSelect.innerHTML = '<option value="">-- اختر السورة لقراءتها --</option>';
        data.data.forEach(surah => {
            surahSelect.innerHTML += `<option value="${surah.number}">${surah.number}. ${surah.name}</option>`;
        });
    } catch (err) {
        surahSelect.innerHTML = '<option value="">خطأ في تحميل السور أو يعمل بدون شبكة</option>';
    }
}

async function loadSurah() {
    const surahNum = surahSelect.value;
    if (!surahNum) return;
    
    surahContainer.innerHTML = '<p class="placeholder-text">جاري تحميل السورة...</p>';

    try {
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNum}`);
        const data = await res.json();
        
        let surahText = `<h3 style="text-align:center; margin-bottom:15px; color:#1b4332;">${data.data.name}</h3>`;
        if (surahNum != 1 && surahNum != 9) {
            surahText += `<p style="text-align:center; font-weight:bold; margin-bottom:15px;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>`;
        }

        data.data.ayahs.forEach(ayah => {
            let text = ayah.text;
            if (surahNum != 1 && ayah.numberInSurah === 1) {
                text = text.replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "");
            }
            surahText += `${text} <span class="aya-number">﴿${ayah.numberInSurah}﴾</span> `;
        });

        surahContainer.innerHTML = surahText;
    } catch (err) {
        surahContainer.innerHTML = '<p class="placeholder-text">عذراً، تحتاج للاتصال بالإنترنت لأول مرة لفتح هذه السورة.</p>';
    }
}

// --- 3. مواقيت الصلاة ---
function getPrayerTimes(lat, lon) {
    fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=5`)
        .then(r => r.json())
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
        });
}

function initApp() {
    fetchSurahs();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            p => { document.getElementById('location-name').innerText = '📍 موقعك الحالي'; getPrayerTimes(p.coords.latitude, p.coords.longitude); },
            () => { document.getElementById('location-name').innerText = '📍 التوقيت الافتراضي (القاهرة)'; getPrayerTimes(30.0444, 31.2357); }
        );
    } else {
        getPrayerTimes(30.0444, 31.2357);
    }
}

window.onload = initApp;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}