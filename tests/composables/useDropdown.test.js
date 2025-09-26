import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { useDropdowns } from '../../src/composables/useDropdown'

function mountWithStore(state) {
    const store = createStore({ state })
    const Comp = {
        template: '<div />',
        setup() {
            const d = useDropdowns()
            return { d }
        }
    }
    const wrapper = mount(Comp, { global: { plugins: [store] } })
    return { wrapper }
}

describe('useDropdowns composable', () => {
    it('returns mapped dropdowns as options', () => {
        const state = {
        dropdowns: {
            service_type: ['New Arrival', 'Maintenance'],
            scope_templates: ['Template A'],
            locations: ['Jakarta Yard'],
            related_to: ['REQ-001'],
            customers: ['Customer A'],
            statuses: ['Open', 'Completed']
            }
        }

    const { wrapper } = mountWithStore(state)
    const d = wrapper.vm.d

    expect(d.types.value).toEqual([
        { label: 'New Arrival', value: 'New Arrival' },
        { label: 'Maintenance', value: 'Maintenance' }
    ])
    expect(d.scopes.value).toEqual([{ label: 'Template A', value: 'Template A' }])
    expect(d.locations.value).toEqual([{ label: 'Jakarta Yard', value: 'Jakarta Yard' }])
    expect(d.related_to.value).toEqual([{ label: 'REQ-001', value: 'REQ-001' }])
    expect(d.customers.value).toEqual([{ label: 'Customer A', value: 'Customer A' }])
    expect(d.statuses.value).toEqual([
            { label: 'Open', value: 'Open' },
            { label: 'Completed', value: 'Completed' }
        ])
    })

    it('uses default statuses if not provided', () => {
        const state = { dropdowns: {} }
        const { wrapper } = mountWithStore(state)
        const d = wrapper.vm.d

        expect(d.statuses.value).toEqual([
            { label: 'Open', value: 'Open' },
            { label: 'For Review', value: 'For Review' },
            { label: 'Completed', value: 'Completed' }
        ])
    })
})
