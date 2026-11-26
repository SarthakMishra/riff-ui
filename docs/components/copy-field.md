# Copy field

Copy a read-only value in one press, or select it by hand when clipboard access is unavailable. Built on UI SDK.

[Live preview and interactive docs](https://sarthakmishra.com/riff-ui/components/copy-field)

```tsx
<CopyField
  label="Registry address"
  value="https://sarthakmishra.com/riff-ui/r/{name}.json"
/>
```

## Installation

Install with the shadcn CLI, or copy the two files yourself.

### CLI

```sh
npx shadcn@latest add @riff/copy-field
```

### Manual

#### 1. Install UI SDK

```sh
npm install @ui-sdk/react @ui-sdk/core
```

#### 2. Copy the component

Save this as `components/ui/copy-field.tsx`:

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
import { useEffect, useId, useRef, useState } from 'react';
import { Button } from '@ui-sdk/react/button';
import './copy-field.css';

type Status = 'idle' | 'copied' | 'failed';

const MESSAGE: Record<Status, string> = {
  idle: '',
  copied: 'Copied',
  failed: 'Select the text and copy it yourself',
};

/** A read-only value with a Copy button, and a fallback when clipboard access fails. */
export function CopyField({ label, value }: { label: string; value: string }) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  // A new value starts without a stale "Copied".
  const [shown, setShown] = useState(value);
  if (shown !== value) {
    setShown(value);
    setStatus('idle');
  }

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(value);
      setStatus('copied');
      timer.current = setTimeout(() => setStatus('idle'), 1600);
    } catch {
      setStatus('failed');
      input.current?.select();
    }
  }

  return (
    <div className="riff-copy-field" data-status={status}>
      <label htmlFor={id}>{label}</label>
      <div className="riff-copy-box">
        <input
          ref={input}
          id={id}
          value={value}
          readOnly
          spellCheck={false}
          onFocus={(event) => event.currentTarget.select()}
        />
        <Button className="riff-copy-button" onClick={copy}>
          <span className="riff-copy-label" data-label="copy">
            Copy
          </span>
          <span className="riff-copy-label" data-label="copied" aria-hidden>
            Copied
          </span>
        </Button>
      </div>
      <small role="status">{MESSAGE[status]}</small>
    </div>
  );
}
```

#### 3. Copy its styles

Save this beside it as `copy-field.css`:

```css
/* Host roles first, system colours after: the component reads your theme
   when it has these properties and stays legible when it does not. */
@layer components {
  .riff-copy-field {
    display: grid;
    gap: 0.5rem;
    color: var(--color-foreground, CanvasText);
  }
  .riff-copy-field label {
    font-size: 0.875rem;
    font-weight: 500;
  }
  .riff-copy-box {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border: 1px solid var(--color-input, GrayText);
    border-radius: 0.5rem;
    padding: 0.25rem;
    background: var(--color-background, Canvas);
  }
  .riff-copy-box input {
    min-width: 0;
    flex: 1;
    border: 0;
    border-radius: 0.25rem;
    padding: 0.375rem 0.5rem;
    background: transparent;
    color: inherit;
    font: 0.8125rem / 1.5 var(--font-mono, ui-monospace, monospace);
    text-overflow: ellipsis;
  }
  .riff-copy-box input:focus-visible {
    outline: 2px solid var(--color-ring, Highlight);
    outline-offset: 0;
  }
  /* The two labels share one cell, so the button keeps the wider one's width
     and the swap crossfades with a little blur instead of jumping. */
  .riff-copy-button {
    display: grid;
    border: 0;
    border-radius: 0.375rem;
    padding: 0.375rem 0.75rem;
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
  .riff-copy-button:active {
    scale: 0.97;
  }
  .riff-copy-button:focus-visible {
    outline: 2px solid var(--color-ring, Highlight);
    outline-offset: 1px;
  }
  .riff-copy-label {
    grid-area: 1 / 1;
    text-align: center;
    transition:
      opacity 180ms ease,
      filter 180ms ease;
  }
  .riff-copy-label[data-label='copied'],
  .riff-copy-field[data-status='copied'] .riff-copy-label[data-label='copy'] {
    opacity: 0;
    filter: blur(2px);
  }
  .riff-copy-field[data-status='copied'] .riff-copy-label[data-label='copied'] {
    opacity: 1;
    filter: none;
  }
  .riff-copy-field small {
    min-height: 1.25em;
    color: var(--color-muted-foreground, GrayText);
    font-size: 0.8125rem;
  }
  /* The button already shows "Copied"; screen readers hear it here. */
  .riff-copy-field[data-status='copied'] small {
    color: transparent;
  }
  @media (hover: hover) {
    .riff-copy-button:hover {
      background: var(--color-fill-hover, ButtonFace);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .riff-copy-button,
    .riff-copy-label {
      transition: none;
    }
  }
}
```

## Usage

```tsx
import { CopyField } from '@/components/ui/copy-field';

<CopyField label="API key" value={apiKey} />;
```

Use it for anything people paste somewhere else: tokens, invite links, CLI commands. The value is read-only and stays selectable, so it still works when the clipboard doesn't.

## How it handles failure

Browsers can refuse clipboard access: an insecure origin, a denied permission, an embedded frame. When that happens the field selects the whole value and says so, so a single Ctrl+C or Cmd+C finishes the job. Focusing the field selects it too.

The button's label crossfades to "Copied" with a slight blur, then back after a moment. Both labels share one grid cell, so the button never changes width under the pointer.

## API reference

| Prop    | Type     | Default | Description                |
| ------- | -------- | ------- | -------------------------- |
| `label` | `string` |         | The field's visible label. |
| `value` | `string` |         | The text to copy.          |

## Accessibility

- The input is labelled, read-only and in the tab order, so keyboard users can select it by hand.
- A polite status region announces "Copied" or the fallback instruction; the visible label change is hidden from screen readers to avoid saying it twice.
- A new `value` clears a stale "Copied".
