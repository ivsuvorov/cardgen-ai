// STATE
let selectedMP = 'ozon';
let selectedTone = 'professional';

// INIT
document.addEventListener('DOMContentLoaded', () => {
  const savedKey = localStorage.getItem('deepseek_api_key');
  if (savedKey) document.getElementById('apiKey').value = savedKey;
  selectMP('ozon');
  selectTone('professional');
  animateProgress();
});

function saveApiKey(val) {
  localStorage.setItem('deepseek_api_key', val);
}

function toggleApiKey() {
  const inp = document.getElementById('apiKey');
  const icon = document.getElementById('eyeIcon');
  if (inp.type === 'password') {
    inp.type = 'text';
    icon.className = 'fa-solid fa-eye-slash text-sm';
  } else {
    inp.type = 'password';
    icon.className = 'fa-solid fa-eye text-sm';
  }
}

function selectMP(mp) {
  selectedMP = mp;
  ['ozon', 'wildberries', 'both'].forEach(id => {
    const el = document.getElementById(`mp-${id}`);
    if (id === mp) {
      el.className = 'mp-btn mp-btn-active rounded-xl p-3 text-center transition cursor-pointer';
    } else {
      el.className = 'mp-btn mp-btn-inactive rounded-xl p-3 text-center transition hover:bg-slate-50 cursor-pointer';
    }
  });
}

function selectTone(tone) {
  selectedTone = tone;
  ['professional', 'friendly', 'premium', 'simple'].forEach(id => {
    const el = document.getElementById(`tone-${id}`);
    if (id === tone) {
      el.className = 'tone-btn rounded-xl p-3 border-2 border-indigo-500 bg-indigo-50 text-center transition cursor-pointer';
    } else {
      el.className = 'tone-btn rounded-xl p-3 border-2 border-slate-200 bg-white text-center transition cursor-pointer hover:bg-slate-50';
    }
  });
}

function scrollToApp() {
  document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
}

function toggleFaq(btn) {
  const body = btn.nextElementSibling;
  const icon = btn.querySelector('i');
  body.classList.toggle('hidden');
  icon.style.transform = body.classList.contains('hidden') ? '' : 'rotate(180deg)';
}

let progressInterval = null;
function animateProgress() {
  let val = 10;
  progressInterval = setInterval(() => {
    val = Math.min(val + Math.random() * 8, 88);
    const bar = document.getElementById('progressBar');
    if (bar) bar.style.width = val + '%';
  }, 400);
}
function stopProgress() {
  clearInterval(progressInterval);
  const bar = document.getElementById('progressBar');
  if (bar) bar.style.width = '100%';
}

const loadingMessages = [
  'Анализирую характеристики товара...',
  'Подбираю ключевые слова...',
  'Составляю SEO-заголовок...',
  'Пишу продающее описание...',
  'Формирую список характеристик...',
  'Финальная оптимизация...',
];
let msgIndex = 0;
let msgInterval = null;

function startLoadingMessages() {
  msgIndex = 0;
  const el = document.getElementById('loadingMsg');
  if (el) el.textContent = loadingMessages[0];
  msgInterval = setInterval(() => {
    msgIndex = (msgIndex + 1) % loadingMessages.length;
    const el = document.getElementById('loadingMsg');
    if (el) el.textContent = loadingMessages[msgIndex];
  }, 1500);
}
function stopLoadingMessages() {
  clearInterval(msgInterval);
}

function showLoading() {
  document.getElementById('emptyState').classList.add('hidden');
  document.getElementById('resultsContainer').classList.add('hidden');
  document.getElementById('loadingState').classList.remove('hidden');
  document.getElementById('progressBar').style.width = '10%';
  animateProgress();
  startLoadingMessages();
}
function hideLoading() {
  document.getElementById('loadingState').classList.add('hidden');
  stopProgress();
  stopLoadingMessages();
}

async function generateContent() {
  const apiKey = '';
  const productName = document.getElementById('productName').value.trim();
  const category = document.getElementById('category').value;
  const features = document.getElementById('features').value.trim();

  if (!productName) { showToast('Введите название товара', 'error'); return; }
  if (!category) { showToast('Выберите категорию', 'error'); return; }
  if (!features) { showToast('Опишите характеристики товара', 'error'); return; }

  showLoading();

  try {
    const response = await fetch('/api/generate-text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey, productName, category, features, marketplace: selectedMP, tone: selectedTone }),
    });

    const result = await response.json();
    hideLoading();

    if (!result.success) {
      showToast(result.error || 'Ошибка генерации', 'error');
      document.getElementById('emptyState').classList.remove('hidden');
      return;
    }

    renderResults(result.data, result.marketplace, productName);
    showToast('Контент успешно сгенерирован!', 'success');
  } catch (err) {
    hideLoading();
    showToast('Ошибка соединения с сервером', 'error');
    document.getElementById('emptyState').classList.remove('hidden');
  }
}

function renderResults(data, marketplace, productName) {
  const container = document.getElementById('resultsContainer');
  container.innerHTML = '';
  container.classList.remove('hidden');

  if (marketplace === 'both') {
    container.appendChild(renderMPCard('ozon', data.ozon, productName));
    container.appendChild(renderMPCard('wildberries', data.wildberries, productName));
  } else {
    container.appendChild(renderMPCard(marketplace, data, productName));
  }
}

function renderMPCard(mp, data, productName) {
  const mpInfo = {
    ozon: { name: 'Ozon', color: 'blue', icon: 'O', bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700' },
    wildberries: { name: 'Wildberries', color: 'purple', icon: 'WB', bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700' },
  };
  const info = mpInfo[mp] || mpInfo.ozon;

  const card = document.createElement('div');
  card.className = 'bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden fade-in';

  // Header
  const header = `
    <div class="px-5 py-4 ${info.bg} border-b ${info.border} flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="font-bold text-${info.color}-600 text-lg">${info.icon}</span>
        <h3 class="font-bold text-slate-800">${info.name}</h3>
        <span class="text-xs ${info.badge} px-2 py-0.5 rounded-full font-medium">SEO-оптимизировано</span>
      </div>
      <button onclick="copyAllContent('${mp}')" class="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg copy-btn text-slate-500 font-medium flex items-center gap-1">
        <i class="fa-regular fa-copy text-xs"></i> Копировать всё
      </button>
    </div>`;

  // Title
  const titleSection = `
    <div class="px-5 pt-4 pb-3" id="${mp}-title-section">
      <div class="flex items-center justify-between mb-2">
        <label class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Заголовок</label>
        <div class="flex items-center gap-2">
          <span class="text-xs text-slate-400">${data.title ? data.title.length : 0} символов</span>
          <button onclick="copyText('${mp}-title')" class="text-xs bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg copy-btn text-slate-500">
            <i class="fa-regular fa-copy"></i>
          </button>
        </div>
      </div>
      <p id="${mp}-title" class="text-slate-800 font-semibold text-sm leading-relaxed bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">${escapeHtml(data.title || '')}</p>
    </div>`;

  // Description
  const descSection = `
    <div class="px-5 py-3 border-t border-slate-50">
      <div class="flex items-center justify-between mb-2">
        <label class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Описание</label>
        <button onclick="copyText('${mp}-desc')" class="text-xs bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg copy-btn text-slate-500">
          <i class="fa-regular fa-copy"></i>
        </button>
      </div>
      <div id="${mp}-desc" class="text-slate-700 text-sm leading-relaxed bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 max-h-48 overflow-y-auto">${escapeHtml(data.description || '').replace(/\n/g, '<br/>')}</div>
    </div>`;

  // Bullets
  const bulletsHtml = (data.bullets || []).map((b, i) =>
    `<li class="flex items-start gap-2 text-sm text-slate-700">
      <span class="shrink-0 w-5 h-5 gradient-bg rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">${i+1}</span>
      <span>${escapeHtml(b)}</span>
    </li>`
  ).join('');

  const bulletsSection = `
    <div class="px-5 py-3 border-t border-slate-50">
      <div class="flex items-center justify-between mb-3">
        <label class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Характеристики (${(data.bullets || []).length})</label>
        <button onclick="copyBullets('${mp}')" class="text-xs bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg copy-btn text-slate-500">
          <i class="fa-regular fa-copy"></i>
        </button>
      </div>
      <ul id="${mp}-bullets" class="space-y-2">${bulletsHtml}</ul>
    </div>`;

  // Keywords
  const keywordsHtml = (data.keywords || []).map(k =>
    `<span onclick="copyKeyword(this)" class="tag-chip px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:bg-indigo-100 transition">${escapeHtml(k)}</span>`
  ).join('');

  const keywordsSection = `
    <div class="px-5 py-3 border-t border-slate-50">
      <div class="flex items-center justify-between mb-3">
        <label class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Ключевые слова (${(data.keywords || []).length})</label>
        <button onclick="copyKeywords('${mp}')" class="text-xs bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg copy-btn text-slate-500">
          <i class="fa-regular fa-copy"></i>
        </button>
      </div>
      <div id="${mp}-keywords" class="flex flex-wrap gap-2">${keywordsHtml}</div>
    </div>`;

  // SEO Tip
  const seoSection = data.seoTips ? `
    <div class="px-5 py-3 border-t border-slate-50">
      <div class="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 flex items-start gap-2">
        <i class="fa-solid fa-lightbulb text-amber-500 text-sm mt-0.5 shrink-0"></i>
        <p class="text-xs text-slate-600"><strong class="text-amber-700">SEO совет:</strong> ${escapeHtml(data.seoTips)}</p>
      </div>
    </div>` : '';

  card.innerHTML = header + titleSection + descSection + bulletsSection + keywordsSection + seoSection + `<div class="h-2"></div>`;

  // Store data for copy-all
  card.dataset.mp = mp;
  card.dataset.title = data.title || '';
  card.dataset.description = data.description || '';
  card.dataset.bullets = JSON.stringify(data.bullets || []);
  card.dataset.keywords = JSON.stringify(data.keywords || []);

  return card;
}

function copyText(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const text = el.innerText || el.textContent;
  navigator.clipboard.writeText(text).then(() => showToast('Скопировано!'));
}

function copyKeyword(el) {
  navigator.clipboard.writeText(el.textContent).then(() => showToast('Ключевое слово скопировано'));
}

function copyBullets(mp) {
  const el = document.getElementById(`${mp}-bullets`);
  if (!el) return;
  const items = el.querySelectorAll('li span:last-child');
  const text = Array.from(items).map((s, i) => `${i+1}. ${s.textContent}`).join('\n');
  navigator.clipboard.writeText(text).then(() => showToast('Характеристики скопированы'));
}

function copyKeywords(mp) {
  const el = document.getElementById(`${mp}-keywords`);
  if (!el) return;
  const chips = el.querySelectorAll('span');
  const text = Array.from(chips).map(c => c.textContent).join(', ');
  navigator.clipboard.writeText(text).then(() => showToast('Ключевые слова скопированы'));
}

function copyAllContent(mp) {
  const card = document.querySelector(`[data-mp="${mp}"]`);
  if (!card) return;
  const title = card.dataset.title;
  const desc = card.dataset.description;
  const bullets = JSON.parse(card.dataset.bullets || '[]');
  const keywords = JSON.parse(card.dataset.keywords || '[]');

  const text = [
    `=== ${mp.toUpperCase()} ===`,
    `\nЗАГОЛОВОК:\n${title}`,
    `\nОПИСАНИЕ:\n${desc}`,
    `\nХАРАКТЕРИСТИКИ:\n${bullets.map((b, i) => `${i+1}. ${b}`).join('\n')}`,
    `\nКЛЮЧЕВЫЕ СЛОВА:\n${keywords.join(', ')}`,
  ].join('\n');

  navigator.clipboard.writeText(text).then(() => showToast('Весь контент скопирован!'));
}

async function generateImagePrompt() {
  const apiKey = '';
  const productName = document.getElementById('productName').value.trim();
  const category = document.getElementById('category').value;
  const style = document.getElementById('imageStyle').value;

  if (!productName) { showToast('Введите название товара', 'error'); return; }

  const btn = event.currentTarget;
  const origHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner spinner text-xs"></i> Генерирую...';
  btn.disabled = true;

  try {
    const response = await fetch('/api/generate-image-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey, productName, category: category || 'товар', style }),
    });
    const result = await response.json();

    if (result.success) {
      document.getElementById('imagePromptText').textContent = result.imagePrompt;
      document.getElementById('imagePromptResult').classList.remove('hidden');
      showToast('Промпт готов!');
    } else {
      showToast(result.error || 'Ошибка', 'error');
    }
  } catch (err) {
    showToast('Ошибка соединения', 'error');
  } finally {
    btn.innerHTML = origHTML;
    btn.disabled = false;
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

let toastTimeout = null;
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  const icon = document.getElementById('toastIcon');

  msgEl.textContent = msg;
  if (type === 'error') {
    icon.className = 'fa-solid fa-circle-exclamation text-red-400';
  } else {
    icon.className = 'fa-solid fa-check text-green-400';
  }

  toast.classList.remove('hidden');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.add('hidden'), 2800);
}
