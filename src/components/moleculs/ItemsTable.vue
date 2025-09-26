<template>
    <div class="mt-5">
        <div class="row">
            <div class="col-12 col-md-6">
                <UiSectionTitle title="Item Information"/>
            </div>
            <div class="col-12 col-md-6 text-end">
                <button class="btn btn-outline-soft btn-sm ms-2">
                    <i class="bi bi-chevron-up" style="color:#00BFCB;"></i>
                </button>
            </div>
        </div>
        <div class="table-responsive card mt-2">
            <table class="table table-sm align-middle">
                <thead class="hdr">
                    <tr>
                        <th rowspan="2">Item No.</th>
                        <th rowspan="2">Item Description</th>
                        <th rowspan="2">Lot No.</th>
                        <th rowspan="2">Allocation</th>
                        <th rowspan="2">Owner</th>
                        <th rowspan="2">Condition</th>

                        <th colspan="2" class="text-center">Requested</th>
                        <th colspan="2" class="text-center">Pending</th>
                        <th colspan="2" class="text-center">Completed</th>
                    </tr>
                    <tr>
                        <th class="text-end">PCS</th><th class="text-end">MT</th>
                        <th class="text-end">PCS</th><th class="text-end">MT</th>
                        <th class="text-end">PCS</th><th class="text-end">MT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="it in items" :key="it.id_item">
                        <td>{{ it.item_code }}</td>
                        <td>{{ it.item_desc }}</td>
                        <td>{{ it.lot }}</td>
                        <td>{{ it.allocation }}</td>
                        <td>{{ it.owner }}</td>
                        <td>
                            <UiBadge v-if="it.condition" :variant="it.condition === 'Good' ? 'success' : 'danger'">
                                {{ it.condition }}
                            </UiBadge>
                            <span v-else>—</span>
                        </td>

                        <!-- Requested -->
                        <td class="text-end">{{ it.requested_pcs ?? '-' }}</td>
                        <td class="text-end">{{ it.requested_mt ?? '-' }}</td>

                        <!-- Pending -->
                        <td class="text-end">{{ it.pending_pcs ?? '-' }}</td>
                        <td class="text-end">{{ it.pending_mt ?? '-' }}</td>

                        <!-- Completed -->
                        <td class="text-end">{{ it.completed_pcs ?? '-' }}</td>
                        <td class="text-end">{{ it.completed_mt ?? '-' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import UiBadge from '@/components/atoms/UiBadge.vue'
import UiSectionTitle from '@/components/atoms/UiSectionTitle.vue'

defineProps({ items: { type:Array, default:()=>[] } })
</script>

<style>
.hdr th {
    background: #cfd5db;
    color: #2b3238;
    vertical-align: middle;
    border-bottom: 0;
}

.hdr tr + tr th {
    background: #d7dde3;
}

.table th, .table td { white-space: nowrap; }
</style>