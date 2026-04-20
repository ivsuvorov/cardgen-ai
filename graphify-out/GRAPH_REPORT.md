# Graph Report - /root/.claude  (2026-04-20)

## Corpus Check
- Corpus is ~7,543 words - fits in a single context window. You may not need a graph.

## Summary
- 29 nodes · 32 edges · 7 communities detected
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.71)
- Token cost: 3,200 input · 1,100 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Graphify Skill Core|Graphify Skill Core]]
- [[_COMMUNITY_Git Hooks & Session Setup|Git Hooks & Session Setup]]
- [[_COMMUNITY_Persistent Graph & MCP|Persistent Graph & MCP]]
- [[_COMMUNITY_CLAUDE.md Integration|CLAUDE.md Integration]]
- [[_COMMUNITY_AST & Semantic Extraction|AST & Semantic Extraction]]
- [[_COMMUNITY_Community Detection|Community Detection]]
- [[_COMMUNITY_Audit Trail & Reporting|Audit Trail & Reporting]]

## God Nodes (most connected - your core abstractions)
1. `graphify skill` - 17 edges
2. `session-start-hook skill` - 5 edges
3. `GraphRAG-ready JSON output` - 3 edges
4. `CLAUDE.md native integration` - 3 edges
5. `graphify skill reference` - 2 edges
6. `community detection` - 2 edges
7. `GRAPH_REPORT.md audit trail` - 2 edges
8. `AST structural extraction` - 2 edges
9. `semantic extraction subagents` - 2 edges
10. `MCP stdio server` - 2 edges

## Surprising Connections (you probably didn't know these)
- `graphify skill reference` --references--> `graphify skill`  [EXTRACTED]
  .claude/CLAUDE.md → .claude/skills/graphify/SKILL.md
- `git post-commit hook integration` --semantically_similar_to--> `SessionStart hook event`  [INFERRED] [semantically similar]
  .claude/skills/graphify/SKILL.md → .claude/skills/session-start-hook/SKILL.md
- `settings.json hook registration` --semantically_similar_to--> `CLAUDE.md native integration`  [INFERRED] [semantically similar]
  .claude/skills/session-start-hook/SKILL.md → .claude/skills/graphify/SKILL.md
- `graphify trigger /graphify` --references--> `graphify skill`  [EXTRACTED]
  .claude/CLAUDE.md → .claude/skills/graphify/SKILL.md
- `CLAUDE.md native integration` --references--> `graphify skill reference`  [EXTRACTED]
  .claude/skills/graphify/SKILL.md → .claude/CLAUDE.md

## Hyperedges (group relationships)
- **graphify three output types** — skill_graphify_html_output, skill_graphify_graph_json, skill_graphify_graph_report [EXTRACTED 0.95]
- **graphify extraction pipeline AST + semantic + merge** — skill_graphify_ast_extraction, skill_graphify_semantic_extraction, skill_graphify_knowledge_graph [EXTRACTED 0.90]
- **session start hook setup workflow** — skill_session_start_hook_sessionstart, skill_session_start_hook_dependency_install, skill_session_start_hook_settings_json [EXTRACTED 0.90]

## Communities

### Community 0 - "Graphify Skill Core"
Cohesion: 0.22
Nodes (9): graphify trigger /graphify, interactive HTML output, incremental --update mode, knowledge graph output, graphify skill, Neo4j Cypher export, Obsidian vault export, Karpathy raw folder workflow (+1 more)

### Community 1 - "Git Hooks & Session Setup"
Cohesion: 0.25
Nodes (8): git post-commit hook integration, async hook mode, CLAUDE_CODE_REMOTE env var, dependency installation idempotent, hook environment variables, session-start-hook skill, rationale: async mode trade-off latency vs race condition, SessionStart hook event

### Community 2 - "Persistent Graph & MCP"
Cohesion: 0.67
Nodes (3): GraphRAG-ready JSON output, MCP stdio server, rationale: persistent graph across sessions

### Community 3 - "CLAUDE.md Integration"
Cohesion: 0.67
Nodes (3): graphify skill reference, CLAUDE.md native integration, settings.json hook registration

### Community 4 - "AST & Semantic Extraction"
Cohesion: 1.0
Nodes (2): AST structural extraction, semantic extraction subagents

### Community 5 - "Community Detection"
Cohesion: 1.0
Nodes (2): community detection, rationale: cross-document community surprise discovery

### Community 6 - "Audit Trail & Reporting"
Cohesion: 1.0
Nodes (2): GRAPH_REPORT.md audit trail, rationale: honest audit trail EXTRACTED/INFERRED/AMBIGUOUS

## Knowledge Gaps
- **14 isolated node(s):** `graphify trigger /graphify`, `knowledge graph output`, `interactive HTML output`, `Whisper audio transcription`, `Obsidian vault export` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `AST & Semantic Extraction`** (2 nodes): `AST structural extraction`, `semantic extraction subagents`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community Detection`** (2 nodes): `community detection`, `rationale: cross-document community surprise discovery`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Audit Trail & Reporting`** (2 nodes): `GRAPH_REPORT.md audit trail`, `rationale: honest audit trail EXTRACTED/INFERRED/AMBIGUOUS`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `graphify skill` connect `Graphify Skill Core` to `Git Hooks & Session Setup`, `Persistent Graph & MCP`, `CLAUDE.md Integration`, `AST & Semantic Extraction`, `Community Detection`, `Audit Trail & Reporting`?**
  _High betweenness centrality (0.849) - this node is a cross-community bridge._
- **Why does `session-start-hook skill` connect `Git Hooks & Session Setup` to `CLAUDE.md Integration`?**
  _High betweenness centrality (0.331) - this node is a cross-community bridge._
- **Why does `CLAUDE.md native integration` connect `CLAUDE.md Integration` to `Graphify Skill Core`?**
  _High betweenness centrality (0.210) - this node is a cross-community bridge._
- **What connects `graphify trigger /graphify`, `knowledge graph output`, `interactive HTML output` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._