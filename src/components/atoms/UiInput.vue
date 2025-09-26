<template>
    <input
    class="form-control"
    :type="props.type || 'text'"
    :value="props.modelValue"
    :placeholder="props.placeholder"
    @input="e => emit('update:modelValue', e.target.value)"
    />
</template>

<script setup>
const props = defineProps({ 
    modelValue: [String, Number], 
    type: String, 
    placeholder: String 
})

const emit = defineEmits(['update:modelValue'])
</script>