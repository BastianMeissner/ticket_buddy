# Feature: Splash Screen

## Summary

A 3-second loading screen displayed when the app starts. Shows the app name, a decorative icon, and a loading animation. After 3 seconds, automatically redirects to the home page.

## Route

- **Path:** `/splash`
- **Component:** `SplashView.vue`
- **Default entry:** `/` redirects to `/splash`

## Behavior

1. User opens the app (navigates to `/`).
2. Router redirects to `/splash`.
3. `SplashView.vue` renders:
   - App name: **"Ticket Buddy"**
   - A Material Design icon (e.g., `mdi-ticket-confirmation-outline` or `mdi-rocket-launch-outline`)
   - A Vuetify loading indicator (e.g., `v-progress-circular` with `indeterminate`)
4. After **3 seconds**, `router.push('/home')` is called automatically.
5. Navigation guard prevents navigating back to `/splash` from `/home` (optional: replace history entry).

## Implementation Notes

- Use `setTimeout` inside `onMounted()` to trigger the redirect after 3 seconds.
- Use `router.replace('/home')` instead of `router.push('/home')` so the splash screen is not in the browser's back history.
- Center all content vertically and horizontally using Vuetify's `v-container` with `fill-height` and flex utilities.
- Use Vuetify transitions or CSS animation for a smooth appearance (e.g., fade-in on the app name).
- Must look good on both desktop and mobile screens.

## Acceptance Criteria

- [ ] App starts on `/splash` screen.
- [ ] App name "Ticket Buddy" is displayed with an icon.
- [ ] A loading animation is visible.
- [ ] After 3 seconds, the app navigates to `/home`.
- [ ] Pressing browser back from `/home` does NOT return to `/splash`.
- [ ] Layout is centered and responsive on desktop and mobile.
