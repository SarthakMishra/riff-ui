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
