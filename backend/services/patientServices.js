import PatientRepository from "../repository/patientRepository.js";
const repository = new PatientRepository();

export default class PatientService {
  async getAllPatients() {
    try {
      const patients = repository.getAllPatients();
      return patients;
    } catch (error) {
      throw error;
    }
  }
  async createPatient() {
    try {
      return (patient = repository.createPatient());
    } catch (error) {
      throw error;
    }
  }
  async getPatientById(patientId) {
    try {
      return repository.getPatientById(patientId);
    } catch (error) {
      throw error;
    }
  }
  async updatePatient(patientId, patientData) {
    try {
      return await repository.updatePatient(patientId, patientData);
    } catch (error) {
      throw error;
    }
  }
  async deletePatient(patientId) {
    try {
      return await repository.deletePatient(patientId);
    } catch (error) {
      throw error;
    }
  }
}
