<template>
    <div class="container p-2 p-md-4">
        <!-- FORM TOP -->
        <div class="row g-3 align-items-stretch">

            <!-- LEFT -->
            <div class="col-12 col-lg-8">
                <div class="row g-3">
                    <div class="col-12 col-md-3">
                        <label class="form-label"><span class="text-danger me-1">*</span>Service Type</label>
                        <UiSelect v-model="form.service_type" :options="types" placeholder="Select service type..."/>
                        <small v-if="errors.service_type" class="text-danger">{{ errors.service_type }}</small>
                    </div>

                    <div class="col-12 col-md-9">
                        <label class="form-label"><span class="text-danger me-1">*</span>Scope of Work</label>
                        <div class="d-flex flex-wrap gap-2">
                            <div class="flex-grow-1 min-w-0">
                                <UiSelect v-model="form.scope_of_work" :options="scopes" placeholder="Select scope of work..."/>
                            </div>
                            <button type="button" class="btn btn-outline-soft">
                                <i class="bi bi-pencil-fill icon-tosca"></i>
                            </button>
                            <button type="button" class="btn btn-tosca text-white">+ Create new SOW</button>
                        </div>
                        <small v-if="errors.scope_of_work" class="text-danger">{{ errors.scope_of_work }}</small>
                    </div>

                    <div class="col-12">
                        <label class="form-label">Scope Included</label>
                        <textarea class="form-control" rows="3"></textarea>
                    </div>

                    <div class="col-12 col-md-4">
                        <label class="form-label"><span class="text-danger me-1">*</span>Location</label>
                        <UiSelect v-model="form.location" :options="locations" placeholder="Select location..."/>
                        <small v-if="errors.location" class="text-danger">{{ errors.location }}</small>
                    </div>

                    <div class="col-12 col-md-4">
                        <label class="form-label"><span class="text-danger me-1">*</span>Date Submitted</label>
                        <input type="date" class="form-control" v-model="form.date_submitted"/>
                        <small v-if="errors.date_submitted" class="text-danger">{{ errors.date_submitted }}</small>
                    </div>

                    <div class="col-12 col-md-4">
                        <label class="form-label"><span class="text-danger me-1">*</span>Related To</label>
                        <UiSelect v-model="form.related_to" :options="related_to" placeholder="Select Related to..."/>
                        <small v-if="errors.related_to" class="text-danger">{{ errors.related_to }}</small>
                    </div>

                    <div class="col-12 border-bottom pt-2">Custom Field Header</div>

                    <div class="col-12 col-md-4">
                        <label class="form-label">D/C Code</label>
                        <UiInput v-model="form.dc_code"/>
                    </div>
                </div>
            </div>

            <!-- RIGHT -->
            <div class="col-12 col-lg-4 border-start h-100">
                <div class="row g-3">
                    <div class="col-12 d-flex justify-content-between align-items-center">
                        <div>
                            <label class="form-label mb-1"><span class="text-danger me-1">*</span>Charge to Customer</label>
                            <div class="form-check form-switch m-0">
                                <input class="form-check-input my-custom-switch" type="checkbox" v-model="form.charge_customer">
                            </div>
                        </div>
                        <div>
                            <label class="form-label mb-1">Status</label>
                            <div class="d-flex align-items-center gap-2">
                                <span class="status-pill">{{ form.status }}</span>
                                <i class="bi bi-caret-down icon-tosca"></i>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <label class="form-label"><span class="text-danger me-1">*</span>Customer Name</label>
                        <UiSelect v-model="form.customer" :options="customers" placeholder="Select customer..."/>
                        <small v-if="errors.customer" class="text-danger">{{ errors.customer }}</small>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-3">
            <div class="my-3 p-4">
                <div class="d-flex justify-content-between fw-semibold mb-2">
                    <div>Order Information</div>
                    <div class="d-flex  align-items-center gap-3">
                        <button type="button" class="btn btn-outline-secondary btn-sm">
                            <i class="bi bi-trash"></i> Delete
                        </button>
                        <button type="button" class="btn btn-outline-secondary btn-sm">
                            <i class="bi bi-plus"></i> Add Item
                        </button>
                    </div>
                </div>
                <div class="">
                    <div class="row border p-1 bg-secondary text-white">
                        <div class="col-12 col-md-8">Item Description</div>
                        <div class="col-12 col-md-4">Qty</div>
                    </div>

                    <div class="row g-3 gx-md-4 py-3 align-items-center border border-top-0 border-bottom-0">
                        <div class="col-8  col-md-8 mt-3">
                            <div class="row g-2 align-items-center">
                                <div class="col-auto">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="...">
                                </div>
                                <div class="col">
                                    <UiSelect v-model="form.eco" :options="locations" placeholder="Select location..." />
                                    <small v-if="errors.eco" class="text-danger">{{ errors.eco }}</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 mt-3">
                            <div class="row g-2">
                                <div class="col">
                                    <UiInput v-model="form.request_no" placeholder="Enter Qty"/>
                                    <small v-if="errors.request_no" class="text-danger">{{ errors.request_no }}</small>
                                </div>
                                <div class="col-auto">
                                    <button class="btn btn-outline-soft">
                                        <i class="bi bi-chevron-down" style="color:#00BFCB;"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row border border-top-0 border-bottom-0">
                        <div class="col col-md-1 mt-3">
                        </div>
                        <div class="col-12 col-md-6 mt-3">
                            <div class="row g-2">
                                <div class="col-6 col-md-3">Lot Selection</div>
                                <div class="col-6 col-md-3">Allocation</div>
                                <div class="col-6 col-md-3">Owner</div>
                                <div class="col-6 col-md-3">Condition</div>
                            </div>
                        </div>
                        <div class="col-12 col-md-5 mt-3">
                            <div class="row g-2">
                                <div class="col-6 col-md-3">Avail. Qty</div>
                                <div class="col-6 col-md-3">Qty Req.</div>
                                <div class="col-12 col-md-6">Inspection Required</div>
                            </div>
                        </div>
                    </div>
                    <div class="row g-3 gx-md-4 py-3 align-items-start border border-top-0 pb-3">
                        <div class="col-12 col-md-1 d-none d-md-flex align-items-end justify-content-end">
                            <i class="bi bi-diagram-2-fill"  style="font-size: 32px;"></i>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="row g-2 mt-2">
                                <div class="col-6 col-lg-3">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Recipient’s username" aria-label="Recipient’s username" aria-describedby="basic-addon2">
                                        <span class="input-group-text" id="basic-addon2"><i class="bi bi-search"></i></span>
                                    </div>
                                </div>
                                <div class="col-6 col-lg-3">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Recipient’s username" aria-label="Recipient’s username" aria-describedby="basic-addon2">
                                        <span class="input-group-text" id="basic-addon2"><i class="bi bi-search"></i></span>
                                    </div>
                                </div>
                                <div class="col-6 col-lg-3">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Recipient’s username" aria-label="Recipient’s username" aria-describedby="basic-addon2">
                                        <span class="input-group-text" id="basic-addon2"><i class="bi bi-search"></i></span>
                                    </div>
                                </div>
                                <div class="col-6 col-lg-3">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Recipient’s username" aria-label="Recipient’s username" aria-describedby="basic-addon2">
                                        <span class="input-group-text" id="basic-addon2"><i class="bi bi-search"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-5">
                            <div class="row g-2 mt-2">
                                <div class="col-6 col-md-3">
                                    <UiInput v-model="form.request_no" placeholder="Enter Qty"/>
                                </div>
                                <div class="col-6 col-md-3">
                                    <UiInput v-model="form.request_no" placeholder="Enter Qty"/>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="d-flex align-items-center gap-2">
                                        <input class="form-check-input me-1" type="checkbox" id="checkboxNoLabel" value="" aria-label="...">
                                        <UiInput v-model="form.request_no" placeholder="Enter Qty" class="me-1"/>
                                        <button class="btn btn-outline-soft me-1">
                                            <i class="bi bi-dash" style="color:#00BFCB;"></i>
                                        </button>
                                        <button class="btn btn-outline-soft">
                                            <i class="bi bi-plus" style="color:#00BFCB;"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- NOTE -->
        <div class="mt-4">
            <label class="form-label">Note to Yard</label>
            <textarea class="form-control" rows="4" v-model="form.note" placeholder="Enter note"></textarea>
        </div>
    </div>
</template>


<script setup>
import UiInput from '../atoms/UiInput.vue'
import UiSelect from '../atoms/UiSelect.vue'

import { useInspectionForm } from '../../composables/useInspectionForm'
import { useDropdowns } from '../../composables/useDropdown'

const { locations, types, scopes, customers, related_to  } = useDropdowns()
const { form, errors, validate, buildPayload } = useInspectionForm()
const emit = defineEmits(['submit', 'draft'])

function onSubmit() {
  if (!validate()) return null
  return buildPayload()
}

function onSaveDraft() {
  emit('draft', { ...form })
}

defineExpose({ onSubmit, onSaveDraft, validate, buildPayload })
</script>

<style>
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

.border-left-dotted {
    border-style: dotted;
    border-width: 1px;
    border-color: #ccc;
}

.my-custom-switch:checked {
      background-color: #00AAB6;
      border-color: #00AAB6;
}
</style>