from http.server import BaseHTTPRequestHandler
import json, ssl, urllib.request, urllib.error, os

DEEPSEEK_KEY = os.environ.get("DEEPSEEK_API_KEY", "sk-22091e53fa7b44d4aa02f600f25e153b")

def call_deepseek(messages, max_tokens=2048, json_mode=False):
    payload = {"model": "deepseek-chat", "messages": messages, "temperature": 0.7, "max_tokens": max_tokens}
    if json_mode:
        payload["response_format"] = {"type": "json_object"}
    req = urllib.request.Request(
        "https://api.deepseek.com/chat/completions",
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {DEEPSEEK_KEY}"},
        method="POST",
    )
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, context=ctx, timeout=60) as r:
        return json.loads(r.read().decode())

def build_prompt(product_name, category, features, marketplace, tone):
    tone_map = {"professional": "профессиональный и деловой", "friendly": "дружелюбный и живой",
                "premium": "премиальный и роскошный", "simple": "простой и понятный"}
    t = tone_map.get(tone, tone_map["professional"])

    if marketplace == "both":
        return f"""Ты эксперт по продажам на маркетплейсах. Создай SEO-оптимизированный контент для товара на ДВУХ маркетплейсах.
Товар: {product_name}\nКатегория: {category}\nХарактеристики: {features}\nТон: {t}
Верни JSON (только JSON):
{{"ozon":{{"title":"заголовок до 200 символов","description":"описание 300-500 слов","bullets":["..."],"keywords":["..."],"seoTips":"совет"}},"wildberries":{{"title":"заголовок до 100 символов","description":"описание 300-500 слов","bullets":["..."],"keywords":["..."],"seoTips":"совет"}}}}"""

    rules = {"ozon": "Заголовок до 200 символов. До 15 характеристик.", "wildberries": "Заголовок до 100 символов. До 10 характеристик."}.get(marketplace, "Заголовок до 200 символов.")
    name = {"ozon": "Ozon", "wildberries": "Wildberries"}.get(marketplace, marketplace)
    return f"""Ты эксперт по продажам на маркетплейсах. Создай SEO-оптимизированный контент для {name}.
Товар: {product_name}\nКатегория: {category}\nХарактеристики: {features}\nТон: {t}\nПравила: {rules}
Верни JSON (только JSON):
{{"title":"заголовок","description":"описание 300-500 слов","bullets":["..."],"keywords":["..."],"seoTips":"совет"}}"""

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(length))
            product_name = body.get("productName", "").strip()
            category = body.get("category", "").strip()
            features = body.get("features", "").strip()
            marketplace = body.get("marketplace", "ozon")
            tone = body.get("tone", "professional")
            if not product_name:
                return self._json(400, {"error": "Введите название товара"})
            prompt = build_prompt(product_name, category, features, marketplace, tone)
            result = call_deepseek([{"role": "user", "content": prompt}], json_mode=True)
            content = json.loads(result["choices"][0]["message"]["content"])
            self._json(200, {"success": True, "data": content, "marketplace": marketplace})
        except urllib.error.HTTPError as e:
            self._json(e.code, {"error": f"AI API ошибка: {e.read().decode()}"})
        except Exception as e:
            self._json(500, {"error": str(e)})

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def _json(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self._cors()
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *a): pass
