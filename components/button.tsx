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
import type { ComponentProps } from 'react';
import { useFormStatus } from 'react-dom';
import { Button as ButtonPrimitive } from '@ui-sdk/react/button';
import './button.css';

type ButtonProps = Omit<ComponentProps<typeof ButtonPrimitive>, 'className'> & {
  className?: string;
  /** `solid` for the screen's main action, `outline` beside it, `ghost` for quiet ones. */
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md';
};

/**
 * A button that stays pending while its work runs: return a Promise from
 * `onClick`, or make it a form's submit button and it waits for the form's
 * action. Either way it keeps focus and ignores further presses.
 */
export function Button({
  variant = 'solid',
  size = 'md',
  className,
  type = 'button',
  disabled,
  focusableWhenDisabled,
  ...props
}: ButtonProps) {
  // Outside a form, or for a non-submit button, this stays false.
  const form = useFormStatus();
  const submitting = type === 'submit' && form.pending;
  return (
    <ButtonPrimitive
      {...props}
      type={type}
      disabled={Boolean(disabled) || submitting}
      focusableWhenDisabled={Boolean(focusableWhenDisabled) || submitting}
      aria-busy={submitting || undefined}
      className={className ? `riff-button ${className}` : 'riff-button'}
      data-variant={variant}
      data-size={size}
    />
  );
}
