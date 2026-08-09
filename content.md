# STACK — Content Specification

## 1. Content Philosophy

STACK should use very little text.

The game is primarily visual and interactive.

Content should be:

* Short
* Clear
* Minimal
* Friendly
* Consistent
* Retro-inspired
* Never overly descriptive

Avoid unnecessary paragraphs inside the actual game.

---

# 2. Home Navigation

The main navigation should contain:

```text
PLAY
ABOUT
RULES
DEVELOPER
```

The navigation should remain consistent with the clean structure used in the previous Tetris project.

---

# 3. Home Screen

Primary content:

```text
STACK

[ PLAY ]
```

Optional small supporting text can be added later if needed.

The home screen should remain visually clean.

---

# 4. Play / Mode Selection

After selecting Play:

```text
CHOOSE MODE

RELAXED
Take your time. Enjoy the stack.

COMPETITIVE
Stack higher. Push your score.
```

Buttons:

```text
RELAXED
COMPETITIVE
```

The descriptions should remain short.

---

# 5. Ready State

Before gameplay begins:

```text
READY?
```

The player should then enter the game naturally.

Avoid long countdowns unless testing shows that one improves the experience.

---

# 6. Gameplay Text

Gameplay should display almost no text.

Primary information:

```text
SCORE
BEST
```

Perfect feedback may display:

```text
PERFECT
```

Streak feedback may display:

```text
×5
×10
×20
```

or a similarly minimal presentation.

---

# 7. Pause Menu

The Pause menu should contain:

```text
PAUSED

RESUME
RESTART
HOME
```

Keep the menu minimal.

---

# 8. Game Over

Game Over should display:

```text
GAME OVER
```

Then:

```text
SCORE
[score]

BEST
[best score]
```

If the player beats their previous record:

```text
NEW BEST
```

Actions:

```text
RESTART
SHARE
HOME
```

---

# 9. Milestone Content

Milestones should use minimal feedback.

Initial milestones:

```text
100
250
500
750
1000
```

Possible display:

```text
MILESTONE
100
```

The visual treatment should be subtle.

Avoid large full-screen announcements.

---

# 10. Perfect Content

Perfect placements can display:

```text
PERFECT
```

The text should appear briefly and disappear smoothly.

It should not obstruct the tower.

---

# 11. Streak Content

The Perfect streak can be represented minimally:

```text
PERFECT ×5
PERFECT ×10
PERFECT ×20
```

At larger streaks:

```text
×50
×100
×250
```

The system should support unlimited streak values.

---

# 12. About the Game

The About section should briefly explain STACK.

Suggested content:

```text
ABOUT STACK

STACK is a simple stacking game built around timing, precision and rhythm.

Place each block as accurately as you can, build your tower, maintain your Perfect streak and see how high you can go.

Relax, enjoy the atmosphere, or push your score in Competitive Mode.
```

This text can be refined later.

---

# 13. Rules Page

The Rules page should provide the essential gameplay instructions.

Suggested sections:

```text
HOW TO PLAY

Place the moving block on top of the tower.

TAP
Drop the block on mobile.

SPACE
Drop the block on desktop.

PERFECT
Align the block accurately to build your streak.

STREAK
Keep landing Perfect placements to increase your bonus.

MILESTONES
Reach higher scores to increase your base points.

MISS
If you completely miss the tower, the run ends.
```

The complete technical rules remain documented in `rules.md`.

The in-game Rules page should use the simplified version.

---

# 14. Relaxed Mode Description

Short description:

```text
RELAXED

Slow down.
Build your tower.
Enjoy the music.
```

Alternative:

```text
RELAXED

Take your time and enjoy the stack.
```

Final wording can be selected during UI implementation.

---

# 15. Competitive Mode Description

Short description:

```text
COMPETITIVE

Stack higher.
Stay precise.
Beat your best.
```

Alternative:

```text
COMPETITIVE

Push your limits and chase your high score.
```

---

# 16. Developer Profile

Developer:

**Saswat Dixit**

The developer section should include:

```text
SASWAT DIXIT

Developer & Designer
```

A developer photograph will be added later.

Social/contact links:

```text
LinkedIn
GitHub
Email
LeetCode
```

Links:

* LinkedIn — `https://www.linkedin.com/in/saswatdixit/`
* GitHub — `https://github.com/FireStormy1`
* Email — `saswatdixit01@gmail.com`
* LeetCode — `https://leetcode.com/u/FireStormy/`

The exact developer bio will be added later.

---

# 17. Share Content

The generated result should contain minimal information:

```text
STACK

SCORE
[score]

BEST
[best score]
```

Optional:

```text
PERFECT ×[streak]
```

The tower and background should remain the main focus.

---

# 18. New Best Content

When a new high score is achieved:

```text
NEW BEST
```

Keep the notification short.

No long congratulatory message is required.

---

# 19. Empty / Loading States

If needed:

```text
LOADING...
```

If an optional asset fails:

Do not expose technical errors to the player.

The game should silently use an appropriate fallback.

---

# 20. Accessibility Labels

Interactive elements should have meaningful labels.

Examples:

```text
Play
Pause
Mute
Unmute
Resume
Restart
Share
Home
About
Rules
Developer
```

Icon-only controls must have accessible labels.

---

# 21. Error Messages

Errors should be rare and minimal.

Avoid technical messages such as:

```text
AudioContext initialization failed
Asset loading error
Canvas rendering exception
```

Players should instead see a simple fallback state where possible.

---

# 22. Keyboard Help

Desktop users can optionally see:

```text
SPACE — DROP
ESC — PAUSE
M — MUTE
```

This should remain subtle and should not clutter the main gameplay screen.

---

# 23. Footer

A small footer may contain:

```text
STACK
Made by Saswat Dixit
```

Social icons can link to the developer's profiles.

---

# 24. Content That Should NOT Be Added

Avoid:

* Long tutorials
* Excessive instructions
* Large paragraphs
* Generic motivational quotes
* Unnecessary statistics
* Excessive popups
* Unnecessary notifications
* Loud achievement messages
* Corporate-style language

STACK should communicate through gameplay first.

---

# 25. Content Tone

The overall tone should be:

**Calm · Minimal · Friendly · Slightly Playful**

The game should never sound overly competitive even in Competitive Mode.

---

# 26. Final Content Principle

> **Say less. Let the game speak.**
