# Candidate Proctoring Engine Specification

## Event Types & Thresholds
1. `TAB_SWITCH` (Severity: HIGH): Triggered when document visibility changes (`document.hidden`).
2. `FULLSCREEN_EXIT` (Severity: MEDIUM): Triggered when candidate exits browser fullscreen mode.
3. `MULTIPLE_FACES` (Severity: CRITICAL): Triggered when webcam feed detects more than one face.

## Persistence Model
Events are stored in `ProctorLog` collection and aggregated into recruiter evaluation reports.
