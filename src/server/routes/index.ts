import * as express from 'express';
import chirpsRouter from './chrips';
import usersRouter from './user';

const router = express.Router();

router.use('/chrips', chirpsRouter);
router.use('/users', usersRouter);

export default router;