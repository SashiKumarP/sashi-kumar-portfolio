CONTINUOUS SCROLL / NO-BLANK FIX

Changed the scroll showcase in src/App.tsx so the three split-screen feature pages use overlapping enter/hold/exit ranges. This avoids a blank viewport when the browser delivers larger scroll deltas or when smooth scrolling skips a narrow animation range.

Structure:
TECH STACK -> INTELLIGENCE SYSTEMS -> SCALABLE SYSTEMS -> STRATEGIC INNOVATION -> DISCOVER MY LATEST WORK -> existing portfolio content.

The sticky showcase is 400vh. Each feature page starts before the previous page has fully left. The bridge begins before the last feature exits. The spring is more responsive for normal wheel/trackpad scrolling.

No existing portfolio content, navigation, About popup, or other sections were removed.
