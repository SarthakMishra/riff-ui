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
