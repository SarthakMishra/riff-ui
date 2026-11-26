---
name: riff
description: Install, compose and theme Riff components (button, copy field, text field, password reveal, allocation slider, quota meter, receipt details) and blocks (sign-in form, plan usage, order summary, invite teammates) from the @riff shadcn registry. Use when a screen needs one of these controls or blocks, when adding or restyling one, or when reviewing UI built with them.
---

# Riff

Riff is a small collection of standalone React components built on UI SDK, and
blocks composed from them. Each item solves one specific UI job rather than
trying to cover a whole application, and copies into the project as a `.tsx`
file and a scoped `.css` file. The project owns both files after installation;
there is no runtime package to upgrade.

Docs: https://sarthakmishra.com/riff-ui
Source: https://github.com/SarthakMishra/riff-ui

## Before you start

1. The project needs React 19 and a `components.json` (run
   `npx shadcn@latest init` if it has none).
2. Register the namespace once in `components.json`:

   ```json
   {
     "registries": {
       "@riff": "https://sarthakmishra.com/riff-ui/r/{name}.json"
     }
   }
   ```

3. Install with the project's package manager, for example
   `pnpm dlx shadcn@latest add @riff/quota-meter`. The CLI installs
   `@ui-sdk/react` and `@ui-sdk/core` at the tested versions.

## Choose the component

| Need                                                 | Component           |
| ---------------------------------------------------- | ------------------- |
| An action, or a form's submit, that may take a while | `button`            |
| Let someone copy a token, URL or command             | `copy-field`        |
| A labelled line of text with validation              | `text-field`        |
| A password field that can show what was typed        | `password-reveal`   |
| Split 100% between two named buckets                 | `allocation-slider` |
| Show usage against a limit (storage, seats, credits) | `quota-meter`       |
| Keep a total visible with its line items on demand   | `receipt-details`   |

## Start from a block

A block is a whole piece of a screen built from the components. Installing
one installs the components it uses into `components/ui/` and the block into
`components/`. Change the block's copy and layout freely; it is a starting
point, not a dependency.

| Screen                                        | Block           |
| --------------------------------------------- | --------------- |
| Sign in with email and password               | `sign-in-form`  |
| A plan's allowances and an upgrade action     | `plan-usage`    |
| The last step of a checkout                   | `order-summary` |
| Invite teammates by email or link, with seats | `invite-team`   |

If none fits, build the control from UI SDK parts (`@ui-sdk/react/<part>`)
instead of bending one of these. Read the SDK's own docs in
`node_modules/@ui-sdk/react/docs/` for the installed version.

## Rules

- Import the component from where the CLI placed it (usually
  `@/components/ui/<name>`). Keep its CSS import beside it.
- Do not rename the `riff-` classes or move rules out of `@layer components`;
  the layer lets the project's own styles win without `!important`.
- Theme through custom properties, not by editing the component CSS. The
  components read these roles and fall back to system colours:
  `--color-foreground`, `--color-muted-foreground`, `--color-background`,
  `--color-card`, `--color-muted`, `--color-border`, `--color-input`,
  `--color-primary`, `--color-ring`, `--color-warning`, `--color-fill-hover`,
  `--font-mono`.
- Every component needs a visible label prop. Never pass an empty string to
  hide it; the label is also the accessible name.
- `AllocationSlider` is controlled: keep `value` in state and update it in
  `onValueChange`.
- `QuotaMeter` takes the raw `used` and `capacity` in their units. Do not
  pre-compute a percentage.
- `PasswordReveal` sets `autoComplete="current-password"` by default; pass
  `"new-password"` on sign-up and password-change forms.
- `Button` defaults to `type="button"`. Give a form's submit button
  `type="submit"` and pass the work as the form's `action`; the button stays
  pending until it finishes. For a click, return the Promise from `onClick`.
- `TextField` validates with native constraints (`required`, `type`); pass
  `error` for your own wording instead of adding a second message.

## Check before you finish

- Tab through the screen: every control is reachable and shows a focus ring.
- Operate each control with the keyboard alone (arrow keys on the slider,
  Enter or Space on the receipt and buttons).
- Switch the system to dark mode and to forced colours; text stays legible.
- With reduced motion on, nothing slides or scales.
