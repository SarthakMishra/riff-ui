# Text field

A labelled line of text with a hint and a validation message that appears beside it after the first submit. Built on UI SDK.

[Live preview and interactive docs](https://sarthakmishra.com/riff-ui/components/text-field)

```tsx
<TextField
  label="Work email"
  name="email"
  type="email"
  placeholder="you@company.com"
  description="We send the receipt here."
/>
```

## Installation

Install with the shadcn CLI, or copy the two files yourself.

### CLI

```sh
npx shadcn@latest add @riff/text-field
```

### Manual

#### 1. Install UI SDK

```sh
npm install @ui-sdk/react @ui-sdk/core
```

#### 2. Copy the component

Save this as `components/ui/text-field.tsx`:

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
import type { ReactNode } from 'react';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@ui-sdk/react/field';
import { Input } from '@ui-sdk/react/input';
import './text-field.css';

/**
 * A labelled line of text with an optional hint and its validation message.
 * It validates with the browser's own constraints (`required`, `type`) and
 * shows the message after the first submit, beside the field.
 */
export function TextField({
  label,
  name,
  type = 'text',
  description,
  error,
  placeholder,
  autoComplete,
  defaultValue,
  required,
  disabled,
}: {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'url' | 'tel' | 'search';
  /** A hint under the field, read with its label. */
  description?: ReactNode;
  /** Your wording for any validation failure; the browser's when omitted. */
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <Field
      name={name}
      className="riff-text-field"
      {...(disabled !== undefined && { disabled })}
    >
      <FieldLabel className="riff-text-field-label">{label}</FieldLabel>
      <Input
        className="riff-text-field-control"
        type={type}
        {...(placeholder !== undefined && { placeholder })}
        {...(autoComplete !== undefined && { autoComplete })}
        {...(defaultValue !== undefined && { defaultValue })}
        {...(required !== undefined && { required })}
      />
      {description && (
        <FieldDescription className="riff-text-field-description">
          {description}
        </FieldDescription>
      )}
      <FieldError className="riff-text-field-error">{error}</FieldError>
    </Field>
  );
}
```

#### 3. Copy its styles

Save this beside it as `text-field.css`:

```css
/* Host roles first, system colours after: the component reads your theme
   when it has these properties and stays legible when it does not. */
@layer components {
  .riff-text-field {
    display: grid;
    gap: 0.5rem;
    color: var(--color-foreground, CanvasText);
  }
  /* A fixed line, so a block can line a button up with the input. */
  .riff-text-field-label {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
  }
  .riff-text-field-control {
    min-width: 0;
    min-height: 2.25rem;
    border: 1px solid var(--color-input, GrayText);
    border-radius: 0.5rem;
    padding: 0.375rem 0.75rem;
    background: var(--color-background, Canvas);
    color: inherit;
    font: inherit;
    font-size: 0.9375rem;
    line-height: 1.25rem;
    transition:
      border-color 150ms ease,
      box-shadow 150ms ease;
  }
  .riff-text-field-control::placeholder {
    color: var(--color-muted-foreground, GrayText);
  }
  .riff-text-field-control:focus-visible {
    border-color: var(--color-ring, Highlight);
    outline: none;
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--color-ring, Highlight) 25%, transparent);
  }
  .riff-text-field-control[data-invalid] {
    border-color: var(--color-destructive, LinkText);
  }
  .riff-text-field-control[data-disabled] {
    opacity: 0.55;
    cursor: not-allowed;
  }
  .riff-text-field-description,
  .riff-text-field-error {
    margin: 0;
    font-size: 0.8125rem;
  }
  .riff-text-field-description {
    color: var(--color-muted-foreground, GrayText);
  }
  .riff-text-field-error {
    color: var(--color-destructive, LinkText);
  }
  @media (forced-colors: active) {
    .riff-text-field-control:focus-visible {
      outline: 2px solid Highlight;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .riff-text-field-control {
      transition: none;
    }
  }
}
```

## Usage

```tsx
import { TextField } from '@/components/ui/text-field';

<form action={subscribe}>
  <TextField label="Email" name="email" type="email" required />
</form>;
```

It validates with the browser's own constraints, `required` and the input `type`, and shows the message under the field after the first submit attempt instead of in a browser bubble. The first invalid field takes focus.

## Examples

Variations on the usage above.

### Your own message

Pass `error` to replace the browser's wording for any failure.

```tsx
<TextField
  label="Email"
  name="email"
  type="email"
  error="Enter an email address like you@example.com."
  required
/>
```

## API reference

| Prop           | Type                                              | Default  | Description                                       |
| -------------- | ------------------------------------------------- | -------- | ------------------------------------------------- |
| `label`        | `string`                                          |          | The field's visible label.                        |
| `name`         | `string`                                          |          | The name it submits under.                        |
| `type`         | `'text' \| 'email' \| 'url' \| 'tel' \| 'search'` | `'text'` | The input type, which also sets its validation.   |
| `description`  | `ReactNode`                                       |          | A hint under the field, read with its label.      |
| `error`        | `string`                                          |          | Your wording for any validation failure.          |
| `placeholder`  | `string`                                          |          | A hint shown while the field is empty.            |
| `autoComplete` | `string`                                          |          | What the browser and password managers fill in.   |
| `defaultValue` | `string`                                          |          | The value it starts with.                         |
| `required`     | `boolean`                                         |          | Blocks submitting while empty.                    |
| `disabled`     | `boolean`                                         |          | Disables the field and leaves it out of the form. |

## Accessibility

- The label is a real `<label>`, and the hint and the error describe the input through `aria-describedby`.
- An invalid field sets `aria-invalid`, and the message names what to fix.
- Focus shows a ring in `--color-ring`, and a solid outline in forced colours.
