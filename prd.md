# STACK — Product Requirements Document

## 1. Product Overview

**STACK** is a browser-based minimalist stacking game inspired by the core gameplay and satisfying presentation of **Stack by Ketchapp**.

The player repeatedly places horizontally moving blocks on top of a growing tower.

The game is intentionally simple to understand but increasingly difficult to master.

STACK combines:

* Minimal retro-inspired design
* Sunset / Terracotta visual identity
* Relaxing music
* Atmospheric backgrounds
* Satisfying stacking mechanics
* Perfect streaks
* Gradual difficulty
* Competitive scoring
* Mobile-first gameplay

The final product should feel like a polished standalone arcade game rather than a generic web project.

---

# 2. Product Vision

STACK should provide two different experiences using the same simple core mechanic.

### Relaxed

A calm experience where players can:

* Enjoy the music
* Explore different environments
* Slowly build towers
* Play without intense pressure
* Focus on the atmosphere

### Competitive

A high-score focused experience where players can:

* Improve precision
* Maintain Perfect streaks
* Reach milestones
* Push increasingly difficult speeds
* Compete against their own best score
* Attempt longer runs

The two modes should share the same visual identity and mechanics while providing different pacing.

---

# 3. Target Audience

STACK is designed for players who enjoy:

* Simple arcade games
* Casual mobile games
* Minimalist games
* High-score challenges
* Relaxing games
* Short play sessions
* Skill-based games
* Visually polished experiences

The game should be understandable without requiring instructions before the first play.

---

# 4. Core Product Goal

The player should be able to:

1. Open STACK.
2. Understand the game within seconds.
3. Choose a mode.
4. Start stacking immediately.
5. Enjoy satisfying movement and audio.
6. Gradually improve their score.
7. Want to restart after Game Over.

The experience should minimize friction between opening the game and playing it.

---

# 5. Platforms

STACK will be a browser-based game.

Primary target:

**Mobile browsers**

Secondary target:

**Desktop browsers**

The mobile version should receive the highest optimization priority.

Supported layouts should include:

* Small mobile phones
* Standard mobile phones
* Large mobile phones
* Tablets
* iPads
* Laptops
* Desktop monitors

The game must not require scrolling during gameplay.

---

# 6. Core Gameplay

The player controls a horizontally moving block.

The player drops the block using:

### Mobile

Tap anywhere on the game area.

### Desktop

Press:

`SPACE`

The block falls toward the existing tower.

The overlapping portion remains.

The non-overlapping portion falls away.

The remaining block becomes the next platform.

The tower grows upward.

A complete miss ends the run.

---

# 7. Game Modes

## 7.1 Relaxed Mode

Relaxed Mode is designed around atmosphere and enjoyment.

Characteristics:

* Slow starting movement
* Gradual speed increases
* Large reaction window
* Focus on music
* Focus on backgrounds
* Calm visual presentation
* Long playable sessions

Speed increases occur at larger score intervals.

The mode should never become aggressively fast.

---

## 7.2 Competitive Mode

Competitive Mode is designed around high-score progression.

Characteristics:

* Faster initial progression
* Earlier speed increases
* Increasing precision requirements
* Perfect streaks
* Milestones
* High-score chasing

Initial difficulty thresholds begin around:

* 40
* 80
* 120
* Continuing upward

Speed increases must remain gradual.

The player should still be able to see and react to the active block at very high scores.

---

# 8. Scoring System

Every successful stack awards a base score.

The score progression increases through milestones.

Initial progression:

```text
0–99       → +1
100–249    → +2
250–499    → +3
500–749    → +4
750–999    → +5
1000+      → +6
```

The milestone system should support future expansion.

---

# 9. Perfect Streak System

Players can achieve consecutive Perfect placements.

There is no maximum streak.

Example:

```text
PERFECT ×1
PERFECT ×2
PERFECT ×3
...
PERFECT ×10
...
PERFECT ×50
...
PERFECT ×100
```

Every 10 consecutive Perfect placements increases the streak bonus by +5.

Example:

```text
10 → +5
20 → +10
30 → +15
40 → +20
50 → +25
```

If the streak breaks, the streak counter resets.

The next 10 consecutive Perfect placements start again at +5.

---

# 10. Background System

STACK will contain **10 atmospheric backgrounds**.

The visual direction is:

**Sunset / Terracotta**

Backgrounds should represent different environments while belonging to the same visual world.

Possible environments include:

* Sunset
* Desert
* Hills
* Ocean
* Clouds
* Mountains
* Dusk
* Twilight
* Night

Backgrounds should be randomly selected.

Each background must support:

* Mobile
* Tablet
* Desktop

The tower must remain visually prominent against every background.

---

# 11. Music System

STACK will support multiple relaxing music tracks.

Initial target:

**4–5 tracks**

Music should be:

* Calm
* Atmospheric
* Minimal
* Non-intrusive
* Suitable for long sessions

A dedicated music folder will contain the tracks.

The implementation must provide the exact required filename convention so additional music can easily be added.

Music should be randomly selected for each run/session.

---

# 12. Audio System

STACK will have two primary audio categories:

### Music

Background atmospheric music.

### Sound Effects

Gameplay sounds including:

* Block drop
* Block impact
* Perfect
* Streak progression
* Milestone
* Game Over
* Restart/menu interactions

The Perfect streak sound should evolve progressively.

The audio should become more musically interesting as the streak increases without becoming loud or chaotic.

---

# 13. Audio Controls

The game should provide a mute control.

Desktop shortcut:

`M`

The mute state should apply consistently to game audio.

The UI should provide a visible mute control beneath/near the Pause control.

---

# 14. Game UI

The gameplay interface must remain minimal.

Primary gameplay UI:

* Score
* Best score
* Pause
* Mute

The Best Score should use a small diamond-inspired visual design.

The UI must not obscure the tower.

---

# 15. Navigation

The home website should contain:

* Play
* About the Game
* Rules
* Developer Profile

The design should take inspiration from the clean structure of the previous Tetris project.

Gameplay should receive maximum screen space once a run starts.

---

# 16. Developer Profile

STACK will include a Developer Profile section.

Developer:

**Saswat Dixit**

Links:

* LinkedIn: https://www.linkedin.com/in/saswatdixit/
* GitHub: https://github.com/FireStormy1
* Email: [saswatdixit01@gmail.com](mailto:saswatdixit01@gmail.com)
* LeetCode: https://leetcode.com/u/FireStormy/

A developer photograph will be provided later.

The profile should visually match the overall STACK design.

---

# 17. Game Over Experience

Game Over should feel like a rewarding summary rather than a failure screen.

When the player loses:

1. The falling animation finishes.
2. The camera zooms/reframes outward.
3. The completed tower becomes visible.
4. Score is displayed.
5. Best score is displayed.
6. Milestone information can be shown.
7. Screenshot/share functionality is provided.
8. Restart is offered.

The complete tower should be the visual centrepiece.

---

# 18. Screenshot / Share

Players should be able to capture and share their completed tower.

The generated image should contain:

* Completed tower
* Current background
* Score
* Best score
* STACK branding where appropriate

The feature should work particularly well on mobile browsers.

---

# 19. Milestones

Initial milestones:

```text
100
250
500
750
1000
```

Additional milestones can continue beyond 1000.

Milestones should provide:

* Score progression
* Subtle visual feedback
* Audio feedback
* Sense of achievement

Milestones should not interrupt gameplay with large overlays.

---

# 20. Design Requirements

The visual identity must follow:

**Minimal Retro + Sunset / Terracotta**

Required characteristics:

* Warm colours
* Muted tones
* Minimal typography
* Clean geometry
* Subtle depth
* Atmospheric backgrounds
* Generous negative space
* Smooth animations
* Premium presentation

Avoid:

* Neon
* Purple-heavy palettes
* Cyberpunk
* Glassmorphism
* Excessive gradients
* Generic SaaS UI
* Overly colourful interfaces
* Excessive particles
* Excessive text

---

# 21. Mobile-First Requirement

Mobile is the primary platform.

The mobile game must:

* Fit within the viewport
* Require no scrolling
* Support touch anywhere on the game area
* Keep the tower visible
* Keep the active block visible
* Keep UI controls accessible
* Handle device safe areas
* Work across different aspect ratios

Desktop should use the same visual system rather than becoming a separate design.

---

# 22. Performance Requirements

The target is smooth gameplay at approximately:

**60 FPS**

The game should:

* Minimize unnecessary rendering
* Avoid unnecessary React re-renders
* Use efficient animation
* Handle high tower heights
* Remain responsive on mobile
* Clean up event listeners
* Avoid memory leaks

Performance should remain a priority throughout development.

---

# 23. Accessibility

The product should support:

* Keyboard controls
* Accessible button labels
* Visible focus states
* Comfortable mobile touch targets
* Sufficient text contrast
* Non-colour-only feedback

The game should remain playable without relying exclusively on colour.

---

# 24. Product Principles

### Simplicity

The player should understand the game almost immediately.

### Atmosphere

Music and backgrounds should make Relaxed Mode genuinely enjoyable.

### Precision

Competitive Mode should reward accurate timing.

### Progression

Difficulty and scoring should gradually evolve.

### Satisfaction

Every successful placement should feel rewarding.

### Restraint

Effects should enhance gameplay rather than distract from it.

### Replayability

The player should naturally want to try again.

---

# 25. MVP Scope

The first complete playable version should include:

* Home screen
* Navigation
* Mode selection
* Core stacking gameplay
* Relaxed Mode
* Competitive Mode
* Scoring
* Perfect detection
* Perfect streaks
* Milestones
* Gradual difficulty
* Camera movement
* Game Over
* Restart
* High score persistence
* 10 backgrounds
* Music system
* Sound effects
* Mute
* Pause
* Mobile controls
* Desktop keyboard controls
* Screenshot/share
* Developer profile
* Responsive layout

---

# 26. Future Expansion

Potential future features can be considered after the core experience is polished:

* Additional backgrounds
* Additional music
* More milestone types
* Daily challenge
* Global leaderboard
* Online competition
* Achievements
* Special blocks
* Themes
* Seasonal environments

These should NOT delay the initial polished version.

---

# 27. Success Criteria

STACK will be considered successful when:

* A new player understands the game within seconds.
* Gameplay feels smooth on mobile.
* Desktop gameplay feels equally polished.
* Blocks feel satisfying to place.
* The tower remains readable at high scores.
* Relaxed Mode genuinely feels calm.
* Competitive Mode provides meaningful challenge.
* Streak audio feels rewarding.
* Backgrounds and blocks visually complement each other.
* The UI remains uncluttered.
* Game Over encourages another attempt.
* The game feels like a cohesive, intentionally designed product.

---

# 28. Final Product Statement

STACK should feel like:

> A beautifully simple stacking game that can be played casually for a few minutes, or mastered through increasingly precise competitive runs.

The player should be able to open the game, tap Play, understand the mechanic immediately, and think:

**"Just one more stack."**
