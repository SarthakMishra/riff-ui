# Button

Run an action and stay pending until it finishes, whether it is a click handler or the form it submits. Built on UI SDK.

[Live preview and interactive docs](https://sarthakmishra.com/riff-ui/components/button)

```tsx
<Button onClick={() => save()}>Save changes</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Skip</Button>
```

## Installation

Install with the shadcn CLI, or copy the two files yourself.

### CLI

```sh
npx shadcn@latest add @riff/button
```

### Manual

#### 1. Install UI SDK

```sh
npm install @ui-sdk/react @ui-sdk/core
```

#### 2. Copy the component

Save this as `components/ui/button.tsx`:

```tsx
/*
MIT License

Copyright (c) 2026 Sarthak Mishra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
'use client';
import type { ComponentProps } from 'react';
import { useFormStatus } from 'react-dom';
import { Button as ButtonPrimitive } from '@ui-sdk/react/button';
import './button.css';

type ButtonProps = Omit<ComponentProps<typeof ButtonPrimitive>, 'className'> & {
  className?: string;
  /** `solid` for the screen's main action, `outline` beside it, `ghost` for quiet ones. */
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md';
};

/**
 * A button that stays pending while its work runs: return a Promise from
 * `onClick`, or make it a form's submit button and it waits for the form's
 * action. Either way it keeps focus and ignores further presses.
 */
export function Button({
  variant = 'solid',
  size = 'md',
  className,
  type = 'button',
  disabled,
  focusableWhenDisabled,
  ...props
}: ButtonProps) {
  // Outside a form, or for a non-submit button, this stays false.
  const form = useFormStatus();
  const submitting = type === 'submit' && form.pending;
  return (
    <ButtonPrimitive
      {...props}
      type={type}
      disabled={Boolean(disabled) || submitting}
      focusableWhenDisabled={Boolean(focusableWhenDisabled) || submitting}
      aria-busy={submitting || undefined}
      className={className ? `riff-button ${className}` : 'riff-button'}
      data-variant={variant}
      data-size={size}
    />
  );
}
```

#### 3. Copy its styles

Save this beside it as `button.css`:

```css
/* Host roles first, system colours after: the component reads your theme
   when it has these properties and stays legible when it does not. */
@layer components {
  .riff-button {
    display: inline-flex;
    min-height: 2.25rem;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    padding: 0.375rem 0.875rem;
    font: inherit;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    white-space: nowrap;
    text-decoration: none;
    cursor: pointer;
    transition:
      background-color 150ms ease,
      border-color 150ms ease,
      opacity 150ms ease,
      scale 160ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .riff-button[data-size='sm'] {
    min-height: 2rem;
    padding: 0.25rem 0.625rem;
    font-size: 0.8125rem;
  }
  .riff-button[data-variant='solid'] {
    background: var(--color-primary, ButtonText);
    color: var(--color-primary-foreground, ButtonFace);
  }
  .riff-button[data-variant='outline'] {
    border-color: var(--color-border, GrayText);
    background: var(--color-background, Canvas);
    color: var(--color-foreground, CanvasText);
  }
  .riff-button[data-variant='ghost'] {
    background: transparent;
    color: var(--color-foreground, CanvasText);
  }
  .riff-button:active:not([data-disabled], [data-pending], [aria-busy='true']) {
    scale: 0.97;
  }
  .riff-button:focus-visible {
    outline: 2px solid var(--color-ring, Highlight);
    outline-offset: 2px;
  }
  /* Disabled and waiting look the same: dimmed, with the press ignored. */
  .riff-button:is([data-disabled], [data-pending], [aria-busy='true']) {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .riff-button:is([data-pending], [aria-busy='true']) {
    cursor: progress;
  }
  @media (hover: hover) {
    .riff-button[data-variant='solid']:hover:not([data-disabled]) {
      background: color-mix(
        in srgb,
        var(--color-primary, ButtonText) 88%,
        var(--color-background, Canvas)
      );
    }
    .riff-button:is([data-variant='outline'], [data-variant='ghost']):hover:not(
        [data-disabled]
      ) {
      background: var(
        --color-fill-hover,
        color-mix(in srgb, currentColor 6%, transparent)
      );
    }
  }
  @media (forced-colors: active) {
    .riff-button {
      border-color: ButtonText;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .riff-button {
      transition: none;
    }
  }
}
```

## Usage

```tsx
import { Button } from '@/components/ui/button';

<Button onClick={() => saveDraft()}>Save draft</Button>;
```

Return a Promise from `onClick` and the button stays pending until it settles: it keeps focus, ignores further presses and, after a second, tells screen readers it is still working. Press **Save changes** above to see it.

## Examples

Variations on the usage above.

### Submitting a form

A submit button waits for its form's `action`, so the form can't be sent twice. It reads React's form status, so it works with server actions too.

```tsx
<form action={updateProfile}>
  <TextField label="Display name" name="name" required />
  <Button type="submit">Save profile</Button>
</form>
```

### Small and quiet

Use `size="sm"` in dense rows such as card headers, and `variant="ghost"` for actions that shouldn't compete with the main one.

```tsx
<Button variant="ghost" size="sm" onClick={dismiss}>
  Dismiss
</Button>
```

## API reference

It takes every prop of UI SDK's `Button`, plus:

| Prop                  | Type                              | Default     | Description                                                               |
| --------------------- | --------------------------------- | ----------- | ------------------------------------------------------------------------- |
| `variant`             | `'solid' \| 'outline' \| 'ghost'` | `'solid'`   | `solid` for the main action, `outline` beside it, `ghost` for quiet ones. |
| `size`                | `'sm' \| 'md'`                    | `'md'`      | `sm` is 32px tall, `md` 36px.                                             |
| `type`                | `'button' \| 'submit' \| 'reset'` | `'button'`  | What it does in a form.                                                   |
| `onClick`             | `(event, details) => unknown`     |             | Return a Promise to stay pending until it settles.                        |
| `pendingAnnouncement` | `string`                          | `'Loading'` | What screen readers hear once it has waited a second.                     |

## Accessibility

- It renders a native `<button>`, so Enter and Space press it and it joins the tab order.
- While it waits it sets `aria-busy` and stays focusable, so keyboard users don't lose their place.
- The focus ring uses `--color-ring` and survives forced colours.
