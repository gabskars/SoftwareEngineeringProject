import PatientService from "../services/patientServices.js";

const service = new PatientService();

export class PatientController {
  async getAllPatients(req, res) {
    try {
      const patients = await service.getAllPatients();
      res.status(200).json(patients);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
      res.status(500).json({
        msg: "Erro ao buscar pacientes",
        error: error.message || error.toString(),
      });
    }
  }
  async createPatient(req, res) {
    try {
      const patient = await service.createPatient();
      res.status(200).json(patient);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: "Erro ao criar paciente",
        error: error.message || error.toString(),
      });
    }
  }
  async getPatientById(req, res) {
    try {
      const { patientId } = req.params;
      const patient = await service.getPatientById(patientId);
      res.status(200).json(patient);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
      res.status(500).json({
        msg: "Erro ao buscar paciente",
        error: error.message || error.toString(),
      });
    }
  }
}
