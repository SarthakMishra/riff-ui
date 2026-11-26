# Password reveal

Check what you typed without losing the caret, with a Caps Lock warning and a field that hides itself on submit. Built on UI SDK.

[Live preview and interactive docs](https://sarthakmishra.com/riff-ui/components/password-reveal)

```tsx
<PasswordReveal
  label="Password"
  name="password"
  placeholder="Type to try it"
/>
```

## Installation

Install with the shadcn CLI, or copy the two files yourself.

### CLI

```sh
npx shadcn@latest add @riff/password-reveal
```

### Manual

#### 1. Install UI SDK

```sh
npm install @ui-sdk/react @ui-sdk/core
```

#### 2. Copy the component

Save this as `components/ui/password-reveal.tsx`:

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
import { Field, FieldLabel } from '@ui-sdk/react/field';
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputToggle,
} from '@ui-sdk/react/password-input';
import './password-reveal.css';

/**
 * A password field that shows what was typed without losing the caret, warns
 * about Caps Lock, and hides the password again when its form submits.
 */
export function PasswordReveal({
  label,
  name,
  autoComplete = 'current-password',
  placeholder,
  required,
  disabled,
}: {
  label: string;
  name: string;
  autoComplete?: 'current-password' | 'new-password' | 'off';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <Field
      name={name}
      className="riff-password-reveal"
      {...(disabled !== undefined && { disabled })}
    >
      <FieldLabel className="riff-password-label">{label}</FieldLabel>
      <PasswordInput
        className="riff-password-box"
        autoComplete={autoComplete}
        {...(required !== undefined && { required })}
        {...(disabled !== undefined && { disabled })}
      >
        <PasswordInputControl
          className="riff-password-control"
          {...(placeholder !== undefined && { placeholder })}
        />
        <PasswordInputToggle
          className="riff-password-toggle"
          aria-label="Show password"
        >
          {(state) => (state.visible ? 'Hide' : 'Show')}
        </PasswordInputToggle>
      </PasswordInput>
      <small className="riff-password-capslock">Caps Lock is on</small>
    </Field>
  );
}
```

#### 3. Copy its styles

Save this beside it as `password-reveal.css`:

```css
/* Host roles first, system colours after: the component reads your theme
   when it has these properties and stays legible when it does not. */
@layer components {
  .riff-password-reveal {
    display: grid;
    gap: 0.5rem;
    color: var(--color-foreground, CanvasText);
  }
  .riff-password-label {
    font-size: 0.875rem;
    font-weight: 500;
  }
  .riff-password-box {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border: 1px solid var(--color-input, GrayText);
    border-radius: 0.5rem;
    padding: 0.25rem;
    background: var(--color-background, Canvas);
    transition:
      border-color 150ms ease,
      box-shadow 150ms ease;
  }
  .riff-password-box:has(:focus-visible) {
    border-color: var(--color-ring, Highlight);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--color-ring, Highlight) 25%, transparent);
  }
  .riff-password-control {
    min-width: 0;
    flex: 1;
    border: 0;
    padding: 0.375rem 0.5rem;
    background: transparent;
    color: inherit;
    font: inherit;
    outline: none;
  }
  .riff-password-control::placeholder {
    color: var(--color-muted-foreground, GrayText);
  }
  .riff-password-toggle {
    min-width: 3.5rem;
    border: 0;
    border-radius: 0.375rem;
    padding: 0.375rem 0.625rem;
    background: var(--color-muted, ButtonFace);
    color: var(--color-foreground, ButtonText);
    font: inherit;
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    transition:
      background-color 150ms ease,
      scale 160ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .riff-password-toggle:active:not(:disabled) {
    scale: 0.97;
  }
  .riff-password-toggle:focus-visible {
    outline: 2px solid var(--color-ring, Highlight);
    outline-offset: 1px;
  }
  .riff-password-capslock {
    color: var(
      --color-warning-foreground,
      var(--color-muted-foreground, GrayText)
    );
    font-size: 0.8125rem;
    visibility: hidden;
  }
  .riff-password-reveal:has([data-capslock]) .riff-password-capslock {
    visibility: visible;
  }
  .riff-password-box[data-disabled] {
    opacity: 0.55;
    & .riff-password-toggle {
      cursor: not-allowed;
    }
  }
  @media (hover: hover) {
    .riff-password-toggle:hover:not(:disabled) {
      background: var(--color-fill-hover, ButtonFace);
    }
  }
  @media (forced-colors: active) {
    .riff-password-control:focus-visible {
      outline: 2px solid Highlight;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .riff-password-box,
    .riff-password-toggle {
      transition: none;
    }
  }
}
```

## Usage

```tsx
import { PasswordReveal } from '@/components/ui/password-reveal';

<form action={signIn}>
  <PasswordReveal label="Password" name="password" required />
</form>;
```

It is a native password input, so it submits with its form and password managers fill it. UI SDK's password input does the careful parts: the caret stays where it was when the field switches between text and password, and the field hides itself again when the form submits.

## Examples

Variations on the usage above.

### Sign-up

Use `autoComplete="new-password"` where someone chooses a password, so password managers offer to generate one instead of filling a saved one.

```tsx
<PasswordReveal
  label="Choose a password"
  name="password"
  autoComplete="new-password"
  required
/>
```

## API reference

| Prop           | Type                                            | Default              | Description                            |
| -------------- | ----------------------------------------------- | -------------------- | -------------------------------------- |
| `label`        | `string`                                        |                      | The field's visible label.             |
| `name`         | `string`                                        |                      | The name it submits under.             |
| `autoComplete` | `'current-password' \| 'new-password' \| 'off'` | `'current-password'` | What password managers fill in.        |
| `placeholder`  | `string`                                        |                      | A hint shown while the field is empty. |
| `required`     | `boolean`                                       |                      | Blocks submitting while empty.         |
| `disabled`     | `boolean`                                       |                      | Disables the field and the toggle.     |

## Accessibility

- The label is a real `<label>` tied to the input through UI SDK's field.
- The toggle is a button named "Show password" with `aria-pressed`, so screen readers say whether the password is visible.
- A Caps Lock hint appears under the field while Caps Lock is on and the field has focus.
