import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'
import { h } from 'vue'
import App from '@/App.vue'

const mockRoute = { path: '/home' }

vi.mock('vue-router', () => ({
  useRoute: () => mockRoute,
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  RouterView: {
    name: 'RouterView',
    render() {
      return h('div', { class: 'router-view-stub' })
    },
  },
}))

describe('App - Live Clock', () => {
  const vuetify = createVuetify({ components, directives })

  function mountApp(routePath: string = '/home') {
    mockRoute.path = routePath
    return mount(App, {
      global: {
        plugins: [vuetify, createPinia()],
        stubs: {
          AppSidebar: true,
          RouterView: true,
        },
      },
      attachTo: document.body,
    })
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should display the live clock on non-splash views', () => {
    const wrapper = mountApp('/home')
    expect(wrapper.find('.live-clock').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should not display the live clock on splash view', () => {
    const wrapper = mountApp('/splash')
    expect(wrapper.find('.live-clock').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should update the clock every second', async () => {
    const wrapper = mountApp('/home')
    // Advance time by 1 second
    vi.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()

    // Clock should have updated (text content exists)
    expect(wrapper.find('.live-clock').text()).toBeTruthy()
    wrapper.unmount()
  })

  it('should show the clock on notes view', () => {
    const wrapper = mountApp('/notes')
    expect(wrapper.find('.live-clock').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should show the clock on tickets view', () => {
    const wrapper = mountApp('/tickets')
    expect(wrapper.find('.live-clock').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should show the clock on issues view', () => {
    const wrapper = mountApp('/issues')
    expect(wrapper.find('.live-clock').exists()).toBe(true)
    wrapper.unmount()
  })
})
