import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import UiSelect from '../../src/components/atoms/UiSelect.vue'

describe('UiSelect.vue', () => {
    it('renders placeholder as the first hidden option', () => {
        const wrapper = mount(UiSelect, {
            props: { modelValue: '', options: [], placeholder: 'Please choose' }
        })
        const opts = wrapper.findAll('option')
        expect(opts[0].text()).toBe('Please choose')
        expect(opts[0].attributes('hidden')).toBeDefined()
        expect(wrapper.find('select').element.value).toBe('')
    })

    it('normalizes string/number options into {label,value}', () => {
        const wrapper = mount(UiSelect, {
            props: { modelValue: '', options: ['A', 7] }
        })
        const opts = wrapper.findAll('option')
        expect(opts[1].text()).toBe('A')
        expect(opts[1].element.value).toBe('A')
        expect(opts[2].text()).toBe('7')
        expect(opts[2].element.value).toBe('7')
    })

    it('renders object options {label,value}', () => {
        const wrapper = mount(UiSelect, {
            props: {
                modelValue: '',
                options: [{ label: 'X', value: 'x' }, { label: 'Y', value: 'y' }]
            }
        })
        const opts = wrapper.findAll('option')
        expect(opts[1].text()).toBe('X')
        expect(opts[1].element.value).toBe('x')
        expect(opts[2].text()).toBe('Y')
        expect(opts[2].element.value).toBe('y')
    })

    it('emits update:modelValue on change', async () => {
        const wrapper = mount(UiSelect, {
            props: {
                modelValue: '',
                options: ['A', 'B']
            }
        })
        const select = wrapper.get('select')
        await select.setValue('B')
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['B'])
    })

    it('select shows current modelValue', () => {
        const wrapper = mount(UiSelect, {
            props: { modelValue: 'y', options: [{ label: 'X', value: 'x' }, { label: 'Y', value: 'y' }] }
        })
        expect(wrapper.get('select').element.value).toBe('y')
    })
})
