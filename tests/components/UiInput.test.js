import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import UiInput from '../../src/components/atoms/UiInput.vue'

describe('UiInput.vue', () => {
    it('renders with default type text', () => {
        const wrapper = mount(UiInput, {
            props: { modelValue: '' }
        })
        const input = wrapper.get('input')
        expect(input.attributes('type')).toBe('text')
    })

    it('respects the "type" prop', () => {
        const wrapper = mount(UiInput, {
            props: { modelValue: '', type: 'number' }
        })
        expect(wrapper.get('input').attributes('type')).toBe('number')
    })

    it('renders with placeholder when given', () => {
        const wrapper = mount(UiInput, {
            props: { modelValue: '', placeholder: 'Enter something' }
        })
        expect(wrapper.get('input').attributes('placeholder')).toBe('Enter something')
    })

    it('uses modelValue as input value', () => {
        const wrapper = mount(UiInput, {
            props: { modelValue: 'hello' }
        })
        expect(wrapper.get('input').element.value).toBe('hello')
    })

    it('emits update:modelValue on input event', async () => {
        const wrapper = mount(UiInput, {
            props: { modelValue: '' }
        })
        const input = wrapper.get('input')
        await input.setValue('new value')
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['new value'])
    })
})
