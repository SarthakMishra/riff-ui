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
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@ui-sdk/react/field';
import { Input } from '@ui-sdk/react/input';
import './text-field.css';

/**
 * A labelled line of text with an optional hint and its validation message.
 * It validates with the browser's own constraints (`required`, `type`) and
 * shows the message after the first submit, beside the field.
 */
export function TextField({
  label,
  name,
  type = 'text',
  description,
  error,
  placeholder,
  autoComplete,
  defaultValue,
  required,
  disabled,
}: {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'url' | 'tel' | 'search';
  /** A hint under the field, read with its label. */
  description?: ReactNode;
  /** Your wording for any validation failure; the browser's when omitted. */
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <Field
      name={name}
      className="riff-text-field"
      {...(disabled !== undefined && { disabled })}
    >
      <FieldLabel className="riff-text-field-label">{label}</FieldLabel>
      <Input
        className="riff-text-field-control"
        type={type}
        {...(placeholder !== undefined && { placeholder })}
        {...(autoComplete !== undefined && { autoComplete })}
        {...(defaultValue !== undefined && { defaultValue })}
        {...(required !== undefined && { required })}
      />
      {description && (
        <FieldDescription className="riff-text-field-description">
          {description}
        </FieldDescription>
      )}
      <FieldError className="riff-text-field-error">{error}</FieldError>
    </Field>
  );
}
