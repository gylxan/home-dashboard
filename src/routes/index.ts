import { Router } from 'express';
const router = Router();
import boardRoutes, { ROUTE as BOARD_ROUTE } from './boards';
import skipboRoutes, { ROUTE as SKIPBO_ROUTE } from './skipbo';

// Define routes to use
router.use(BOARD_ROUTE, boardRoutes);
router.use(SKIPBO_ROUTE, skipboRoutes);

export default router;
