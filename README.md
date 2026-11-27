# Riff

Standalone React components built on [UI SDK](https://www.npmjs.com/package/@ui-sdk/react).

Riff is not a full-application design system. Each component solves one specific UI problem properly, with accessible keyboard and screen reader behaviour, forced-colour and reduced-motion support, and small tactile details, and installs as source files you own.

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
| [Button](docs/components/button.md) | Actions | Run an action and stay pending until it finishes, whether it is a click handler or the form it submits. | [tsx](components/button.tsx) · [css](components/button.css) | [Preview](https://sarthakmishra.com/riff-ui/components/button) |
| [Copy field](docs/components/copy-field.md) | Actions | Copy a read-only value in one press, or select it by hand when clipboard access is unavailable. | [tsx](components/copy-field.tsx) · [css](components/copy-field.css) | [Preview](https://sarthakmishra.com/riff-ui/components/copy-field) |
| [Text field](docs/components/text-field.md) | Inputs | A labelled line of text with a hint and a validation message that appears beside it after the first submit. | [tsx](components/text-field.tsx) · [css](components/text-field.css) | [Preview](https://sarthakmishra.com/riff-ui/components/text-field) |
| [Password reveal](docs/components/password-reveal.md) | Inputs | Check what you typed without losing the caret, with a Caps Lock warning and a field that hides itself on submit. | [tsx](components/password-reveal.tsx) · [css](components/password-reveal.css) | [Preview](https://sarthakmishra.com/riff-ui/components/password-reveal) |
| [Allocation slider](docs/components/allocation-slider.md) | Inputs | Divide a fixed budget between two buckets. Moving one share gives the remainder to the other. | [tsx](components/allocation-slider.tsx) · [css](components/allocation-slider.css) | [Preview](https://sarthakmishra.com/riff-ui/components/allocation-slider) |
| [Quota meter](docs/components/quota-meter.md) | Data display | Show how much of an allowance is spoken for, with a segmented track and the original units beside it. | [tsx](components/quota-meter.tsx) · [css](components/quota-meter.css) | [Preview](https://sarthakmishra.com/riff-ui/components/quota-meter) |
| [Receipt details](docs/components/receipt-details.md) | Data display | Keep an order's total in view, and open the receipt to check the line items, taxes and fees behind it. | [tsx](components/receipt-details.tsx) · [css](components/receipt-details.css) | [Preview](https://sarthakmishra.com/riff-ui/components/receipt-details) |
| [Sign-in form](docs/components/sign-in-form.md) | Authentication | A sign-in card with email and password, links to reset or sign up, and a submit button that waits for the action. | [tsx](components/sign-in-form.tsx) · [css](components/sign-in-form.css) | [Preview](https://sarthakmishra.com/riff-ui/components/sign-in-form) |
| [Plan usage](docs/components/plan-usage.md) | Billing | A plan's allowances as segmented meters under its name and renewal date, with an upgrade action that waits for checkout to open. | [tsx](components/plan-usage.tsx) · [css](components/plan-usage.css) | [Preview](https://sarthakmishra.com/riff-ui/components/plan-usage) |
| [Order summary](docs/components/order-summary.md) | Billing | A checkout's last step: the total with its receipt one press away, a promo code field, and a pay button that can't charge twice. | [tsx](components/order-summary.tsx) · [css](components/order-summary.css) | [Preview](https://sarthakmishra.com/riff-ui/components/order-summary) |
| [Invite teammates](docs/components/invite-team.md) | Team | Invite teammates by email or with a link to copy, with the seats left on the plan in view so nobody invites past its limit. | [tsx](components/invite-team.tsx) · [css](components/invite-team.css) | [Preview](https://sarthakmishra.com/riff-ui/components/invite-team) |

## Agent skill

Install the [Riff agent skill](skills/riff/SKILL.md) so Claude Code, Codex, Cursor and other coding agents know which Riff component fits a job, how to theme it, and what to verify:

```sh
npx shadcn@latest add SarthakMishra/riff-ui/riff-skill
```

## License

[MIT](LICENSE)
