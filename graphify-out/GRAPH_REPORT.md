# Graph Report - /home/user/cardgen-ai  (2026-08-04)

## Corpus Check
- Corpus is ~5,537 words - fits in a single context window. You may not need a graph.

## Summary
- 110 nodes · 142 edges · 11 communities (8 shown, 3 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.7)
- Token cost: 4,800 input · 2,950 output

## Community Hubs (Navigation)
- Frontend UI & Interactions
- Graphify Knowledge Tools
- Node.js Server & Deps
- Python CardGen Handler
- Text Generation API
- Image Prompt API
- Session Hook System
- Express App Bootstrap
- Vercel Routing
- Run Script
- Project Root

## God Nodes (most connected - your core abstractions)
1. `graphify skill` - 17 edges
2. `CardGenHandler` - 10 edges
3. `showToast()` - 8 edges
4. `handler` - 7 edges
5. `handler` - 7 edges
6. `generateContent()` - 5 edges
7. `session-start-hook skill` - 5 edges
8. `showLoading()` - 4 edges
9. `hideLoading()` - 4 edges
10. `scripts` - 3 edges

## Surprising Connections (you probably didn't know these)
- `git post-commit hook integration` --semantically_similar_to--> `SessionStart hook event`  [INFERRED] [semantically similar]
  graphify-out/obsidian/git post-commit hook integration.md → graphify-out/obsidian/SessionStart hook event.md
- `CLAUDE.md native integration` --semantically_similar_to--> `settings.json hook registration`  [INFERRED] [semantically similar]
  graphify-out/obsidian/CLAUDE.md native integration.md → graphify-out/obsidian/settings.json hook registration.md
- `Obsidian vault export` --semantically_similar_to--> `Neo4j Cypher export`  [INFERRED] [semantically similar]
  graphify-out/obsidian/Obsidian vault export.md → graphify-out/obsidian/Neo4j Cypher export.md
- `AST structural extraction` --references--> `graphify skill`  [EXTRACTED]
  graphify-out/obsidian/AST structural extraction.md → graphify-out/obsidian/graphify skill.md
- `community detection` --references--> `graphify skill`  [EXTRACTED]
  graphify-out/obsidian/community detection.md → graphify-out/obsidian/graphify skill.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **graphify output format family** — graphify_out_obsidian_knowledge_graph_output, graphify_out_obsidian_interactive_html_output, graphify_out_obsidian_graphrag_ready_json_output, graphify_out_obsidian_obsidian_vault_export, graphify_out_obsidian_neo4j_cypher_export [INFERRED 0.85]
- **graphify extraction pipeline** — graphify_out_obsidian_ast_structural_extraction, graphify_out_obsidian_semantic_extraction_subagents, graphify_out_obsidian_community_detection [INFERRED 0.80]
- **hook system components** — graphify_out_obsidian_session_start_hook_skill, graphify_out_obsidian_sessionstart_hook_event, graphify_out_obsidian_settings_json_hook_registration, graphify_out_obsidian_hook_environment_variables, graphify_out_obsidian_async_hook_mode [EXTRACTED 0.90]

## Communities (11 total, 3 thin omitted)

### Community 0 - "Frontend UI & Interactions"
Cohesion: 0.13
Nodes (18): animateProgress(), copyAllContent(), copyBullets(), copyKeyword(), copyKeywords(), copyText(), escapeHtml(), generateContent() (+10 more)

### Community 1 - "Graphify Knowledge Tools"
Cohesion: 0.14
Nodes (18): AST structural extraction, CLAUDE.md native integration, community detection, git post-commit hook integration, GRAPH_REPORT.md audit trail, graphify skill, graphify skill reference, graphify trigger /graphify (+10 more)

### Community 2 - "Node.js Server & Deps"
Cohesion: 0.13
Nodes (14): cors, express, node-fetch, dependencies, cors, express, node-fetch, description (+6 more)

### Community 3 - "Python CardGen Handler"
Cohesion: 0.27
Nodes (5): build_text_prompt(), call_deepseek(), CardGenHandler, get_server_api_key(), BaseHTTPRequestHandler

### Community 4 - "Text Generation API"
Cohesion: 0.31
Nodes (4): build_prompt(), call_deepseek(), handler, BaseHTTPRequestHandler

### Community 5 - "Image Prompt API"
Cohesion: 0.33
Nodes (3): call_deepseek(), handler, BaseHTTPRequestHandler

### Community 6 - "Session Hook System"
Cohesion: 0.29
Nodes (7): async hook mode, CLAUDE_CODE_REMOTE env var, dependency installation idempotent, hook environment variables, session-start-hook skill, SessionStart hook event, settings.json hook registration

### Community 7 - "Express App Bootstrap"
Cohesion: 0.33
Nodes (5): app, cors, express, fetch, path

## Knowledge Gaps
- **30 isolated node(s):** `name`, `version`, `description`, `main`, `start` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `name`, `version`, `description` to the rest of the system?**
  _30 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Frontend UI & Interactions` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `Graphify Knowledge Tools` be split into smaller, more focused modules?**
  _Cohesion score 0.13725490196078433 - nodes in this community are weakly interconnected._
- **Should `Node.js Server & Deps` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._