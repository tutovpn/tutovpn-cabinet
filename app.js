// ============================================================
// TutoVPN — логика личного кабинета
// ============================================================

// --- 1. Плавающие пузырьки (ambient-фон) ---
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  var box = document.getElementById('bubbles');
  if (!box) return;
  var n = 14;
  for (var i = 0; i < n; i++) {
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

// --- 2. Кнопка "Копировать" ID пользователя ---
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

// --- 3. Загрузка данных пользователя ---
// СЕЙЧАС: демо-данные (зашиты прямо здесь, для показа дизайна).
// ПОЗЖЕ: тут будет запрос к твоему мини-API, который вернёт реальные данные
//        конкретного пользователя. Менять нужно будет только эту функцию.
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

// демо-данные (заглушка). позже заменим на реальный запрос.
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

// ЗАГОТОВКА на будущее — так это будет выглядеть с реальным API:
//
// async function loadRealProfile() {
//   // subId человек получит в ссылке: cab.tutovpn.../?id=XXXX
//   var params = new URLSearchParams(location.search);
//   var id = params.get('id');
//   if (!id) return; // нет id — показываем демо
//   try {
//     var res = await fetch('https://API_АДРЕС/profile?id=' + encodeURIComponent(id));
//     var data = await res.json();
//     renderProfile(data);
//     // убрать демо-плашку
//     var note = document.querySelector('.demo-note');
//     if (note) note.remove();
//   } catch (e) {
//     console.error('Не удалось загрузить профиль:', e);
//   }
// }
// loadRealProfile();
