import express from 'express'
import { get, create } from '../../controllers/v1/user.controller'

const router = express.Router()

router.route('/:uuid?')
  .get(
    get
  )

router.route('/register')
  .post(
    create
  )

export default router