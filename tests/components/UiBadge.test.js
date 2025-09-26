import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import UiBadge from '../../src/components/atoms/UiBadge.vue'

describe('UiBadge.vue', () => {
    it('renders slot content', () => {
        const wrapper = mount(UiBadge, {
            props: { variant: 'success' },
            slots: { default: 'Hello Badge' }
        })
        expect(wrapper.text()).toBe('Hello Badge')
    })

    it('applies bootstrap badge classes with variant', () => {
        const wrapper = mount(UiBadge, {
            props: { variant: 'danger' },
            slots: { default: 'Remove' }
        })

        expect(wrapper.classes()).toContain('badge')
        expect(wrapper.classes()).toContain('rounded-pill')
        expect(wrapper.classes()).toContain('text-bg-danger')
    })

    it('updates class when variant prop changes', async () => {
        const wrapper = mount(UiBadge, {
            props: { variant: 'warning' },
            slots: { default: 'Warn' }
        })
        expect(wrapper.classes()).toContain('text-bg-warning')

        await wrapper.setProps({ variant: 'info' })
        expect(wrapper.classes()).toContain('text-bg-info')
    })
})
