# Graph Report - /root/.claude  (2026-04-21)

## Corpus Check
- Corpus is ~7,593 words - fits in a single context window. You may not need a graph.

## Summary
- 30 nodes · 35 edges · 5 communities detected
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.76)
- Token cost: 3,200 input · 1,800 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Graphify Core & Outputs|Graphify Core & Outputs]]
- [[_COMMUNITY_Session Hooks & Startup|Session Hooks & Startup]]
- [[_COMMUNITY_Persistent Graph & Updates|Persistent Graph & Updates]]
- [[_COMMUNITY_Extraction Pipeline|Extraction Pipeline]]
- [[_COMMUNITY_Audit Trail & Honesty|Audit Trail & Honesty]]

## God Nodes (most connected - your core abstractions)
1. `graphify skill` - 19 edges
2. `startup-hook-skill` - 6 edges
3. `semantic extraction via subagents` - 3 edges
4. `persistent graph across sessions` - 3 edges
5. `honest audit trail EXTRACTED INFERRED AMBIGUOUS` - 3 edges
6. `incremental update flag` - 3 edges
7. `async hook mode` - 3 edges
8. `AST structural extraction` - 2 edges
9. `MCP stdio server` - 2 edges
10. `watch mode auto-rebuild` - 2 edges

## Surprising Connections (you probably didn't know these)
- `semantic extraction via subagents` --semantically_similar_to--> `dependency installation`  [INFERRED] [semantically similar]
  .claude/skills/graphify/SKILL.md → .claude/skills/session-start-hook/SKILL.md
- `MCP stdio server` --semantically_similar_to--> `SessionStart hook`  [INFERRED] [semantically similar]
  .claude/skills/graphify/SKILL.md → .claude/skills/session-start-hook/SKILL.md
- `graphify skill entry` --references--> `graphify skill`  [EXTRACTED]
  .claude/CLAUDE.md → .claude/skills/graphify/SKILL.md
- `/graphify trigger` --references--> `graphify skill`  [EXTRACTED]
  .claude/CLAUDE.md → .claude/skills/graphify/SKILL.md

## Hyperedges (group relationships)
- **graphify three core outputs** — skill_graphify_graph_html, skill_graphify_graph_json, skill_graphify_graph_report [EXTRACTED 0.95]
- **graphify extraction pipeline AST plus semantic plus merge** — skill_graphify_ast_extraction, skill_graphify_semantic_extraction, skill_graphify_knowledge_graph [EXTRACTED 0.90]
- **three capabilities distinguishing graphify from Claude alone** — skill_graphify_persistent_graph, skill_graphify_audit_trail, skill_graphify_cross_doc_connections [EXTRACTED 0.95]

## Communities

### Community 0 - "Graphify Core & Outputs"
Cohesion: 0.17
Nodes (12): graphify skill entry, /graphify trigger, community detection, cross-document surprise connections, interactive HTML output, GraphRAG-ready JSON output, GRAPH_REPORT.md audit report, knowledge graph (+4 more)

### Community 1 - "Session Hooks & Startup"
Cohesion: 0.29
Nodes (8): MCP stdio server, async hook mode, hook environment variables, startup-hook-skill, async race condition trade-off, rationale: synchronous mode guarantees deps before session, SessionStart hook, .claude/settings.json hook registration

### Community 2 - "Persistent Graph & Updates"
Cohesion: 0.5
Nodes (4): incremental update flag, persistent graph across sessions, rationale: persistent graph enables cross-session queries, watch mode auto-rebuild

### Community 3 - "Extraction Pipeline"
Cohesion: 0.67
Nodes (3): AST structural extraction, semantic extraction via subagents, dependency installation

### Community 4 - "Audit Trail & Honesty"
Cohesion: 0.67
Nodes (3): honest audit trail EXTRACTED INFERRED AMBIGUOUS, honesty rules never invent edges, rationale: audit trail distinguishes found vs invented edges

## Knowledge Gaps
- **16 isolated node(s):** `graphify skill entry`, `/graphify trigger`, `knowledge graph`, `community detection`, `interactive HTML output` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `graphify skill` connect `Graphify Core & Outputs` to `Session Hooks & Startup`, `Persistent Graph & Updates`, `Extraction Pipeline`, `Audit Trail & Honesty`?**
  _High betweenness centrality (0.855) - this node is a cross-community bridge._
- **Why does `startup-hook-skill` connect `Session Hooks & Startup` to `Extraction Pipeline`?**
  _High betweenness centrality (0.318) - this node is a cross-community bridge._
- **Why does `semantic extraction via subagents` connect `Extraction Pipeline` to `Graphify Core & Outputs`?**
  _High betweenness centrality (0.206) - this node is a cross-community bridge._
- **What connects `graphify skill entry`, `/graphify trigger`, `knowledge graph` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._