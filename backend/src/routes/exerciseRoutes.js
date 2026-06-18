import express from 'express';
import { getExercisesCatalog, logExerciseActivity, getExerciseLogs } from '../controllers/exerciseController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getExercisesCatalog);
router.route('/log')
  .get(getExerciseLogs)
  .post(logExerciseActivity);

export default router;
