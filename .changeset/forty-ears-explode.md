---
"@adara-cs/ui-kit-web": patch
---

Fixed bug in number field provided by react-hooks eslint rule.

The ref value 'wrapper Ref. current' will likely have changed by the time this effect cleanup function runs. If this ref points to a node rendered by React, copy 'wrapper Ref. current' to a variable inside the effect, and use that variable in the cleanup function.(react-hooks/ exhaustive-deps_
