---
name: "English-learning Tutor for Hindi Speakers"
description: "A beginner-friendly English tutor that teaches Hindi-speaking learners through guided translation, correction, vocabulary, quizzes, conversation practice, and a $1/month premium learning route with a 7-day free trial."
colors:
  background: "oklch(0.95 0.018 88)"
  foreground: "oklch(0.18 0.025 255)"
  card: "oklch(0.98 0.012 88)"
  card-foreground: "oklch(0.18 0.025 255)"
  popover: "oklch(0.98 0.012 88)"
  popover-foreground: "oklch(0.18 0.025 255)"
  primary: "oklch(0.52 0.19 265)"
  primary-foreground: "oklch(0.98 0.012 88)"
  secondary: "oklch(0.91 0.04 350)"
  secondary-foreground: "oklch(0.23 0.05 350)"
  muted: "oklch(0.9 0.018 88)"
  muted-foreground: "oklch(0.45 0.035 255)"
  accent: "oklch(0.64 0.14 351)"
  accent-foreground: "oklch(0.99 0 0)"
  destructive: "oklch(0.58 0.2 25)"
  border: "oklch(0.82 0.025 255 / 45%)"
  input: "oklch(0.82 0.025 255 / 60%)"
  ring: "oklch(0.52 0.19 265 / 55%)"
  sidebar-ring: "oklch(0.64 0.14 351)"
  sidebar-border: "oklch(0.98 0.012 88 / 15%)"
  sidebar-accent-foreground: "oklch(0.98 0.012 88)"
  sidebar-accent: "oklch(0.26 0.045 255)"
  sidebar-primary-foreground: "oklch(0.98 0.012 88)"
  sidebar-primary: "oklch(0.52 0.19 265)"
typography:
  display:
    fontFamily: "sturdy system sans with tight display tracking"
  body:
    fontFamily: "readable system sans"
  mono:
    fontFamily: "\"SFMono-Regular\", Consolas, \"Liberation Mono\", monospace"
rounded:
  sm: "calc(var(--radius) * .6)"
  md: "calc(var(--radius) * .8)"
  lg: "0.4rem"
  xl: "calc(var(--radius) * 1.4)"
---

<!-- Generated from .project/DESIGN_SYSTEM.md + app/globals.css by the engine. Tokens above are normative and mirror the CSS; edit the CSS and DESIGN_SYSTEM.md, not this file. -->

## Overview

The committed visual direction for English-learning Tutor for Hindi Speakers. Tokens above are the normative source and mirror `globals.css`.

## Colors

| Token | Value |
| background | soft ivory / first-light canvas |
| surface | bright lesson white |
| text / muted | ink navy / slate |
| border | pale blue-gray hairline |
| primary | cobalt horizon |
| accent | rose transition cue |
| success / warning / danger | cobalt / rose / warm red |

Declared in `globals.css` as `--color-*` and mirrored in the frontmatter. Use the token, never a raw hex.

## Typography

- Headings: sturdy system sans with tight display tracking
- Body: readable system sans
- Labels: compact monospaced cue labels

- Display: `sturdy system sans with tight display tracking`
- Body: `readable system sans`
- Mono: `"SFMono-Regular", Consolas, "Liberation Mono", monospace`

## Layout

- Squared stage-panel edges, hairline rules, small cue markers, restrained shadows.
- Shared components: Button, Badge, Progress, Textarea, lucide-react icons.
- Full-height shell with a fixed route rail, responsive mobile drawer, and two-column practice workspace.

## Shapes

Radii: `sm` calc(var(--radius) * .6), `md` calc(var(--radius) * .8), `lg` 0.4rem, `xl` calc(var(--radius) * 1.4)

## Do's and Don'ts

- Voice: Plain, encouraging, concise, and patient. Explain difficult ideas in natural Hindi without shaming mistakes.

- Do load faces through Fontsource, not `next/font/google`.
- Don't introduce a colour or radius that isn't a token above.
- Don't use gradient text, or a purple/violet gradient as the brand signal.
- Don't use bounce or elastic easing; real objects decelerate smoothly.
