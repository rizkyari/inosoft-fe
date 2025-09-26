<template>
    <tr>
        <td>
            <input class="form-control" v-model="props.item.description" placeholder="Describe item" />
            <small v-if="props.error" class="text-danger">{{ props.error }}</small>
        </td>
        <td><input class="form-control" v-model="props.item.ownership" /></td>
        <td><input class="form-control" v-model="props.item.lot" /></td>
        <td><input type="number" min="0" class="form-control" v-model.number="props.item.qty" /></td>
        <td>
            <div class="input-group">
                <input type="number" min="0" max="100" class="form-control" v-model.number="props.item.progress" />
                <span class="input-group-text">%</span>
            </div>
        </td>
        <td class="text-end">
            <button class="btn btn-outline-secondary btn-sm" @click="emit('remove')">
                <i class="bi bi-trash"></i>
            </button>
        </td>
    </tr>
</template>

<script setup>
const props = defineProps({ item: Object, index: Number, error: String })
const emit = defineEmits(['remove'])
</script>
