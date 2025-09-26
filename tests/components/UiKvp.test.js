import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import UiKvp from '../../src/components/atoms/UiKvp.vue'

describe('UiKvp.vue', () => {
    it('renders label and value from props', () => {
        const wrapper = mount(UiKvp, {
            props: { label: 'Service Type', value: 'New Arrival' }
        })
        expect(wrapper.find('.text-muted.small').text()).toBe('Service Type')
        expect(wrapper.find('.fw-semibold').text()).toBe('New Arrival')
    })

    it('falls back to "—" when value is empty/undefined', () => {
        const wrapper = mount(UiKvp, {
            props: { label: 'D/C Code' }
        })
        expect(wrapper.find('.fw-semibold').text()).toBe('—')
    })

    it('reacts to prop changes', async () => {
        const wrapper = mount(UiKvp, {
            props: { label: 'Location', value: 'MHPC', valueClass: 'text-primary' }
        })
        const val = wrapper.find('.fw-semibold')
        expect(val.text()).toBe('MHPC')
        expect(val.classes()).toContain('text-primary')

        await wrapper.setProps({ value: 'Jakarta Yard', valueClass: 'text-danger' })
        expect(wrapper.find('.fw-semibold').text()).toBe('Jakarta Yard')
        expect(wrapper.find('.fw-semibold').classes()).toContain('text-danger')
    })
})
