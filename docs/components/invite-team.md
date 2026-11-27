# Invite teammates

Invite teammates by email or with a link to copy, with the seats left on the plan in view so nobody invites past its limit.

[Live preview and interactive docs](https://sarthakmishra.com/riff-ui/components/invite-team)

```tsx
<InviteTeam
  inviteLink="https://example.com/join/4f7c2a"
  seatsUsed={6}
  seats={10}
  action={invite}
/>
```

## Installation

Install with the shadcn CLI, or copy the files yourself.

### CLI

```sh
npx shadcn@latest add @riff/invite-team
```

The CLI installs the components it uses into your UI folder first, then writes `invite-team.tsx` and `invite-team.css` beside them.

### Manual

#### 1. Install the components it uses

```sh
npx shadcn@latest add @riff/quota-meter @riff/text-field @riff/button @riff/copy-field
```

Or copy each one by hand from its page: [Quota meter](./quota-meter.md), [Text field](./text-field.md), [Button](./button.md), [Copy field](./copy-field.md).

#### 2. Copy the component

Save this as `components/ui/invite-team.tsx`:

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
import { CopyField } from '@/components/ui/copy-field';
import { QuotaMeter } from '@/components/ui/quota-meter';
import { TextField } from '@/components/ui/text-field';
import './invite-team.css';

/**
 * Invite people by email or with a link, with the seats left in view so
 * nobody invites past the plan's limit.
 */
export function InviteTeam({
  inviteLink,
  seatsUsed,
  seats,
  action,
}: {
  /** A link anyone with it can use to join. */
  inviteLink: string;
  seatsUsed: number;
  seats: number;
  /** Receives the form's `email`. */
  action: (data: FormData) => void | Promise<void>;
}) {
  const full = seatsUsed >= seats;
  return (
    <section className="riff-invite-team" aria-label="Invite teammates">
      <div className="riff-invite-team-head">
        <h2>Invite teammates</h2>
        <p>They join with the same access you have.</p>
      </div>
      <QuotaMeter
        label="Seats"
        used={seatsUsed}
        capacity={seats}
        unit="seats"
      />
      <form className="riff-invite-team-form" action={action}>
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="off"
          placeholder="teammate@example.com"
          error="Enter an email address like teammate@example.com."
          required
          disabled={full}
        />
        <Button type="submit" disabled={full}>
          Send invite
        </Button>
      </form>
      <CopyField label="Or share an invite link" value={inviteLink} />
    </section>
  );
}
```

#### 3. Copy its styles

Save this beside it as `invite-team.css`:

```css
/* Host roles first, system colours after: the component reads your theme
   when it has these properties and stays legible when it does not. */
@layer components {
  .riff-invite-team {
    display: grid;
    gap: 1.25rem;
    border: 1px solid var(--color-border, GrayText);
    border-radius: 0.75rem;
    padding: 1.25rem;
    background: var(--color-card, Canvas);
    color: var(--color-foreground, CanvasText);
  }
  .riff-invite-team-head {
    display: grid;
    gap: 0.25rem;
  }
  .riff-invite-team-head h2 {
    margin: 0;
    font-size: 1rem;
    line-height: 1.4;
    font-weight: 600;
  }
  .riff-invite-team-head p {
    margin: 0;
    color: var(--color-muted-foreground, GrayText);
    font-size: 0.875rem;
  }
  /* The button lines up with the field's input, under its label. */
  .riff-invite-team-form {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
    gap: 0.5rem;
  }
  /* The label's line and the field's gap (text-field.css). */
  .riff-invite-team-form > .riff-button {
    margin-block-start: 1.75rem;
  }
}
```

## Usage

```tsx
import { InviteTeam } from '@/components/ui/invite-team';

<InviteTeam
  inviteLink={team.inviteLink}
  seatsUsed={team.members.length}
  seats={team.plan.seats}
  action={invite}
/>;
```

`action` receives the form's `email` as `FormData`. When every seat is taken, the email field and its button turn off, and the seats meter shows why.

## Built from

[Quota meter](./quota-meter.md), [Text field](./text-field.md), [Button](./button.md), [Copy field](./copy-field.md). Change its copy, layout and props freely once it is in your project.

## API reference

| Prop         | Type                                        | Description                            |
| ------------ | ------------------------------------------- | -------------------------------------- |
| `inviteLink` | `string`                                    | A link anyone with it can use to join. |
| `seatsUsed`  | `number`                                    | Seats already taken.                   |
| `seats`      | `number`                                    | Seats on the plan.                     |
| `action`     | `(data: FormData) => void \| Promise<void>` | Sends an invite to the form's `email`. |

## Accessibility

- The seats meter is read in its units, "6 of 10 seats", before the form that depends on it.
- The invite link's copy button reports the result in a live region, and selects the link when the clipboard refuses.
