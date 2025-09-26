import { ref, reactive } from 'vue'

export function useInspectionForm() {
    const form = reactive({
        request_no: '',
        location: '',
        scope_of_work: [],
        service_type: '',
        date_submitted: '',
        eco: '-',
        related_to: '',
        customer: '',
        third_party_badge: 0,
        status: 'Open',
        items: [{ description:'', ownership:'', lot:'', qty:1, progress:0 }]
    })
    const errors = ref({})

    const toDisplayDate = (iso) => {
        if(!iso) return ''
        const d = new Date(iso)
        const mon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]
        return `${String(d.getDate()).padStart(2,'0')} ${mon} ${String(d.getFullYear()).slice(-2)}`
    }

    const validate = () => {
        errors.value = {}

        const req = (k, v) => (!v || (Array.isArray(v) && v.length===0)) && (errors.value[k] = 'Required')
        req('service_type', form.service_type)
        req('location', form.location)
        req('scope_of_work', form.scope_of_work)
        req('date_submitted', form.date_submitted)
        req('related_to', form.related_to)
        req('customer', form.customer)
        return Object.keys(errors.value).length === 0
    }

    const buildPayload = () => ({
        id: crypto.randomUUID(),
        service_type:form.service_type,
        scope_of_work:form.scope_of_work,
        location: form.location,
        customer:form.customer,
        date_submitted: toDisplayDate(form.date_submitted),
        related_to: form.related_to,
        status:'New',
        items:form.items.map(it => ({
            description: it.description,
            qty: Number(it.qty || 0)
        })),
    })

  return { form, errors, validate, buildPayload }
}