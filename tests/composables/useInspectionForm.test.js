import { useInspectionForm } from '@/composables/useInspectionForm'

describe('useInspectionForm', () => {
  it('validate fails when required empty', () => {
    const { validate, errors } = useInspectionForm()
    const ok = validate()
    expect(ok).toBe(false)
    expect(errors.value).toHaveProperty('service_type')
    expect(errors.value).toHaveProperty('scope_of_work')
    expect(errors.value).toHaveProperty('location')
    expect(errors.value).toHaveProperty('customer')
    expect(errors.value).toHaveProperty('date_submitted')
    expect(errors.value).toHaveProperty('related_to')
  })

  it('buildPayload formats date and sets status New', () => {
    const { form, validate, buildPayload } = useInspectionForm()
    form.service_type = 'New Arrival'
    form.scope_of_work = 'Inspection'
    form.location = 'MHPC'
    form.customer = 'PT Santosa'
    form.related_to = 'RRIN-2025-0002'
    form.date_submitted = '2025-01-03'

    expect(validate()).toBe(true)
    const payload = buildPayload()
    expect(payload.status).toBe('New')
    expect(payload.date_submitted).toBe('03 Jan 25')
    expect(payload.id).toBeTruthy()
  })
})
