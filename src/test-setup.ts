import { vi } from 'vitest'

// Polyfill ResizeObserver for jsdom
global.ResizeObserver = class ResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_callback: ResizeObserverCallback) {}
}
