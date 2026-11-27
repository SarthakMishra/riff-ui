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
import { PasswordReveal } from '@/components/ui/password-reveal';
import { TextField } from '@/components/ui/text-field';
import './sign-in-form.css';

/**
 * A sign-in card: email, a password that can show what was typed, and links
 * to reset the password or create an account. The submit button waits for
 * `action`, so the form can't be sent twice.
 */
export function SignInForm({
  action,
  forgotPasswordHref,
  signUpHref,
}: {
  /** Receives the form's `email` and `password`. A server action works too. */
  action: (data: FormData) => void | Promise<void>;
  forgotPasswordHref: string;
  signUpHref: string;
}) {
  return (
    <form className="riff-sign-in" action={action}>
      <div className="riff-sign-in-head">
        <h2>Sign in</h2>
        <p>Welcome back. Use the email you signed up with.</p>
      </div>
      <TextField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error="Enter an email address like you@example.com."
        required
      />
      <div className="riff-sign-in-password">
        <PasswordReveal label="Password" name="password" required />
        <a href={forgotPasswordHref}>Forgot password?</a>
      </div>
      <Button type="submit">Sign in</Button>
      <p className="riff-sign-in-foot">
        New here? <a href={signUpHref}>Create an account</a>
      </p>
    </form>
  );
}
