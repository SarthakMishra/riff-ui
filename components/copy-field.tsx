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
import { useEffect, useId, useRef, useState } from 'react';
import { Button } from '@ui-sdk/react/button';
import './copy-field.css';

type Status = 'idle' | 'copied' | 'failed';

const MESSAGE: Record<Status, string> = {
  idle: '',
  copied: 'Copied',
  failed: 'Select the text and copy it yourself',
};

/** A read-only value with a Copy button, and a fallback when clipboard access fails. */
export function CopyField({ label, value }: { label: string; value: string }) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  // A new value starts without a stale "Copied".
  const [shown, setShown] = useState(value);
  if (shown !== value) {
    setShown(value);
    setStatus('idle');
  }

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(value);
      setStatus('copied');
      timer.current = setTimeout(() => setStatus('idle'), 1600);
    } catch {
      setStatus('failed');
      input.current?.select();
    }
  }

  return (
    <div className="riff-copy-field" data-status={status}>
      <label htmlFor={id}>{label}</label>
      <div className="riff-copy-box">
        <input
          ref={input}
          id={id}
          value={value}
          readOnly
          spellCheck={false}
          onFocus={(event) => event.currentTarget.select()}
        />
        <Button className="riff-copy-button" onClick={copy}>
          <span className="riff-copy-label" data-label="copy">
            Copy
          </span>
          <span className="riff-copy-label" data-label="copied" aria-hidden>
            Copied
          </span>
        </Button>
      </div>
      <small role="status">{MESSAGE[status]}</small>
    </div>
  );
}
