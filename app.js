// ============================================================
// TutoVPN — логика личного кабинета
// ============================================================

// --- ссылка на бота (все действия ведут сюда) ---
var BOT = 'https://t.me/Tuto_VPN_bot';

// --- 1. Пузырьки (фон) ---
(function () {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    var box = document.getElementById('bubbles');
    if (!box) return;
    for (var i = 0; i < 14; i++) {
        var b = document.createElement('span');
        var size = 4 + Math.random() * 14;
        b.style.width = size + 'px';
        b.style.height = size + 'px';
        b.style.left = (Math.random() * 100) + '%';
        b.style.animationDuration = (9 + Math.random() * 12) + 's';
        b.style.animationDelay = (Math.random() * 10) + 's';
        box.appendChild(b);
    }
})();

// --- 2. Копирование ID пользователя ---
(function () {
    var btn = document.getElementById('copyBtn');
    var val = document.getElementById('userId');
    if (!btn || !val) return;
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        var text = val.textContent.trim();
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function () {
                var old = btn.textContent;
                btn.textContent = 'Скопировано ✓';
                setTimeout(function () { btn.textContent = old; }, 1500);
            });
        }
    });
})();

// --- 3. Переключение страниц (меню) ---
(function () {
    var links = document.querySelectorAll('[data-page]');
    var pages = document.querySelectorAll('.page');

    function show(name) {
        pages.forEach(function (p) {
            p.hidden = (p.getAttribute('data-page-content') !== name);
        });
        links.forEach(function (l) {
            l.classList.toggle('header__link--active', l.getAttribute('data-page') === name);
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    links.forEach(function (l) {
        l.addEventListener('click', function (e) {
            e.preventDefault();
            show(l.getAttribute('data-page'));
        });
    });
})();

// --- 4. Данные профиля (пока демо; позже — запрос к API) ---
function renderProfile(data) {
    var set = function (id, text) {
        var el = document.getElementById(id);
        if (el) el.textContent = text;
    };
    set('planName', data.planName);
    set('planPrice', data.planPrice);
    set('expiry', data.expiry);
    set('devices', data.devices);
    set('renew', data.renew);
    set('userId', data.userId);
    set('trafficBig', data.trafficBig);
    set('trafficUsed', data.trafficUsed);
    var bar = document.getElementById('trafficBar');
    if (bar) bar.style.width = data.trafficPercent + '%';
}

var DEMO = {
    planName: '1 месяц',
    planPrice: '99 ₽ на 30 дней',
    expiry: '30 июля 2026',
    devices: '3 / 3',
    renew: '99 ₽ · 30.07.2026',
    userId: 'tg1192017181',
    trafficBig: 'Безлимит',
    trafficUsed: 'Использовано 8 ГБ',
    trafficPercent: 4
};

renderProfile(DEMO);

// --- 5. Переключение устройства на странице "Подключение" ---
(function () {
    var tiles = document.querySelectorAll('[data-device]');
    var guides = document.querySelectorAll('[data-guide]');
    if (!tiles.length) return;

    tiles.forEach(function (tile) {
        tile.addEventListener('click', function () {
            var name = tile.getAttribute('data-device');
            // подсветка выбранной плитки
            tiles.forEach(function (t) {
                t.classList.toggle('device--active', t === tile);
            });
            // показать нужную инструкцию
            guides.forEach(function (g) {
                g.hidden = (g.getAttribute('data-guide') !== name);
            });
        });
    });
})();
