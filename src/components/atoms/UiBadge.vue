<template>
    <span :class="['badge', `text-bg-${variant}`, 'rounded-pill']">
        <slot />
    </span>
</template>

<script setup>
defineProps({
    variant: {
        type: String,
        required: true
    }
})
</script>