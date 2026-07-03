---
"@vega-ui/icons": minor
---

Replace `lucide-react: "latest"` with a semver range and upgrade to 1.x

`latest` is an npm dist-tag, not a semver range: every clean install could resolve a different version, and a breaking lucide release would hit consumers immediately with no way to protect themselves. The lockfile also masked a real drift — local/CI installs resolved `0.577.0` while a fresh consumer install of `latest` already got `1.23.0`.

Changed to `"lucide-react": "^1.23.0"`: new 1.x minors (which is how lucide ships new icons) keep flowing in on install, but a future breaking 2.0 won't be picked up silently. Verified against 1.23.0: icons and ui packages build and typecheck, Icon/IconButton browser tests pass in Chromium, Firefox and WebKit.
