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
