# Sign-in form

A sign-in card with email and password, links to reset or sign up, and a submit button that waits for the action.

[Live preview and interactive docs](https://sarthakmishra.com/riff-ui/blocks/sign-in-form)

```tsx
<SignInForm
  action={signIn}
  forgotPasswordHref="/forgot-password"
  signUpHref="/sign-up"
/>
```

## Installation

Install with the shadcn CLI, or copy the files yourself.

### CLI

```sh
npx shadcn@latest add @riff/sign-in-form
```

The CLI installs the components the block uses into your UI folder first, then writes `sign-in-form.tsx` and `sign-in-form.css` into `components/`.

### Manual

#### 1. Install the components it uses

```sh
npx shadcn@latest add @riff/text-field @riff/password-reveal @riff/button
```

Or copy each one by hand from its page: [Text field](../components/text-field.md), [Password reveal](../components/password-reveal.md), [Button](../components/button.md).

#### 2. Copy the block

Save this as `components/sign-in-form.tsx`:

```tsx
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
```

#### 3. Copy its styles

Save this beside it as `sign-in-form.css`:

```css
/* Host roles first, system colours after: the block reads your theme when
   it has these properties and stays legible when it does not. */
@layer components {
  .riff-sign-in {
    display: grid;
    gap: 1.25rem;
    border: 1px solid var(--color-border, GrayText);
    border-radius: 0.75rem;
    padding: 1.5rem;
    background: var(--color-card, Canvas);
    color: var(--color-foreground, CanvasText);
  }
  .riff-sign-in-head {
    display: grid;
    gap: 0.25rem;
  }
  .riff-sign-in-head h2 {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.3;
    font-weight: 600;
  }
  .riff-sign-in-head p,
  .riff-sign-in-foot {
    margin: 0;
    color: var(--color-muted-foreground, GrayText);
    font-size: 0.875rem;
  }
  /* The reset link sits on the label's line, at its end. */
  .riff-sign-in-password {
    position: relative;
  }
  .riff-sign-in-password > a {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    font-size: 0.8125rem;
  }
  .riff-sign-in a {
    color: inherit;
    text-decoration-color: color-mix(in srgb, currentColor 40%, transparent);
    text-underline-offset: 0.2em;
  }
  .riff-sign-in a:focus-visible {
    border-radius: 0.125rem;
    outline: 2px solid var(--color-ring, Highlight);
    outline-offset: 2px;
  }
  .riff-sign-in-foot {
    text-align: center;
  }
}
```

## Usage

```tsx
import { SignInForm } from '@/components/sign-in-form';

export default function SignInPage() {
  return (
    <SignInForm
      action={signIn}
      forgotPasswordHref="/forgot-password"
      signUpHref="/sign-up"
    />
  );
}
```

`action` receives the form's `email` and `password` as `FormData`, so a server action works as it is. While it runs, the submit button is pending and ignores further presses. The fields validate before it runs: try **Sign in** with an empty email above.

## Built from

[Text field](../components/text-field.md), [Password reveal](../components/password-reveal.md), [Button](../components/button.md). A block is a starting point: change its copy, layout and props freely once it is in your project.

## API reference

| Prop                 | Type                                        | Description                                      |
| -------------------- | ------------------------------------------- | ------------------------------------------------ |
| `action`             | `(data: FormData) => void \| Promise<void>` | Signs in with the form's `email` and `password`. |
| `forgotPasswordHref` | `string`                                    | Where "Forgot password?" goes.                   |
| `signUpHref`         | `string`                                    | Where "Create an account" goes.                  |

## Accessibility

- The form has a visible heading, and every field a real label.
- The email field uses `autoComplete="email"` and the password `current-password`, so password managers fill both.
- Errors show under their field and the first invalid one takes focus.
