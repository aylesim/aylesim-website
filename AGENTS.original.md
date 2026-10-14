# Agent instructions (aylesim-website)

Applies to **T3 Code**, **Cursor IDE**, **OpenAI Codex**, and other agents that read this file.

### By environment

| Where you work | How to use the graph |
|----------------|----------------------|
| **T3 Code** | **CLI only** — run shell commands (`code-review-graph …` or `pnpm graph:*`). T3 has no MCP settings UI; do not wait for graph MCP tools. |
| **Cursor IDE** | CLI, or MCP if enabled via project `.cursor/mcp.json` |
| **Codex** | CLI, or MCP via `~/.codex/config.toml` |

## Code Review Graph (mandatory)

This repo maintains a **code-review-graph** knowledge graph at `.code-review-graph/graph.db` (local only; see `.code-review-graph/.gitignore`).

### When exploring or planning changes

Before broad search, directory walks, or guessing architecture:

1. Ensure the graph is current: `code-review-graph update` (or `code-review-graph build` if missing or broken).
2. Orient with the graph, then read source files for exact implementations.

| Goal | Command |
|------|---------|
| Overview | `code-review-graph architecture` |
| Find symbols | `code-review-graph search "<query>"` |
| Relationships | `code-review-graph query` (see `--help`) |
| Change blast radius | `code-review-graph impact` / `detect-changes` |
| Execution paths | `code-review-graph flows` / `flow` |
| Local neighbourhood | `code-review-graph visualize --seed-file <path>` |

Run commands from the **repository root**, or use `pnpm graph:update`, `pnpm graph:status`, `pnpm graph:changes`.

### When implementing

- Use graph output to choose **which files to open**; use file reads and targeted search for line-accurate edits.
- After substantive edits, run `code-review-graph update` before another graph-based impact pass.
- For reviews or refactors across modules, prefer `impact` or `detect-changes --brief` over manual call-chain tracing.

### Visualization

`code-review-graph visualize` → `.code-review-graph/graph.html`

### Cursor

The same policy is duplicated in `.cursor/rules/code-review-graph.mdc` (`alwaysApply: true`).

### Other project guidance

- React / Next.js performance: `.agents/skills/vercel-react-best-practices/` (workspace rule).

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**This project has a knowledge graph. Start with the code-review-graph
MCP tools to narrow scope, then read the source.** The graph is cheaper than scanning files and
gives you structural context (callers, dependents, test coverage) that file search cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes_tool` or `query_graph_tool` instead of Grep
- **Understanding impact**: `get_impact_radius_tool` instead of manually tracing imports
- **Code review**: `detect_changes_tool` + `get_review_context_tool` instead of reading entire files
- **Finding relationships**: `query_graph_tool` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview_tool` + `list_communities_tool`

### Verify in the source

- Narrow scope with the graph, then read the source. Do not change code from graph output alone.
- For any non-trivial change, read the implementation and the relevant tests before concluding.
- Verify the exact source when touching behavior, database logic, migrations, retries, fallbacks,
  recovery, or compatibility code.
- When the graph and the source disagree, the source wins. The graph may be stale or may not
  model that relationship.
- An empty graph result can mean "not indexed" or "not statically visible", not "does not exist".

### Key Tools

| Tool | Use when |
| ------ | ---------- |
| `detect_changes_tool` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context_tool` | Need source snippets for review — token-efficient |
| `get_impact_radius_tool` | Understanding blast radius of a change |
| `get_affected_flows_tool` | Finding which execution paths are impacted |
| `query_graph_tool` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes_tool` | Finding functions/classes by name or keyword |
| `get_architecture_overview_tool` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes_tool` for code review.
3. Use `get_affected_flows_tool` to understand impact.
4. Use `query_graph_tool` pattern="tests_for" to check coverage.
<!-- /code-review-graph MCP tools -->
