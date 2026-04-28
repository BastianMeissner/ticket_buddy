import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { h } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'

describe('AppSidebar', () => {
  const vuetify = createVuetify({ components, directives })

  function mountSidebar() {
    return mount({
      render() {
        return h(components.VApp, {}, { default: () => h(AppSidebar) })
      },
    }, {
      global: {
        plugins: [vuetify],
        stubs: {
          'router-link': true,
        },
      },
      attachTo: document.body,
    })
  }

  it('should render all 4 navigation links', () => {
    const wrapper = mountSidebar()
    const navTitles = ['Home', 'Notes', 'Tickets', 'Issues']
    const text = wrapper.text()
    navTitles.forEach((title) => {
      expect(text).toContain(title)
    })
    wrapper.unmount()
  })

  it('should render navigation icons', () => {
    const wrapper = mountSidebar()
    const html = wrapper.html()
    expect(html).toContain('mdi-home')
    expect(html).toContain('mdi-note-text')
    expect(html).toContain('mdi-ticket-outline')
    expect(html).toContain('mdi-alert-circle-outline')
    wrapper.unmount()
  })
})
