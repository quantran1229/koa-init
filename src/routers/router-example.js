import Router from 'koa-router';

import {
    validateToken
} from '../middlewares/token-authorization'

import {
    validate
} from './../middlewares/validatorExample'

import {
    helloWorld,
} from '../controllers/example'

let router = new Router();

router.get('/api/test', helloWorld)

export default router;