import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Call, { schema } from './model'

const router = new Router()
const { primary, secondary, patient, frequency } = schema.tree

/**
 * @api {post} /calls Create call
 * @apiName CreateCall
 * @apiGroup Call
 * @apiParam primary Call's primary.
 * @apiParam secondary Call's secondary.
 * @apiParam patient Call's patient.
 * @apiParam frequency Call's frequency.
 * @apiSuccess {Object} call Call's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Call not found.
 */
router.post('/',
  body({ primary, secondary, patient, frequency }),
  create)

/**
 * @api {get} /calls Retrieve calls
 * @apiName RetrieveCalls
 * @apiGroup Call
 * @apiUse listParams
 * @apiSuccess {Object[]} calls List of calls.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /calls/:id Retrieve call
 * @apiName RetrieveCall
 * @apiGroup Call
 * @apiSuccess {Object} call Call's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Call not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /calls/:id Update call
 * @apiName UpdateCall
 * @apiGroup Call
 * @apiParam primary Call's primary.
 * @apiParam secondary Call's secondary.
 * @apiParam patient Call's patient.
 * @apiParam frequency Call's frequency.
 * @apiSuccess {Object} call Call's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Call not found.
 */
router.put('/:id',
  body({ primary, secondary, patient, frequency }),
  update)

/**
 * @api {delete} /calls/:id Delete call
 * @apiName DeleteCall
 * @apiGroup Call
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Call not found.
 */
router.delete('/:id',
  destroy)

export default router
