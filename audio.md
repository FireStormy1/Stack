# STACK — Audio Specification

## 1. Audio Vision

Audio is an important part of STACK's identity.

The game should feel:

* Calm
* Atmospheric
* Minimal
* Satisfying
* Musical
* Relaxing in casual play
* Increasingly exciting during long competitive streaks

Audio should complement the visuals rather than dominate them.

The player should be able to enjoy STACK for a long time without the music or sound effects becoming tiring.

---

# 2. Audio Categories

STACK will have four primary audio categories:

1. Background Music
2. Gameplay Sound Effects
3. Perfect / Streak Audio
4. UI / System Sounds

Each category should be managed independently.

---

# 3. Background Music

STACK will initially support approximately **4–5 chill music tracks**.

The tracks should match the game's:

**Sunset / Terracotta / Minimal Retro**

identity.

Music should feel:

* Relaxing
* Warm
* Atmospheric
* Minimal
* Soft
* Non-intrusive
* Suitable for repeated listening

Avoid tracks that are:

* Aggressive
* Extremely fast
* Very bass-heavy
* Distracting
* Overly dramatic
* Generic corporate background music

---

# 4. Music Mood

The initial music collection should represent different moods within the same world.

Suggested directions:

### Track 1 — Warm Sunset

Soft, warm and peaceful.

### Track 2 — Evening

Slightly deeper and more atmospheric.

### Track 3 — Dreamy

Soft synths, pads or subtle melodic elements.

### Track 4 — Chill

Minimal rhythm with a relaxed feel.

### Track 5 — Night

Calmer, deeper and more ambient.

The final tracks will be selected later.

---

# 5. Music Selection

Music should be randomly selected for a new run/session.

The selected track should remain consistent during that run unless a deliberate transition system is introduced.

Avoid restarting the music every time a block is placed.

Music should loop smoothly.

---

# 6. Music Folder

All music files should be placed in one dedicated folder.

Recommended:

```text id="z6s0fe"
public/
└── assets/
    └── music/
        ├── music1.*
        ├── music2.*
        ├── music3.*
        ├── music4.*
        └── music5.*
```

The implementation must clearly tell the developer:

* Supported file format
* Exact filename
* Exact folder location

For example:

```text id="g8m1yl"
music1.mp3
music2.mp3
music3.mp3
music4.mp3
music5.mp3
```

The system should be easy to extend later.

If a sixth track is added:

```text id="a5q3ry"
music6.mp3
```

the implementation should require minimal or no code changes.

---

# 7. Music Volume

Music should remain in the background.

It should never overpower:

* Gameplay sounds
* Perfect sounds
* Streak sounds
* Milestone sounds

Volume should be normalized between tracks so that switching tracks does not cause a noticeable volume jump.

---

# 8. Gameplay Sound Effects

STACK should use subtle sound effects for important actions.

Core SFX:

* Block drop
* Block impact
* Normal placement
* Perfect placement
* Streak progression
* Milestone
* Game Over
* Restart
* Menu interaction

Not every action needs a loud or separate sound.

The overall sound design should remain minimal.

---

# 9. Block Drop Sound

When the player drops a block:

* Play a short sound
* Keep it subtle
* Give the action physical feedback

The sound should make the player feel that the block was actually released.

---

# 10. Block Impact Sound

When the block lands on the tower:

* Play a short impact sound
* Match the physical weight of the block
* Keep the sound clean and satisfying

The impact should not sound aggressive.

---

# 11. Perfect Sound

A Perfect placement should have a distinct sound.

The Perfect sound should feel:

* Clean
* Pleasant
* Slightly rewarding
* More satisfying than a normal placement

It should immediately communicate:

**"That was accurate."**

---

# 12. Perfect Streak Audio

This is one of the signature audio features of STACK.

The streak audio should evolve as the player continues making Perfect placements.

The inspiration is similar to the feeling of a competitive game's escalating streak/achievement audio—for example, how a musical cue can become slightly richer as an exceptional streak continues.

However, STACK should remain subtle and relaxing.

---

# 13. Continuous Streak System

The streak system must NOT stop at 5 or 10.

It should support:

```text id="7s3kbc"
Perfect ×1
Perfect ×2
Perfect ×3
...
Perfect ×10
...
Perfect ×20
...
Perfect ×50
...
Perfect ×100
...
```

There is no fixed maximum streak.

---

# 14. Streak Audio Progression

The audio should gradually evolve.

Conceptual progression:

```text id="kj0z6x"
×1
Soft Perfect sound

×2
Slight variation

×3
Slightly richer

×4
Additional tonal element

×5
Higher/richer variation

×6–10
Gradual musical development

×10+
Subtle layered variations

×20+
Further variation

×50+
Continued evolution
```

The exact implementation can use a combination of:

* Different samples
* Pitch variations
* Harmonic layers
* Timing variations
* Instrument layers

Do not create hundreds of separate audio files.

---

# 15. Streak Audio Limits

Even at extremely high streaks:

* Do not continuously increase volume.
* Do not make the sound harsh.
* Do not make the sound excessively high-pitched.
* Do not create chaotic layering.
* Do not make every Perfect sound dramatically different.

The evolution should eventually become subtle.

The player should feel that the streak is building musically without becoming annoyed.

---

# 16. Streak Break

When the player makes a non-Perfect placement:

* The Perfect streak resets.
* The evolving streak audio progression resets.
* The next Perfect starts the progression again.

Do not play a harsh failure sound for a normal placement.

The game should remain encouraging.

---

# 17. Streak Audio and Scoring

Audio progression and scoring progression are related to the same Perfect streak but are separate systems.

For example:

```text id="h7i5e4"
Perfect ×10
→ +5 streak bonus
→ Streak audio progression

Perfect ×20
→ +10 streak bonus
→ Further audio progression

Perfect ×30
→ +15 streak bonus
→ Further audio progression
```

Neither system should interfere with the other.

---

# 18. Milestone Sounds

Major milestones should have a subtle audio cue.

Initial milestones:

```text id="fr3d9y"
100
250
500
750
1000
```

The sound should feel like a small achievement rather than a major victory announcement.

Avoid:

* Loud fanfares
* Long musical interruptions
* Aggressive arcade sounds

A short, warm tonal cue is preferred.

---

# 19. Game Over Sound

Game Over should have a short, calm sound.

It should communicate:

**The run has ended.**

It should not feel punishing.

The Game Over music/SFX should transition smoothly into the Game Over screen.

---

# 20. Restart Sound

Restarting should have a subtle confirmation sound.

The player should immediately feel that a new run has started.

Avoid long startup sounds.

---

# 21. UI Sounds

Optional UI sounds can be used for:

* Play
* Mode selection
* Pause
* Resume
* Mute
* Navigation

These sounds should be extremely subtle.

The game should still feel natural with them disabled.

---

# 22. Relaxed Mode Audio

Relaxed Mode should prioritize atmosphere.

Audio should feel:

* Slow
* Warm
* Peaceful
* Spacious

Music should be the primary audio element.

Sound effects should remain soft.

Streak audio should feel musical rather than competitive.

---

# 23. Competitive Mode Audio

Competitive Mode should retain the same overall sound identity.

However:

* Perfect sounds can feel slightly more energetic.
* Streak progression should feel more rewarding.
* Milestones can have slightly stronger feedback.
* Audio should still remain controlled.

Do not turn Competitive Mode into an aggressive arcade soundtrack.

---

# 24. Mute

A mute control must always be available during gameplay.

Location:

**Top-right**

The Mute control should appear underneath or near the Pause control.

Desktop shortcut:

`M`

Mute should disable game audio.

Unmuting should restore the previous audio levels.

---

# 25. Persistent Mute Preference

The player's mute preference should be remembered locally.

If the player mutes STACK and refreshes the page:

**STACK should remain muted.**

The preference should persist until the player changes it.

---

# 26. Pause Audio Behaviour

When the game is paused:

* Block movement stops.
* Gameplay sounds stop.
* Music should pause or reduce appropriately.
* No gameplay audio should continue unexpectedly.

When the game resumes:

* Gameplay continues.
* Music resumes smoothly.
* Audio should not restart unnecessarily.

---

# 27. Mobile Audio

Mobile browsers may prevent automatic audio playback before user interaction.

STACK must handle this correctly.

Audio should initialize after an appropriate user interaction such as:

* Pressing Play
* Selecting a mode
* Tapping the game

The game should never crash if audio playback is blocked.

---

# 28. Audio Loading

Audio should be loaded efficiently.

Avoid loading every large music file into memory unnecessarily if it negatively affects mobile performance.

Gameplay SFX should be ready quickly.

Music should begin without noticeable delays where possible.

---

# 29. Audio Transitions

Music should loop smoothly.

If music changes between environments or sessions:

* Avoid abrupt cuts where possible.
* Use short fades.
* Avoid noticeable silence.
* Do not interrupt gameplay.

The transition should feel natural.

---

# 30. Audio Architecture

Use a centralized Audio Manager.

Conceptually:

```text id="q0j3gs"
AudioManager
│
├── Music
│   ├── Play
│   ├── Pause
│   ├── Resume
│   ├── Stop
│   └── Change Track
│
├── SFX
│   ├── Drop
│   ├── Impact
│   ├── Perfect
│   ├── Streak
│   ├── Milestone
│   └── Game Over
│
└── Controls
    ├── Mute
    └── Unmute
```

Audio calls should not be scattered throughout unrelated components.

---

# 31. Audio Asset Organization

Recommended:

```text id="i6j8o9"
public/
└── assets/
    ├── music/
    │   ├── music1.mp3
    │   ├── music2.mp3
    │   ├── music3.mp3
    │   ├── music4.mp3
    │   └── music5.mp3
    │
    └── sounds/
        ├── drop
        ├── impact
        ├── perfect
        ├── streak
        ├── milestone
        └── game-over
```

Exact formats and filenames should be documented during implementation.

---

# 32. Audio Performance

Audio must not negatively affect gameplay performance.

The system should:

* Reuse sound resources where possible
* Avoid creating excessive audio objects
* Stop unnecessary sounds
* Clean up resources appropriately
* Avoid overlapping hundreds of sounds during long streaks

Even a 500+ Perfect streak should remain lightweight.

---

# 33. Audio Philosophy

STACK should follow this principle:

> **The sound should make the player feel the stack rather than tell the player what happened.**

Normal placement should feel satisfying.

Perfect placement should feel special.

A long streak should feel increasingly rewarding.

A milestone should feel meaningful.

Game Over should feel calm.

The music should make the player want to stay.

---

# 34. Final Audio Identity

STACK's audio identity should combine:

**Chill Ambient Music + Soft Physical SFX + Evolving Musical Streaks**

The overall experience should feel like:

> Playing a simple stacking game while listening to a relaxing track at sunset, with the sound subtly becoming more rewarding as your perfect streak grows.
