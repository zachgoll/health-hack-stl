import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Call } from '.'

const app = () => express(apiRoot, routes)

let call

beforeEach(async () => {
  call = await Call.create({})
})

test('POST /calls 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ primary: 'test', secondary: 'test', patient: 'test', frequency: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.primary).toEqual('test')
  expect(body.secondary).toEqual('test')
  expect(body.patient).toEqual('test')
  expect(body.frequency).toEqual('test')
})

test('GET /calls 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /calls/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${call.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(call.id)
})

test('GET /calls/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /calls/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${call.id}`)
    .send({ primary: 'test', secondary: 'test', patient: 'test', frequency: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(call.id)
  expect(body.primary).toEqual('test')
  expect(body.secondary).toEqual('test')
  expect(body.patient).toEqual('test')
  expect(body.frequency).toEqual('test')
})

test('PUT /calls/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ primary: 'test', secondary: 'test', patient: 'test', frequency: 'test' })
  expect(status).toBe(404)
})

test('DELETE /calls/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${call.id}`)
  expect(status).toBe(204)
})

test('DELETE /calls/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
