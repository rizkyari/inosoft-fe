<template>
    <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
        <ol class="breadcrumb mb-3">
            <li 
            v-for="(crumb, i) in items" 
            :key="i" 
            class="breadcrumb-item" 
            :class="{ active: i === items.length - 1 }" 
            :aria-current="i === items.length - 1 ? 'page' : null">
                <a v-if="i < items.length - 1" href="#">{{ crumb }}</a>
                <span v-else>{{ crumb }}</span>
            </li>
        </ol>
    </nav>
</template>

<script setup>
const props = defineProps({
    items: { type: Array, required: true}
})
</script>