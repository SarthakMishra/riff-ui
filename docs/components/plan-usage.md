# Plan usage

A plan's allowances as segmented meters under its name and renewal date, with an upgrade action that waits for checkout to open.

[Live preview and interactive docs](https://sarthakmishra.com/riff-ui/components/plan-usage)

```tsx
<PlanUsage
  plan="Team plan"
  renews="Renews 1 December"
  quotas={[
    { label: 'Seats', used: 8, capacity: 10, unit: 'seats' },
    { label: 'File storage', used: 32, capacity: 100, unit: 'GB' },
  ]}
  onUpgrade={openCheckout}
/>
```

## Installation

Install with the shadcn CLI, or copy the files yourself.

### CLI

```sh
npx shadcn@latest add @riff/plan-usage
```

The CLI installs the components it uses into your UI folder first, then writes `plan-usage.tsx` and `plan-usage.css` beside them.

### Manual

#### 1. Install the components it uses

```sh
npx shadcn@latest add @riff/quota-meter @riff/button
```

Or copy each one by hand from its page: [Quota meter](./quota-meter.md), [Button](./button.md).

#### 2. Copy the component

Save this as `components/ui/plan-usage.tsx`:

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
import { QuotaMeter } from '@/components/ui/quota-meter';
import './plan-usage.css';

export type Quota = {
  label: string;
  used: number;
  capacity: number;
  /** The units `used` and `capacity` are in, like "GB" or "seats". */
  unit: string;
};

/**
 * A plan's usage card: the plan and its renewal, a meter for each allowance,
 * and the upgrade action once anything nears its limit.
 */
export function PlanUsage({
  plan,
  renews,
  quotas,
  onUpgrade,
}: {
  plan: string;
  /** When the allowances reset, as you want it read: "Renews 1 December". */
  renews: string;
  quotas: Quota[];
  /** Return a Promise to keep the button pending until it settles. */
  onUpgrade: () => unknown;
}) {
  return (
    <section className="riff-plan-usage" aria-label={`${plan} usage`}>
      <div className="riff-plan-usage-head">
        <div>
          <h2>{plan}</h2>
          <p>{renews}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onUpgrade}>
          Upgrade
        </Button>
      </div>
      <ul className="riff-plan-usage-list">
        {quotas.map((quota) => (
          <li key={quota.label}>
            <QuotaMeter {...quota} />
          </li>
        ))}
      </ul>
    </section>
  );
}
```

#### 3. Copy its styles

Save this beside it as `plan-usage.css`:

```css
/* Host roles first, system colours after: the component reads your theme
   when it has these properties and stays legible when it does not. */
@layer components {
  .riff-plan-usage {
    border: 1px solid var(--color-border, GrayText);
    border-radius: 0.75rem;
    background: var(--color-card, Canvas);
    color: var(--color-foreground, CanvasText);
  }
  .riff-plan-usage-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border-bottom: 1px solid var(--color-border, GrayText);
    padding: 1rem 1.25rem;
  }
  .riff-plan-usage-head h2 {
    margin: 0;
    font-size: 1rem;
    line-height: 1.4;
    font-weight: 600;
  }
  .riff-plan-usage-head p {
    margin: 0;
    color: var(--color-muted-foreground, GrayText);
    font-size: 0.8125rem;
  }
  .riff-plan-usage-list {
    display: grid;
    gap: 1.25rem;
    margin: 0;
    padding: 1.25rem;
    list-style: none;
  }
}
```

## Usage

```tsx
import { PlanUsage } from '@/components/ui/plan-usage';

<PlanUsage
  plan={plan.name}
  renews={`Renews ${formatDate(plan.renewsAt)}`}
  quotas={plan.quotas}
  onUpgrade={openCheckout}
/>;
```

Each quota renders a [Quota meter](./quota-meter.md), so one near its limit turns to your warning colour. Return a Promise from `onUpgrade` and the button stays pending until it settles.

## Built from

[Quota meter](./quota-meter.md), [Button](./button.md). Change its copy, layout and props freely once it is in your project.

## API reference

| Prop        | Type            | Description                                             |
| ----------- | --------------- | ------------------------------------------------------- |
| `plan`      | `string`        | The plan's name; it also names the section.             |
| `renews`    | `string`        | When the allowances reset, as you want it read.         |
| `quotas`    | `Quota[]`       | Each allowance: `label`, `used`, `capacity` and `unit`. |
| `onUpgrade` | `() => unknown` | Runs on Upgrade; return a Promise to stay pending.      |

## Accessibility

- The card is a `<section>` named after the plan, so it is a landmark screen readers can jump to.
- Every meter is named by its label and read in its units, "8 of 10 seats".
