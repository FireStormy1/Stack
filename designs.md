# STACK — Design Specification

## 1. Design Vision

STACK is a minimal, polished stacking game inspired by the visual simplicity and satisfying gameplay presentation of **Stack by Ketchapp**, while developing its own visual identity.

The overall aesthetic should feel:

* Minimal
* Calm
* Premium
* Retro-inspired
* Warm
* Atmospheric
* Satisfying
* Clean
* Modern without looking like a generic modern web app

The game should feel like a carefully designed mobile arcade game rather than a typical AI-generated/vibecoded website.

### Core visual direction

**Sunset / Terracotta + Minimal Retro**

The visual identity should combine:

* Warm sunset environments
* Terracotta-inspired colours
* Muted pastel accents
* Minimal retro typography
* Simple geometric UI
* Subtle 3D depth
* Generous negative space
* Smooth transitions

Avoid excessive visual complexity.

---

# 2. Design Reference

The gameplay presentation should take strong inspiration from **Stack by Ketchapp**.

Reference characteristics:

* A vertically growing tower
* Moving rectangular blocks
* Blocks visually having depth rather than appearing completely flat
* Clean geometric shapes
* Minimal HUD
* Large focus on the tower
* Simple interaction
* Satisfying placement animations
* Camera following the growing tower
* Strong use of the environment to create atmosphere

STACK must NOT be a direct visual copy.

The game should use the gameplay language of Stack while establishing its own:

* Sunset/Terracotta colour system
* Background environments
* Typography
* UI layout
* Sound identity
* Developer branding
* Relaxed mode
* Competitive mode

---

# 3. Overall Composition

The game screen should prioritize the tower.

The visual hierarchy should be:

1. Tower / moving block
2. Score
3. Environment
4. Best score
5. Pause / mute controls
6. Secondary information

Nothing should compete heavily with the tower.

Avoid dashboard-like layouts.

Avoid large cards around every piece of information.

Avoid unnecessary UI elements.

---

# 4. Colour Theme

## Primary Theme

The primary visual theme is:

**Sunset / Terracotta**

The palette should feel warm and slightly faded rather than highly saturated.

Potential colour families:

* Terracotta
* Burnt orange
* Dusty peach
* Warm cream
* Muted yellow
* Warm brown
* Soft coral
* Dusty rose
* Sage accents where appropriate
* Deep charcoal

The exact hex palette should be finalized during implementation after visual testing.

## Important restrictions

Do NOT use:

* Neon colours
* Neon purple
* Cyberpunk colours
* Bright electric blue
* Excessive gradients
* Highly saturated rainbow palettes
* Generic purple/blue AI-generated website aesthetics

The design should remain warm and cohesive.

---

# 5. Backgrounds

STACK will contain **10 unique atmospheric backgrounds**.

The backgrounds should belong to the same visual world but represent different environments and moods.

Possible environments:

1. Warm sunset
2. Terracotta desert
3. Sunset hills
4. Ocean sunset
5. Evening clouds
6. Desert dusk
7. Mountain sunset
8. Soft evening atmosphere
9. Twilight landscape
10. Deep dusk/night

Backgrounds should range naturally from:

**Sunset → Evening → Dusk → Night**

The transition should remain subtle.

## Background requirements

Every background must:

* Keep the tower clearly visible
* Have generous negative space
* Avoid busy details behind the tower
* Match the Terracotta/Sunset theme
* Work on mobile
* Work on desktop
* Preserve the game's visual hierarchy
* Avoid text and UI elements
* Avoid looking like a website hero image

Background assets must be prepared appropriately for both mobile and desktop aspect ratios.

The system should be able to randomly select backgrounds for different runs.

---

# 6. Tower / Block Design

The blocks are the primary visual object.

They should resemble the physical blocks seen in minimalist stacking games such as Stack.

Blocks should NOT look like flat HTML cards.

They should have subtle visual depth through:

* Top surfaces
* Side surfaces
* Soft shadows
* Slight tonal differences
* Clean geometric edges

The 3D appearance should remain subtle.

Do not make the blocks look like realistic 3D objects.

They should feel like simple physical arcade pieces.

---

# 7. Block Colours

Block colours should be selected based on the currently selected environment.

The block should complement the background rather than simply use the same colour.

For example:

* Warm sunset → cream / terracotta / muted orange blocks
* Desert → warm cream / ochre / brown
* Ocean sunset → cream / dusty coral / muted orange
* Twilight → warm cream / dusty peach / muted terracotta
* Night → slightly brighter warm blocks for contrast

The stack should never become visually lost against the background.

The colour selection should feel intentional.

---

# 8. Typography

Typography should use a **minimal retro-inspired font system**.

The font should feel:

* Clean
* Slightly nostalgic
* Geometric
* Easy to read
* Modern enough for mobile
* Not overly futuristic

Avoid:

* Generic SaaS fonts
* Overly futuristic fonts
* Gaming fonts with aggressive styling
* Excessively decorative fonts

Typography should be used sparingly.

The score should be one of the most visually important text elements.

---

# 9. Score Design

The score should appear prominently but minimally.

Example:

```text
042
```

or

```text
42
```

The final formatting will be determined during visual implementation.

The score should:

* Stay near the visual centre
* Use minimal typography
* Avoid cards
* Avoid large decorative containers
* Have subtle transitions when changing

Score changes should feel smooth and satisfying.

---

# 10. Best Score Design

The highest score should appear on the right side of the game screen.

It should use a small **diamond-inspired visual element**.

Concept:

```text
◇
BEST
428
```

or a compact diamond containing/preceding the score.

The diamond should visually match:

* Pause button
* Mute button
* Other interface elements

All small UI elements should feel like parts of the same design system.

---

# 11. Pause and Mute

The top-right area should contain:

**Pause**

Under it:

**Mute**

The controls should be compact and unobtrusive.

They should use the same visual language as the Best Score diamond element.

Do not use large rectangular buttons.

Do not create a large control panel.

The controls should remain comfortable to tap on mobile.

---

# 12. Navigation

The website should take inspiration from the clean structure used in the previous Tetris project.

The main navigation should appear at the top on the home page.

Primary sections:

* Play
* About the Game
* Rules
* Developer Profile

The navigation should be minimal and clean.

The actual gameplay screen should remove unnecessary website navigation so that the game receives maximum visual space.

---

# 13. Home Screen

The home screen should be extremely simple.

Concept:

```text
                 STACK

          Build higher.

             [ PLAY ]

     About     Rules     Developer
```

The final design should remain more refined than this conceptual representation.

The home screen should immediately communicate:

* Game name
* Purpose
* Play button
* Navigation

Do not add unnecessary menus.

---

# 14. Mode Selection

After selecting Play, the player should choose between:

### RELAXED

A slow, atmospheric experience focused on:

* Music
* Backgrounds
* Calm gameplay
* Enjoyment
* Low-pressure stacking

### COMPETITIVE

A progressively challenging experience focused on:

* Precision
* Speed
* Streaks
* High scores
* Milestones

The mode selection should use the same visual system as the rest of the game.

Do not create a complicated difficulty dashboard.

---

# 15. Streak Visuals

Perfect streaks should use subtle visual feedback.

Example:

```text
PERFECT × 12
```

The feedback should:

* Appear briefly
* Scale/fade smoothly
* Use minimal typography
* Avoid huge arcade text
* Avoid excessive particles
* Avoid screen-filling effects

The higher streaks become, the feedback can become slightly more rewarding while remaining restrained.

Audio should provide a larger part of the streak progression than visual effects.

---

# 16. Milestones

Major milestones should receive subtle recognition.

Initial milestones:

* 100
* 250
* 500
* 750
* 1000
* Continuing higher

Milestone feedback should feel rewarding but minimal.

Avoid:

* Confetti explosions
* Huge banners
* Flashing screens
* Excessive particles

The tower itself should remain the main achievement.

---

# 17. Game Over Presentation

When the game ends:

1. Gameplay stops.
2. The camera smoothly zooms/reframes outward.
3. The complete tower becomes visible.
4. The final score is displayed.
5. Best score is displayed.
6. Relevant achievement/milestone information is shown.
7. Screenshot/share functionality is provided.
8. Restart is offered.

The complete tower should become the centrepiece of the Game Over screen.

Concept:

```text
             GAME OVER

              428

          BEST 512

        [ SHARE ]

       [ TRY AGAIN ]
```

The exact UI should remain minimal.

---

# 18. Screenshot / Share Design

The Game Over screen should allow the player to capture/share their completed tower.

The generated result should feel like a small achievement card without turning into a conventional social-media card.

The tower and score should remain the focus.

The share image should preserve the current:

* Background
* Tower
* Score
* Best score
* Relevant STACK branding

---

# 19. Responsive Design

STACK is **mobile-first**.

The mobile experience is the primary design target.

The desktop version should feel like the same game expanded into a larger viewport.

Do NOT create separate visual identities for mobile and desktop.

## Mobile

Prioritize:

* Tower visibility
* Moving block visibility
* Score
* Pause
* Mute
* Best score
* Touch interaction
* Safe areas
* No scrolling

## Desktop

Provide:

* More breathing room
* Larger visual environment
* Same central tower
* Same HUD hierarchy
* Same typography
* Same controls

Backgrounds must work correctly on both mobile and desktop resolutions.

---

# 20. Animation Style

Animations should be:

* Smooth
* Short
* Physical
* Satisfying
* Subtle
* Consistent

Important animation characteristics:

* Moving block should feel fluid
* Dropping should have satisfying acceleration
* Collision should feel physical
* Cut-off pieces should fall naturally
* Stack should settle smoothly
* Camera should follow the tower smoothly
* Score should transition cleanly
* Perfect feedback should be subtle
* Game Over should transition smoothly
* Restart should feel immediate but polished

Avoid excessive animation.

Avoid animations simply because they are possible.

---

# 21. Depth and Shadows

Depth should primarily come from:

* Block side faces
* Soft shadows
* Slight tonal differences
* Environmental contrast

Avoid heavy drop shadows.

Avoid exaggerated 3D lighting.

Avoid glossy materials.

The goal is:

**simple physical depth, not realistic 3D graphics.**

---

# 22. Visual Consistency

The following elements must share a unified design language:

* Best Score diamond
* Pause
* Mute
* Score
* Mode selection
* Buttons
* Navigation
* Game Over screen
* Milestone feedback
* Developer profile

They should feel like they belong to one carefully designed game.

No component should look like it came from a different UI library.

---

# 23. Developer Profile

The game will contain a Developer Profile section.

Developer:

**Saswat Dixit**

Social/contact links:

* LinkedIn: https://www.linkedin.com/in/saswatdixit/
* GitHub: https://github.com/FireStormy1
* Email: [saswatdixit01@gmail.com](mailto:saswatdixit01@gmail.com)
* LeetCode: https://leetcode.com/u/FireStormy/

A developer photograph will be provided separately and should be incorporated into the Developer section when available.

The Developer section should use the same minimalist retro/sunset visual language as the rest of STACK.

---

# 24. What STACK Should NOT Look Like

STACK must NOT look like:

* A generic AI/vibecoded website
* A SaaS dashboard
* A neon gaming website
* A cyberpunk game
* A purple gradient website
* A glassmorphism UI
* A children's colourful game
* A Bootstrap-style interface
* An overly futuristic interface
* A cluttered arcade dashboard
* A realistic 3D game
* A particle-heavy game

The visual design should remain restrained.

---

# 25. Final Visual Identity

The intended identity of STACK is:

**Minimal Retro + Sunset + Terracotta + Calm Arcade**

The final experience should feel like:

> A small premium digital arcade game discovered on a phone during sunset.

It should be visually interesting enough to remember, but simple enough that the player immediately understands where to look and what to do.

The tower remains the hero.

Everything else supports it.
