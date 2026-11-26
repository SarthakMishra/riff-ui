# Quickstart

Add your first Riff component to a React project that already uses shadcn: register the @riff namespace in components.json, install a control and render it.

[Live preview and interactive docs](https://sarthakmishra.com/riff-ui/quickstart)

This guide assumes a React 19 project that already has a `components.json`. If yours doesn't, start with [Installation](./installation.md).

## 1. Register the namespace

Add the `@riff` registry to `components.json`. The CLI replaces `{name}` with the component you ask for.

```json
{
  "registries": {
    "@riff": "https://sarthakmishra.com/riff-ui/r/{name}.json"
  }
}
```

## 2. Add a component

```sh
npx shadcn@latest add @riff/quota-meter
```

The CLI writes `quota-meter.tsx` and `quota-meter.css` into your UI folder, installs `@ui-sdk/react` and `@ui-sdk/core`, and saves the license to `licenses/riff-ui.txt`.

## 3. Render it

```tsx
import { QuotaMeter } from '@/components/ui/quota-meter';

export function Storage() {
  return <QuotaMeter label="File storage" used={32} capacity={50} unit="GB" />;
}
```

## Add the agent skill

If you work with a coding agent, install the skill next. It teaches the agent the components you have and how to use them.

```sh
npx shadcn@latest add @riff/riff-skill
```

## Without the namespace

You can also pass a full URL, which is handy for a one-off install:

```sh
npx shadcn@latest add https://sarthakmishra.com/riff-ui/r/copy-field.json
```

The [registry index](https://sarthakmishra.com/riff-ui/r/registry.json) at `/riff-ui/r/registry.json` lists everything it serves.
