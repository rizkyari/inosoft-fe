<template>
    <div>
        <header class="mb-4">
            <h1 class="h4 mb-1">Inspection Record</h1>
            <Breadcrumb :items="['Quality & HSE', 'Inspection', 'Inspection Record']" />
        </header>
        <section class="container p-4">
            <InspectionTable
            :rows="sortedRows"
            :loading="loading"
            :active-tab="activeTab"
            :counts="tabCounts"
            :keyword="keyword"
            :sort-key="sortKey"
            :sort-dir="sortDir"
            @update:tab="onChangeTab"
            @search="onSearch"
            @sort="onSort"
            />
        </section>
    </div>
    
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import InspectionTable from '../organism/InspectionTable.vue'
import Breadcrumb from '../atoms/Breadcrumb.vue'
import { sortRows } from '../../utils/helper'

const store = useStore()

const loading = ref(true)
const activeTab = ref('open')
const keyword = ref('')

const inspections = computed(() => store.getters.getInspections)

const filteredRows = computed(() => {
    const kw = keyword.value.trim().toLowerCase()
    const byTab = inspections.value.filter((it) => {
        const st = (it.status || '').toLowerCase()
            if (activeTab.value === 'open') return st === 'open'
            if (activeTab.value === 'review') return st === 'for review'
            if (activeTab.value === 'completed') return st === 'completed'
    return true
    })

    if (!kw) return byTab

    return byTab.filter((r) => {
        const blob = [
            r.request_no,
            r.location,
            r.type,
            r.related_to,
            r.third_party,
            ...(r.scope_of_work || [])
        ].join(' ').toLowerCase()

        return blob.includes(kw)
    })
})

const tabCounts = computed(() => {
    const acc = { open: 0, review: 0, completed: 0 }
    inspections.value.forEach((it) => {
        const st = (it.status || '').toLowerCase()
        if (st === 'open') acc.open++
        else if (st === 'for review') acc.review++
        else if (st === 'completed') acc.completed++
    })
    return acc
})

const sortKey = ref(null)
const sortDir = ref('asc')

function onSort(key) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

function onChangeTab(tab) {
    activeTab.value = tab
}

function onSearch(val) {
    keyword.value = val
}

const sortedRows = computed(() =>
    sortRows(filteredRows.value, sortKey.value, sortDir.value)
)

onMounted(async () => {
    try {
        await store.dispatch('fetchInspections')
    } finally {
        loading.value = false
    }
})

</script>
