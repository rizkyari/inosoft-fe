<template>
    <div>
        <!-- Controls -->
        <div class="toolbar d-flex flex-wrap align-items-center justify-content-between mb-3">
            <!-- Tabs -->
            <div id="tabs">
                <ul class="nav nav-tabs nav-fill">
                    <li v-for="t in tabs" :key="t.key" class="nav-item me-2 position-relative">
                        <button
                        class="nav-link"
                        :class="{ active: activeTab === t.key }"
                        @click="emit('update:tab', t.key)"
                        >
                            {{ t.label }}
                        </button>
                        <span class="badge-circle position-absolute top-0 start-100 translate-middle">
                            {{ counts[t.key] || 0 }}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="d-flex align-items-center gap-2 my-2 mt-md-0">
                <button class="btn btn-outline-soft">
                    <i class="bi bi-search" style="color:#00BFCB;"></i>
                </button>
                <button class="btn btn-outline-soft">
                    <i class="bi bi-box-arrow-up" style="color:#00BFCB;"></i>
                    <span class="ms-1">Export</span>
                </button>
            </div>
        </div>

        <div class="d-flex justify-content-end my-4">
            <button class="btn btn-tosca text-white" @click="goToCreate">+ Create Request</button>
        </div>
        <div class="table-responsive ">
            <table class="table align-middle">
                <thead class="table-main">
                    <tr>
                        <th class="sortable" @click="emit('sort','request_no')">
                            <span class="me-2">Request No</span>
                            <i v-if="sortKey==='request_no'" :class="sortDir==='asc' ? 'bi bi-caret-up-fill brand' : 'bi bi-caret-down-fill brand'"></i>
                            <i v-else class="bi bi-arrow-down-up muted"></i>
                        </th>
                        <th class="sortable" @click="emit('sort','location')">
                            <span class="me-2">Location</span>
                            <i v-if="sortKey==='location'" :class="sortDir==='asc' ? 'bi bi-caret-up-fill brand' : 'bi bi-caret-down-fill brand'"></i>
                            <i v-else class="bi bi-arrow-down-up muted"></i>
                        </th>
                        <th class="sortable" @click="emit('sort','scope_of_work')">
                            <span class="me-2">Scope of Work</span>
                            <i v-if="sortKey==='scope_of_work'" :class="sortDir==='asc' ? 'bi bi-caret-up-fill brand' : 'bi bi-caret-down-fill brand'"></i>
                            <i v-else class="bi bi-arrow-down-up muted"></i>
                        </th>
                        <th class="sortable" @click="emit('sort','type')">
                            <span class="me-2">Type</span>
                            <i v-if="sortKey==='type'" :class="sortDir==='asc' ? 'bi bi-caret-up-fill brand' : 'bi bi-caret-down-fill brand'"></i>
                            <i v-else class="bi bi-arrow-down-up muted"></i>
                        </th>
                        <th class="sortable" @click="emit('sort','date_submitted')">
                            <span class="me-2">Date Submitted</span>
                            <i v-if="sortKey==='date_submitted'" :class="sortDir==='asc' ? 'bi bi-caret-up-fill brand' : 'bi bi-caret-down-fill brand'"></i>
                            <i v-else class="bi bi-arrow-down-up muted"></i>
                        </th>
                        <th class="sortable" @click="emit('sort','eco')">
                            <span class="me-2">ECO</span>
                            <i v-if="sortKey==='eco'" :class="sortDir==='asc' ? 'bi bi-caret-up-fill brand' : 'bi bi-caret-down-fill brand'"></i>
                            <i v-else class="bi bi-arrow-down-up muted"></i>
                        </th>
                        <th class="sortable" @click="emit('sort','related_to')">
                            <span class="me-2">Related To</span>
                            <i v-if="sortKey==='related_to'" :class="sortDir==='asc' ? 'bi bi-caret-up-fill brand' : 'bi bi-caret-down-fill brand'"></i>
                            <i v-else class="bi bi-arrow-down-up muted"></i>
                        </th>
                        <th class="sortable" @click="emit('sort','third_party_badge')">
                            <span class="me-2">3rd Party</span>
                            <i v-if="sortKey==='third_party_badge'" :class="sortDir==='asc' ? 'bi bi-caret-up-fill brand' : 'bi bi-caret-down-fill brand'"></i>
                            <i v-else class="bi bi-arrow-down-up muted"></i>
                        </th>
                        <th class="sortable" @click="emit('sort','status')">
                            <span class="me-2">Status</span>
                            <i v-if="sortKey==='status'" :class="sortDir==='asc' ? 'bi bi-caret-up-fill brand' : 'bi bi-caret-down-fill brand'"></i>
                            <i v-else class="bi bi-arrow-down-up muted"></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="row in rows" :key="row.id">
                        <!-- Baris utama -->
                        <tr @click="toggleExpand(row.id)" style="cursor:pointer;">
                            <td class="fw-medium">{{ row.request_no }}</td>
                            <td>{{ row.location }}</td>
                            <td>
                                <span class="scope-chip" :title="(row.scope_of_work || []).join(', ')">
                                    Scope-001 <span class="scope-info">i</span>
                                </span>
                            </td>
                            <td>{{ row.type }}</td>
                            <td>{{ row.date_submitted }}</td>
                            <td>{{ row.eco }}</td>
                            <td>{{ row.related_to }}</td>
                            <td>
                                <div class="d-flex align-items-center justify-content-center gap-2">
                                    <span class="badge-circle">{{ row.third_party_badge || 0 }}</span>
                                    <i class="bi bi-chevron-down chev"></i>
                                </div>
                            </td>
                            <td class="text-end">
                                <span class="status-pill">
                                    {{ row.status }}
                                    <i class="bi bi-caret-down-square icon-tosca"></i>
                                </span>
                            </td>
                        </tr>

                        <!-- expand (accordion) -->
                        <tr v-show="expanded === row.id" class="bg-light">
                            <td colspan="9" class="p-0">
                                <table class="table mb-0">
                                    <thead class="table-sub">
                                        <tr>
                                            <th class="sortable" @click="emit('sort','request_no')">
                                                Item Description
                                                <span class="me-2">Progress</span>
                                                <i v-if="sortKey==='progress'" :class="sortDir==='asc' ? 'bi bi-caret-up-fill brand' : 'bi bi-caret-down-fill brand'"></i>
                                                <i v-else class="bi bi-arrow-down-up muted"></i>
                                            </th>
                                            <th class="sortable" @click="emit('sort','ownership')">
                                                <span class="me-2">Ownership</span>
                                                <i v-if="sortKey==='ownership'" :class="sortDir==='asc' ? 'bi bi-caret-up-fill brand' : 'bi bi-caret-down-fill brand'"></i>
                                                <i v-else class="bi bi-arrow-down-up muted"></i>
                                            </th>
                                            <th class="sortable" @click="emit('sort','lot_no')">
                                                <span class="me-2">Lot No</span>
                                                <i v-if="sortKey==='lot_no'" :class="sortDir==='asc' ? 'bi bi-caret-up-fill brand' : 'bi bi-caret-down-fill brand'"></i>
                                                <i v-else class="bi bi-arrow-down-up muted"></i>
                                            </th>
                                            <th class="sortable" @click="emit('sort','qty')">
                                                <span class="me-2">Qty</span>
                                                <i v-if="sortKey==='qty'" :class="sortDir==='asc' ? 'bi bi-caret-up-fill brand' : 'bi bi-caret-down-fill brand'"></i>
                                                <i v-else class="bi bi-arrow-down-up muted"></i>
                                            </th>
                                            <th class="sortable" @click="emit('sort','progress')">
                                                <span class="me-2">Progress</span>
                                                <i v-if="sortKey==='progress'" :class="sortDir==='asc' ? 'bi bi-caret-up-fill brand' : 'bi bi-caret-down-fill brand'"></i>
                                                <i v-else class="bi bi-arrow-down-up muted"></i>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, i) in (row.items || [])" :key="i">
                                            <td>{{ item.description }}</td>
                                            <td>{{ item.ownership }}</td>
                                            <td>{{ item.lot }}</td>
                                            <td>{{ item.qty }}</td>
                                            <td>{{ item.progress }}%</td>
                                        </tr>
                                        <tr v-if="!row.items || row.items.length === 0">
                                            <td colspan="5" class="text-center text-muted">No items</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </template>

                    <tr v-if="!loading && (!rows || rows.length === 0)">
                        <td colspan="9" class="text-center text-muted py-5">No data</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="d-flex justify-content-between align-items-center mt-2">
            <small class="text-muted">
                {{ rows.length }} Entries Displayed
            </small>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-5">
            <div class="spinner-border" role="status" aria-hidden="true"></div>
            <div class="mt-2 text-muted">Loading inspections…</div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    rows: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    activeTab: { type: String, default: 'open' },
    counts: { type: Object, default: () => ({ open: 0, review: 0, completed: 0 }) },
    tabs: {
        type: Array,
        default: () => ([
            { key: 'open', label: 'Open' },
            { key: 'review', label: 'For Review' },
            { key: 'completed', label: 'Completed' }
        ])
    },
    keyword: { type: String, default: '' },
    sortKey: { type: [String, null], default: null },
    sortDir: { type: String, default: 'asc' }
})

const emit = defineEmits(['update:tab', 'search', 'sort'])

const keywordLocal = ref(props.keyword)

const expanded = ref(null)
function toggleExpand(id) {
    expanded.value = expanded.value === id ? null : id
}

function goToCreate(){
    router.push(`/inspections/new`)
}

watch(() => props.keyword, (val) => {
    keywordLocal.value = val
})
</script>

<style scoped>
.badge-circle {
    display:inline-flex;
    align-items:center;
    justify-content:center;
    min-width:26px;
    height:26px;
    padding:0;
    border-radius:50%;
    background:#00BFCB;
    color:#fff;
    font-weight:700;
    line-height:1;
}

.nav-link {
    position: relative;
}

.table thead tr{ border:1px solid #BFC9D4; }
.table tbody tr{ border-color:var(--row-sep) }

.table-main th {
    background-color: #d9dee3;
    color: #fff !important;
    font-weight: 600;
}

.table-sub th {
    background-color: #e9ecef;
    color: #555;
    font-weight: 500;
}

.btn-outline-soft {
    --bs-btn-bg: #fafafa;
    --bs-btn-color: #2b3238;
    --bs-btn-border-color: #E5EBF0;
    --bs-btn-hover-bg: #D4D4D4;
    --bs-btn-hover-border-color: #D6E6EA;
    --bs-btn-active-bg: #EDF6F7;
    --bs-btn-active-border-color: #CFE0E6;
    --bs-btn-border-width: 1px;
    --bs-btn-border-radius: 5px;
    --bs-btn-padding-y: 0.35rem;
    --bs-btn-padding-x: 0.6rem;
    --bs-btn-font-weight: 600;
    border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
    background: var(--bs-btn-bg);
    color: var(--bs-btn-color);
    border-radius: var(--bs-btn-border-radius);
    padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
}

.btn-tosca {
    background-color: #00BFCB;
    color: #fff;
    border: none;
    border-radius: 3px;
    padding: 0.4rem 0.75rem;
    transition: all 0.2s ease-in-out;
}

.btn-tosca:hover {
    background-color: #00AAB6;
}

th.sortable {
    cursor: pointer;
    user-select: none;
    color: #555;
}

th.sortable:hover {
    background-color: #f8f9fa;
}

.icon-tosca {
    color: #00BFCB;
    transition: color 0.2s;
}

.icon-tosca:hover {
    color: #009aa5;
}

.text-muted {
    color: #6c757d !important;
    font-size: 0.875rem;
}
</style>