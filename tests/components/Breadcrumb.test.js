import { mount } from '@vue/test-utils'
import Breadcrumb from '../../src/components/atoms/Breadcrumb.vue'

describe('Breadcrumb', () => {
    it('renders all items', () => {
        const wrapper = mount(Breadcrumb, {
            props: { items: ['Operation', 'Yard Services', 'Create'] }
        })
        const lis = wrapper.findAll('li.breadcrumb-item')
        expect(lis.length).toBe(3)
    })

    it('uses <a> for non-last items and <span> for last', () => {
        const wrapper = mount(Breadcrumb, {
            props: { items: ['Operation', 'Yard Services', 'Create'] }
        })
        const items = wrapper.findAll('li.breadcrumb-item')

        expect(items[0].find('a').exists()).toBe(true)
        expect(items[1].find('a').exists()).toBe(true)

        const last = items[2]
        expect(last.find('a').exists()).toBe(false)
        expect(last.find('span').exists()).toBe(true)
        expect(last.find('span').text()).toBe('Create')
    })

    it('marks only last item as active with aria-current', () => {
        const wrapper = mount(Breadcrumb, {
        props: { items: ['Operation', 'Yard Services', 'Create'] }
        })
        const items = wrapper.findAll('li.breadcrumb-item')

        expect(items[0].classes()).not.toContain('active')
        expect(items[0].attributes('aria-current')).toBeUndefined()

        expect(items[1].classes()).not.toContain('active')
        expect(items[1].attributes('aria-current')).toBeUndefined()

        expect(items[2].classes()).toContain('active')
        expect(items[2].attributes('aria-current')).toBe('page')
    })

    it('applies custom divider style', () => {
        const wrapper = mount(Breadcrumb, {
            props: { items: ['Operation', 'Create'] }
        })
        const nav = wrapper.get('nav[aria-label="breadcrumb"]')
        expect(nav.attributes('style')).toContain("--bs-breadcrumb-divider: '>'")
    })

    it('handles single item correctly', () => {
        const wrapper = mount(Breadcrumb, {
            props: { items: ['Only One'] }
        })
        const li = wrapper.get('li.breadcrumb-item')
        expect(li.classes()).toContain('active')
        expect(li.attributes('aria-current')).toBe('page')
        expect(li.find('a').exists()).toBe(false)
        expect(li.find('span').text()).toBe('Only One')
    })
})