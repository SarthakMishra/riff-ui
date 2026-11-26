# Agent skill

Install the Riff skill so Claude Code, Codex, Cursor and other coding agents know which component fits, how to theme it and what to check before finishing.

[Live preview and interactive docs](https://sarthakmishra.com/riff-ui/agents)

A skill is a Markdown file of instructions an agent loads when a task matches its description. The Riff skill tells your agent which component fits which job, how to install and theme it, the rules that keep it accessible, and what to check before it says a screen is done.

## Install

The skill ships through the same registry as the components:

```sh
npx shadcn@latest add @riff/riff-skill
```

That writes the same `SKILL.md` to two places:

| Path                           | Read by                                             |
| ------------------------------ | --------------------------------------------------- |
| `.agents/skills/riff/SKILL.md` | Agents that read the shared `.agents/skills` folder |
| `.claude/skills/riff/SKILL.md` | Claude Code                                         |

Keep whichever your agents read and delete the other; if yours looks somewhere else, move the file there. Commit it, so everyone's agent gets the same instructions.

If you haven't registered the namespace yet, install from the full URL instead:

```sh
npx shadcn@latest add https://sarthakmishra.com/riff-ui/r/riff-skill.json
```

## What the skill covers

- **Setup.** How to register `@riff` in `components.json` and install with the project's package manager.
- **Choosing.** A table that maps a need ("show usage against a limit") to a component (`quota-meter`), and when to build from UI SDK parts instead.
- **Rules.** Import paths, keeping the `riff-` classes and the CSS layer, theming through custom properties, required labels, controlled props.
- **Checks.** Keyboard operation, visible focus, dark mode, forced colours and reduced motion.

## Cursor

Cursor reads project rules from `.cursor/rules/`. Copy the skill there as a rule file, or point a rule at it:

```md
---
description: Riff components
alwaysApply: false
---

Follow .agents/skills/riff/SKILL.md when building or changing UI.
```

## Keep it current

The skill names every component and block in the registry. When new ones land, run the `add` command again with `--overwrite` to refresh it. Any edits you made to your copy are replaced, so keep project-specific rules in a separate file.

## Read it first

The full skill is short. Read it before you install it, the same as any instructions you hand to an agent:

```md
---
name: riff
description: Install, compose and theme Riff components (button, copy field, text field, password reveal, allocation slider, quota meter, receipt details) and blocks (sign-in form, plan usage, order summary, invite teammates) from the @riff shadcn registry. Use when a screen needs one of these controls or blocks, when adding or restyling one, or when reviewing UI built with them.
---
```

The rest is on [the registry](https://sarthakmishra.com/riff-ui/r/riff-skill.json), inside the item's `files`.
