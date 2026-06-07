# Contributing

Thanks for helping make this whitepaper better and reach more people.

## Ways to contribute

- **Add a new language** — the highest-impact contribution.
- **Fix a typo or improve wording** in an existing language.
- **Suggest a content improvement** (open an issue first).

## Branching

This repo uses git-flow. Please **open pull requests against `develop`**, not `main`.
`main` holds released versions; `develop` is the next release.

## Adding a translation

1. Copy the closest existing source in `latex/`, e.g. `whitepaper-en.tex` → `whitepaper-<lang>.tex`.
2. Translate the body. Keep the structure, the equation, and the three pillars intact.
3. Localize the currency in the example with round, realistic numbers.
4. For a non-Latin script, drop a bundled font in `latex/fonts/` and point `\setCJKmainfont` (or `\setmainfont`) at it.
5. Add the language stem to the `editions` array in `latex/build.sh`.
6. Add a `readme/README-<lang>.md` and a cover preview in `readme/assets/`.
7. Build and check it compiles cleanly:
   ```bash
   cd latex && tectonic whitepaper-<lang>.tex --outdir ..
   ```

## Building

```bash
brew install tectonic
./latex/build.sh
```

All fonts are bundled in `latex/fonts/`; no system fonts are required.

## License

By contributing, you agree your contribution is released under
[the MIT License](../LICENSE), the same license as the rest of the whitepaper.
Bundled third-party fonts keep their own licenses.
