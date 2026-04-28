import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia, setActivePinia } from 'pinia'
import { h } from 'vue'
import NotesView from '@/views/NotesView.vue'
import { useNotesStore } from '@/stores/notes'

const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('NotesView', () => {
  const vuetify = createVuetify({ components, directives })
  let pinia: ReturnType<typeof createPinia>

  function mountNotesView() {
    return mount({
      render() {
        return h(components.VApp, {}, { default: () => h(NotesView) })
      },
    }, {
      global: {
        plugins: [vuetify, pinia],
        stubs: {
          'router-link': true,
        },
      },
      attachTo: document.body,
    })
  }

  function addSampleNotes(): void {
    const store = useNotesStore()
    store.notes = [
      {
        id: '1',
        input: 'First note about testing',
        ai_result: null,
        timestamp: '2026-01-01T10:00:00.000Z',
        topic: 'Testing',
      },
      {
        id: '2',
        input: 'Second note about deployment with some longer text that should be truncated at eighty characters limit',
        ai_result: { summary: 'Test', description: 'Test', acceptanceCriteria: [], priority: 'Medium', labels: [] },
        outputType: 'ticket',
        timestamp: '2026-01-02T12:00:00.000Z',
        topic: 'DevOps',
      },
      {
        id: '3',
        input: 'Third note about a bug report',
        ai_result: { title: 'Bug', body: 'Body', labels: [], assignees: [], milestone: null, state: 'open' as const, stateReason: null, type: null },
        outputType: 'issue',
        timestamp: '2026-01-03T14:00:00.000Z',
        topic: 'Bugs',
      },
    ]
  }

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    mockPush.mockClear()
  })

  it('should render the page header with title and icon', () => {
    const wrapper = mountNotesView()
    expect(wrapper.text()).toContain('Notes')
    expect(wrapper.findComponent({ name: 'VIcon' }).exists()).toBe(true)
    wrapper.unmount()
  })

  it('should render all notes from the store', () => {
    addSampleNotes()
    const wrapper = mountNotesView()
    const cards = wrapper.findAllComponents({ name: 'VCard' })
    expect(cards.length).toBe(3)
    wrapper.unmount()
  })

  it('should display notes in reverse chronological order', () => {
    addSampleNotes()
    const wrapper = mountNotesView()
    const text = wrapper.text()
    const thirdPos = text.indexOf('Third note')
    const secondPos = text.indexOf('Second note')
    const firstPos = text.indexOf('First note')
    expect(thirdPos).toBeLessThan(secondPos)
    expect(secondPos).toBeLessThan(firstPos)
    wrapper.unmount()
  })

  it('should render timestamp, preview, topic chip, type badge, and AI status on note cards', () => {
    addSampleNotes()
    const wrapper = mountNotesView()
    const text = wrapper.text()

    // Timestamp
    expect(text).toContain('03.01.2026')

    // Preview text
    expect(text).toContain('Third note about a bug report')

    // Topic chip
    expect(text).toContain('Bugs')

    // Type badges
    expect(text).toContain('Ticket')
    expect(text).toContain('Issue')

    // AI status icons (check-circle for completed, clock for pending)
    const icons = wrapper.findAllComponents({ name: 'VIcon' })
    const checkIcons = icons.filter((i) => i.props('icon') === 'mdi-check-circle')
    const clockIcons = icons.filter((i) => i.props('icon') === 'mdi-clock-outline')
    expect(checkIcons.length).toBeGreaterThan(0)
    expect(clockIcons.length).toBeGreaterThan(0)

    wrapper.unmount()
  })

  it('should filter notes by text content when searching', async () => {
    addSampleNotes()
    const wrapper = mountNotesView()
    const searchField = wrapper.findComponent({ name: 'VTextField' })

    await searchField.setValue('deployment')
    await wrapper.vm.$nextTick()

    const cards = wrapper.findAllComponents({ name: 'VCard' })
    expect(cards.length).toBe(1)
    expect(wrapper.text()).toContain('Second note')

    wrapper.unmount()
  })

  it('should filter notes by topic when searching', async () => {
    addSampleNotes()
    const wrapper = mountNotesView()
    const searchField = wrapper.findComponent({ name: 'VTextField' })

    await searchField.setValue('bugs')
    await wrapper.vm.$nextTick()

    const cards = wrapper.findAllComponents({ name: 'VCard' })
    expect(cards.length).toBe(1)
    expect(wrapper.text()).toContain('Third note')

    wrapper.unmount()
  })

  it('should navigate to /notes/:id when clicking a card', async () => {
    addSampleNotes()
    const wrapper = mountNotesView()
    const cards = wrapper.findAllComponents({ name: 'VCard' })

    // First card is note 3 (newest first)
    const firstCard = cards[0]
    expect(firstCard).toBeDefined()
    await firstCard!.trigger('click')
    expect(mockPush).toHaveBeenCalledWith('/notes/3')

    wrapper.unmount()
  })

  it('should render empty state when no notes exist with CTA button to /home', () => {
    const wrapper = mountNotesView()
    const text = wrapper.text()

    expect(text).toContain('No notes yet')
    expect(text).toContain('Create Note')

    // CTA button should link to /home
    const btn = wrapper.findComponent({ name: 'VBtn' })
    expect(btn.exists()).toBe(true)
    expect(btn.props('to')).toBe('/home')

    wrapper.unmount()
  })
})
