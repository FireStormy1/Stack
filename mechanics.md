# STACK — Game Mechanics

## 1. Core Gameplay

STACK is a minimalist vertical stacking game inspired by the core gameplay mechanics of **Stack by Ketchapp**.

The player controls a horizontally moving block above a growing tower.

The player drops the moving block at the desired moment.

The game calculates the horizontal overlap between:

* The moving block
* The top block of the existing tower

Only the overlapping portion remains as the newly stacked block.

The non-overlapping portion is cut away and falls.

The tower continues growing upward.

### Core loop

```text
MOVING BLOCK
      ↓
PLAYER DROPS
      ↓
BLOCK FALLS
      ↓
CHECK OVERLAP
      ↓
CUT EXCESS
      ↓
STACK REMAINING PART
      ↓
SCORE +1
      ↓
GENERATE NEXT BLOCK
      ↓
REPEAT
```

If there is no overlap, the run ends.

---

# 2. Foundation Block

The first block acts as the foundation of the tower.

It should:

* Be centered
* Have a reasonable starting width
* Establish the initial tower position
* Not require precision from the player

The first moving block begins above it.

---

# 3. Block Movement

The active block continuously moves horizontally.

The movement direction reverses when the block reaches the playable boundaries.

```text
← ← ← BLOCK → → →
```

The block should never leave the playable game area.

Movement should be continuous rather than teleporting between positions.

Use smooth frame-based movement.

---

# 4. Block Drop

### Mobile

The player taps anywhere on the active game area.

### Desktop

The player presses:

`SPACE`

The active block immediately begins falling toward the top of the tower.

The falling animation should feel quick and satisfying.

The block should visibly collide with the tower rather than simply snapping into position.

---

# 5. Overlap Calculation

When the moving block reaches the tower:

```text
Moving block:
     ┌───────────────┐
     │               │
     └───────────────┘

Previous block:
        ┌───────────────┐
        │               │
        └───────────────┘
```

The overlapping horizontal region becomes the new block.

The excess regions are removed.

Example:

```text
     ┌───────────────┐
     │    REMAIN     │
     └───────────────┘
        ┌───────────────┐
        │   PREVIOUS    │
        └───────────────┘
```

The new block width therefore depends on how accurately the player placed it.

---

# 6. Cut-Off Piece

The non-overlapping portion should not simply disappear.

It should visually fall away from the tower.

The cut-off piece should:

* Separate naturally
* Fall downward
* Have subtle rotation if appropriate
* Leave the playable area
* Be removed efficiently after leaving the visible area

The animation should remain minimal.

---

# 7. Successful Placement

A successful placement occurs when:

```text
overlapWidth > 0
```

After a successful placement:

1. Calculate overlap
2. Create the remaining block
3. Animate the cut-off section falling
4. Settle the remaining block
5. Increase score
6. Check Perfect condition
7. Update streak
8. Check milestone
9. Increase difficulty if required
10. Generate the next block

---

# 8. Perfect Placement

A Perfect occurs when the active block is extremely well aligned with the previous block.

The Perfect threshold should be configurable rather than hardcoded into the UI.

Perfect detection should tolerate a very small positioning difference.

Perfect placement should:

* Preserve the intended block width
* Trigger Perfect feedback
* Continue the streak
* Trigger the evolving streak audio
* Apply streak scoring when applicable

The visual feedback should remain subtle.

---

# 9. Perfect Streak

A Perfect Streak counts consecutive Perfect placements.

Example:

```text
PERFECT
PERFECT ×2
PERFECT ×3
PERFECT ×4
...
PERFECT ×10
...
PERFECT ×20
...
PERFECT ×100
```

There is no fixed maximum streak.

The streak continues indefinitely as long as the player keeps achieving Perfect placements.

---

# 10. Streak Break

The Perfect streak resets whenever the player successfully places a block but does not achieve Perfect.

Example:

```text
PERFECT ×7
PERFECT ×8
NORMAL PLACEMENT
→ STREAK RESET
```

A normal successful placement does NOT end the game.

It only resets the Perfect streak.

The next Perfect streak starts again from:

`1`

---

# 11. Base Scoring

Every successfully stacked block awards:

**+1 point**

This applies regardless of mode.

Normal placement:

```text
+1
```

Perfect placement:

```text
+1
```

Additional streak and milestone bonuses are handled separately.

---

# 12. Perfect Streak Scoring

Every consecutive group of 10 Perfect placements increases the streak bonus by `+5`.

Initial streak bonus:

```text
10 Perfects → +5
```

If the streak continues:

```text
20 Perfects → +10
30 Perfects → +15
40 Perfects → +20
50 Perfects → +25
...
```

The bonus continues increasing indefinitely.

### Important

The streak bonus should not replace the base score.

The score calculation should conceptually be:

```text
Base score
+
Applicable streak bonus
+
Applicable milestone score
```

---

# 13. Streak Bonus Reset

If the Perfect streak breaks, the streak count resets.

The next time the player reaches 10 consecutive Perfect placements, the bonus returns to:

```text
+5
```

Example:

```text
Perfect ×20
→ +10 streak bonus

Normal placement
→ streak reset

Perfect ×10
→ +5 streak bonus
```

---

# 14. Milestone System

STACK has long-term score milestones.

Initial milestones:

```text
100
250
500
750
1000
```

The system should support additional milestones beyond 1000.

Milestones should increase the base score earned per successful stack.

### Initial progression

```text
0–99       → +1
100–249    → +2
250–499    → +3
500–749    → +4
750–999    → +5
1000+      → +6
```

The milestone progression should continue in the same spirit if additional milestones are added.

---

# 15. Milestones and Perfect Streaks

Milestone score progression must NOT interfere with the Perfect streak.

Example:

A player reaches 100 while maintaining a Perfect streak.

The new base score becomes:

```text
+2
```

But the Perfect streak remains active.

If the player has reached a streak bonus of:

```text
+5
```

the streak bonus remains `+5`.

The two systems are independent.

---

# 16. Score Calculation

The score system should treat these as separate components:

### Base Stack Score

Determined by the current milestone.

### Perfect Streak Bonus

Determined by the current consecutive Perfect streak.

### Total Score

Conceptually:

```text
TOTAL SCORE
=
BASE STACK SCORE
+
STREAK BONUS
```

The exact implementation should avoid double-counting bonuses.

---

# 17. Relaxed Mode

Relaxed Mode is designed primarily for:

* Calm gameplay
* Music
* Background atmosphere
* Casual stacking
* Enjoyment

Movement starts slowly.

Speed increases gradually at larger score intervals.

Example progression:

```text
0–49       → Starting speed
50–99      → Slight increase
100–149    → Slight increase
150–199    → Slight increase
200–249    → Slight increase
...
```

The exact progression should remain configurable.

The speed increase must always be small enough that the game continues to feel relaxing.

Relaxed Mode should never become extremely fast.

---

# 18. Competitive Mode

Competitive Mode is designed around:

* Precision
* High scores
* Streaks
* Increasing difficulty
* Milestones
* Long runs

Speed increases earlier than Relaxed Mode.

Initial progression concept:

```text
0–39       → Starting speed
40–79      → Slight increase
80–119     → Slight increase
120–159    → Slight increase
160–199    → Slight increase
...
```

The exact progression should be configurable.

Speed should increase gradually rather than suddenly.

---

# 19. High-Level Difficulty Principle

The goal is NOT:

```text
Score ↑
Speed ↑↑↑
```

The goal is:

```text
Score ↑
Speed ↑
```

The player should still be able to visually track the block at very high scores.

Even around:

```text
500
750
1000+
```

the block should remain readable and controllable.

Competitive Mode should become difficult because of increasing precision requirements and gradually increasing speed—not because the block becomes visually impossible to follow.

---

# 20. Tower Growth

Every successful placement adds another layer to the tower.

The tower grows vertically.

The camera should smoothly follow the tower upward.

The game should always prioritize visibility of:

* Current block
* Top of tower
* Relevant score information

The tower should never become permanently compressed into a tiny area just because the player reached a high score.

---

# 21. Camera Behaviour

The camera should smoothly transition upward as the tower grows.

Avoid:

* Sudden jumps
* Instant repositioning
* Shaky camera movement

The camera should feel almost invisible to the player.

The objective is to make the tower feel like it is naturally growing upward.

---

# 22. Background Selection

At the beginning of a run:

1. Select a background from the available background collection.
2. Select an appropriate block colour combination based on that environment.
3. Select a music track.
4. Begin the run.

Background selection should be random.

Music selection should also be random.

The selected environment should remain visually coherent throughout the run.

Background transitions may occur at designated progression points if implemented, but they must remain subtle.

---

# 23. Music Selection

STACK will support multiple chill music tracks.

The game should randomly select a track for a run.

All music files will be placed into a dedicated music folder.

The implementation should provide a clear naming convention, for example:

```text
music1
music2
music3
music4
music5
```

The final implementation should clearly document the exact filename and file-format requirements so additional tracks can be added without changing the game code.

---

# 24. Streak Audio

Streak audio should continuously evolve rather than stopping at a small streak count.

The audio progression should feel similar to a musical escalation system.

Conceptually:

```text
Perfect ×1
→ Sound Layer 1

Perfect ×2
→ Slight variation

Perfect ×3
→ Higher/richer variation

...

Perfect ×10
→ More developed sound

Perfect ×20
→ Further variation

Perfect ×50
→ Continued progression
```

There should be no fixed maximum streak.

However, the audio must not become increasingly loud or chaotic.

The progression should eventually use subtle variations/layers rather than continuously increasing volume or pitch.

---

# 25. Game Controls

## Mobile

```text
Tap anywhere
→ Drop block
```

The entire game area should be interactive.

No large control button should be required.

## Desktop

```text
SPACE
→ Drop

ESC
→ Pause / Menu

M
→ Mute
```

Keyboard controls should work reliably.

---

# 26. Pause

Pause should stop:

* Block movement
* Game timer/loop
* Animations related to gameplay
* Difficulty progression

The pause menu should allow:

* Resume
* Restart
* Return to appropriate menu

Audio behaviour should be handled consistently with the audio system.

---

# 27. Game Over

Game Over occurs when the player completely misses the previous block.

If:

```text
overlapWidth <= 0
```

then:

1. The active block continues its falling animation.
2. The gameplay loop stops.
3. The final tower remains visible.
4. The camera smoothly zooms/reframes outward.
5. The complete tower is shown where practical.
6. Final score is calculated.
7. Best score is updated if necessary.
8. Game Over UI appears.
9. Screenshot/share functionality becomes available.
10. Restart becomes available.

---

# 28. High Score

The highest score should be stored locally.

The best score should persist after refreshing the page.

The system should detect when the player achieves a new best score.

A subtle:

```text
NEW BEST
```

animation can be displayed.

---

# 29. Screenshot / Share

After Game Over, the player should be able to capture the completed tower.

The screenshot should include:

* Tower
* Current background
* Final score
* Best score
* STACK branding where appropriate

The screenshot should preserve the game's visual identity.

The implementation should support mobile sharing where browser/device capabilities allow it.

---

# 30. Milestone Feedback

When a milestone is reached:

```text
100
250
500
750
1000
...
```

the player should receive subtle feedback.

Possible feedback:

* Small visual pulse
* Short audio cue
* Score transition
* Subtle milestone text

Do not interrupt gameplay for a long animation.

---

# 31. Game State Flow

The core game states are:

```text
HOME
 ↓
MODE SELECTION
 ↓
READY
 ↓
PLAYING
 ↓
PAUSED
 ↓
PLAYING
 ↓
GAME OVER
 ↓
RESTART
 ↓
PLAYING
```

The player should also be able to return from menus without refreshing the page.

---

# 32. Performance Requirements

Gameplay should target smooth rendering at approximately:

**60 FPS**

The game loop should use:

`requestAnimationFrame`

Gameplay state should not cause unnecessary React re-renders.

The rendering system should be optimized for mobile devices.

Animations should remain smooth even during:

* High tower heights
* Cut-off block animations
* Camera movement
* Perfect effects
* Background transitions

---

# 33. Core Design Principle

STACK should always follow this principle:

> **Easy to understand. Difficult to master. Relaxing to play. Satisfying to improve.**

The player should understand the entire gameplay loop within seconds.

The depth should come from:

* Timing
* Precision
* Streaks
* Score
* Milestones
* Gradual difficulty

Not from complicated controls or unnecessary mechanics.
