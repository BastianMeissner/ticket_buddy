import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import SplashView from '@/views/SplashView.vue'

const mockReplace = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}))

describe('SplashView', () => {
  const vuetify = createVuetify({ components, directives })

  beforeEach(() => {
    vi.useFakeTimers()
    mockReplace.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render the app name "Ticket Buddy"', () => {
    const wrapper = mount(SplashView, {
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper.text()).toContain('Ticket Buddy')
  })

  it('should render a progress indicator', () => {
    const wrapper = mount(SplashView, {
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper.findComponent({ name: 'VProgressCircular' }).exists()).toBe(true)
  })

  it('should redirect to /home after 3 seconds', async () => {
    mount(SplashView, {
      global: {
        plugins: [vuetify],
      },
    })
    expect(mockReplace).not.toHaveBeenCalled()
    vi.advanceTimersByTime(3000)
    expect(mockReplace).toHaveBeenCalledWith('/home')
  })
})
