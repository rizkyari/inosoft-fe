<template>
    <div>
        <UiBadge
        v-for="(s, i) in visible"
        :key="i"
        variant="light"
        class="border"
        >
        {{ s }}
        </UiBadge>

        <UiBadge
        v-if="hiddenCount > 0"
        variant="light"
        class="border"
        :title="hiddenTooltip"
        >
            +{{ hiddenCount }}
        </UiBadge>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import UiBadge from '@/components/atoms/UiBadge.vue'

const props = defineProps({
    items: { type: Array, default: () => [] },
    limit: { type: Number, default: 3}
})

const visible = computed(() => props.items.slice(0, props.limit))
const hidden = computed(() => props.items.slice(props.limit))
const hiddenCount = computed(() => hidden.value.length)
const hiddenTooltip = computed(() => hidden.value.join(', '))
</script>