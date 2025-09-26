import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import UiSectionTitle from '../../src/components/atoms/UiSectionTitle.vue'

describe('UiSectionTitle', () => {
    it('renders the given title prop', () => {
        const wrapper = mount(UiSectionTitle, {
            props: { title: 'My Selection Title' }
        })

        expect(wrapper.text()).toContain('My Selection Title')
    })

    it('renders inside an h6 tag', () => {
        const wrapper = mount(UiSectionTitle, {
            props: { title: 'Header' }
        })

        const h6 = wrapper.find('h6')
        expect(h6.exists()).toBe(true)
        expect(h6.text()).toBe('Header')
    })
})
