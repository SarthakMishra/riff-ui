# Quota meter

Show how much of an allowance is spoken for, with a segmented track and the original units beside it. Built on UI SDK.

[Live preview and interactive docs](https://sarthakmishra.com/riff-ui/components/quota-meter)

```tsx
<QuotaMeter label="File storage" used={32} capacity={50} unit="GB" />
```

## Installation

Install with the shadcn CLI, or copy the two files yourself.

### CLI

```sh
npx shadcn@latest add @riff/quota-meter
```

### Manual

#### 1. Install UI SDK

```sh
npm install @ui-sdk/react @ui-sdk/core
```

#### 2. Copy the component

Save this as `components/ui/quota-meter.tsx`:

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
import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
} from '@ui-sdk/react/meter';
import './quota-meter.css';

/** How much of an allowance is used, in a segmented track with its units. */
export function QuotaMeter({
  label,
  used,
  capacity,
  unit,
}: {
  label: string;
  used: number;
  capacity: number;
  /** The units `used` and `capacity` are in, like "GB" or "seats". */
  unit: string;
}) {
  const max = Math.max(capacity, 0);
  const percent = max > 0 ? Math.min(100, Math.max(0, (100 * used) / max)) : 0;
  return (
    <Meter
      className="riff-quota-meter"
      value={used}
      min={0}
      max={max}
      getValueLabel={() => `${used} of ${capacity} ${unit}`}
      data-full={percent >= 90 ? '' : undefined}
    >
      <div className="riff-quota-head">
        <MeterLabel>{label}</MeterLabel>
        <b aria-hidden="true">{Math.round(percent)}%</b>
      </div>
      <MeterTrack className="riff-quota-track">
        <MeterIndicator className="riff-quota-fill" />
      </MeterTrack>
      <small aria-hidden="true">
        {used} of {capacity} {unit} used
      </small>
    </Meter>
  );
}
```

#### 3. Copy its styles

Save this beside it as `quota-meter.css`:

```css
/* Host roles first, system colours after: the component reads your theme
   when it has these properties and stays legible when it does not. */
@layer components {
  .riff-quota-meter {
    display: grid;
    gap: 0.625rem;
    color: var(--color-foreground, CanvasText);
  }
  .riff-quota-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
  }
  .riff-quota-head b {
    font-size: 1.5rem;
    line-height: 1.2;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .riff-quota-meter small {
    color: var(--color-muted-foreground, GrayText);
    font-size: 0.8125rem;
    font-variant-numeric: tabular-nums;
  }
  /* Twenty segments, each 5% of the allowance. */
  .riff-quota-track {
    height: 1.25rem;
    border-radius: 0.25rem;
    background: color-mix(in srgb, currentColor 12%, transparent);
    mask-image: repeating-linear-gradient(
      90deg,
      black 0 calc(5% - 2px),
      transparent calc(5% - 2px) 5%
    );
  }
  .riff-quota-fill {
    height: 100%;
    background: var(--color-primary, currentColor);
    transition: width 300ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  /* Nearly full: the fill takes the host's warning colour. */
  .riff-quota-meter[data-full] .riff-quota-fill {
    background: var(--color-warning, var(--color-primary, currentColor));
  }
  @media (forced-colors: active) {
    .riff-quota-fill {
      background: Highlight;
      forced-color-adjust: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .riff-quota-fill {
      transition: none;
    }
  }
}
```

## Usage

```tsx
import { QuotaMeter } from '@/components/ui/quota-meter';

<QuotaMeter label="Team seats" used={18} capacity={20} unit="seats" />;
```

Pass the raw numbers in their own units. The meter works out the percentage, rounds it for display, and keeps the units in the caption so "18 of 20 seats" reads the way people count.

## Examples

Variations on the usage above.

### Nearly full

At 90% or more the fill switches to `--color-warning`, falling back to the primary colour when your theme has no warning role.

```tsx
<QuotaMeter label="Monthly credits" used={940} capacity={1000} unit="credits" />
```

## API reference

| Prop       | Type     | Default | Description                               |
| ---------- | -------- | ------- | ----------------------------------------- |
| `label`    | `string` |         | What is being measured; the meter's name. |
| `used`     | `number` |         | How much is used, in `unit`.              |
| `capacity` | `number` |         | The allowance, in `unit`.                 |
| `unit`     | `string` |         | The units, like `"GB"` or `"seats"`.      |

## Accessibility

- The meter has `role="meter"` and is named by its label.
- Screen readers hear the value in its units, "32 of 50 GB", not a bare percentage.
- The track's twenty segments are decorative; the value never depends on reading them.
