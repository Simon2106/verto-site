# Production build — WordPress + Elementor + Vincere

This React site is the DESIGN PROTOTYPE. The production site will be:

- **WordPress + Elementor**, fully client-editable CMS (per ICE's standard builds)
- **Jobs from Vincere CRM** via its WordPress integration — jobs, locations and
  sub-brand tagging are created in Vincere and pushed to the site
- **Applications flow back to Vincere** — CV upload on the site creates the
  candidate/application against the right job record and alerts the owning
  account manager in Vincere

## Content architecture

| Prototype element            | Production home                                    |
|------------------------------|----------------------------------------------------|
| Pages/sections/layouts       | Elementor theme builder templates                  |
| Brand colours & typography   | Elementor global styles (guideline hexes/fonts)    |
| Jobs board + filters         | Vincere job feed, skinned to match prototype       |
| Job apply + CV upload        | Vincere application form → CRM, owner alerted      |
| Team, quotes, promotions,    | WP custom post types (client-editable)             |
| what's-going-on, locations   |                                                    |
| V-mask video hero, headline  | Custom HTML/CSS/JS widgets (all vanilla, portable  |
| reveals, scroll animations   | from the prototype)                                |
| Contact form (non-job)       | Contact Form 7 + Flamingo (submission storage)     |
| Hosting                      | Same DO server via Forge (native PHP territory)    |

## Vincere integration notes

- Options: Vincere's own Instant Job Board (quick, less design control) vs a
  Vincere→WP plugin (jobs sync into WP, native forms, full styling control).
  The plugin route fits our custom design; needs a licence.
- The prototype's filter model (brand / location / level, colour-coded by
  brand with sector tooltips) must map to fields Vincere actually pushes —
  confirm which Vincere fields carry: sub-brand, office location, seniority,
  package/salary display, and internal-vs-client-role tagging.
- Verto group site shows INTERNAL roles; brand sites show client vacancies —
  both can come from one Vincere feed if tagged consistently. Agree the
  tagging convention with the client before build.

## Questions for the client / Vincere admin

1. Which Vincere→WordPress route do they prefer (Instant Job Board vs plugin)?
   Any existing licence?
2. Field mapping: where do sub-brand, location, level and package live in
   their Vincere setup (functional expertise? custom fields? tags)?
3. How will internal roles be distinguished from client vacancies in Vincere?
4. Vincere API credentials / sandbox for the build.
5. Confirm application alerting: job owner in Vincere = account manager to
   be alerted?
