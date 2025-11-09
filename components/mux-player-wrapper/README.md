# MuxPlayerWrapper Component

A feature-rich wrapper around `@mux/mux-player-react` that provides viewport-based playback control, scroll optimization, and smooth placeholder transitions for background videos.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Props](#props)
- [Prop Interactions](#prop-interactions)
- [Built-in Features](#built-in-features)
- [Examples](#examples)
- [Performance Considerations](#performance-considerations)

---

## Features

✨ **Viewport-based Playback** - Automatically play/pause videos when they enter/leave viewport  
🎯 **Scroll Optimization** - Smart loading that waits for scroll to stop before playing  
🖼️ **Smooth Transitions** - Animated placeholder fadeout on first play (persists playback state)  
📱 **Mobile-Friendly** - Optimized for iOS autoplay with `playsInline` and `muted`  
🔧 **GSAP ScrollTrigger** - Precise viewport detection with configurable thresholds  
⚡ **useGSAP Hook** - Official React integration with automatic cleanup and React Strict Mode support  
⚡ **Lazy Loading** - Uses `@mux/mux-player-react/lazy` for optimal performance  
🎮 **Full Mux Control** - Passes through all native Mux player props  
🐛 **Debug Logging** - Built-in console logging for development (with markers)

---

## Installation

This component requires the following dependencies:

```bash
npm install @mux/mux-player-react @gsap/react gsap motion
```

---

## Basic Usage

### Simple Background Video (Auto-play)

```tsx
import MuxPlayerWrapper from '@/components/mux-player-wrapper'

export default function VideoSection() {
  return (
    <MuxPlayerWrapper
      playbackId="your-mux-playback-id"
      poster="/path/to/poster.jpg"
    />
  )
}
```

### Viewport-Controlled Video

```tsx
<MuxPlayerWrapper
  playbackId="your-mux-playback-id"
  poster="/path/to/poster.jpg"
  playOnViewport={true}
  viewportThreshold={0.5}
/>
```

### Scroll-Optimized Video

```tsx
<MuxPlayerWrapper
  playbackId="your-mux-playback-id"
  poster="/path/to/poster.jpg"
  playOnViewport={true}
  enableScrollOptimization={true}
  scrollDelay={1000}
  viewportThreshold={0.3}
/>
```

---

## Props

### Custom Props

| Prop                       | Type      | Default | Description                                                                                          |
| -------------------------- | --------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `playOnViewport`           | `boolean` | `false` | Enables viewport-based play/pause control                                                            |
| `viewportThreshold`        | `number`  | `0`     | Percentage of element that must be visible (0-1). `0` = any part visible, `1` = fully visible        |
| `scrollDelay`              | `number`  | `500`   | Delay in milliseconds before playing video after scroll stops (only with `enableScrollOptimization`) |
| `enableScrollOptimization` | `boolean` | `false` | Enables scroll-aware loading with animated placeholder                                               |
| `debug`                    | `boolean` | `false` | Enables debug console logging and ScrollTrigger markers                                              |

### Inherited Mux Player Props

All props from `@mux/mux-player-react` are supported, including:

| Prop            | Type       | Default       | Description                              |
| --------------- | ---------- | ------------- | ---------------------------------------- |
| `playbackId`    | `string`   | **Required**  | Your Mux video playback ID               |
| `poster`        | `string`   | -             | URL to poster image                      |
| `placeholder`   | `string`   | -             | URL to placeholder image (low quality)   |
| `metadata`      | `object`   | -             | Video metadata for analytics             |
| `maxResolution` | `string`   | -             | Maximum video resolution (e.g., "1080p") |
| `minResolution` | `string`   | -             | Minimum video resolution                 |
| `preload`       | `string`   | `'auto'`      | Video preload strategy                   |
| `startTime`     | `number`   | `0`           | Starting timestamp in seconds            |
| `streamType`    | `string`   | `'on-demand'` | Stream type                              |
| `onCanPlay`     | `function` | -             | Callback when video is ready to play     |
| `onPlay`        | `function` | -             | Callback when video starts playing       |
| `onEnded`       | `function` | -             | Callback when video ends                 |
| `onError`       | `function` | -             | Callback on error                        |

---

## Prop Interactions

### 🔴 Props That Disable Other Props

#### 1. `playOnViewport={true}` Affects:

**Disables:**
- Native `autoPlay` - Autoplay is completely disabled when `playOnViewport` is true
  
**Overrides:**
- `preload` - Automatically set to `'metadata'` instead of `'auto'` to reduce initial load

**Why:** When using viewport control, we want manual control over playback, not browser autoplay.

```tsx
// ❌ This won't autoplay on page load
<MuxPlayerWrapper
  playbackId="abc123"
  playOnViewport={true}  // Takes manual control
  // autoPlay is ignored!
/>

// ✅ This will autoplay on page load
<MuxPlayerWrapper
  playbackId="abc123"
  playOnViewport={false}  // Uses native autoplay
/>
```

#### 2. `enableScrollOptimization={false}` Affects:

**Disables:**
- Scroll detection logic
- Animated placeholder overlay
- Delayed play on scroll stop
- `scrollDelay` prop has no effect

**Behavior Change:**
- Video attempts to play immediately when entering viewport (if `playOnViewport={true}`)

```tsx
// ❌ scrollDelay is ignored
<MuxPlayerWrapper
  playbackId="abc123"
  playOnViewport={true}
  enableScrollOptimization={false}
  scrollDelay={2000}  // Has no effect!
/>

// ✅ scrollDelay works
<MuxPlayerWrapper
  playbackId="abc123"
  playOnViewport={true}
  enableScrollOptimization={true}
  scrollDelay={2000}  // Will wait 2s after scroll stops
/>
```

#### 3. `playOnViewport={false}` Affects:

**Disables:**
- Viewport detection (ScrollTrigger)
- `viewportThreshold` has no effect
- Manual play/pause control
- Scroll optimization (even if `enableScrollOptimization={true}`)

**Enables:**
- Native browser autoplay with muted audio
- Uses default or custom `preload` setting

```tsx
// ❌ Viewport threshold is ignored
<MuxPlayerWrapper
  playbackId="abc123"
  playOnViewport={false}
  viewportThreshold={0.5}  // No effect
  enableScrollOptimization={true}  // Also no effect
/>
```

---

## Built-in Features

### 🎬 Automatic Play/Pause Control

When `playOnViewport={true}`:
- ✅ Automatically plays when video enters viewport
- ✅ Automatically pauses when video leaves viewport
- ✅ Resumes playing when scrolling back to video
- ✅ Uses GSAP ScrollTrigger for smooth detection

### 🌊 Scroll Optimization

When `enableScrollOptimization={true}`:
- ✅ Detects when user is actively scrolling
- ✅ Waits for scroll to stop before attempting playback
- ✅ Cancels play attempt if user starts scrolling again
- ✅ Prevents janky video loading during scroll
- ✅ Shows animated placeholder until video plays

### 🖼️ Placeholder Management

- Animated fade-out transition when video starts playing **for the first time**
- Uses `poster` or `placeholder` prop as background
- Only shown during initial scroll delay (before first play)
- Once video has played, placeholder won't reappear when paused
- Video resumes from last playback time when returning to viewport
- Only enabled when `enableScrollOptimization={true}`
- Pointer events disabled to allow video interaction

### 📱 Mobile Optimizations

**Always enabled:**
- `muted` - Required for autoplay on mobile
- `playsInline` - Required for iOS autoplay
- `loop` - Videos loop continuously
- `nohotkeys` - Disables keyboard shortcuts (for background videos)

### 🐛 Development Tools

**In development mode only:**
- Console logging for all video lifecycle events
- ScrollTrigger visual markers
- State change tracking (viewport, scrolling, playing)

---

## Examples

### Example 1: Simple Background Video

**Use case:** Hero section background video that autoplays on page load

```tsx
<MuxPlayerWrapper
  playbackId="abc123"
  poster="/images/hero-poster.jpg"
  className="h-screen w-full object-cover"
/>
```

**Behavior:**
- ✅ Starts playing immediately on page load (muted)
- ✅ Loops continuously
- ✅ Uses `preload='auto'` for fast start

---

### Example 2: Viewport-Controlled Section Video

**Use case:** Multiple videos on page - only play when visible

```tsx
<MuxPlayerWrapper
  playbackId="abc123"
  poster="/images/section-poster.jpg"
  playOnViewport={true}
  viewportThreshold={0.3}
  className="h-[600px] w-full"
/>
```

**Behavior:**
- ✅ Only plays when 30% of video is in viewport
- ✅ Pauses when scrolled out of view
- ✅ Uses `preload='metadata'` to save bandwidth
- ❌ No scroll optimization (may load during scroll)

---

### Example 3: Scroll-Optimized Video

**Use case:** Performance-critical page with multiple videos

```tsx
<MuxPlayerWrapper
  playbackId="abc123"
  poster="/images/poster.jpg"
  placeholder="/images/placeholder-blurred.jpg"
  playOnViewport={true}
  enableScrollOptimization={true}
  scrollDelay={1500}
  viewportThreshold={0.5}
  className="h-[800px] w-full"
/>
```

**Behavior:**
- ✅ Waits for video to be 50% visible
- ✅ Waits an additional 1.5s after scroll stops
- ✅ Shows animated placeholder during initial scroll delay only
- ✅ Once played, video pauses/resumes without showing placeholder again
- ✅ Cancels loading if user scrolls away
- ✅ Prevents multiple videos loading during fast scroll

---

### Example 4: Custom Event Handlers

```tsx
<MuxPlayerWrapper
  playbackId="abc123"
  poster="/images/poster.jpg"
  playOnViewport={true}
  onCanPlay={(e) => {
    console.log('Video is ready to play')
    // Track analytics, show UI, etc.
  }}
  onPlay={(e) => {
    console.log('Video started playing')
    // Hide custom loading spinner
  }}
  onError={(e) => {
    console.error('Video error:', e)
    // Show error message to user
  }}
/>
```

---

### Example 5: With Ref for Programmatic Control

```tsx
import { useRef } from 'react'
import type { MuxPlayerRefAttributes } from '@mux/mux-player-react'

export default function ControlledVideo() {
  const playerRef = useRef<MuxPlayerRefAttributes>(null)

  const handleTogglePlay = () => {
    if (playerRef.current) {
      if (playerRef.current.paused) {
        playerRef.current.play()
      } else {
        playerRef.current.pause()
      }
    }
  }

  return (
    <>
      <MuxPlayerWrapper
        ref={playerRef}
        playbackId="abc123"
        playOnViewport={false}
      />
      <button onClick={handleTogglePlay}>
        Toggle Play/Pause
      </button>
    </>
  )
}
```

---

### Example 6: Debug Mode for Troubleshooting

**Use case:** Debugging a specific video that's not behaving as expected

```tsx
<MuxPlayerWrapper
  playbackId="abc123"
  poster="/images/poster.jpg"
  playOnViewport={true}
  enableScrollOptimization={true}
  scrollDelay={1000}
  viewportThreshold={0.5}
  debug={true}  // Enable detailed console logging
  className="h-[600px] w-full"
/>
```

**Behavior:**
- ✅ Logs all viewport events (enter, leave, scrolling)
- ✅ Logs video loading lifecycle
- ✅ Shows ScrollTrigger markers in browser
- ✅ Logs play/pause attempts and state changes
- ⚠️ Only use for troubleshooting - disable in production

---

## Performance Considerations

### When to Use Each Mode

#### Default Mode (`playOnViewport={false}`)
**Best for:**
- Single hero video
- Above-the-fold content
- High-priority videos

**Pros:** Immediate playback, best user experience  
**Cons:** Loads full video immediately

---

#### Viewport Mode (`playOnViewport={true}`)
**Best for:**
- Multiple videos on page
- Long-scroll pages
- Below-the-fold content

**Pros:** Saves bandwidth, better performance with multiple videos  
**Cons:** Slight delay before play

---

#### Scroll-Optimized Mode (`playOnViewport={true}` + `enableScrollOptimization={true}`)
**Best for:**
- Pages with many videos
- User is likely to scroll quickly
- Mobile performance critical

**Pros:** Best performance, prevents loading videos user doesn't see  
**Cons:** More complex, requires tuning `scrollDelay`

---

### Recommended Settings by Use Case

| Use Case               | `playOnViewport` | `enableScrollOptimization` | `scrollDelay` | `viewportThreshold` |
| ---------------------- | ---------------- | -------------------------- | ------------- | ------------------- |
| Hero video             | `false`          | `false`                    | -             | -                   |
| Single section video   | `true`           | `false`                    | -             | `0.3`               |
| Multiple videos        | `true`           | `true`                     | `500-1000`    | `0.5`               |
| Mobile-heavy traffic   | `true`           | `true`                     | `1000-1500`   | `0.5`               |
| Fast-scrolling content | `true`           | `true`                     | `1500-2000`   | `0.7`               |

---

## Debug Mode

By default, the component runs silently without console logs. To enable debug logging, set the `debug` prop to `true`:

```tsx
<MuxPlayerWrapper
  playbackId="abc123"
  playOnViewport={true}
  enableScrollOptimization={true}
  debug={true}  // Enable debug logging
/>
```

When debug mode is enabled, you'll see detailed lifecycle events:

```
👁️ ScrollTrigger: Entering viewport
📹 Video load started
📊 Video metadata loaded
📦 Video data loaded
✅ Player ready (canplay event)
🎬 Attempting to play video
▶️ Video started playing - fading out placeholder
```

ScrollTrigger visual markers are also displayed when debug mode is enabled (in development only).

**⚠️ Important:** Only enable debug mode when troubleshooting a specific video. With many videos on a page, debug logs can quickly flood your console.

---

## Technical Implementation

### useGSAP Hook Integration

This component uses the official `@gsap/react` package's `useGSAP` hook instead of raw `useEffect` for GSAP/ScrollTrigger integration. This provides several advantages:

**How It Works:**
```tsx
// 1. Register plugins at module level (required)
gsap.registerPlugin(useGSAP, ScrollTrigger)

// 2. Use the useGSAP hook instead of useEffect
useGSAP(() => {
  ScrollTrigger.create({...})
  // Cleanup handled automatically!
}, { scope: containerRef, dependencies: [...] })
```

**Benefits of useGSAP:**
1. **Automatic Cleanup** - ScrollTriggers are automatically killed on component unmount
2. **React Strict Mode Compatible** - Prevents double-registration issues in development
3. **Context-Safe** - Creates scoped GSAP contexts that don't interfere with other animations
4. **Better Performance** - Optimized for React's rendering lifecycle
5. **Revert Functionality** - Automatically reverts GSAP changes when dependencies change

**Why This Matters:**
- With 60+ videos on a page, proper cleanup prevents memory leaks
- React Strict Mode (which double-mounts components in dev) won't cause duplicate ScrollTriggers
- ScrollTriggers are properly scoped to each component instance

**Important:** You still need to call `gsap.registerPlugin(ScrollTrigger)` at the module level. The `useGSAP` hook handles context and cleanup, not plugin registration.

### ScrollTrigger Optimization

The component avoids calling global `ScrollTrigger.refresh()` which would trigger all ScrollTriggers on the page. Instead, it checks only the specific instance with `scrollTriggerRef.current.isActive`.

---

## Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ iOS Safari (with `playsInline`)
- ✅ Android Chrome
- ⚠️ Requires JavaScript enabled
- ⚠️ Autoplay policies vary by browser

---

## Tips & Best Practices

1. **Always provide a `poster` image** for better UX during load
2. **Use low-quality `placeholder`** for scroll optimization mode
3. **Tune `scrollDelay`** based on your content - longer for fast-scrolling pages
4. **Test on mobile devices** - autoplay behavior varies significantly
5. **Use `viewportThreshold={0.5}`** as a good starting point
6. **Enable scroll optimization** if you have 3+ videos on a page
7. **Monitor console logs** in development to understand behavior
8. **Provide `metadata`** for Mux analytics
9. **Set appropriate `maxResolution`** to save bandwidth
10. **Use `onError`** handler to gracefully handle failures

---

## Common Pitfalls

### ❌ Autoplay not working
**Solution:** Ensure video is muted and uses `playsInline` (already built-in)

### ❌ Video not playing in viewport
**Solution:** Check console logs with `debug={true}`, verify `viewportThreshold` settings

### ❌ Multiple videos loading at once
**Solution:** Enable `enableScrollOptimization={true}` and increase `scrollDelay`

### ❌ Placeholder not showing
**Solution:** Ensure `enableScrollOptimization={true}` and provide `poster` or `placeholder`

### ❌ Video playing even when scrolled away
**Solution:** Verify `playOnViewport={true}` is set

### ❌ Excessive re-renders or console spam (even with debug off)
**Symptoms:** Browser console shows numbers like "59" before log messages  
**Cause:** This was an issue in earlier versions where `ScrollTrigger.refresh()` triggered global refreshes  
**Solution:** Make sure you're using the latest version of the component (fixed in current version)

---

## License

This component is part of the City's Residences project.

---

## Support

For issues or questions, please refer to the project documentation or contact the development team.

