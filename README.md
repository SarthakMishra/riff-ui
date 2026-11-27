# Riff

Standalone React components and blocks built on [UI SDK](https://www.npmjs.com/package/@ui-sdk/react).

Riff is not a full-application design system. Each item solves one specific UI problem properly, with accessible keyboard and screen reader behaviour, forced-colour and reduced-motion support, and small tactile details, and installs as source files you own.

[Live demos and interactive docs](https://sarthakmishra.com/riff-ui) · [Quickstart](docs/quickstart.md) · [Installation](docs/installation.md) · [Theming](docs/theming.md) · [Agent skill](docs/agents.md) · [MCP server](docs/agents/mcp.md)

## Quickstart

Install directly from this GitHub repository with the [shadcn CLI](https://ui.shadcn.com/docs/cli):

```sh
npx shadcn@latest add SarthakMishra/riff-ui/quota-meter
```

Or register the `@riff` namespace once in `components.json`:

```json
{
  "registries": {
    "@riff": "https://sarthakmishra.com/riff-ui/r/{name}.json"
  }
}
```

```sh
npx shadcn@latest add @riff/quota-meter
```

Each component writes a `.tsx` file and a scoped `.css` file (`@layer components`, `riff-*` classes) that reads [custom properties](docs/theming.md) with system-colour fallbacks.

## Components

| Component | Category | Description | Source | Live |
| --- | --- | --- | --- | --- |
| [Button](docs/components/button.md) | Actions | Run an action and stay pending until it finishes, whether it is a click handler or the form it submits. | [tsx](components/ui/button.tsx) · [css](components/ui/button.css) | [Preview](https://sarthakmishra.com/riff-ui/components/button) |
| [Copy field](docs/components/copy-field.md) | Actions | Copy a read-only value in one press, or select it by hand when clipboard access is unavailable. | [tsx](components/ui/copy-field.tsx) · [css](components/ui/copy-field.css) | [Preview](https://sarthakmishra.com/riff-ui/components/copy-field) |
| [Text field](docs/components/text-field.md) | Inputs | A labelled line of text with a hint and a validation message that appears beside it after the first submit. | [tsx](components/ui/text-field.tsx) · [css](components/ui/text-field.css) | [Preview](https://sarthakmishra.com/riff-ui/components/text-field) |
| [Password reveal](docs/components/password-reveal.md) | Inputs | Check what you typed without losing the caret, with a Caps Lock warning and a field that hides itself on submit. | [tsx](components/ui/password-reveal.tsx) · [css](components/ui/password-reveal.css) | [Preview](https://sarthakmishra.com/riff-ui/components/password-reveal) |
| [Allocation slider](docs/components/allocation-slider.md) | Inputs | Divide a fixed budget between two buckets. Moving one share gives the remainder to the other. | [tsx](components/ui/allocation-slider.tsx) · [css](components/ui/allocation-slider.css) | [Preview](https://sarthakmishra.com/riff-ui/components/allocation-slider) |
| [Quota meter](docs/components/quota-meter.md) | Data display | Show how much of an allowance is spoken for, with a segmented track and the original units beside it. | [tsx](components/ui/quota-meter.tsx) · [css](components/ui/quota-meter.css) | [Preview](https://sarthakmishra.com/riff-ui/components/quota-meter) |
| [Receipt details](docs/components/receipt-details.md) | Data display | Keep an order's total in view, and open the receipt to check the line items, taxes and fees behind it. | [tsx](components/ui/receipt-details.tsx) · [css](components/ui/receipt-details.css) | [Preview](https://sarthakmishra.com/riff-ui/components/receipt-details) |

## Blocks

| Block | Category | Uses | Source | Live |
| --- | --- | --- | --- | --- |
| [Sign-in form](docs/blocks/sign-in-form.md) | Authentication | `text-field`, `password-reveal`, `button` | [tsx](blocks/sign-in-form.tsx) · [css](blocks/sign-in-form.css) | [Preview](https://sarthakmishra.com/riff-ui/blocks/sign-in-form) |
| [Plan usage](docs/blocks/plan-usage.md) | Billing | `quota-meter`, `button` | [tsx](blocks/plan-usage.tsx) · [css](blocks/plan-usage.css) | [Preview](https://sarthakmishra.com/riff-ui/blocks/plan-usage) |
| [Order summary](docs/blocks/order-summary.md) | Billing | `receipt-details`, `text-field`, `button` | [tsx](blocks/order-summary.tsx) · [css](blocks/order-summary.css) | [Preview](https://sarthakmishra.com/riff-ui/blocks/order-summary) |
| [Invite teammates](docs/blocks/invite-team.md) | Team | `quota-meter`, `text-field`, `button`, `copy-field` | [tsx](blocks/invite-team.tsx) · [css](blocks/invite-team.css) | [Preview](https://sarthakmishra.com/riff-ui/blocks/invite-team) |

## Agent skill

Install the [Riff agent skill](skills/riff/SKILL.md) so Claude Code, Codex, Cursor and other coding agents know which Riff component fits a job, how to theme it, and what to verify:

```sh
npx shadcn@latest add SarthakMishra/riff-ui/riff-skill
```

## License

[MIT](LICENSE)
