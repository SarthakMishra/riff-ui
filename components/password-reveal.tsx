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
import { Field, FieldLabel } from '@ui-sdk/react/field';
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputToggle,
} from '@ui-sdk/react/password-input';
import './password-reveal.css';

/**
 * A password field that shows what was typed without losing the caret, warns
 * about Caps Lock, and hides the password again when its form submits.
 */
export function PasswordReveal({
  label,
  name,
  autoComplete = 'current-password',
  placeholder,
  required,
  disabled,
}: {
  label: string;
  name: string;
  autoComplete?: 'current-password' | 'new-password' | 'off';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <Field
      name={name}
      className="riff-password-reveal"
      {...(disabled !== undefined && { disabled })}
    >
      <FieldLabel className="riff-password-label">{label}</FieldLabel>
      <PasswordInput
        className="riff-password-box"
        autoComplete={autoComplete}
        {...(required !== undefined && { required })}
        {...(disabled !== undefined && { disabled })}
      >
        <PasswordInputControl
          className="riff-password-control"
          {...(placeholder !== undefined && { placeholder })}
        />
        <PasswordInputToggle
          className="riff-password-toggle"
          aria-label="Show password"
        >
          {(state) => (state.visible ? 'Hide' : 'Show')}
        </PasswordInputToggle>
      </PasswordInput>
      <small className="riff-password-capslock">Caps Lock is on</small>
    </Field>
  );
}
