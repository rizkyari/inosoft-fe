<template>
    <div>
        <header class="mb-4">
            <h1 class="h4 mb-1">Yard Services Detail</h1>
            <div class="row">
                <div class="col-12 col-md-8">
                    <Breadcrumb :items="['Operation', 'Yard Services', 'Yard Services Detail']" />
                </div>
                <div class="col-12 col-md-4 text-end">
                    <UiSelect v-model="documents" :options="options" placeholder="Export / Share Documents..." />
                </div>
            </div>
        </header>
        <InspectionDetailView/>
    </div>
</template>

<script setup>
import InspectionDetailView from '../organism/InspectionDetailView.vue';
import Breadcrumb from '../atoms/Breadcrumb.vue';
import UiSelect from '../atoms/UiSelect.vue';
import { ref } from 'vue';


const documents = ref('')
const options = ref(['Export','Share'])
</script>