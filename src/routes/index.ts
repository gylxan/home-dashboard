import {Router} from 'express';
const router = Router();
import projectRoutes from './projects';

// Define routes to use
router.use('/projects', projectRoutes);

export default router;