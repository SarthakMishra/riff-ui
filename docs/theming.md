# Theming

Every Riff component reads a short list of CSS custom properties and falls back to system colours. Map those roles to your tokens once to theme everything.

[Live preview and interactive docs](https://sarthakmishra.com/riff-ui/theming)

Every component reads the same short list of CSS custom properties. Define them and the components follow your palette, in light and dark. Leave them out and each falls back to a system colour, so nothing renders unreadable in a bare project or in forced-colours mode.

## Properties

| Property                   | Used for                             | Fallback          |
| -------------------------- | ------------------------------------ | ----------------- |
| `--color-foreground`       | Text and values                      | `CanvasText`      |
| `--color-muted-foreground` | Labels, hints and secondary figures  | `GrayText`        |
| `--color-background`       | Field and thumb surfaces             | `Canvas`          |
| `--color-card`             | The receipt's surface                | `Canvas`          |
| `--color-muted`            | Button fills inside fields           | `ButtonFace`      |
| `--color-border`           | Card edges and dividers              | `GrayText`        |
| `--color-input`            | Field and thumb borders              | `GrayText`        |
| `--color-primary`          | Fills: the slider's share, the meter | `currentColor`    |
| `--color-ring`             | Focus rings                          | `Highlight`       |
| `--color-warning`          | A meter that is nearly full          | `--color-primary` |
| `--color-fill-hover`       | Hover fills                          | `ButtonFace`      |
| `--font-mono`              | The copy field's value               | `ui-monospace`    |

shadcn projects already define most of these names, so components installed there pick up the theme with no extra work.

## Map your tokens

If your tokens use other names, alias them once at the root:

```css
:root {
  --color-foreground: var(--text-primary);
  --color-muted-foreground: var(--text-secondary);
  --color-background: var(--surface-0);
  --color-card: var(--surface-1);
  --color-border: var(--line);
  --color-input: var(--line-strong);
  --color-primary: var(--brand);
  --color-ring: var(--brand);
}
```

For dark mode, change the values, not the names. `light-dark()` keeps both themes in one declaration:

```css
:root {
  color-scheme: light dark;
  --color-primary: light-dark(#1f6f5c, #6fd3b4);
}
```

## Override a component

The rules live in `@layer components`. Any unlayered rule, or a rule in a later layer, wins without `!important`:

```css
/* app.css, unlayered */
.riff-quota-track {
  height: 0.75rem;
}
```

Because the files are yours, you can also edit them directly. Prefer the custom properties for colour, so a later reinstall keeps your theme.

## Motion

Components animate only to explain a change: the receipt's panel opens to its measured height, the copy button crossfades its label, a slider thumb settles when you let go. Each transition is under 300ms on a strong ease-out curve, and `prefers-reduced-motion` turns them off.
