# Part 4: Inputs & Technologies Correlation Matrix (21 Items)

This document provides an exhaustive, 3-layer architectural correlation crossing **Apple's 7 Physical/Digital Input guidelines and 14 Platform Technology guidelines (including Liquid Glass)** with **Neobrutalism.com** and **BoldKit.dev**.

---

## Layer 2: Macro-Thematic Group Analysis

### 1. Hardware Integration: Native Apple SDKs vs Web Platform Standards
Apple platforms offer tight, low-latency integration with hardware peripherals and proprietary system daemons (Apple Pencil hover, Core Motion gyroscopes, StoreKit 2 paywalls, SiriKit intents). In modern Web / React architectures, these map directly to W3C web standards or graceful software fallbacks:
- Apple Pencil hover -> W3C Pointer Events API (`pointermove` pressure, tilt, and twist).
- Core Motion -> `DeviceOrientationEvent` and `DeviceMotionEvent` (reactively driving BoldKit's `GravityWells` or `DotWave` canvas shaders).
- StoreKit -> Web Stripe / LemonSqueezy payment checkouts housed in BoldKit `<PricingSection>` cards.
- Apple Pay -> W3C Payment Request API or Apple Pay JS (strictly preserving Apple's official vector button mark).

### 2. The Liquid Glass Material vs Brutalist Honest Surfaces
Apple's **Liquid Glass** represents the apex of skeuomorphic digital material simulation: dual-layer Gaussian blur, dynamic surface refraction, and specular highlights that respond to device tilt.
**Brutalist Design Philosophy** is fundamentally anti-materialist. It views simulated glass, artificial blurs, and pseudo-3D skeuomorphism as unnecessary digital ornament that obscures function. Brutalism champions **honest ink on flat paper**: 100% opaque fills, tactile 3px solid strokes, and honest hard-drop shadows with zero blur radius.

---

## Layer 3: 21 Individual Tripartite Technical Cards

### Subcategory A: Physical & Digital Inputs (7 items)

#### 4.A1 `apple-pencil-and-scribble.md` — Apple Pencil And Scribble
> **Apple Guideline Summary**: Apple Pencil helps make drawing, handwriting, and marking effortless and natural, in addition to performing well as a pointer and UI interaction tool.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/apple-pencil-and-scribble.md`](../../apple_design/skill/references/hig/apple-pencil-and-scribble.md) |
| **Neobrutalism File(s)** | `canvas-draw` |
| **BoldKit File(s)** | `canvas-effects (pointer)` |
| **Common Ground** | Stylus precision and handwriting input |
| **Particularities & Divergences** | Apple: PencilKit with hover and tilt; BoldKit: mouse ripple and canvas pointer tracking |

**Web / React Implementation Recipe**:
- Implement using standard Web APIs paired with brutalist feedback (e.g. `<Kbd>` shortcut badges or `.bk-interactive` pointer active states).

---

#### 4.A2 `game-controls.md` — Game Controls
> **Apple Guideline Summary**: Precise, intuitive game controls enhance gameplay and can increase a player’s immersion in the game.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/game-controls.md`](../../apple_design/skill/references/hig/game-controls.md) |
| **Neobrutalism File(s)** | `kbd.tsx` |
| **BoldKit File(s)** | `ascii-shapes.tsx` |
| **Common Ground** | Gamepad and hardware button inputs |
| **Particularities & Divergences** | Apple: Game Controller framework; Brutalist: WASD keyboard navigation bindings |

**Web / React Implementation Recipe**:
- Implement using standard Web APIs paired with brutalist feedback (e.g. `<Kbd>` shortcut badges or `.bk-interactive` pointer active states).

---

#### 4.A3 `gestures.md` — Gestures
> **Apple Guideline Summary**: A gesture is a physical motion that a person uses to directly affect an object in an app or game on their device.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/gestures.md`](../../apple_design/skill/references/hig/gestures.md) |
| **Neobrutalism File(s)** | `carousel.tsx (swipe)` |
| **BoldKit File(s)** | `carousel.tsx (touch swipe)` |
| **Common Ground** | Direct touch manipulation |
| **Particularities & Divergences** | Apple: pinch, pan, rotation recognizers; Web: Embla touch drag carousel |

**Web / React Implementation Recipe**:
- Implement using standard Web APIs paired with brutalist feedback (e.g. `<Kbd>` shortcut badges or `.bk-interactive` pointer active states).

---

#### 4.A4 `gyro-and-accelerometer.md` — Gyro And Accelerometer
> **Apple Guideline Summary**: On-device gyroscopes and accelerometers can supply data about a device’s movement in the physical world.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/gyro-and-accelerometer.md`](../../apple_design/skill/references/hig/gyro-and-accelerometer.md) |
| **Neobrutalism File(s)** | `motion primitives` |
| **BoldKit File(s)** | `canvas-effects (orientation)` |
| **Common Ground** | Device motion and tilt sensors |
| **Particularities & Divergences** | Apple: Core Motion; BoldKit: GravityWells and DotWave reacting to motion |

**Web / React Implementation Recipe**:
- Implement using standard Web APIs paired with brutalist feedback (e.g. `<Kbd>` shortcut badges or `.bk-interactive` pointer active states).

---

#### 4.A5 `keyboards.md` — Keyboards
> **Apple Guideline Summary**: A physical keyboard can be an essential input device for entering text, playing games, controlling apps, and more.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/keyboards.md`](../../apple_design/skill/references/hig/keyboards.md) |
| **Neobrutalism File(s)** | `kbd.tsx / command.tsx` |
| **BoldKit File(s)** | `kbd.tsx / command.tsx` |
| **Common Ground** | Hardware keyboard interaction |
| **Particularities & Divergences** | Apple: full keyboard navigation; Brutalist: explicit focus-visible rings and kbd shortcuts |

**Web / React Implementation Recipe**:
- Implement using standard Web APIs paired with brutalist feedback (e.g. `<Kbd>` shortcut badges or `.bk-interactive` pointer active states).

---

#### 4.A6 `pointing-devices.md` — Pointing Devices
> **Apple Guideline Summary**: People can use a pointing device like a trackpad or mouse to navigate the interface and initiate actions.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/pointing-devices.md`](../../apple_design/skill/references/hig/pointing-devices.md) |
| **Neobrutalism File(s)** | `hover-card.tsx` |
| **BoldKit File(s)** | `hover-card.tsx / bk-interactive` |
| **Common Ground** | Mouse cursor and trackpad ergonomics |
| **Particularities & Divergences** | Apple: iPadOS adaptive cursor; BoldKit: .bk-interactive hover snap translations |

**Web / React Implementation Recipe**:
- Implement using standard Web APIs paired with brutalist feedback (e.g. `<Kbd>` shortcut badges or `.bk-interactive` pointer active states).

---

#### 4.A7 `voiceover.md` — Voiceover
> **Apple Guideline Summary**: VoiceOver is a screen reader that lets people experience your app’s interface without needing to see the screen.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/voiceover.md`](../../apple_design/skill/references/hig/voiceover.md) |
| **Neobrutalism File(s)** | `accessible ARIA roles` |
| **BoldKit File(s)** | `axe-core tested primitives` |
| **Common Ground** | Screen reader assistive navigation |
| **Particularities & Divergences** | Apple: VoiceOver rotor; Brutalist: semantic HTML with accessible labels and ARIA live regions |

**Web / React Implementation Recipe**:
- Implement using standard Web APIs paired with brutalist feedback (e.g. `<Kbd>` shortcut badges or `.bk-interactive` pointer active states).

---

### Subcategory B: Platform Technologies & Materials (14 items)

#### 4.B1 `airplay.md` — Airplay
> **Apple Guideline Summary**: AirPlay lets people stream media content wirelessly from iOS, iPadOS, macOS, and tvOS devices to Apple TV, HomePod, and TVs and speakers that support AirPlay.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/airplay.md`](../../apple_design/skill/references/hig/airplay.md) |
| **Neobrutalism File(s)** | `media streaming API` |
| **BoldKit File(s)** | `media streaming API` |
| **Common Ground** | Wireless AV beaming |
| **Particularities & Divergences** | Apple: AirPlay route picker; Web: Google Cast or WebRTC fallback |

**Web / React Implementation Recipe**:
- Connect web APIs to BoldKit blocks and components with high-contrast status feedback.

---

#### 4.B2 `apple-pay.md` — Apple Pay
> **Apple Guideline Summary**: Apple Pay is a secure, easy way to make payments for physical goods and services, donations, and subscriptions in apps and in any browser.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/apple-pay.md`](../../apple_design/skill/references/hig/apple-pay.md) |
| **Neobrutalism File(s)** | `payment trigger button` |
| **BoldKit File(s)** | `invoice.tsx / pricing-section.tsx` |
| **Common Ground** | One-touch secure checkout |
| **Particularities & Divergences** | Apple: strict brand button specs; Web: Apple Pay JS or Stripe Elements checkout button |

**Web / React Implementation Recipe**:
- Never hand-draw Apple Pay marks in CSS. Use the official Apple Pay JS button SDK (`<apple-pay-button>`) and embed it in a brutalist checkout container.

---

#### 4.B3 `apple-in-app-purchase.md` — Apple In App Purchase
> **Apple Guideline Summary**: People can use Apple In-App Purchase to pay for digital goods and services, like premium content and subscriptions, securely within your app.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/apple-in-app-purchase.md`](../../apple_design/skill/references/hig/apple-in-app-purchase.md) |
| **Neobrutalism File(s)** | `pricing table` |
| **BoldKit File(s)** | `pricing-section.tsx` |
| **Common Ground** | Digital subscriptions and unlocks |
| **Particularities & Divergences** | Apple: StoreKit 2 paywalls; BoldKit: tiered pricing block with monthly/annual switch |

**Web / React Implementation Recipe**:
- Connect web APIs to BoldKit blocks and components with high-contrast status feedback.

---

#### 4.B4 `app-clips.md` — App Clips
> **Apple Guideline Summary**: An App Clip is a lightweight version of your app or game that provides an on-the-go or demo experience that’s instantly available.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/app-clips.md`](../../apple_design/skill/references/hig/app-clips.md) |
| **Neobrutalism File(s)** | `pwa / web manifest` |
| **BoldKit File(s)** | `manifest.webmanifest (PWA)` |
| **Common Ground** | Ephemeral lightweight app experience |
| **Particularities & Divergences** | Apple: App Clip code NFC/QR; Web: Progressive Web App with instant service worker |

**Web / React Implementation Recipe**:
- Connect web APIs to BoldKit blocks and components with high-contrast status feedback.

---

#### 4.B5 `augmented-reality.md` — Augmented Reality
> **Apple Guideline Summary**: Augmented reality (or AR) lets you deliver immersive, engaging experiences that seamlessly blend virtual objects with the real world.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/augmented-reality.md`](../../apple_design/skill/references/hig/augmented-reality.md) |
| **Neobrutalism File(s)** | `webxr fallback` |
| **BoldKit File(s)** | `canvas-effects (3D shaders)` |
| **Common Ground** | Spatial digital overlays on camera view |
| **Particularities & Divergences** | Apple: ARKit with RealityKit; BoldKit: 3D ASCII shapes and perspective shaders |

**Web / React Implementation Recipe**:
- Connect web APIs to BoldKit blocks and components with high-contrast status feedback.

---

#### 4.B6 `generative-ai.md` — Generative Ai
> **Apple Guideline Summary**: Generative AI empowers you to enhance your app or game with dynamic content and offer intelligent features that unlock new levels of creativity, connection, and productivity.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/generative-ai.md`](../../apple_design/skill/references/hig/generative-ai.md) |
| **Neobrutalism File(s)** | `bubble.tsx / message.tsx` |
| **BoldKit File(s)** | `mauthor.tsx (AI Chat Suite)` |
| **Common Ground** | LLM prompting, streaming, and generation UX |
| **Particularities & Divergences** | Apple: Apple Intelligence writing tools; Brutalist: dedicated streaming chat scroller and message cards |

**Web / React Implementation Recipe**:
- Connect web APIs to BoldKit blocks and components with high-contrast status feedback.

---

#### 4.B7 `icloud.md` — Icloud
> **Apple Guideline Summary**: iCloud is a service that lets people seamlessly access the content they care about — photos, videos, documents, and more — from any device, without performing explicit synchronization.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/icloud.md`](../../apple_design/skill/references/hig/icloud.md) |
| **Neobrutalism File(s)** | `local storage / cloud sync` |
| **BoldKit File(s)** | `cloud storage adapter` |
| **Common Ground** | Multi-device state synchronization |
| **Particularities & Divergences** | Apple: CloudKit automatic sync; Web: IndexedDB with Supabase / Firebase sync |

**Web / React Implementation Recipe**:
- Connect web APIs to BoldKit blocks and components with high-contrast status feedback.

---

#### 4.B8 `machine-learning.md` — Machine Learning
> **Apple Guideline Summary**: Machine learning enables apps and games to learn from data and usage patterns, letting you improve existing experiences and create engaging new ones.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/machine-learning.md`](../../apple_design/skill/references/hig/machine-learning.md) |
| **Neobrutalism File(s)** | `smart combobox` |
| **BoldKit File(s)** | `smart command palette` |
| **Common Ground** | On-device intelligent suggestions |
| **Particularities & Divergences** | Apple: Core ML; Brutalist: client-side fast search filtering in cmdk |

**Web / React Implementation Recipe**:
- Connect web APIs to BoldKit blocks and components with high-contrast status feedback.

---

#### 4.B9 `maps.md` — Maps
> **Apple Guideline Summary**: A map displays outdoor or indoor geographical data in your app or on your website.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/maps.md`](../../apple_design/skill/references/hig/maps.md) |
| **Neobrutalism File(s)** | `map container` |
| **BoldKit File(s)** | `map container` |
| **Common Ground** | Geographic navigation and pins |
| **Particularities & Divergences** | Apple: MapKit; Web: Leaflet / Mapbox with brutalist high-contrast map tiles |

**Web / React Implementation Recipe**:
- Connect web APIs to BoldKit blocks and components with high-contrast status feedback.

---

#### 4.B10 `nfc.md` — Nfc
> **Apple Guideline Summary**: Near-field communication (NFC) allows devices within a few centimeters of each other to exchange information wirelessly.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/nfc.md`](../../apple_design/skill/references/hig/nfc.md) |
| **Neobrutalism File(s)** | `web nfc API` |
| **BoldKit File(s)** | `web nfc API` |
| **Common Ground** | Near-field radio contact triggers |
| **Particularities & Divergences** | Apple: Core NFC; Web: Web NFC API or QR code alternative |

**Web / React Implementation Recipe**:
- Connect web APIs to BoldKit blocks and components with high-contrast status feedback.

---

#### 4.B11 `sign-in-with-apple.md` — Sign In With Apple
> **Apple Guideline Summary**: Sign in with Apple provides a fast, private way to sign into apps and websites, giving people a consistent experience they can trust and the convenience of not having to remember multiple accounts and passwords.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/sign-in-with-apple.md`](../../apple_design/skill/references/hig/sign-in-with-apple.md) |
| **Neobrutalism File(s)** | `auth button` |
| **BoldKit File(s)** | `auth-forms.tsx (OAuth)` |
| **Common Ground** | Privacy-preserving one-touch sign in |
| **Particularities & Divergences** | Apple: mandatory for apps offering social logins; BoldKit: OAuth button in auth-forms block |

**Web / React Implementation Recipe**:
- Connect web APIs to BoldKit blocks and components with high-contrast status feedback.

---

#### 4.B12 `siri.md` — Siri
> **Apple Guideline Summary**: People use Siri to help them with the things they need to find, know, or do every day.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/siri.md`](../../apple_design/skill/references/hig/siri.md) |
| **Neobrutalism File(s)** | `voice search / command` |
| **BoldKit File(s)** | `command.tsx (omni-search)` |
| **Common Ground** | Voice assistant queries and commands |
| **Particularities & Divergences** | Apple: SiriKit shortcuts; Brutalist: command palette as instant omni-bar |

**Web / React Implementation Recipe**:
- Connect web APIs to BoldKit blocks and components with high-contrast status feedback.

---

#### 4.B13 `widgets.md` — Widgets
> **Apple Guideline Summary**: A widget provides quick access to essential information and focused interactions from your app or game in additional contexts.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/widgets.md`](../../apple_design/skill/references/hig/widgets.md) |
| **Neobrutalism File(s)** | `card.tsx` |
| **BoldKit File(s)** | `statcard.tsx / bento-grid.tsx` |
| **Common Ground** | Glanceable home screen widgets |
| **Particularities & Divergences** | Apple: rounded widget families (small, medium, large); BoldKit: statcard and bento cells |

**Web / React Implementation Recipe**:
- Connect web APIs to BoldKit blocks and components with high-contrast status feedback.

---

#### 4.B14 `liquid-glass.md` — Liquid Glass
> **Apple Guideline Summary**: Liquid Glass rules distilled from the materials, color, layout, and branding pages, with implementation notes for Flutter, Tauri, Electron, and React Native

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/liquid-glass.md`](../../apple_design/skill/references/hig/liquid-glass.md) |
| **Neobrutalism File(s)** | `none (antipattern in flat brutalism)` |
| **BoldKit File(s)** | `none / CRT shader alternative` |
| **Common Ground** | Translucent glassmorphism with specular border |
| **Particularities & Divergences** | Apple: Liquid Glass material; Brutalism: explicitly rejects faux glass in favor of tactile solid paper surfaces |

**Web / React Implementation Recipe**:
- If an Apple project requires Liquid Glass, implement backdrop blur (`backdrop-blur-md bg-white/70 border border-white/20`). In pure brutalist mode, replace glass with solid opaque `bg-background border-3 border-foreground shadow-hard`.

---
