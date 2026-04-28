import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import HomeView from '@/views/HomeView.vue'

describe('HomeView', () => {
  const vuetify = createVuetify({ components, directives })

  it('should render without errors', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should display a heading', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper.text()).toContain('Home')
  })
})
