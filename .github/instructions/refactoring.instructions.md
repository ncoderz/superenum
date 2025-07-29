---
applyTo: "**"
---

# Refactoring

- ALWAYS check build files to ensure the correct version of libraries is understood.
- DO NOT add or change the licenses in any files unless explicitly instructed.
- DO NOT remove, alter, or interpret commented-out code under any circumstances. Such code is preserved intentionally.
- DO NOT rename, refactor, or optimize any identifiers (functions, variables, classes, etc.) unless explicitly instructed.
- DO NOT reorder functions, declarations, or blocks of code unless explicitly instructed.
- ALWAYS follow the existing code style.
- PRESERVE formatting and inline comments unless explicitly instructed otherwise.
- DO NOT alter function or variable names without explicit permission.
- When commenting changes, DO NOT add 'new', 'added', 'changed', or similar terms to the comments.
- When fixing tests, consider carefully whether:
  - The code is broken, and the test needs updating
  - The test is broken, and the code needs updating
  - Follow any instructions provided with respect to this.

Any violation of these rules is considered destructive behavior.

NOTE: If you are explicitly instructed to make changes that violate these rules, you may proceed
with those changes.
