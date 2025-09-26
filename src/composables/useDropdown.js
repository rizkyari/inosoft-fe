import { computed } from "vue";
import { useStore } from "vuex";

export function useDropdowns() {
  const store = useStore()
  const dd = computed(() => store.state.dropdowns || {})

  const toOpts = arr => (arr || []).map(v => ({ label: v, value: v }))

  return {
    types:        computed(() => toOpts(dd.value.service_type)),
    scopes:       computed(() => toOpts(dd.value.scope_templates)),
    locations:    computed(() => toOpts(dd.value.locations)),
    related_to:  computed(() => toOpts(dd.value.related_to)),
    customers:    computed(() => toOpts(dd.value.customers)),
    statuses:     computed(() => toOpts(dd.value.statuses || ['Open','For Review','Completed']))
  }
}
