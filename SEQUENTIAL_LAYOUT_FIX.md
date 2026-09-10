# Sequential layout fix

The previous shared sticky scroll stage has been removed from the engineering showcase.

The showcase is now normal document flow with four independent chapters:
1. Tech Stack & Ecosystem
2. Intelligence Systems
3. Scalable Systems
4. Strategic Innovation
5. Discover My Latest Work transition

Each chapter has its own whileInView entrance/exit motion and decorative looping visual. No absolute stacked pages, no shared 400vh sticky runway, and no cross-page opacity ranges remain in this area. This prevents overlapping sections, disappearing content, and blank scroll gaps.

Only `src/App.tsx` needs to be replaced for this patch.
