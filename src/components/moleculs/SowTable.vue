<template>
    <div class="">
        <UiSectionTitle title="Scope of Work"/>
        <div v-for="(grp, i) in groups" :key="i" class="mb-3 mt-2 card">
            <h6 class="fw-semibold mb-2 p-2">{{ grp.template || 'Untitled SOW' }}</h6>
            <div class="table-responsive">
                <table class="table table-sm align-middle">
                    <thead class="table-light">
                        <tr><th>Service Type</th><th>Scope Name</th><th>Scope Description</th></tr>
                    </thead>
                    <tbody>
                        <tr v-for="(w,j) in grp.works" :key="j">
                            <td>Inspection</td>
                             <td>
                                <StatusBadge :text="w.name"/>
                             </td>
                            <td>{{ w.description || '-' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import StatusBadge from '../atoms/StatusBadge.vue';
import UiSectionTitle from '@/components/atoms/UiSectionTitle.vue'

defineProps({ groups: { type:Array, default:()=>[] } })
</script>
