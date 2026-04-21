# Graph Report - /home/user/cardgen-ai  (2026-04-21)

## Corpus Check
- Corpus is ~11,060 words - fits in a single context window. You may not need a graph.

## Summary
- 122 nodes · 174 edges · 9 communities detected
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.85)
- Token cost: 6,800 input · 2,100 output

## Community Hubs (Navigation)
- [[_COMMUNITY_AI API & Prompt Building|AI API & Prompt Building]]
- [[_COMMUNITY_Frontend UI Functions|Frontend UI Functions]]
- [[_COMMUNITY_Graphify Knowledge Graph|Graphify Knowledge Graph]]
- [[_COMMUNITY_Client-Side UX & State|Client-Side UX & State]]
- [[_COMMUNITY_Python HTTP Server|Python HTTP Server]]
- [[_COMMUNITY_Serverless API Handlers|Serverless API Handlers]]
- [[_COMMUNITY_CORS & Request Routing|CORS & Request Routing]]
- [[_COMMUNITY_Session Hooks & Config|Session Hooks & Config]]
- [[_COMMUNITY_Node.js Express Server|Node.js Express Server]]

## God Nodes (most connected - your core abstractions)
1. `graphify skill` - 17 edges
2. `CardGenHandler` - 10 edges
3. `handler` - 7 edges
4. `handler` - 7 edges
5. `POST /api/generate-text route (server.js)` - 7 edges
6. `generateContent() client function` - 7 edges
7. `SPA index.html (CardGen AI frontend)` - 7 edges
8. `generateContent()` - 5 edges
9. `DeepSeek API call via node-fetch (server.js)` - 5 edges
10. `handle_generate_text() method (server.py)` - 5 edges

## Surprising Connections (you probably didn't know these)
- `API key resolution (env var > config file)` --semantically_similar_to--> `API key persisted in localStorage`  [INFERRED] [semantically similar]
  server.py → public/app.js
- `build_text_prompt() function (server.py)` --semantically_similar_to--> `POST /api/generate-text route (server.js)`  [INFERRED] [semantically similar]
  server.py → server.js
- `call_deepseek() function (server.py)` --semantically_similar_to--> `DeepSeek API call via node-fetch (server.js)`  [INFERRED] [semantically similar]
  server.py → server.js
- `call_deepseek() in api/generate-text.py` --semantically_similar_to--> `DeepSeek API call via node-fetch (server.js)`  [INFERRED] [semantically similar]
  api/generate-text.py → server.js
- `build_prompt() in api/generate-text.py` --semantically_similar_to--> `build_text_prompt() function (server.py)`  [INFERRED] [semantically similar]
  api/generate-text.py → server.py

## Hyperedges (group relationships)
- **Three parallel server implementations for the same API** — serverjs_express_app, serverpy_http_server, concept_vercel_handlers [INFERRED 0.90]
- **SEO content generation pipeline: form input -> prompt build -> DeepSeek -> render results** — html_product_form, serverjs_generate_text_route, appjs_render_results [INFERRED 0.85]
- **Marketplace-aware generation: Ozon, Wildberries, and both-mode with distinct rules** — concept_marketplace_rules, serverjs_marketplace_rules, html_marketplace_selector_ui [INFERRED 0.88]
- **graphify output format family** — knowledge_graph_output, interactive_html_output, graphrag_ready_json_output, obsidian_vault_export, neo4j_cypher_export [INFERRED 0.85]
- **graphify extraction pipeline** — ast_structural_extraction, semantic_extraction_subagents, community_detection [INFERRED 0.80]
- **hook system components** — session_start_hook_skill, sessionstart_hook_event, settings_json_hook_registration, hook_environment_variables, async_hook_mode [EXTRACTED 0.90]

## Communities

### Community 0 - "AI API & Prompt Building"
Cohesion: 0.12
Nodes (27): call_deepseek() in api/generate-image-prompt.py, Vercel-style handler: api/generate-image-prompt.py, build_prompt() in api/generate-text.py, call_deepseek() in api/generate-text.py, Vercel-style handler: api/generate-text.py, generateImagePrompt() client function, Dual server implementation (Node.js Express + Python HTTPServer), AI image prompt generation for marketplace photos (+19 more)

### Community 1 - "Frontend UI Functions"
Cohesion: 0.12
Nodes (12): animateProgress(), escapeHtml(), generateContent(), generateImagePrompt(), hideLoading(), renderMPCard(), renderResults(), showLoading() (+4 more)

### Community 2 - "Graphify Knowledge Graph"
Cohesion: 0.14
Nodes (18): AST structural extraction, CLAUDE.md native integration, community detection, git post-commit hook integration, GRAPH_REPORT.md audit trail, graphify skill, graphify skill reference, graphify trigger /graphify (+10 more)

### Community 3 - "Client-Side UX & State"
Cohesion: 0.18
Nodes (14): Copy-to-clipboard functions (copyText/copyBullets/copyKeywords/copyAllContent), generateContent() client function, Loading state animation (showLoading/hideLoading/animateProgress), API key persisted in localStorage, selectMP() marketplace selector state, renderResults() / renderMPCard() UI renderer, selectTone() tone selector state, FAQ section (+6 more)

### Community 4 - "Python HTTP Server"
Cohesion: 0.31
Nodes (4): build_text_prompt(), call_deepseek(), CardGenHandler, get_server_api_key()

### Community 5 - "Serverless API Handlers"
Cohesion: 0.31
Nodes (4): BaseHTTPRequestHandler, build_prompt(), call_deepseek(), handler

### Community 6 - "CORS & Request Routing"
Cohesion: 0.39
Nodes (2): call_deepseek(), handler

### Community 7 - "Session Hooks & Config"
Cohesion: 0.29
Nodes (7): async hook mode, CLAUDE_CODE_REMOTE env var, dependency installation idempotent, hook environment variables, session-start-hook skill, SessionStart hook event, settings.json hook registration

### Community 8 - "Node.js Express Server"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **17 isolated node(s):** `Tone map (professional/friendly/premium/simple)`, `SPA fallback GET handler (serves index.html)`, `Copy-to-clipboard functions (copyText/copyBullets/copyKeywords/copyAllContent)`, `Loading state animation (showLoading/hideLoading/animateProgress)`, `Pricing section (Start/Pro/Business tiers)` (+12 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Node.js Express Server`** (1 nodes): `server.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `POST /api/generate-text route (server.js)` connect `AI API & Prompt Building` to `Client-Side UX & State`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `generateContent() client function` connect `Client-Side UX & State` to `AI API & Prompt Building`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `CardGenHandler` connect `Python HTTP Server` to `Serverless API Handlers`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `POST /api/generate-text route (server.js)` (e.g. with `SEO-optimized product card content generation` and `build_text_prompt() function (server.py)`) actually correct?**
  _`POST /api/generate-text route (server.js)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Tone map (professional/friendly/premium/simple)`, `SPA fallback GET handler (serves index.html)`, `Copy-to-clipboard functions (copyText/copyBullets/copyKeywords/copyAllContent)` to the rest of the system?**
  _17 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AI API & Prompt Building` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
- **Should `Frontend UI Functions` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._