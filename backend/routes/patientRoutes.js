import express from "express";
import { PatientController } from "../controllers/patientController.js";

const router = express.Router();
const patientController = new PatientController();

router.get("/", patientController.getAllPatients);
router.post("/", patientController.createPatient);
router.get("/:patientId", patientController.getPatientById);
router.put("/:patientId", patientController.updatePatient);
router.delete("/:patientId", patientController.deletePatient);

export default router;
