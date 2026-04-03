# Docs Workflow

## Working Order

1. Read source exports and types.
2. Read stories.
3. Read tests if behavior is non-trivial.
4. Decide doc profile.
5. Write `index.md` first.
6. Then write `anatomy.md` or `examples.md`.
7. Then fill `patterns.md`, `styling.md`, `troubleshooting.md` if the profile requires them.

## Snippet Standards

- snippets must be source-backed
- snippets must be structurally complete
- snippets must not contain placeholders
- repeated extracted snippets must still be real code

## Smells

- one-line examples for compound or advanced interactive components
- pseudo-code like `const x = /* same as above */`
- public props or parts mentioned in docs but not exported
- styling docs that describe variables not present in source
- troubleshooting that gives advice inconsistent with stories or tests
