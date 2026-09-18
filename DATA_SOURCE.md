# WebKreatives Data Source

## Permanent rule

For **leads, emails, businesses, and outreach tracking**, the **single source of truth** is this Google Sheet:

<https://docs.google.com/spreadsheets/d/1qFkQl3WT9WUSGECdLGk5sUrwaWFc2ibGMIcP-EW5-es/edit?gid=1740548296#gid=1740548296>

For **cold outreach** (addresses to contact, what was sent, who replied), the queue and tracker is this second Google Sheet:

<https://docs.google.com/spreadsheets/d/1axNN0D_V4xvVCMjoDIhSQHEKkKL29rnEoiKr04donaM/edit>

Paste addresses into column A; Claude fills the rest, sends from `info@webkreatives.com`, and writes back status and replies. Workflow and tooling: `tools/outreach/README.md` (local, not in the public repo).

## Instructions for GOAT and Cloudy

- Always read live lead/business/email data from the Google Sheet above.
- Do **not** treat local Excel backups as canonical.
- Do **not** recreate a parallel local spreadsheet workflow unless Csaba explicitly asks for it.
- If UI/docs/reference files mention local lead backups, those references are outdated and should be removed.
- GitHub/local project files may contain website code, templates, and docs — but **lead data source = this Google Sheet**.

## Why

This is permanent unless Csaba explicitly changes it.
The goal is to avoid crossover, stale local copies, and sync confusion.
