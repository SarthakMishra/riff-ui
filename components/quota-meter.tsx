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
