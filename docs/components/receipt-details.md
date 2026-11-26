# Receipt details

Keep an order's total in view, and open the receipt to check the line items, taxes and fees behind it. Built on UI SDK.

[Live preview and interactive docs](https://sarthakmishra.com/riff-ui/components/receipt-details)

```tsx
<ReceiptDetails label="Order total" total="$52.80">
  <dl>
    <dt>Two dot-grid notebooks</dt>
    <dd>$48.00</dd>
    <dt>Shipping</dt>
    <dd>$0.00</dd>
    <dt>Tax</dt>
    <dd>$4.80</dd>
  </dl>
</ReceiptDetails>
```

## Installation

Install with the shadcn CLI, or copy the two files yourself.

### CLI

```sh
npx shadcn@latest add @riff/receipt-details
```

### Manual

#### 1. Install UI SDK

```sh
npm install @ui-sdk/react @ui-sdk/core
```

#### 2. Copy the component

Save this as `components/ui/receipt-details.tsx`:

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
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from '@ui-sdk/react/collapsible';
import './receipt-details.css';

/** A total that stays in view, with the line items behind it one press away. */
export function ReceiptDetails({
  label,
  total,
  children,
  defaultOpen = false,
}: {
  label: string;
  total: string;
  /** The line items: a `<dl>` of names and amounts reads best. */
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <Collapsible className="riff-receipt" defaultOpen={defaultOpen}>
      <CollapsibleTrigger className="riff-receipt-summary">
        <span>{label}</span>
        <strong>{total}</strong>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="riff-receipt-chevron"
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      </CollapsibleTrigger>
      <CollapsiblePanel className="riff-receipt-panel">
        <div className="riff-receipt-lines">{children}</div>
      </CollapsiblePanel>
    </Collapsible>
  );
}
```

#### 3. Copy its styles

Save this beside it as `receipt-details.css`:

```css
/* Host roles first, system colours after: the component reads your theme
   when it has these properties and stays legible when it does not. */
@layer components {
  .riff-receipt {
    border: 1px solid var(--color-border, GrayText);
    border-radius: 0.625rem;
    background: var(--color-card, Canvas);
    color: var(--color-foreground, CanvasText);
  }
  .riff-receipt-summary {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.75rem;
    border: 0;
    border-radius: inherit;
    padding: 0.875rem 1rem;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: start;
    cursor: pointer;
    transition: background-color 150ms ease;
  }
  .riff-receipt-summary strong {
    margin-inline-start: auto;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .riff-receipt-summary:focus-visible {
    outline: 2px solid var(--color-ring, Highlight);
    outline-offset: 2px;
  }
  .riff-receipt-chevron {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    fill: none;
    stroke: var(--color-muted-foreground, GrayText);
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: rotate 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .riff-receipt-summary[data-open] .riff-receipt-chevron {
    rotate: 180deg;
  }
  /* The panel animates its measured height (UI SDK sets the property). */
  .riff-receipt-panel {
    height: var(--collapsible-panel-height);
    overflow: hidden;
    transition: height 220ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .riff-receipt-lines {
    margin-inline: 1rem;
    border-top: 1px dashed var(--color-border, GrayText);
    padding-block: 0.75rem 0.875rem;
    font-size: 0.875rem;
  }
  .riff-receipt-lines dl {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.375rem 1rem;
    margin: 0;
  }
  .riff-receipt-lines dt {
    color: var(--color-muted-foreground, GrayText);
  }
  .riff-receipt-lines dd {
    margin: 0;
    font-variant-numeric: tabular-nums;
    text-align: end;
  }
  @media (hover: hover) {
    .riff-receipt-summary:hover {
      background: var(
        --color-fill-hover,
        color-mix(in srgb, currentColor 6%, transparent)
      );
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .riff-receipt-summary,
    .riff-receipt-panel,
    .riff-receipt-chevron {
      transition: none;
    }
  }
}
```

## Usage

```tsx
import { ReceiptDetails } from '@/components/ui/receipt-details';

<ReceiptDetails label="Due today" total="$120.00">
  <dl>
    <dt>Pro plan, annual</dt>
    <dd>$120.00</dd>
  </dl>
</ReceiptDetails>;
```

The total stays in view on the trigger. Put the line items in a `<dl>`: the component lays out names on the left and amounts on the right, with tabular figures so columns of prices line up.

## Examples

Variations on the usage above.

### Open at first

Pass `defaultOpen` on a confirmation screen, where people expect to check the lines before they pay.

```tsx
<ReceiptDetails label="Order total" total="$52.80" defaultOpen>
  …
</ReceiptDetails>
```

## API reference

| Prop          | Type        | Default | Description                            |
| ------------- | ----------- | ------- | -------------------------------------- |
| `label`       | `string`    |         | What the total is, like "Order total". |
| `total`       | `string`    |         | The formatted total.                   |
| `children`    | `ReactNode` |         | The line items; a `<dl>` reads best.   |
| `defaultOpen` | `boolean`   | `false` | Whether the receipt starts open.       |

## Accessibility

- The trigger is a button with `aria-expanded`, so screen readers say whether the receipt is open.
- Enter and Space open and close it.
- While the receipt is closed, its lines are hidden from screen readers as well as from view. The height animation turns off with reduced motion.
