# Gear Planner

A mobile-first web app for planning and packing bikepacking trips. Set your trip length and expected weather conditions, and the gear checklist updates live — check items off as you pack.

## Features

- Trip length (Day / Overnight / Multi-night) and weather range controls
- Additional condition toggles (Bugs, Night, Wind, Rain) that reveal relevant gear
- Categorized, collapsible checklist with live progress tracking
- Gear data loaded from a CSV file, easy to swap for a published Google Sheet

## Tech stack

- React + TypeScript + Vite
- [Base UI](https://base-ui.com) for accessible unstyled components (Accordion, Slider, Tabs, Toggle Group, Popover)
- [lucide-react](https://lucide.dev) for icons

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run lint     # lint
```

## Data

Gear data lives in [`public/gear.csv`](public/gear.csv), with columns `category, item, tier, notes`. The `tier` column controls when an item appears:

| Tier | Shown when |
| --- | --- |
| `wear` / `always` | Always |
| `pack` | Overnight or Multi-night |
| `long` | Multi-night only |
| `cold` | Low temperature or Rain selected |
| `wind` | Wind selected |
| `bugs` | Bugs selected |
| `night` | Night selected |

Rows sharing the same `category` + `item` name across different tiers are treated as one checklist entry whose quantity increases with each visible row (e.g. "Socks" becomes "Socks (2)" once a second row's tier is active).

The [`reference/`](reference) folder holds the original design prototype this app was built from.
