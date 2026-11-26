# Allocation slider

Divide a fixed budget between two buckets. Moving one share gives the remainder to the other. Built on UI SDK.

[Live preview and interactive docs](https://sarthakmishra.com/riff-ui/components/allocation-slider)

```tsx
const [share, setShare] = useState(35);

<AllocationSlider
  first="Design"
  second="Build"
  value={share}
  onValueChange={setShare}
/>
```

## Installation

Install with the shadcn CLI, or copy the two files yourself.

### CLI

```sh
npx shadcn@latest add @riff/allocation-slider
```

### Manual

#### 1. Install UI SDK

```sh
npm install @ui-sdk/react @ui-sdk/core
```

#### 2. Copy the component

Save this as `components/ui/allocation-slider.tsx`:

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
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from '@ui-sdk/react/slider';
import './allocation-slider.css';

/** Splits 100% between two buckets: moving one share hands the rest to the other. */
export function AllocationSlider({
  first,
  second,
  value,
  onValueChange,
  step = 1,
}: {
  first: string;
  second: string;
  /** The first bucket's share, from 0 to 100. */
  value: number;
  onValueChange: (value: number) => void;
  step?: number;
}) {
  return (
    <Slider
      className="riff-allocation"
      min={0}
      max={100}
      step={step}
      value={value}
      format={{ style: 'unit', unit: 'percent' }}
      onValueChange={(next) =>
        onValueChange(typeof next === 'number' ? next : (next[0] ?? 0))
      }
    >
      <div className="riff-allocation-shares" aria-hidden="true">
        <span>
          {first}
          <b>{value}%</b>
        </span>
        <span>
          {second}
          <b>{100 - value}%</b>
        </span>
      </div>
      <SliderControl className="riff-allocation-control">
        <SliderTrack className="riff-allocation-track">
          <SliderIndicator className="riff-allocation-fill" />
          <SliderThumb
            aria-label={`${first} share`}
            className="riff-allocation-thumb"
          />
        </SliderTrack>
      </SliderControl>
    </Slider>
  );
}
```

#### 3. Copy its styles

Save this beside it as `allocation-slider.css`:

```css
/* Host roles first, system colours after: the component reads your theme
   when it has these properties and stays legible when it does not. */
@layer components {
  .riff-allocation {
    display: grid;
    gap: 0.25rem;
    color: var(--color-foreground, CanvasText);
  }
  .riff-allocation-shares {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    flex-wrap: wrap;
    color: var(--color-muted-foreground, GrayText);
    font-size: 0.875rem;
    line-height: 1.4;
  }
  .riff-allocation-shares span {
    display: grid;
    gap: 0.125rem;
  }
  .riff-allocation-shares span:last-child {
    text-align: end;
  }
  .riff-allocation-shares b {
    color: var(--color-foreground, CanvasText);
    font-size: 1.5rem;
    line-height: 1.2;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .riff-allocation-control {
    display: grid;
    align-items: center;
    height: 2.75rem;
    touch-action: none;
    cursor: pointer;
  }
  .riff-allocation-track {
    position: relative;
    height: 0.5rem;
    border-radius: 999px;
    background: color-mix(in srgb, currentColor 14%, transparent);
  }
  .riff-allocation-fill {
    height: 100%;
    border-radius: inherit;
    background: var(--color-primary, currentColor);
  }
  .riff-allocation-thumb {
    width: 1.125rem;
    height: 1.5rem;
    border: 1px solid var(--color-input, GrayText);
    border-radius: 0.375rem;
    background: var(--color-background, Canvas);
    box-shadow: 0 1px 2px rgb(0 0 0 / 0.12);
    translate: -50% -50%;
    top: 50%;
    transition: scale 160ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  /* The thumb's hidden range input takes focus. */
  .riff-allocation-thumb:has(:focus-visible) {
    outline: 2px solid var(--color-ring, Highlight);
    outline-offset: 2px;
  }
  .riff-allocation[data-dragging] .riff-allocation-thumb {
    scale: 0.94;
  }
  @media (forced-colors: active) {
    .riff-allocation-fill {
      background: Highlight;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .riff-allocation-thumb {
      transition: none;
    }
  }
}
```

## Usage

```tsx
import { useState } from 'react';
import { AllocationSlider } from '@/components/ui/allocation-slider';

export function TimeSplit() {
  const [share, setShare] = useState(35);
  return (
    <AllocationSlider
      first="Design"
      second="Build"
      value={share}
      onValueChange={setShare}
    />
  );
}
```

The slider is controlled: it shows `value` and asks for changes through `onValueChange`. The second bucket always holds the rest, `100 - value`, so you store one number.

## Examples

Variations on the usage above.

### Coarser steps

Pass `step` when shares only make sense in round numbers, like a budget split in tens.

```tsx
<AllocationSlider
  first="Ads"
  second="Content"
  value={share}
  onValueChange={setShare}
  step={10}
/>
```

## API reference

| Prop            | Type                      | Default | Description                                    |
| --------------- | ------------------------- | ------- | ---------------------------------------------- |
| `first`         | `string`                  |         | The first bucket's name; also names the thumb. |
| `second`        | `string`                  |         | The second bucket's name.                      |
| `value`         | `number`                  |         | The first bucket's share, from 0 to 100.       |
| `onValueChange` | `(value: number) => void` |         | Called on every step of a drag or key press.   |
| `step`          | `number`                  | `1`     | How far one arrow key press moves the share.   |

## Accessibility

- The thumb is a native range input named "`first` share", so screen readers announce it as, for example, "Design share, 35%".
- Arrow keys move one step; Page Up and Page Down move further; Home and End jump to 0 and 100.
- The visible shares are hidden from screen readers, since the slider announces the same value.
