import { mount } from '@vue/test-utils'
import { vi, describe, it, expect } from 'vitest'

vi.mock('@/utils/format.js', () => ({
  statusVariant: (s) => {
    if (s === 'Open') return 'warning'
    if (s === 'For Review') return 'info'
    if (s === 'Completed') return 'success'
    return 'secondary'
  }
}))

import StatusBadge from '../../src/components/atoms/StatusBadge.vue'

describe('StatusBadge.vue', () => {
    it('renders text and classes for "Open"', () => {
        const wrapper = mount(StatusBadge, { props: { text: 'Open' } })
        expect(wrapper.text()).toBe('Open')
        expect(wrapper.classes()).toContain('badge')
        expect(wrapper.classes()).toContain('rounded-pill')
        expect(wrapper.classes()).toContain('text-bg-warning')
    })

    it('uses correct variant for "For Review"', () => {
        const wrapper = mount(StatusBadge, { props: { text: 'For Review' } })
        expect(wrapper.classes()).toContain('text-bg-info')
    })

    it('uses correct variant for "Completed"', () => {
        const wrapper = mount(StatusBadge, { props: { text: 'Completed' } })
        expect(wrapper.classes()).toContain('text-bg-success')
    })

    it('falls back to secondary for unknown status', () => {
        const wrapper = mount(StatusBadge, { props: { text: 'Weird' } })
        expect(wrapper.classes()).toContain('text-bg-secondary')
    })

    it('updates classes when prop changes', async () => {
        const wrapper = mount(StatusBadge, { props: { text: 'Open' } })
        expect(wrapper.classes()).toContain('text-bg-warning')
        await wrapper.setProps({ text: 'Completed' })
        expect(wrapper.classes()).toContain('text-bg-success')
    })
})
