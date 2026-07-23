---
name: ticket-gap-analysis
description: >-
  Analyze a pull request against the ticket/acceptance-criteria pasted in its
  description, plus the code diff, and post a structured gap analysis as a PR
  comment. Use when a PR targets main and its body links or contains a ticket's
  requirements.
---

# Ticket Gap Analysis

You are running inside GitHub Actions on a pull request. Produce a gap analysis
comparing what the PR *claims to do* (its description / linked ticket acceptance
criteria) against what the code diff *actually does*, then post it as a PR comment.

## Inputs available to you

- Environment variables: `PR_NUMBER`, `BASE_REF`, `GH_TOKEN` (for `gh`).
- The repository is checked out with full history.

## Steps

1. **Read the PR context.** Run:
   - `gh pr view "$PR_NUMBER" --json title,body,headRefName,baseRefName`
   to get the title and description (the description is expected to contain, or
   link to, the ticket's goal + acceptance criteria).
2. **Read the change.** Run:
   - `git diff "origin/$BASE_REF"...HEAD --stat` for the file-level overview, then
   - `git diff "origin/$BASE_REF"...HEAD` for the full diff (sample large diffs
     sensibly — focus on source, config, and workflow files; skip lockfiles and
     generated assets).
3. **Extract the acceptance criteria** from the PR description. If none are
   present, say so explicitly and fall back to reviewing the diff on its own.
4. **Map criteria → evidence.** For each acceptance criterion, decide whether the
   diff satisfies it: Met / Partial / Missing / Not verifiable, with a one-line
   justification pointing at the relevant file(s).
5. **Flag risks.** Note anything the diff does that the description does *not*
   mention (scope creep), plus missing tests, docs, or config.

## Output — post as a PR comment

Post the result with:

```
gh pr comment "$PR_NUMBER" --body-file <file>
```

Use this structure (keep it tight — prose over walls of text):

```markdown
## 🤖 Claude gap analysis

**Summary:** <1–2 sentences: does this PR appear to meet its stated goal?>

### Acceptance criteria
| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | ...       | ✅ Met / ⚠️ Partial / ❌ Missing / ❓ Unverifiable | `path/file.py` — ... |

### Risks & gaps
- ...

### Suggestions
- ...

_Automated analysis — verify before merging._
```

If acceptance criteria were absent from the description, open the comment with a
short note asking the author to add them, then give a diff-only review.