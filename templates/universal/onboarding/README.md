# Client documents: onboarding and agreement

Two documents per client from one command:

- **Onboarding** (dark, seven steps per language): what happens now, what
  it costs, what we need, domain access per provider, the other access,
  what you never have to do, what you own.
- **Agreement** (paper-coloured, for signing): the build, the hosting plan,
  ownership, ending the agreement, signatures, and the general terms from
  `/terms` as Annex A so they cannot drift from the site. One language per
  build (`--lang`).

The onboarding is one template, two outputs:

- **PDF** — every page emitted; the language choice on the cover and the
  provider choice on step 4 are links between pages, so they work in every
  PDF viewer (Mail preview, phones, Chrome), without scripts or layers.
- **HTML** — the same document as one interactive page: language toggle,
  provider picker, only the chosen path visible. Host it under a private
  `noindex` URL if the client prefers a link to an attachment.

## Make one

```bash
node templates/universal/onboarding/build.cjs \
  --company "Autodistrict" --contact "Jan de Vries" --domain autodistrict.nl \
  --start 2026-09-15 --price "€ 890" --hosting "€ 25" \
  --scope-en "One-page site, six sections, NL and EN." \
  --scope-nl "One-page site, zes secties, NL en EN." \
  --plan plus --lang nl   --address "Voorbeeldstraat 12, 2512 AB Den Haag" --kvk 12345678 --client-email "info@autodistrict.nl"   --form "https://forms.gle/..." --booking "https://cal.com/..."
```

Output in `tools/onboarding/out/<slug>/`: `onboarding-<slug>.pdf`, `index.html`
(interactive onboarding) and `agreement-<slug>-<lang>.pdf`
(`tools/` is git-ignored: client documents never reach the public repo).

| flag | default | what it is |
|---|---|---|
| `--company` | required | client company name |
| `--contact` | — | the person you talk to |
| `--domain` | — | their domain; used to detect the provider and in the copy |
| `--provider` | detected from nameservers | `hostinger` `godaddy` `cloudflare` `wix` `squarespace` `transip`, or anything else → the "we do it together" page |
| `--start` | next Monday | brief-call date; access +3 d, preview +10 d, feedback +13 d, live +17 d |
| `--doc` | `all` | `onboarding`, `contract` or `all` |
| `--plan` | `plus` | `basic` (€ 25, 12 months min.), `plus` (€ 55, 6 months), `growth` (€ 89, 6 months); sets the monthly price, term and name in both documents |
| `--price` / `--hosting` | `€ —` / from plan | build price, monthly fee override |
| `--address` / `--kvk` / `--client-email` | blank line / — / — | the client's details on the agreement |
| `--scope-en` / `--scope-nl` | generic line | one sentence on what is being built |
| `--form` | `/contact/` | the intake form link (Google Form) |
| `--booking` | mailto | a booking link for the 15-minute screen-share call |
| `--email` / `--name` / `--phone` | `info@webkreatives.com` / Csaba / — | who they invite and who they call |
| `--lang` | `en` | language of the agreement; the interactive onboarding opens in it |

Provider detection reads the domain's nameservers (`dns-parking.com` →
Hostinger, `domaincontrol.com` → GoDaddy, …). Check it in the output line
before sending; pass `--provider` to override.

## Pages

Onboarding: cover (bilingual, pick a language) → per language: 1 what
happens now · 2 what you get and what it costs · 3 what we need from you ·
4 where is your domain (provider menu) · provider pages (Hostinger, GoDaddy,
Cloudflare, Wix, Squarespace, TransIP, other/not sure) · 5 the other access
(Google Business Profile on Plus and Growth, analytics, old site, email
addresses, socials) · 6 what you never have to do · 7 what you own, where it
lives, how changes work.

Agreement: 1 parties, the work, price and payment · 2 hosting plan,
ownership, what the client provides · 3 availability, ending, law,
signatures · Annex A general terms (lifted from `terms/index.html` at build
time, chosen language).

The commercial model in both: preview first, no deposit, the build invoiced
via Stripe on written approval, the plan billed monthly from go-live, two
rounds of changes. `/terms` says the same; change one and change the other.

## The intake form

`--form` expects a Google Form you own. Questions worth asking, in order:
company name · contact name, phone, email · what the business does in one
sentence · who calls you and why · the one thing a visitor should do (call,
book, visit) · opening hours · address · socials · logo upload · photo upload
(or a folder link) · what must stay from the old site · anything you dislike
about the old site · competitors you look at · preferred launch date.

## Editing the template

`template.html` (onboarding) and `contract.html` (agreement) are the
sources. Copy lives inline per language
(`data-lang="en"` / `"nl"` sections); provider pages are `.prov-page`.
Placeholders are `{{name}}`; unknown ones are left as-is so they show up.
