import { createPrototypeController,getPrototypeByDeveloperController,getPrototypeController,getPrototypesByIdeaController,getPrototypesController
 } from "../controllers/prototype.controller,";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";


const router = Router();

router.post('/create',authMiddleware, createPrototypeController);
router.get('/getPrototypes',authMiddleware, getPrototypesController);
router.get('/getPrototype/:id',authMiddleware, getPrototypeController);
router.get('/getPrototypesByIdea/:id',authMiddleware, getPrototypesByIdeaController);
router.get('/getPrototypeByDeveloper/:id',authMiddleware, getPrototypeByDeveloperController);

export default router;