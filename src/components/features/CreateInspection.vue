<template>
    <div>
        <header class="mb-4">
            <h1 class="h4 mb-1">Create Yard Services</h1>
            <Breadcrumb :items="['Operation', 'Yard Services', 'Create Yard Service']" />
        </header>
        <CreateInspectionForm
        ref="formRef"
        @submit="handleSubmit"
        @draft="handleDraft"
        />
        <div class="d-flex gap-2 mt-3 justify-content-end">
            <button class="btn btn-sm">Cancel</button>
            <button class="btn btn-outline-secondary btn-sm" @click="triggerDraft">Save as Draft</button>
            <button class="btn btn-primary btn-sm" @click="triggerSubmit">Submit</button>
        </div>
    </div>
</template>

<script setup>
import CreateInspectionForm from '../organism/CreateInspectionForm.vue';
import Breadcrumb from '../atoms/Breadcrumb.vue'
import { ref } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()

const formRef = ref()

async function triggerSubmit() {
    const f = formRef.value
    if (!f) return
    const ok = f.validate()
    if (!ok) return
    const payload = f.buildPayload()
    await store.dispatch('createInspection', payload)
    router.push({ path: '/inspections', query: { created: '1' } })
}

function triggerDraft() {
    formRef.value?.onSaveDraft()
}

function handleSubmit(payload) {
  console.log('Final payload ready to send:', payload)
}

function handleDraft(draftData) {
  console.log('Draft data:', draftData)
}
</script>