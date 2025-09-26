<template>
    <div class="container p-3">
        <!-- Toolbar -->
        <div class="d-flex justify-content-between align-items-center mb-3">
            <button class="btn fw-semibold" @click="$router.push({ name: 'Inspections' })" >
              <i class="bi bi-chevron-left" style="color: #00AAB6;"></i>
              Back
            </button>
            <div class="">
                <button class="btn fw-semibold">
                  <i class="bi bi-pencil-fill" style="color: #00AAB6;"></i>
                  Modify
                </button>
            </div>
        </div>

        <!-- Summary -->
        <SummaryGrid :data="detail"/>

        <!-- Scope of Work -->
        <SowTable class="mt-3" :groups="detail.scope_of_work_details || []"/>

        <!-- Items -->
        <ItemsTable class="mt-3" :items="detail.order_information || []"/>

        <!-- Charges -->
        <ChargesTable class="mt-3" :rows="detail.charges_to_customer || []"/>
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import SummaryGrid from '../moleculs/SummaryGrid.vue'
import SowTable from '../moleculs/SowTable.vue'
import ItemsTable from '../moleculs/ItemsTable.vue'
import ChargesTable from '../moleculs/ChargesTable.vue'

const route = useRoute()
const store = useStore()
const id = route.params.id

onMounted(async () => {
    await store.dispatch('fetchDetail')
})

const detail = computed(() => {
    const fromList = store.getters.getInspections.find(i => i.id === id) || {}
    const maybeDetail = store.getters.getDetail || {}
    return Object.keys(maybeDetail || {}).length ? maybeDetail : fromList
})
</script>
