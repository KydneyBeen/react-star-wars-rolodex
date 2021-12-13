import { Router } from 'express';
import { listPeople, onePerson } from './routes/exports';

const router = Router();

router.get('/list', listPeople);
router.get('/person/:person', onePerson);

export default router;
