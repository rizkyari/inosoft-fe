<template>
    <div class="card p-3">
        <div class="">
            <div class="row g-3">
                <div class="col-12 col-lg-2 p-2">
                    <div class=""><UiKvp label="Request No." :value="data.request_no"/></div>
                </div>
                <div class="col-12 col-lg-7 p-2">
                    <div class="row g-3 mb-3">
                        <UiKvp class="col-6 col-xl-3" label="Service Type" :value="data.type" />
                        <UiKvp class="col-6 col-xl" label="Location" :value="data.type"/>
                    </div>
                    <div class="row mb-3">
                        <UiKvp class="col-6 col-xl-3" label="Date Submitted" :value="data.type"/>
                        <UiKvp class="col-6 col-xl-3"  label="Estimated Completion Date" :value="data.type"/>
                        <UiKvp class="col-6 col-xl" label="Related To" :value="data.type"/>
                    </div>
                    <div class="mb-2">
                        <div class="text-muted small border-bottom mb-2">Custom Field Header</div>
                        <UiKvp label="Date Submitted" :value="data.type" />
                    </div>
                </div>
                <div class="col-12 col-lg-3 border-start">
                    <div class="row g-3 p-2">
                        <div class="col-12 col-lg-6">
                            <div class="" style="font-size: 12px;">Charge to customer</div>
                            <div class="fw-semibold"><slot>{{ value ?? '—' }}</slot></div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="" style="font-size: 12px;">Status</div>
                            <StatusBadge :text="data.type ?? '—'"/>
                        </div>
                    </div>
                    <div class="text-end mt-3">
                        <button class="btn btn-light">
                            <i class="bi bi-x-circle"></i>
                            Terminate
                        </button>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script setup>
import UiKvp from '../atoms/UiKvp.vue'
import StatusBadge from '../atoms/StatusBadge.vue';

defineProps({ data: { type:Object, required:true } })
</script>
