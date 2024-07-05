import express from "express";

import { createSolution , deleteSolution , searchSolutions , getAllSolutions} from "../controllers/solutionControllers.js";
import protectRoute from "../middlewares/protectRoute.js";


const router = express.Router()

router.post("/create", protectRoute, createSolution);
router.delete("/:id", protectRoute  , deleteSolution);
router.post("/search", protectRoute, searchSolutions);
router.get('/',protectRoute,getAllSolutions)



export default router;