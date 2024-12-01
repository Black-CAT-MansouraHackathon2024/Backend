import { createPrototypeController,getPrototypeByDeveloperController,getPrototypeController,getPrototypesByIdeaController,getPrototypesController
 } from "../controllers/prototype.controller,";
import { Router } from "express";

const router = Router();

router.post('/create', createPrototypeController);
router.get('/getPrototypes', getPrototypesController);
router.get('/getPrototype/:id', getPrototypeController);
router.get('/getPrototypesByIdea/:id', getPrototypesByIdeaController);
router.get('/getPrototypeByDeveloper/:id', getPrototypeByDeveloperController);

export default router;