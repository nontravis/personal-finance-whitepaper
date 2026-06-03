# Personal Finance Whitepaper

An IEEE two-column academic whitepaper on the three-pillar personal-finance system,
by Nonthawit Doungsodsri (nonthawit.com).

## Editions

| Source | Output | Body font | Currency |
|---|---|---|---|
| `whitepaper-th.tex` | `../whitepaper-th.pdf` | TH Sarabun New, 14pt | THB |
| `whitepaper-en.tex` | `../whitepaper-en.pdf` | TeX Gyre Termes, 10pt | USD |
| `whitepaper-es.tex` | `../whitepaper-es.pdf` | TeX Gyre Termes, 10pt | EUR |
| `whitepaper-id.tex` | `../whitepaper-id.pdf` | TeX Gyre Termes, 10pt | IDR |
| `whitepaper-zh.tex` | `../whitepaper-zh.pdf` | Noto Serif CJK SC, 11pt | CNY |
| `whitepaper-ja.tex` | `../whitepaper-ja.pdf` | Noto Serif CJK JP, 11pt | JPY |

Every font is bundled in `fonts/`, so the build is self-contained and needs no
system-installed fonts. The CJK editions also set TeX Gyre Termes for their Latin text.

## Prerequisites

[tectonic](https://tectonic-typesetting.github.io/) — the XeTeX engine that compiles these
documents and auto-fetches any LaTeX packages it needs:

```bash
brew install tectonic
```

## Build

```bash
./build.sh
```

`build.sh` compiles each edition from the `latex/` directory (so the bundled `fonts/` resolve)
and writes every PDF to the project root.

## Fonts

`fonts/` holds the bundled faces:

- `THSarabunNew-*.ttf` — Thai (SIPA national font).
- `texgyretermes-*.otf` — Times-compatible Latin (GUST Font License).
- `NotoSerifCJKsc-*.otf`, `NotoSerifCJKjp-*.otf` — Chinese / Japanese (SIL OFL). These are
  subset to the glyphs each document uses, keeping them small.

## Notes

- Every document is monochrome — all text is black.
- The Thai edition uses XeTeX's ICU line-break locale; it requires the XeTeX engine
  (`pdflatex` will not work).
- The example figures use each region's local currency with round illustrative numbers.

## License

© 2026 Nonthawit Doungsodsri. The whitepaper — its text and the LaTeX source in this folder,
and the generated PDFs — is licensed under **Creative Commons Attribution 4.0 International
(CC BY 4.0)**; see `../LICENSE`. You may share and adapt it, including commercially, with
attribution.

The bundled fonts in `fonts/` are third-party and licensed separately (SIL OFL, GUST Font
License, SIPA) — see `fonts/LICENSES/NOTICE.md`. CC BY 4.0 does **not** apply to them.

## Adding a language

Copy the closest existing `.tex`, translate the body, set the currency, point `\setCJKmainfont`
at a bundled CJK face if needed, and add the language stem to the `editions` array in `build.sh`.
For a new CJK script, drop its font in `fonts/` and subset it after the text is final.
