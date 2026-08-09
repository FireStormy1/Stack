# STACK — Architecture

## 1. Architecture Overview

STACK will be a client-side browser game designed primarily for mobile browsers and secondarily for desktop browsers.

The architecture should prioritize:

* Smooth 60 FPS gameplay
* Mobile performance
* Clean separation of game logic and UI
* Maintainability
* Easy asset replacement
* Easy addition of backgrounds/music
* Responsive rendering
* Minimal unnecessary dependencies

The project should be structured so that gameplay mechanics can evolve without requiring major changes to the UI.

---

# 2. Recommended Technology

Use a modern frontend stack:

* **React**
* **TypeScript**
* **Vite**
* **HTML5 Canvas** for gameplay rendering
* **CSS** for website/UI styling
* **Web Audio API / suitable audio abstraction** for game audio
* **LocalStorage** for persistent player data

The exact libraries can be chosen during implementation if they provide a clear benefit.

Avoid adding libraries unnecessarily.

---

# 3. Rendering Architecture

The actual game should be rendered using **HTML5 Canvas**.

Canvas should handle:

* Moving blocks
* Tower blocks
* Block cutting
* Falling pieces
* Tower growth
* Camera movement
* Game animations
* Background rendering where appropriate
* Gameplay effects

React should primarily handle:

* Home page
* Navigation
* Mode selection
* Pause menu
* Game Over UI
* Developer profile
* Rules
* About
* Buttons
* Settings/audio controls

Do not use React state for every frame of gameplay.

---

# 4. Game Loop

The game should use:

`requestAnimationFrame`

The loop should continuously update:

```text id="b6x2cr"
Input
 ↓
Game State
 ↓
Physics / Movement
 ↓
Collision / Overlap
 ↓
Scoring
 ↓
Animation
 ↓
Rendering
```

Gameplay should target approximately **60 FPS**.

The game loop must stop or pause appropriately when the game is paused or inactive.

---

# 5. Core Game State

The game state should contain the information necessary to reproduce the current run.

Conceptually:

```text id="z8k6xk"
GameState
├── mode
├── status
├── score
├── bestScore
├── streak
├── milestone
├── speed
├── tower
├── activeBlock
├── camera
├── background
├── music
└── audioState
```

The implementation may organize these values differently, but responsibilities should remain separated.

---

# 6. Game States

The application should support clear states:

```text id="z0q4hr"
HOME
MODE_SELECT
READY
PLAYING
PAUSED
GAME_OVER
```

Transitions should be predictable.

Example:

```text id="o4n8o1"
HOME
 ↓
MODE_SELECT
 ↓
READY
 ↓
PLAYING
 ↓
GAME_OVER
 ↓
PLAYING
```

Pause:

```text id="qjq5n0"
PLAYING
 ↓
PAUSED
 ↓
PLAYING
```

---

# 7. Block System

Each tower block should be represented as structured game data.

Conceptually:

```text id="c5m6gs"
Block
├── x
├── y
├── width
├── height
├── color
├── depth
└── state
```

The exact implementation may include additional properties.

Blocks should not be React components during active gameplay.

They should be rendered directly by the Canvas renderer.

---

# 8. Active Block

The active block should have its own state.

It must track:

* Position
* Width
* Height
* Direction
* Movement speed
* Falling state
* Colour
* Rendering properties

The active block moves horizontally until the player drops it.

---

# 9. Tower System

The tower should be stored as an ordered collection of blocks.

Example:

```text id="2y8c1c"
Tower
 ├── Block 0
 ├── Block 1
 ├── Block 2
 ├── Block 3
 └── ...
```

The newest block is the current top of the tower.

The tower system should support:

* Adding blocks
* Removing/animating cut-off pieces
* Calculating top position
* Camera movement
* Game Over rendering
* Full-tower Game Over capture

---

# 10. Collision / Overlap System

When the active block is dropped:

1. Determine the horizontal overlap.
2. Determine whether overlap exists.
3. Calculate the remaining width.
4. Calculate the cut-off section.
5. Create the new tower block.
6. Animate the cut-off section.
7. Determine Perfect status.
8. Update score/streak.
9. Check milestones.
10. Generate the next block.

The collision system should be deterministic.

---

# 11. Perfect Detection

Perfect detection should be isolated into its own function/module.

Conceptually:

```text id="9d4u8s"
isPerfect(activeBlock, previousBlock)
```

The threshold should be configurable.

This allows Perfect sensitivity to be tuned without changing the rest of the game engine.

---

# 12. Scoring System

Scoring should be independent from rendering.

A dedicated scoring system should handle:

* Base score
* Milestone progression
* Perfect streak
* Streak bonus
* New best score

Conceptually:

```text id="m3k55c"
ScoreSystem
├── calculateBaseScore()
├── updateMilestone()
├── updateStreak()
├── calculateStreakBonus()
└── updateBestScore()
```

The scoring system should be testable without rendering the game.

---

# 13. Difficulty System

Difficulty should be isolated from the core block movement system.

The difficulty manager should determine the current movement speed based on:

* Game mode
* Current score
* Current progression

Conceptually:

```text id="7d0t6f"
DifficultySystem
├── getRelaxedSpeed(score)
└── getCompetitiveSpeed(score)
```

The speed curves must remain configurable.

This allows difficulty to be tuned without rewriting movement logic.

---

# 14. Mode System

The game should support:

```text id="2e94st"
RELAXED
COMPETITIVE
```

The mode determines:

* Speed progression
* Difficulty curve

The following should remain shared between both modes:

* Core stacking
* Scoring
* Perfect streak
* Milestones
* Background system
* Music system
* UI
* Controls

---

# 15. Camera System

The game should use a virtual camera.

The camera controls which portion of the tower is visible.

As the tower grows:

* Camera position updates
* Movement is smoothed
* Tower remains visible
* Active block remains visible

The camera should not jump abruptly.

The camera should also support the Game Over zoom-out/reframe.

---

# 16. Background System

Backgrounds should be treated as external assets.

Recommended structure:

```text id="t1v8rj"
public/
└── assets/
    └── backgrounds/
        ├── background-01
        ├── background-02
        ├── background-03
        ├── ...
        └── background-10
```

The background manager should:

* Discover/use available backgrounds
* Randomly select a background
* Avoid unnecessary repetition where practical
* Handle responsive cropping/scaling
* Maintain correct aspect ratio

Background selection should be independent from game mechanics.

---

# 17. Responsive Background Rendering

Backgrounds must support:

* Mobile portrait
* Tablet
* Desktop landscape

The implementation should not simply stretch an image to fit.

Use appropriate:

* Cover/crop behaviour
* Positioning
* Safe visual areas

The tower should remain visible regardless of aspect ratio.

---

# 18. Music System

Music should be stored separately from code.

Recommended structure:

```text id="uy6d4m"
public/
└── assets/
    └── music/
        ├── music1.*
        ├── music2.*
        ├── music3.*
        ├── music4.*
        └── music5.*
```

The final implementation must clearly document the supported audio format and exact filenames.

The player should be able to replace/add music without changing gameplay code.

---

# 19. Audio Manager

A centralized audio manager should control:

* Background music
* Drop sound
* Impact sound
* Perfect sound
* Streak progression
* Milestone sound
* Game Over sound
* UI sounds
* Mute state

Conceptually:

```text id="m1e1cr"
AudioManager
├── playMusic()
├── stopMusic()
├── playSFX()
├── playPerfect()
├── playStreak()
├── playMilestone()
├── mute()
└── unmute()
```

Audio logic should not be scattered throughout gameplay components.

---

# 20. Evolving Streak Audio

The streak audio system should support an unlimited streak.

It should not require one unique sound file for every possible streak.

Instead, it should support:

* Multiple sound layers
* Pitch variation
* Tonal variation
* Subtle progression
* Reusable audio components

The system should avoid excessive volume increases.

The goal is musical progression rather than increasingly loud effects.

---

# 21. Input System

Input handling should be centralized.

Supported input:

### Mobile

Touch/tap on game area.

### Desktop

```text id="z5l8x0"
SPACE → Drop
ESC   → Pause/Menu
M     → Mute
```

The system should prevent accidental duplicate input from touch + mouse events.

---

# 22. UI Architecture

React should manage the interface outside the Canvas.

Suggested structure:

```text id="m0r5xj"
App
├── Home
│   ├── Navigation
│   ├── Play
│   ├── About
│   ├── Rules
│   └── Developer
│
├── ModeSelection
│
└── Game
    ├── Canvas
    ├── Score
    ├── BestScore
    ├── PauseButton
    ├── MuteButton
    └── GameOver
```

The exact component structure can change during implementation if a cleaner architecture is found.

---

# 23. Game Screen

The Game component should connect:

```text id="y3k1f0"
React UI
    ↓
Game Engine
    ↓
Canvas Renderer
```

React should not control every animation frame.

The game engine should own the active gameplay state.

---

# 24. Persistent Data

Use browser LocalStorage for data that should survive page refreshes.

Initial persistent data:

```text id="xxr8tv"
bestScore
mutePreference
```

Additional settings can be added later.

No backend is required for the initial version.

---

# 25. Screenshot / Share Architecture

The Game Over screen should support capturing the visual game state.

The capture system should be able to combine:

* Current background
* Complete tower
* Score
* Best score
* STACK branding

The implementation should prefer browser-native sharing APIs where supported.

Fallback behaviour should be provided for browsers without native sharing.

---

# 26. Asset Architecture

Keep all replaceable assets outside the game logic.

Suggested structure:

```text id="k7a5se"
public/
└── assets/
    ├── backgrounds/
    ├── music/
    ├── sounds/
    ├── images/
    └── fonts/
```

This makes the project easy to customize later.

---

# 27. Font Architecture

Fonts should be loaded centrally.

The typography system should define:

* Primary game font
* Secondary/UI font if required
* Score font if different

Avoid loading unnecessary font families.

The final font selection should follow the Retro/Minimal design specification.

---

# 28. Configuration

Game tuning values should be centralized.

Example:

```text id="xpxf8n"
GAME_CONFIG
├── block
├── movement
├── perfectThreshold
├── scoring
├── milestones
├── relaxedDifficulty
├── competitiveDifficulty
├── camera
└── animation
```

This allows gameplay tuning without searching through multiple files.

---

# 29. Recommended Project Structure

A clean structure can follow:

```text id="w5o6x7"
src/
├── components/
│   ├── ui/
│   ├── game/
│   └── navigation/
│
├── game/
│   ├── engine/
│   ├── entities/
│   ├── systems/
│   ├── rendering/
│   ├── input/
│   └── audio/
│
├── pages/
│   ├── Home/
│   ├── About/
│   ├── Rules/
│   └── Developer/
│
├── config/
├── hooks/
├── utils/
├── types/
└── assets/
```

The exact folder names can be adjusted during implementation, but the separation of responsibilities should remain.

---

# 30. Separation of Responsibilities

The architecture should follow:

```text id="s1ak5m"
UI
 ↓
Game Controller
 ↓
Game Engine
 ↓
Systems
 ↓
Renderer
```

Where:

### UI

Handles presentation and interaction.

### Game Controller

Coordinates game state and UI/game transitions.

### Game Engine

Runs the gameplay loop.

### Systems

Handle individual responsibilities such as:

* Physics
* Scoring
* Difficulty
* Camera
* Audio
* Input

### Renderer

Draws the current game state.

---

# 31. Performance Principles

Avoid:

* Per-frame React state updates
* Excessive DOM elements for game objects
* Unnecessary Canvas redraw complexity
* Uncontrolled audio instances
* Memory leaks
* Large unoptimized assets
* Recreating objects unnecessarily every frame

Prefer:

* requestAnimationFrame
* Efficient Canvas drawing
* Reusable objects where appropriate
* Centralized state
* Asset preloading
* Proper cleanup

---

# 32. Mobile Optimization

Mobile is the primary performance target.

The implementation should consider:

* Lower-power CPUs
* Touch input
* High-DPI screens
* Battery usage
* Browser viewport changes
* Orientation changes
* Safe-area insets
* Mobile audio restrictions

Canvas resolution should be handled appropriately for high-DPI devices without creating unnecessary rendering overhead.

---

# 33. Audio Restrictions

Mobile browsers may require a user interaction before audio playback.

The game should initialize/resume audio after the player interacts with the game.

Do not assume music can automatically begin before user interaction.

Audio should fail gracefully if the browser blocks playback.

---

# 34. Error Handling

The game should remain playable even if optional assets fail to load.

Examples:

### Music unavailable

Continue gameplay without music.

### Sound unavailable

Continue gameplay without sound effects.

### Background unavailable

Use a safe fallback background.

The game must never crash simply because an optional asset is missing.

---

# 35. Extensibility

The architecture should make it easy to add:

* More backgrounds
* More music
* More sound effects
* Additional modes
* More milestones
* Additional achievements
* New visual themes
* New block styles

without rewriting the core game engine.

---

# 36. Testing Priorities

The following systems should be testable independently:

* Block movement
* Block overlap
* Perfect detection
* Scoring
* Streak calculation
* Milestone progression
* Difficulty progression
* Game Over detection
* Camera movement
* Input handling

The most important gameplay calculations should not depend directly on visual rendering.

---

# 37. Architecture Principle

The most important architectural rule is:

> **Keep the game engine independent from the website UI.**

The game should continue to work correctly even if the surrounding React interface is redesigned.

This allows STACK's visual design to evolve without destabilizing the core gameplay.

---

# 38. Final Architecture Goal

STACK should have three clearly separated layers:

```text id="d4kz2x"
┌──────────────────────────┐
│       WEBSITE / UI       │
│ Home • Rules • Developer │
└────────────┬─────────────┘
             │
┌────────────▼─────────────┐
│       GAME ENGINE        │
│ Movement • Stack • Score │
│ Streak • Difficulty      │
└────────────┬─────────────┘
             │
┌────────────▼─────────────┐
│     RENDERING / AUDIO    │
│ Canvas • Backgrounds     │
│ Music • Sound • Effects  │
└──────────────────────────┘
```

The result should be a lightweight, maintainable, mobile-first architecture capable of supporting the complete STACK experience without unnecessary technical complexity.
