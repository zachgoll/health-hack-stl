import { success, notFound } from '../../services/response/'
import { Call } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Call.create(body)
    .then((call) => call.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Call.find(query, select, cursor)
    .then((calls) => calls.map((call) => call.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Call.findById(params.id)
    .then(notFound(res))
    .then((call) => call ? call.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Call.findById(params.id)
    .then(notFound(res))
    .then((call) => call ? Object.assign(call, body).save() : null)
    .then((call) => call ? call.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Call.findById(params.id)
    .then(notFound(res))
    .then((call) => call ? call.remove() : null)
    .then(success(res, 204))
    .catch(next)
