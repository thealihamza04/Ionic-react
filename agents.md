# Coding Agent Instructions

## University App — React + Ionic Design System

You are a coding agent that builds UI components for a React Ionic mobile app.
Your job is to write components that are visually consistent, dark-mode safe,
and fully token-driven. Every style value must come from a CSS custom property
defined in `design-tokens.css`. No exceptions.

---

## 1. How to Use Tokens

### Colors

Map intent to the correct token. Never use a raw hex value.

| Situation                      | Token                 |
| ------------------------------ | --------------------- |
| Page / screen background       | `--app-background`    |
| Section surface behind cards   | `--app-surface`       |
| Card or sheet background       | `--app-card-bg`       |
| Primary body text              | `--app-text-main`     |
| Secondary / label text         | `--app-text-muted`    |
| Placeholder / hint text        | `--app-text-hint`     |
| Default border or divider      | `--app-border`        |
| Emphasized border              | `--app-border-strong` |
| Primary action background tint | `--app-primary-soft`  |
| Primary action text            | `--app-primary-text`  |
| Success badge background       | `--app-success-soft`  |
| Success badge text             | `--app-success-text`  |
| Warning badge background       | `--app-warning-soft`  |
| Warning badge text             | `--app-warning-text`  |
| Danger badge background        | `--app-danger-soft`   |
| Danger badge text              | `--app-danger-text`   |

Always pair `-soft` backgrounds with their matching `-text` token:

```tsx
// ✅ Correct — paired tokens
style={{ background: 'var(--app-danger-soft)', color: 'var(--app-danger-text)' }}

// ❌ Wrong — mismatched tokens
style={{ background: 'var(--app-danger-soft)', color: 'var(--app-text-main)' }}

// ❌ Wrong — hardcoded values
style={{ background: '#fee2e2', color: '#991b1b' }}
```

### Spacing

Use spacing tokens for all margin, padding, and gap values.

```
--space-2xs  2px
--space-xs   4px
--space-sm   8px
--space-md   16px   ← default card padding
--space-lg   24px
--space-xl   32px
--space-2xl  48px
```

```tsx
// ✅ Correct
style={{ padding: 'var(--space-md)', gap: 'var(--space-sm)' }}

// ❌ Wrong
style={{ padding: 16, gap: '8px' }}
```

### Border radius

```
--radius-xs    4px     tags, tiny chips
--radius-sm    8px     badges, inputs, buttons
--radius-md    16px    cards, modals
--radius-lg    24px    bottom sheets, large panels
--radius-full  9999px  pills, avatars
```

### Typography

```tsx
// ✅ Correct
style={{
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
}}

// ❌ Wrong
style={{ fontSize: 14, fontWeight: 500 }}
```

Font size scale: `--font-size-xs` (12px) → `--font-size-sm` (14px) →
`--font-size-md` (16px) → `--font-size-lg` (20px) → `--font-size-xl` (24px)

Font weight scale: `--font-weight-normal` (400) → `--font-weight-medium` (500) →
`--font-weight-semibold` (600)

### Shadows

Match elevation to component importance:

```tsx
style={{ boxShadow: 'var(--shadow-sm)' }}  // subtle lift — list rows, inputs
style={{ boxShadow: 'var(--shadow-md)' }}  // cards
style={{ boxShadow: 'var(--shadow-lg)' }}  // FABs, floating elements
style={{ boxShadow: 'var(--shadow-xl)' }}  // modals, bottom sheets
```

### Z-index

Never write a raw z-index number. Always use the token scale:

```
--z-raised    10
--z-dropdown  1000
--z-sticky    1100
--z-overlay   1200
--z-modal     2000
--z-toast     3000
```

```tsx
// ✅ Correct
style={{ zIndex: 'var(--z-modal)' }}

// ❌ Wrong
style={{ zIndex: 9999 }}
```

### Motion

```tsx
// ✅ Correct
style={{ transition: `transform var(--duration-base) var(--ease-out)` }}

// ❌ Wrong
style={{ transition: 'transform 250ms cubic-bezier(0,0,.2,1)' }}
```

Durations: `--duration-fast` (150ms) · `--duration-base` (250ms) · `--duration-slow` (400ms)

Easings: `--ease-out` · `--ease-in` · `--ease-in-out`

---

## 2. Dark Mode Rules

The app supports dark mode via `prefers-color-scheme: dark` (system) and a
`.dark` class on `<ion-app>` (manual toggle). All tokens resolve correctly
in both — **you never need to write dark mode CSS manually**.

The only rule: **use tokens, and dark mode is free**.

```tsx
// ✅ Works in light and dark automatically
<div style={{
  background: 'var(--app-card-bg)',
  color: 'var(--app-text-main)',
  border: '0.5px solid var(--app-border)',
}}>

// ❌ Breaks in dark mode
<div style={{
  background: '#ffffff',
  color: '#1e293b',
  border: '0.5px solid #e2e8f0',
}}>
```

If you hardcode any color, you own the dark mode fix. Use tokens instead.

---

## 3. Ionic-Specific Guidance

### CSS variables vs style props in Ionic components

Ionic components use shadow DOM. CSS custom properties penetrate it; regular
style properties don't. Always use the `--property` form for Ionic-specific
overrides:

```tsx
// ✅ Correct — Ionic reads this through shadow DOM
<IonButton style={{ '--background': 'var(--app-primary)' } as any} />

// ❌ Wrong — does not apply inside shadow DOM
<IonButton style={{ background: 'var(--app-primary)' }} />
```

Common Ionic CSS variables to override:

| Component    | CSS variable     | Token to use                          |
| ------------ | ---------------- | ------------------------------------- |
| `IonContent` | `--background`   | `--app-background` or `--app-surface` |
| `IonToolbar` | `--background`   | `--app-background`                    |
| `IonItem`    | `--background`   | `--app-card-bg`                       |
| `IonItem`    | `--border-color` | `--app-border`                        |
| `IonCard`    | `--background`   | `--app-card-bg`                       |

### IonContent background

The global CSS already sets `ion-content { --background: var(--app-background) }`.
If a specific page needs a different surface, override it on that page's
`IonContent` only:

```tsx
<IonContent style={{ '--background': 'var(--app-surface)' } as any}>
```

### Avoid IonCard for custom-designed cards

`IonCard` has its own shadow, border-radius, and background that fights the
design tokens. Use a plain `<div>` with the card token pattern instead:

```tsx
<div style={{
  background: 'var(--app-card-bg)',
  borderRadius: 'var(--radius-md)',
  border: '0.5px solid var(--app-border)',
  boxShadow: 'var(--shadow-md)',
  padding: 'var(--space-md)',
}}>
```

Only use `IonCard` when you need Ionic's built-in ripple effect or
must match a native Ionic list pattern.

### Safe area insets

Always account for the device notch/home bar on fixed or sticky bottom elements:

```tsx
<div style={{
  paddingBottom: 'calc(var(--space-md) + env(safe-area-inset-bottom))',
}}>
```

Never use a hardcoded bottom padding on elements that sit at the screen edge.

---

## 4. Do's and Don'ts

| Do                                                                       | Don't                                                       |
| ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| Use `var(--app-*)` for every color, spacing, radius, shadow, and z-index | Hardcode any hex, px spacing, or numeric z-index            |
| Pair `-soft` backgrounds with their `-text` token of the same color      | Mix a `-soft` background with an unrelated text token       |
| Use `var(--z-modal)`, `var(--z-toast)` from the scale                    | Write `z-index: 9999` or other magic numbers                |
| Use motion tokens: `var(--duration-base) var(--ease-out)`                | Write raw timing or easing strings inline                   |
| Use `0.5px solid var(--app-border)` for borders                          | Use `1px` borders — they look heavy on mobile               |
| Use `var(--radius-full)` for pill and avatar shapes                      | Use `border-radius: 50%` on non-square elements             |
| Set Ionic CSS vars via `style={{ '--background': ... } as any}`          | Pass Ionic overrides through regular `style.background`     |
| Let tokens handle dark mode automatically                                | Write `@media (prefers-color-scheme: dark)` blocks yourself |
| Use `env(safe-area-inset-bottom)` on bottom-anchored elements            | Hardcode bottom padding on screen-edge components           |

---

## Quick Reference

```
Background   --app-background · --app-surface · --app-card-bg
Text         --app-text-main · --app-text-muted · --app-text-hint
Semantic     --app-{success|warning|danger|primary}-soft   (badge bg)
             --app-{success|warning|danger|primary}-text   (badge text)
Borders      --app-border · --app-border-strong
Spacing      --space-xs/sm/md/lg/xl
Radius       --radius-xs/sm/md/lg/full
Shadows      --shadow-sm/md/lg/xl
Motion       --duration-fast/base/slow · --ease-out/in/in-out
Z-index      --z-dropdown/sticky/overlay/modal/toast
```
