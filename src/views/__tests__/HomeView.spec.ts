import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia, setActivePinia } from 'pinia'
import { h } from 'vue'
import HomeView from '@/views/HomeView.vue'
import { useNotesStore } from '@/stores/notes'

const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('HomeView', () => {
  const vuetify = createVuetify({ components, directives })

  function mountHome() {
    return mount({
      render() {
        return h(components.VApp, {}, { default: () => h(HomeView) })
      },
    }, {
      global: {
        plugins: [vuetify, createPinia()],
        stubs: {
          'router-link': true,
        },
      },
      attachTo: document.body,
    })
  }

  beforeEach(() => {
    setActivePinia(createPinia())
    mockPush.mockClear()
  })

  it('should render without errors', () => {
    const wrapper = mountHome()
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })

  it('should display the Home heading', () => {
    const wrapper = mountHome()
    expect(wrapper.text()).toContain('Home')
    wrapper.unmount()
  })

  it('should render textarea, topic field, select, and both action buttons', () => {
    const wrapper = mountHome()
    const text = wrapper.text()
    expect(wrapper.findComponent({ name: 'VTextarea' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'VTextField' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'VSelect' }).exists()).toBe(true)
    expect(text).toContain('Save Note')
    expect(text).toContain('Generate')
    wrapper.unmount()
  })

  it('should have Save Note button disabled when textarea or topic is empty', () => {
    const wrapper = mountHome()
    const buttons = wrapper.findAllComponents({ name: 'VBtn' })
    const saveBtn = buttons.find((b) => b.text().includes('Save Note'))
    expect(saveBtn?.props('disabled')).toBe(true)
    wrapper.unmount()
  })

  it('should have Generate button always disabled', () => {
    const wrapper = mountHome()
    const buttons = wrapper.findAllComponents({ name: 'VBtn' })
    const generateBtn = buttons.find((b) => b.text().includes('Generate'))
    expect(generateBtn?.props('disabled')).toBe(true)
    wrapper.unmount()
  })

  it('should enable Save Note button when textarea and topic have content', async () => {
    const wrapper = mountHome()
    const textarea = wrapper.findComponent({ name: 'VTextarea' })
    const textfield = wrapper.findComponent({ name: 'VTextField' })

    await textarea.setValue('My test note')
    await textfield.setValue('My topic')
    await wrapper.vm.$nextTick()

    const buttons = wrapper.findAllComponents({ name: 'VBtn' })
    const saveBtn = buttons.find((b) => b.text().includes('Save Note'))
    expect(saveBtn?.props('disabled')).toBe(false)
    wrapper.unmount()
  })

  it('should save a note to the store and clear inputs when Save Note is clicked', async () => {
    const wrapper = mountHome()
    const store = useNotesStore()

    const textarea = wrapper.findComponent({ name: 'VTextarea' })
    const textfield = wrapper.findComponent({ name: 'VTextField' })

    await textarea.setValue('My test note')
    await textfield.setValue('My topic')
    await wrapper.vm.$nextTick()

    const buttons = wrapper.findAllComponents({ name: 'VBtn' })
    const saveBtn = buttons.find((b) => b.text().includes('Save Note'))
    await saveBtn?.trigger('click')
    await wrapper.vm.$nextTick()

    expect(store.notes).toHaveLength(1)
    expect(store.notes[0]?.input).toBe('My test note')
    expect(store.notes[0]?.topic).toBe('My topic')
    expect(store.notes[0]?.outputType).toBeUndefined()
    expect(store.notes[0]?.ai_result).toBeNull()
    wrapper.unmount()
  })

  it('should render recent notes panel', () => {
    const wrapper = mountHome()
    expect(wrapper.text()).toContain('Recent Notes')
    wrapper.unmount()
  })

  it('should show notes in recent notes panel after saving', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = useNotesStore()
    store.addNote('A test note for the panel display', 'Testing')

    const wrapper = mount({
      render() {
        return h(components.VApp, {}, { default: () => h(HomeView) })
      },
    }, {
      global: {
        plugins: [vuetify, pinia],
        stubs: { 'router-link': true },
      },
      attachTo: document.body,
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('A test note for the panel display')
    wrapper.unmount()
  })

  it('should truncate long notes in recent notes panel', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = useNotesStore()
    const longText = 'A'.repeat(80)
    store.addNote(longText, 'Testing')

    const wrapper = mount({
      render() {
        return h(components.VApp, {}, { default: () => h(HomeView) })
      },
    }, {
      global: {
        plugins: [vuetify, pinia],
        stubs: { 'router-link': true },
      },
      attachTo: document.body,
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('A'.repeat(50) + '...')
    expect(wrapper.text()).not.toContain('A'.repeat(80))
    wrapper.unmount()
  })
})
