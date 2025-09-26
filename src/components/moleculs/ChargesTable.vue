<template>
    <div class="mt-5">
        <div class="row mb-2">
            <div class="col-12 col-md-6">
                <UiSectionTitle title="Charges to Customer"/>
            </div>
            <div class="col-12 col-md-6 text-end">
                <button class="btn btn-tosca btn-sm">
                    <i class="bi bi-plus"></i> Add Charges
                </button>
                <button class="btn btn-outline-soft btn-sm ms-2">
                    <i class="bi bi-chevron-up" style="color:#00BFCB;"></i>
                </button>
            </div>
        </div>
        
        <div class="table-responsive card">
            <table class="table table-sm align-middle">
                <thead class="table-light">
                    <tr>
                        <th>Order No</th>
                        <th>Service Description</th>
                        <th class="text-end">Qty</th>
                        <th class="text-end">Unit Price</th>
                        <th class="text-end">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(c,i) in rows" :key="i">
                        <td>{{ c.order_no }}</td>
                        <td>{{ c.service_desc }}</td>
                        <td class="text-end">{{ c.qty }}</td>
                        <td class="text-end">USD {{ c.unit_price }}</td>
                        <td class="text-end">USD {{ c.total }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import UiSectionTitle from '@/components/atoms/UiSectionTitle.vue'

defineProps({ rows: { type:Array, default:()=>[] } })
</script>

<style>
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
</style>