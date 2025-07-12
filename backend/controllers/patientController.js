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
      const data = req.body;
      const patient = await service.createPatient(data);
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
  async updatePatient(req, res) {
    try {
      const { patientId } = req.params;
      const patientData = req.body;
      const updatedPatient = await service.updatePatient(
        patientId,
        patientData
      );
      if (!updatedPatient) {
        return res
          .status(404)
          .json({ msg: "Paciente não encontrado para edição" });
      }
      res.status(200).json(updatedPatient);
    } catch (error) {
      console.error("Erro ao editar paciente:", error);
      res.status(500).json({
        msg: "Erro ao editar paciente",
        error: error.message || error.toString(),
      });
    }
  }
  async deletePatient(req, res) {
    try {
      const { patientId } = req.params;
      const deletedPatient = await service.deletePatient(patientId);
      if (!deletedPatient) {
        return res
          .status(404)
          .json({ msg: "Paciente não encontrado para deleção" });
      }
      res.status(200).json({
        msg: "Paciente deletado com sucesso",
        patient: deletedPatient,
      });
    } catch (error) {
      console.error("Erro ao deletar paciente:", error);
      res.status(500).json({
        msg: "Erro ao deletar paciente",
        error: error.message || error.toString(),
      });
    }
  }
}
