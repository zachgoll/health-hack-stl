import { Call } from '.'

let call

beforeEach(async () => {
  call = await Call.create({ primary: 'test', secondary: 'test', patient: 'test', frequency: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = call.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(call.id)
    expect(view.primary).toBe(call.primary)
    expect(view.secondary).toBe(call.secondary)
    expect(view.patient).toBe(call.patient)
    expect(view.frequency).toBe(call.frequency)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = call.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(call.id)
    expect(view.primary).toBe(call.primary)
    expect(view.secondary).toBe(call.secondary)
    expect(view.patient).toBe(call.patient)
    expect(view.frequency).toBe(call.frequency)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
