# Installation

Set up Riff in a new React 19 project with Vite, Next.js or TanStack Start: create the app, initialise shadcn, add @riff and install your first component.

[Live preview and interactive docs](https://sarthakmishra.com/riff-ui/installation)

Riff needs React 19 and a project the shadcn CLI can write into. The quickest route is to let the CLI scaffold the project for you, then add the components you want.

## Create the project

Pick your framework. Each command creates the app, configures the `@/*` import alias and writes `components.json`. Follow the prompts; any base library works, since Riff brings its own primitives.

### Next.js

```sh
npx shadcn@latest init -t next -n my-app
```

### Vite

```sh
npx shadcn@latest init -t vite -n my-app
```

### TanStack Start

```sh
npx shadcn@latest init -t start -n my-app
```

For React Router or Astro, use `-t react-router` or `-t astro`. Adding to an existing app instead? Run `init` without `-t` in its root.

## Register the namespace

Add the `@riff` registry to the new `components.json`:

```json
{
  "registries": {
    "@riff": "https://sarthakmishra.com/riff-ui/r/{name}.json"
  }
}
```

## Add components

Install one or several at once. The CLI adds UI SDK the first time.

```sh
npx shadcn@latest add @riff/allocation-slider @riff/copy-field
```

Then import them from your UI folder:

```tsx
import { AllocationSlider } from '@/components/ui/allocation-slider';
import { CopyField } from '@/components/ui/copy-field';
```

Each component imports its own stylesheet, so there is nothing to add to your global CSS. To match your brand, map the [theme properties](./theming.md) to your tokens.

## Set up your agent

If you build with Claude Code, Codex, Cursor or opencode, add the [agent skill](./agents.md) and, optionally, the [MCP server](./agents/mcp.md) now. The skill is a single Markdown file:

```sh
npx shadcn@latest add @riff/riff-skill
```

## Without the CLI

You don't need shadcn at all. Install UI SDK:

```sh
npm install @ui-sdk/react @ui-sdk/core
```

Then copy a component's two files from the **Manual** section of its page, or from the [GitHub repository](https://github.com/SarthakMishra/riff-ui), into your project. Keep the `.css` file beside the `.tsx`, since the component imports it by relative path, and keep the license header.
