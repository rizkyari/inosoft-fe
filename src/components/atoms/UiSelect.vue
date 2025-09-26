<template>
  <select class="form-select" :value="modelValue" @change="e => emit('update:modelValue', e.target.value)">
    <option value="" disabled hidden>{{ placeholder || 'Select…' }}</option>

    <option v-for="o in normalized" :key="o.value" :value="o.value">
      {{ o.label }}
    </option>
  </select>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  options: { type: Array, default: () => [] },
  placeholder: String,
})
const emit = defineEmits(['update:modelValue'])

const normalized = computed(() =>
  props.options.map(it =>
    (typeof it === 'string' || typeof it === 'number')
      ? { label: String(it), value: String(it) }
      : { label: String(it?.label ?? ''), value: String(it?.value ?? '') }
  )
)
</script>
