from http.server import BaseHTTPRequestHandler
import json, ssl, urllib.request, urllib.error, os

DEEPSEEK_KEY = os.environ.get("DEEPSEEK_API_KEY", "sk-22091e53fa7b44d4aa02f600f25e153b")

def call_deepseek(messages, max_tokens=350):
    req = urllib.request.Request(
        "https://api.deepseek.com/chat/completions",
        data=json.dumps({"model": "deepseek-chat", "messages": messages, "temperature": 0.8, "max_tokens": max_tokens}).encode(),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {DEEPSEEK_KEY}"},
        method="POST",
    )
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, context=ctx, timeout=60) as r:
        return json.loads(r.read().decode())

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
            category = body.get("category", "товар")
            style = body.get("style", "white")
            style_map = {
                "white": "white studio background, professional product photography",
                "lifestyle": "lifestyle setting, natural environment, warm lighting",
                "minimal": "minimalist pastel background, clean design",
                "premium": "dark premium background, dramatic studio lighting, luxury",
            }
            prompt = f"""Create a detailed image generation prompt in English for a marketplace product photo of "{product_name}" (category: {category}) in style: {style_map.get(style, style_map['white'])}.
Optimized for Ozon/Wildberries listings, show product from the best angles. Return only the prompt, max 200 words."""
            result = call_deepseek([{"role": "user", "content": prompt}])
            image_prompt = result["choices"][0]["message"]["content"].strip()
            self._json(200, {"success": True, "imagePrompt": image_prompt})
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
