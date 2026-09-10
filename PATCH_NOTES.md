# Portfolio Patch Notes

Updated from the previous VideoOrder patch.

Changes in this patch:
- Removed Blog from the About dropdown.
- Removed Gallery from the About dropdown.
- Removed the large rounded bottom hand-off/circled box from the About transition section.
- Moved the About transition section so it appears immediately after the PROFESSIONAL STATISTICS section.
- Kept the existing Project, Experience, Skill, Achievement, Resume and Chat actions intact.
- Kept the existing scroll/pattern animation system intact aside from removing the unwanted bottom card animation.

Validation:
- Static source checks confirm Blog/Gallery are removed, the old bottom card animation is removed, and AboutGateway is positioned between Professional Statistics and the Giant Scrolling Marquee.
- A full dependency-backed build was not run because node_modules are not present in this environment.
