# Contributing to superenum

This repository is a read-only mirror of superenum. Each release reaches it as one commit, which an export from the project's own repository creates, and nobody commits to it directly. This guide explains how to report a bug or ask for a feature, and how to build superenum from this repository.

- [Report a bug or ask for a feature](#report-a-bug-or-ask-for-a-feature)
- [Build superenum](#build-superenum)

## Report a bug or ask for a feature

Open an issue, with the bug report or the feature request template. A pull request can't be merged here, because the next release replaces the whole tree. When you have a change in mind, describe it in an issue, and include a patch there if you have one.

## Build superenum

The project pins its Node version in `.mise.toml`, which [mise](https://mise.jdx.dev/) installs:

```sh
mise install
npm ci
npm run build   # lint, type-check, and bundle into dist/
npm run docs    # generate the API documentation into dist/docs/
```

`.github/workflows/publish.yml` is the release: it builds the package, publishes it to npm with provenance, and creates the GitHub release with the notes that the tag's message carries. The GitHub releases hold the notes of every release: they are the project's changelog.
