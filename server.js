const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3737;
const DEEPSEEK_KEY = 'sk-22091e53fa7b44d4aa02f600f25e153b';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Генерация текста через DeepSeek API
app.post('/api/generate-text', async (req, res) => {
  const { productName, category, features, marketplace, tone } = req.body;
  const apiKey = DEEPSEEK_KEY;

  const marketplaceRules = {
    ozon: {
      name: 'Ozon',
      titleLimit: 200,
      descLimit: 5000,
      bulletPoints: 15,
      rules: 'Заголовок до 200 символов. Описание до 5000 символов. До 15 характеристик в виде пунктов.',
    },
    wildberries: {
      name: 'Wildberries',
      titleLimit: 100,
      descLimit: 5000,
      bulletPoints: 10,
      rules: 'Заголовок до 100 символов. Описание до 5000 символов. До 10 ключевых характеристик.',
    },
    both: {
      name: 'Ozon и Wildberries',
      titleLimit: 100,
      descLimit: 5000,
      bulletPoints: 10,
      rules: 'Создай варианты для Ozon (заголовок до 200 символов) и Wildberries (заголовок до 100 символов).',
    },
  };

  const mp = marketplaceRules[marketplace] || marketplaceRules.ozon;
  const toneMap = {
    professional: 'профессиональный и деловой',
    friendly: 'дружелюбный и живой',
    premium: 'премиальный и роскошный',
    simple: 'простой и понятный',
  };
  const selectedTone = toneMap[tone] || toneMap.professional;

  const prompt = marketplace === 'both'
    ? `Ты эксперт по продажам на маркетплейсах. Создай SEO-оптимизированный контент для товара на ДВУХ маркетплейсах.

Товар: ${productName}
Категория: ${category}
Ключевые характеристики: ${features}
Тон: ${selectedTone}

Верни JSON в следующем формате (только JSON, без пояснений):
{
  "ozon": {
    "title": "заголовок до 200 символов с ключевыми словами",
    "description": "продающее описание 300-500 слов",
    "bullets": ["характеристика 1", "характеристика 2", ... до 15 пунктов],
    "keywords": ["ключевое слово 1", "ключевое слово 2", ... 20 слов],
    "seoTips": "краткий совет по SEO для Ozon"
  },
  "wildberries": {
    "title": "заголовок до 100 символов",
    "description": "продающее описание 300-500 слов",
    "bullets": ["характеристика 1", "характеристика 2", ... до 10 пунктов],
    "keywords": ["ключевое слово 1", "ключевое слово 2", ... 20 слов],
    "seoTips": "краткий совет по SEO для Wildberries"
  }
}`
    : `Ты эксперт по продажам на маркетплейсах. Создай SEO-оптимизированный контент для карточки товара на ${mp.name}.

Товар: ${productName}
Категория: ${category}
Ключевые характеристики: ${features}
Тон: ${selectedTone}
Правила платформы: ${mp.rules}

Верни JSON в следующем формате (только JSON, без пояснений):
{
  "title": "заголовок с ключевыми словами в рамках лимита",
  "description": "продающее описание 300-500 слов",
  "bullets": ["характеристика 1", "характеристика 2", ... до ${mp.bulletPoints} пунктов],
  "keywords": ["ключевое слово 1", "ключевое слово 2", ... 20 слов],
  "seoTips": "краткий совет по оптимизации карточки"
}`;

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2048,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: `DeepSeek API ошибка: ${errText}` });
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    const parsed = JSON.parse(content);
    res.json({ success: true, data: parsed, marketplace });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Генерация промпта для изображения через DeepSeek
app.post('/api/generate-image-prompt', async (req, res) => {
  const { productName, category, style } = req.body;
  const apiKey = DEEPSEEK_KEY;

  const styleMap = {
    white: 'белый студийный фон, профессиональная предметная съёмка',
    lifestyle: 'образ жизни, живая обстановка, естественное освещение',
    minimal: 'минималистичный, пастельный фон, чистый дизайн',
    premium: 'премиальный, тёмный фон, студийное освещение, роскошь',
  };
  const selectedStyle = styleMap[style] || styleMap.white;

  const prompt = `Создай подробный промпт на английском для генерации фото товара "${productName}" (категория: ${category}) в стиле: ${selectedStyle}.
Промпт должен быть оптимизирован для маркетплейса, показывать товар с выгодных ракурсов.
Верни только промпт, без пояснений, не более 200 слов.`;

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: `DeepSeek API ошибка: ${errText}` });
    }

    const data = await response.json();
    const imagePrompt = data.choices[0].message.content;
    res.json({ success: true, imagePrompt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`CardGen AI запущен на http://localhost:${PORT}`);
});
