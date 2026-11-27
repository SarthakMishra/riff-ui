# Introduction

Riff is a collection of standalone React components built on UI SDK: focused, accessible source files you copy into your project, plus an agent skill.

[Live preview and interactive docs](https://sarthakmishra.com/riff-ui)

Riff is an ongoing collection of standalone React components I build whenever an interesting or awkward UI problem deserves a proper solution. It is not a full-application design system: each piece does a single job, stays fast and accessible, and installs as source you own.

Every component is built on [UI SDK](https://www.npmjs.com/package/@ui-sdk/react), which supplies tested keyboard, focus and screen reader behaviour. Riff adds the layout, the states and the tactile details on top: a thumb that settles when you let go, a total that stays in view, a copy button that tells you when the clipboard refused.

Components sit in the sidebar by what they do: actions, inputs, data display, authentication, billing and team. Multi-part ones like a sign-in form or a plan's usage card compose the smaller controls and install them alongside in one command so you can make them your own.

## How it works

You install components with the [shadcn CLI](https://ui.shadcn.com/docs/cli), or copy them straight from the [GitHub repository](https://github.com/SarthakMishra/riff-ui). The CLI writes a `.tsx` file and a scoped `.css` file into your project and installs UI SDK at the version they were tested with. From then on the code is yours: read it, change it, delete what you don't need.

There is no package to upgrade and no theme provider to wrap your app in. Each component's CSS sits in `@layer components`, so your own styles win without `!important`, and it reads a short list of [custom properties](./theming.md) with system-colour fallbacks, so it looks right in a project that has no design tokens at all.

## Made for agents too

Most UI now gets written with a coding agent in the loop. Standalone components help only if the agent picks the right one and uses it well, so Riff ships two things for agents:

- An [agent skill](./agents.md) that tells Claude Code, Codex and other agents which component fits which job, how to theme it and what to check before calling a screen done.
- A registry the [shadcn MCP server](./agents/mcp.md) can browse, so an agent can search and install components itself.

Every page here is also published as Markdown. Use **Copy page** beside the table of contents, or add `/index.md` to any docs URL.

## Principles

- **One job each.** A component that tries to be every slider is a worse slider. Riff drops in where a specific control helps; when a job falls outside these, build it from UI SDK parts.
- **Accessible by construction.** Labels are required props, focus is always visible, and every control works with a keyboard, in forced colours and with reduced motion.
- **Motion with a reason.** Things move to show cause and effect, quickly and with a strong ease-out, and never on actions you repeat all day.
- **Your code.** No runtime dependency on this site. The registry is MIT-licensed and installs a copy of the license beside the components.

## Next steps

Already using shadcn? The [Quickstart](./quickstart.md) takes about a minute. Starting a new project? Follow [Installation](./installation.md).
