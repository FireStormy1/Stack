# STACK — Project Memory

## 1. Project Identity

**Game Name:** STACK

**Type:** Minimalist browser-based stacking game

**Primary Platform:** Mobile

**Secondary Platform:** Desktop

**Core Inspiration:** Stack by Ketchapp / Stack Up-style gameplay

**Overall Feel:**

> Relaxed, satisfying, minimal, atmospheric, and easy to replay.

---

# 2. Core Concept

The player repeatedly drops horizontally moving blocks onto a growing tower.

The player taps on mobile or presses `SPACE` on desktop to drop the active block.

The overlapping portion remains stacked.

The non-overlapping portion falls away.

The tower continues growing until the player completely misses.

---

# 3. Game Modes

## Relaxed

Focus:

* Slow gameplay
* Music
* Background atmosphere
* Casual sessions
* Enjoyment

Speed increases gradually at larger score intervals.

Example:

```text
0–49
50
100
150
200
...
```

Speed increases should remain small.

---

## Competitive

Focus:

* Precision
* High scores
* Perfect streaks
* Increasing difficulty

Initial difficulty progression:

```text
40
80
120
160
...
```

Speed should increase gradually.

Even at 500+ score, the game must remain visually readable and playable.

---

# 4. Scoring

Base score:

```text
0–99       → +1
100–249    → +2
250–499    → +3
500–749    → +4
750–999    → +5
1000+      → +6
```

The milestone system can be extended later.

---

# 5. Perfect Streak

A Perfect occurs when the moving block is extremely accurately aligned with the previous block.

There is **no maximum streak**.

Every 10 consecutive Perfect placements:

```text
10 → +5
20 → +10
30 → +15
40 → +20
50 → +25
...
```

If a Perfect streak breaks:

* Streak resets
* Streak bonus resets
* Next 10 Perfects start again at +5

A normal placement does not end the game.

---

# 6. Milestones

Initial milestones:

```text
100
250
500
750
1000
```

After reaching a milestone, base score increases.

Milestone progression must not reset the Perfect streak.

---

# 7. Visual Identity

Primary theme:

**Sunset / Terracotta**

The game should NOT look:

* Neon
* Purple-heavy
* Cyberpunk
* Generic AI/vibe-coded
* Overly colourful

The visual direction should feel more intentional and unique, similar to the personality of the previous Tetris project.

---

# 8. Typography

Use a **minimal retro-inspired font system**.

Typography should be:

* Clean
* Catchy
* Minimal
* Readable
* Slightly nostalgic

Final fonts will be decided later.

---

# 9. Backgrounds

The game will have approximately **10 backgrounds**.

Backgrounds should be:

* Atmospheric
* Minimal
* Sunset/Terracotta compatible
* Relaxing
* Suitable for long sessions

Backgrounds will be randomly selected.

Every background must support both:

* Mobile
* Desktop

The generated backgrounds should be designed so the tower remains clearly visible.

---

# 10. Block Appearance

Blocks should visually complement the selected background.

The block should NOT simply be a flat solid colour.

The appearance should take inspiration from the visual treatment of **Stack Up / Stack-style games**.

The block palette should be dynamically selected to work with the current background.

The block must remain clearly distinguishable from the environment.

---

# 11. Music

Initial target:

**4–5 music tracks**

Music should be:

* Chill
* Relaxing
* Atmospheric
* Minimal
* Warm

Music is randomly selected.

Music files will be placed in:

```text
public/assets/music/
```

Recommended naming:

```text
music1.mp3
music2.mp3
music3.mp3
music4.mp3
music5.mp3
```

The implementation must document the exact naming and format requirements.

---

# 12. Streak Audio

Streak audio is an important part of STACK's identity.

The sound should evolve continuously rather than stopping at 5 or 10 streaks.

Concept:

```text
Perfect ×1
→ variation

Perfect ×5
→ richer

Perfect ×10
→ stronger musical layer

Perfect ×20
→ further variation

Perfect ×50
→ continued progression

Perfect ×100+
→ subtle continued evolution
```

The system should avoid hundreds of unique sound files.

Pitch, layers and variations can be used.

The audio should remain calm and musical.

---

# 13. Controls

### Mobile

```text
Tap → Drop
```

### Desktop

```text
SPACE → Drop
ESC   → Pause/Menu
M     → Mute
```

No dedicated large Drop button is required.

---

# 14. Gameplay UI

Keep gameplay UI extremely minimal.

Required:

* Score in the centre
* Best Score on the right
* Diamond-inspired Best Score design
* Pause button
* Mute button underneath/near Pause

The tower remains the primary visual focus.

---

# 15. Game Over

When the player loses:

1. Finish the falling animation.
2. Zoom/reframe the camera outward.
3. Show the complete tower where possible.
4. Show final score.
5. Show high score.
6. Show New Best if applicable.
7. Provide Share/Screenshot.
8. Provide Restart.
9. Provide Home.

The Game Over screen should feel rewarding rather than punishing.

---

# 16. Share Feature

The player should be able to capture the completed tower.

The result should include:

* Tower
* Background
* Score
* Best score
* STACK branding

Mobile sharing should be supported where browser capabilities allow it.

---

# 17. Navigation

Home navigation:

```text
PLAY
ABOUT
RULES
DEVELOPER
```

The structure should take inspiration from the previous Tetris project.

Gameplay should receive maximum screen space.

---

# 18. Developer

Developer:

**Saswat Dixit**

Links:

```text
LinkedIn
https://www.linkedin.com/in/saswatdixit/

GitHub
https://github.com/FireStormy1

Email
saswatdixit01@gmail.com

LeetCode
https://leetcode.com/u/FireStormy/
```

Developer photo and final bio will be provided later.

---

# 19. Technical Direction

Preferred stack:

```text
React
TypeScript
Vite
HTML5 Canvas
CSS
Web Audio API / suitable audio system
LocalStorage
```

Canvas should handle active gameplay.

React should handle website UI.

Do not use React state for every animation frame.

---

# 20. Rendering

Canvas handles:

* Moving blocks
* Tower
* Cut-off pieces
* Falling pieces
* Camera
* Gameplay animation
* Gameplay effects

React handles:

* Navigation
* Menus
* Score UI
* Pause
* Game Over
* Rules
* About
* Developer

---

# 21. Performance

Target:

**~60 FPS**

Mobile performance is the highest priority.

Avoid:

* Excessive DOM elements
* Unnecessary React renders
* Heavy effects
* Excessive particles
* Memory leaks
* Excessive audio instances

---

# 22. Asset Structure

Recommended:

```text
public/
└── assets/
    ├── backgrounds/
    ├── music/
    ├── sounds/
    ├── images/
    └── fonts/
```

Assets should remain separate from gameplay logic.

---

# 23. Important Design Philosophy

STACK should be:

> **Simple to understand. Satisfying to play. Relaxing to experience. Difficult to master.**

Do not add mechanics just for the sake of adding features.

Every visual/audio effect should serve the core stacking experience.

---

# 24. Things Still To Decide

These should be finalized later:

* Exact colour palette
* Exact fonts
* Final 10 backgrounds
* Final music tracks
* Streak sound design
* Exact block visual treatment
* Exact Perfect threshold
* Exact speed curves
* Exact animation timings
* Final UI layouts
* Developer photo
* Developer bio

---

# 25. Development Priority

Build in this order:

```text
1. Core stacking mechanic
2. Block movement
3. Collision / overlap
4. Scoring
5. Perfect system
6. Streak system
7. Difficulty
8. Camera
9. Mobile controls
10. Desktop controls
11. Game Over
12. High score
13. UI
14. Backgrounds
15. Music
16. Streak audio
17. Share
18. Developer / About / Rules
19. Final polish
```

---

# 26. Non-Negotiable Principles

### Mobile First

Mobile must feel like the primary version, not a desktop layout squeezed onto a phone.

### Smooth

Gameplay must feel fluid.

### Minimal

Avoid unnecessary UI and effects.

### Readable

The player must always understand the active block and tower.

### Atmospheric

Background and music should create the relaxed identity of the game.

### Consistent

Backgrounds, blocks, typography, UI and audio should feel like one product.

### Replayable

The player should naturally want to try:

> **One more stack.**
