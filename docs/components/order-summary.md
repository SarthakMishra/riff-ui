# Order summary

A checkout's last step: the total with its receipt one press away, a promo code field, and a pay button that can't charge twice.

[Live preview and interactive docs](https://sarthakmishra.com/riff-ui/components/order-summary)

```tsx
<OrderSummary
  total="$52.80"
  lines={[
    { label: 'Two dot-grid notebooks', amount: '$48.00' },
    { label: 'Shipping', amount: '$0.00' },
    { label: 'Tax', amount: '$4.80' },
  ]}
  onApplyCode={applyCode}
  onPay={pay}
/>
```

## Installation

Install with the shadcn CLI, or copy the files yourself.

### CLI

```sh
npx shadcn@latest add @riff/order-summary
```

The CLI installs the components it uses into your UI folder first, then writes `order-summary.tsx` and `order-summary.css` beside them.

### Manual

#### 1. Install the components it uses

```sh
npx shadcn@latest add @riff/receipt-details @riff/text-field @riff/button
```

Or copy each one by hand from its page: [Receipt details](./receipt-details.md), [Text field](./text-field.md), [Button](./button.md).

#### 2. Copy the component

Save this as `components/ui/order-summary.tsx`:

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
import { Button } from '@/components/ui/button';
import { ReceiptDetails } from '@/components/ui/receipt-details';
import { TextField } from '@/components/ui/text-field';
import './order-summary.css';

export type OrderLine = { label: string; amount: string };

/**
 * A checkout's last step: the total with its receipt one press away, a promo
 * code, and the pay button. Both actions wait for their work before they
 * take another press.
 */
export function OrderSummary({
  total,
  lines,
  onApplyCode,
  onPay,
}: {
  /** The amount due, formatted: "$52.80". */
  total: string;
  lines: OrderLine[];
  /** Receives the form's `code`. */
  onApplyCode: (data: FormData) => void | Promise<void>;
  /** Return a Promise to keep the button pending until it settles. */
  onPay: () => unknown;
}) {
  return (
    <section className="riff-order-summary" aria-label="Order summary">
      <h2>Order summary</h2>
      <ReceiptDetails label="Total" total={total}>
        <dl>
          {lines.map((line) => (
            <div key={line.label}>
              <dt>{line.label}</dt>
              <dd>{line.amount}</dd>
            </div>
          ))}
        </dl>
      </ReceiptDetails>
      <form className="riff-order-summary-code" action={onApplyCode}>
        <TextField
          label="Promo code"
          name="code"
          autoComplete="off"
          placeholder="SPRING25"
        />
        <Button type="submit" variant="outline">
          Apply
        </Button>
      </form>
      <Button onClick={onPay}>Pay {total}</Button>
    </section>
  );
}
```

#### 3. Copy its styles

Save this beside it as `order-summary.css`:

```css
/* Host roles first, system colours after: the component reads your theme
   when it has these properties and stays legible when it does not. */
@layer components {
  .riff-order-summary {
    display: grid;
    gap: 1rem;
    border: 1px solid var(--color-border, GrayText);
    border-radius: 0.75rem;
    padding: 1.25rem;
    background: var(--color-card, Canvas);
    color: var(--color-foreground, CanvasText);
  }
  .riff-order-summary h2 {
    margin: 0;
    font-size: 1rem;
    line-height: 1.4;
    font-weight: 600;
  }
  /* Each line's name and amount share a row of the receipt's grid. */
  .riff-order-summary dl > div {
    display: contents;
  }
  /* The button lines up with the field's input, under its label. */
  .riff-order-summary-code {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
    gap: 0.5rem;
  }
  /* The label's line and the field's gap (text-field.css). */
  .riff-order-summary-code > .riff-button {
    margin-block-start: 1.75rem;
  }
}
```

## Usage

```tsx
import { OrderSummary } from '@/components/ui/order-summary';

<OrderSummary
  total={formatMoney(cart.total)}
  lines={cart.lines}
  onApplyCode={applyCode}
  onPay={pay}
/>;
```

Format amounts before you pass them, in the shopper's currency. The promo code is its own small form: `onApplyCode` receives its `code` as `FormData`. Both buttons wait for their work, so a slow network can't take two payments.

## Built from

[Receipt details](./receipt-details.md), [Text field](./text-field.md), [Button](./button.md). Change its copy, layout and props freely once it is in your project.

## API reference

| Prop          | Type                                        | Description                                         |
| ------------- | ------------------------------------------- | --------------------------------------------------- |
| `total`       | `string`                                    | The amount due, formatted.                          |
| `lines`       | `OrderLine[]`                               | The receipt's rows: `label` and formatted `amount`. |
| `onApplyCode` | `(data: FormData) => void \| Promise<void>` | Applies the form's `code`.                          |
| `onPay`       | `() => unknown`                             | Runs on Pay; return a Promise to stay pending.      |

## Accessibility

- The total is a button that opens the receipt, with `aria-expanded` saying whether it is open.
- The receipt is a description list, so each amount is read with its line.
- The pay button names the amount, "Pay $52.80", so it says what it does out of context.
