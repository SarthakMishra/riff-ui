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
