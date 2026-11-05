# IndexedSnapScroller Comparison

## Quick Decision Rule

Use `IndexedSnapScroller` when paging should be driven by a logical, potentially unbounded index. Use `SnapScroller` when the set of snapped pages is already stable and explicit.

## `IndexedSnapScroller` vs `SnapScroller`

- Use `IndexedSnapScroller` for shifting logical windows.
- Use `SnapScroller` for direct keyed pages.

## `IndexedSnapScroller` vs `DayPickerScroller` / `YearPickerScroller`

- Use `IndexedSnapScroller` as a low-level indexed paging primitive.
- Use the picker scrollers when the domain is already calendar paging.

## Choose This Component When

- content is best understood as a virtual index sequence
- the page window should shift as users approach boundaries

## Do Not Choose This Component When

- a fixed set of pages is already enough
- calendar-specific paging wrappers are more appropriate
