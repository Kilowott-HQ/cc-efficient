#!/usr/bin/env node
// cc-efficient — SessionStart priming hook
//
// Goal: make Claude AWARE of the `efficient` skill at session start, without
// loading the full SKILL.md into every session's context.
//
// Behavior:
//   - Emits a short awareness line as SessionStart context.
//   - Claude loads the full skill via the Skill tool only when the task warrants it
//     (tieiable work, cache hygiene patterns, /efficient invocation).
//   - Silent if anything fails — never blocks session start.

try {
  const message =
    'cc-efficient skill is available in this session. ' +
    'Invoke via Skill tool with name "efficient" when the current task could be tiered to a cheaper model ' +
    '(Recall→Haiku, Transform→Sonnet, Reason→Opus), when the user shows cache/session hygiene issues ' +
    '(long session, mid-session CLAUDE.md edits, missing .claudeignore, large pasted logs), ' +
    'or when the user types /efficient or asks "how should I approach this", "save tokens", "be efficient". ' +
    'Do NOT load eagerly — only when relevant. Skill is single-load: once invoked, stays active for the session.';

  process.stdout.write(message);
} catch (e) {
  // Never block session start
  process.exit(0);
}
