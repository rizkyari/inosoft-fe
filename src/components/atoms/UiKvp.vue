<template>
    <div>
        <div class="text-muted small">{{ label }}</div>
        <div :class="['fw-semibold', valueClass]"><slot>{{ value ?? '—' }}</slot></div>
    </div>
</template>

<script setup>
defineProps({
    label: String,
    value: [String, Number],
    valueClass: String
})
</script>
