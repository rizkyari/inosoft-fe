<template>
    <span :class="['badge', `text-bg-${variant}`, 'rounded-pill']">
        <slot />
    </span>
</template>

<script>
export default {
    name: 'UiBadge',
    props: {
        variant: { type: String, default: 'secondary'}
    }
}
</script>