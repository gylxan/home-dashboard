import { Router } from "express";
const router = Router();
import boardRoutes from "./boards";

// Define routes to use
router.use("/boards", boardRoutes);

export default router;
