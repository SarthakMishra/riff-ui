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
