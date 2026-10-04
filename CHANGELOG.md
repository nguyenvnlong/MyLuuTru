# Changelog

## [Unreleased]

### Features
- Added a dark mode toggle with local storage persistence and OS-level theme fallback.
- Added filter buttons for All, Active, and Completed views.
- Improved empty-state messaging so filtered lists clearly explain that hidden items are not deleted.

### Bug Fixes
- Fixed the issue where unchecking a completed task while in the Completed filter caused the item to disappear without feedback. (Issue #3)
- Clarified empty-state copy for filtered results to help users understand that tasks are hidden by the current filter, not removed. (PR #5)

## [0.2.0] - Step 2

### Features
- Added dark mode switching from the header.
- Saved the selected theme in `localStorage`.
- Followed the operating system preference when no manual theme was chosen.
- Added the All / Active / Completed filter buttons.
- Added contextual empty-state messages for different filters.

### Bug Fixes
- Improved the user experience when a filter produced no items by communicating that the item was hidden by the filter, not deleted.

## [0.1.0] - Step 1

### Features
- Created the base to-do app structure in `index.html`, `styles.css`, and `app.js`.
- Added task creation.
- Added task completion toggling.
- Added task deletion.
- Added remaining-item count.
- Saved data to `localStorage` so tasks remain after refresh.
- Added the basic centered layout and responsive styling.
