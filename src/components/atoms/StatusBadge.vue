<template>
    <span :class="['badge',`text-bg-${computedVariant}`, 'rounded-pill']">
        {{ text }}
    </span>
</template>

<script setup>
import { statusVariant } from '@/utils/format.js'
import { computed } from 'vue';

const props = defineProps({
    text: {
        type: String,
        required: true
    }
})

const computedVariant = computed(() => statusVariant(props.text))
</script>
