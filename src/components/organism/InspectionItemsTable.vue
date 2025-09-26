<template>
    <div class="table-responsive">
        <table class="table align-middle">
            <thead class="table-sub">
                <tr>
                    <th style="width:40%">Item Description</th>
                    <th>Ownership</th>
                    <th>Lot No.</th>
                    <th style="width:90px">Qty</th>
                    <th style="width:110px">Progress</th>
                    <th style="width:60px"></th>
                </tr>
            </thead>
            <tbody>
                <InspectionItemRow
                v-for="(it, i) in props.items"
                :key="i"
                :item="it"
                :index="i"
                :error="props.errors[`item_${i}_description`]"
                @remove="emit('remove', i)"
                />
            </tbody>
        </table>
    </div>

    <button class="btn btn-outline-secondary" @click="emit('add')">
        <i class="bi bi-plus"></i> Add Item
    </button>
</template>

<script setup>
import InspectionItemRow from './InspectionItemRow.vue'

const props = defineProps({ items: Array, errors: Object })
const emit = defineEmits(['add', 'remove'])
</script>

<style scoped>
.table-sub th { 
    background:#F3F6F9; 
    color:#6B7B86; 
    font-weight:600 
}
</style>
