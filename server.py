#!/usr/bin/env python3
"""CardGen AI - Сервер для генерации карточек товаров (Ozon / Wildberries)"""

import json
import ssl
import urllib.request
import urllib.error
from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path
import os
import mimetypes

PORT = int(os.environ.get("PORT", 3737))
_script_dir = Path(__file__).parent
_default_public = _script_dir / "public" if (_script_dir / "public").exists() else Path("/tmp/cg_public")
PUBLIC_DIR = Path(os.environ.get("PUBLIC_DIR", str(_default_public)))
CONFIG_FILE = Path("/tmp/cg_config.json")

DEEPSEEK_URL = "https://api.deepseek.com/chat/completions"

# Ключ: сначала env var, потом config файл
DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY", "")

def get_server_api_key() -> str:
    if DEEPSEEK_API_KEY:
        return DEEPSEEK_API_KEY
    try:
        return json.loads(CONFIG_FILE.read_text()).get("api_key", "")
    except Exception:
        return ""


def call_deepseek(api_key: str, messages: list, max_tokens: int = 2048, json_mode: bool = False) -> dict:
    payload = {
        "model": "deepseek-chat",
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": max_tokens,
    }
    if json_mode:
        payload["response_format"] = {"type": "json_object"}

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        DEEPSEEK_URL,
        data=data,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, context=ctx, timeout=60) as resp:
        return json.loads(resp.read().decode("utf-8"))


def build_text_prompt(product_name, category, features, marketplace, tone):
    marketplace_rules = {
        "ozon": {
            "name": "Ozon",
            "rules": "Заголовок до 200 символов. Описание до 5000 символов. До 15 характеристик.",
            "bullets": 15,
        },
        "wildberries": {
            "name": "Wildberries",
            "rules": "Заголовок до 100 символов. Описание до 5000 символов. До 10 характеристик.",
            "bullets": 10,
        },
    }
    tone_map = {
        "professional": "профессиональный и деловой",
        "friendly": "дружелюбный и живой",
        "premium": "премиальный и роскошный",
        "simple": "простой и понятный",
    }
    selected_tone = tone_map.get(tone, tone_map["professional"])

    if marketplace == "both":
        return f"""Ты эксперт по продажам на маркетплейсах. Создай SEO-оптимизированный контент для товара на ДВУХ маркетплейсах.

Товар: {product_name}
Категория: {category}
Ключевые характеристики: {features}
Тон: {selected_tone}

Верни JSON в следующем формате (только JSON, без пояснений):
{{
  "ozon": {{
    "title": "заголовок до 200 символов с ключевыми словами",
    "description": "продающее описание 300-500 слов",
    "bullets": ["характеристика 1", "характеристика 2"],
    "keywords": ["ключевое слово 1", "ключевое слово 2"],
    "seoTips": "краткий совет по SEO для Ozon"
  }},
  "wildberries": {{
    "title": "заголовок до 100 символов",
    "description": "продающее описание 300-500 слов",
    "bullets": ["характеристика 1", "характеристика 2"],
    "keywords": ["ключевое слово 1", "ключевое слово 2"],
    "seoTips": "краткий совет по SEO для Wildberries"
  }}
}}"""

    mp = marketplace_rules.get(marketplace, marketplace_rules["ozon"])
    return f"""Ты эксперт по продажам на маркетплейсах. Создай SEO-оптимизированный контент для карточки товара на {mp['name']}.

Товар: {product_name}
Категория: {category}
Ключевые характеристики: {features}
Тон: {selected_tone}
Правила платформы: {mp['rules']}

Верни JSON в следующем формате (только JSON, без пояснений):
{{
  "title": "заголовок с ключевыми словами в рамках лимита",
  "description": "продающее описание 300-500 слов",
  "bullets": ["характеристика 1", "характеристика 2"],
  "keywords": ["ключевое слово 1", "ключевое слово 2"],
  "seoTips": "краткий совет по оптимизации карточки"
}}"""


class CardGenHandler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        print(f"[CardGen] {self.address_string()} - {fmt % args}")

    def send_json(self, code: int, obj: dict):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def read_body(self) -> dict:
        length = int(self.headers.get("Content-Length", 0))
        return json.loads(self.rfile.read(length).decode("utf-8")) if length else {}

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        if self.path == "/api/generate-text":
            self.handle_generate_text()
        elif self.path == "/api/generate-image-prompt":
            self.handle_generate_image_prompt()
        else:
            self.send_json(404, {"error": "Not found"})

    def handle_generate_text(self):
        try:
            body = self.read_body()
            api_key = body.get("apiKey", "").strip() or get_server_api_key()
            product_name = body.get("productName", "").strip()
            category = body.get("category", "").strip()
            features = body.get("features", "").strip()
            marketplace = body.get("marketplace", "ozon")
            tone = body.get("tone", "professional")

            if not api_key:
                return self.send_json(400, {"error": "API ключ DeepSeek не указан"})
            if not product_name:
                return self.send_json(400, {"error": "Название товара не указано"})

            prompt = build_text_prompt(product_name, category, features, marketplace, tone)
            result = call_deepseek(api_key, [{"role": "user", "content": prompt}], json_mode=True)
            content = result["choices"][0]["message"]["content"]
            parsed = json.loads(content)
            self.send_json(200, {"success": True, "data": parsed, "marketplace": marketplace})

        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8")
            self.send_json(e.code, {"error": f"DeepSeek API: {err_body}"})
        except Exception as e:
            print(f"Error: {e}")
            self.send_json(500, {"error": str(e)})

    def handle_generate_image_prompt(self):
        try:
            body = self.read_body()
            api_key = body.get("apiKey", "").strip() or get_server_api_key()
            product_name = body.get("productName", "").strip()
            category = body.get("category", "товар")
            style = body.get("style", "white")

            if not api_key:
                return self.send_json(400, {"error": "API ключ не указан"})

            style_map = {
                "white": "white studio background, professional product photography",
                "lifestyle": "lifestyle setting, natural environment, warm lighting",
                "minimal": "minimalist pastel background, clean design, simple",
                "premium": "dark premium background, dramatic studio lighting, luxury feel",
            }
            style_desc = style_map.get(style, style_map["white"])

            prompt = f"""Create a detailed image generation prompt in English for a product photo of "{product_name}" (category: {category}) in style: {style_desc}.
The prompt should be optimized for marketplace listings, show the product from the best angles.
Return only the prompt text, no explanations, max 200 words."""

            result = call_deepseek(api_key, [{"role": "user", "content": prompt}], max_tokens=350)
            image_prompt = result["choices"][0]["message"]["content"].strip()
            self.send_json(200, {"success": True, "imagePrompt": image_prompt})

        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8")
            self.send_json(e.code, {"error": f"DeepSeek API: {err_body}"})
        except Exception as e:
            self.send_json(500, {"error": str(e)})

    def do_GET(self):
        # Resolve file path — SPA fallback to index.html
        rel = self.path.lstrip("/") or "index.html"
        file_path = PUBLIC_DIR / rel
        if not file_path.exists() or file_path.is_dir():
            file_path = PUBLIC_DIR / "index.html"

        try:
            data = file_path.read_bytes()
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(f"Read error: {e}".encode())
            return

        mime, _ = mimetypes.guess_type(str(file_path))
        mime = mime or "application/octet-stream"

        self.send_response(200)
        self.send_header("Content-Type", mime)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)


if __name__ == "__main__":
    server = HTTPServer(("0.0.0.0", PORT), CardGenHandler)
    print(f"🚀 CardGen AI запущен на http://localhost:{PORT}")
    print(f"   Нажмите Ctrl+C для остановки")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nСервер остановлен")
        server.shutdown()
