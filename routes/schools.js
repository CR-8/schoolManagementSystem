import { addSchool , listSchool , listAllSchools, findSchool} from "../controllers/schools.js";  // Added findSchool import
import express from "express";

const router = express.Router();

router.post("/addSchool", addSchool);
router.get("/listAllSchools", listAllSchools);
router.get("/listSchool", listSchool);
router.get("/findSchool/:id", findSchool);

export default router;