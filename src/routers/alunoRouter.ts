// src/routers/alunoRouter.ts (updated)
import { Router } from "express";
import { getAlunoById, getAlunoEnrollments } from "../controllers/alunoController";

const router = Router();

router.get("/:id", getAlunoById);
router.get("/:id/enrollments", getAlunoEnrollments);

export default router;