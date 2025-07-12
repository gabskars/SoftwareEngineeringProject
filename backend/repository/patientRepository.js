import prisma from "../prismaClient.js";

export default class PatientRepository {
  async getAllPatients() {
    try {
      return await prisma.paciente.findMany({});
    } catch (error) {
      console.error("Error ao buscar os pacientes:", error);
      throw error;
    }
  }
  async createPatient(data) {
    try {
      const newPatient = await prisma.paciente.create({
        data: {
          nome: data.nome,
          cpf: data.cpf,
          dataNascimento: data.dataNascimento,
          sexo: data.sexo,
          telefone: data.telefone,
          email: data.email,
          endereco: data.endereco,
          bairro: data.bairro,
          cidade: data.cidade,
          estado: data.estado,
          nis: data.nis,
        },
      });

      return newPatient;
    } catch (error) {
      console.error("Erro ao criar paciente:", error);
      throw error;
    }
  }
  async getPatientById(patientId) {
    try {
      const patient = await prisma.paciente.findUnique({
        where: { id: parseInt(patientId) },
      });

      return patient;
    } catch (error) {}
  }
  async updatePatient(patientId, patientData) {
    try {
      const updatedPatient = await prisma.paciente.update({
        where: { id: parseInt(patientId) },
        data: patientData,
      });
      return updatedPatient;
    } catch (error) {
      console.error("Erro ao editar paciente:", error);
      throw error;
    }
  }
  async deletePatient(patientId) {
    try {
      const deletedPatient = await prisma.paciente.delete({
        where: { id: parseInt(patientId) },
      });
      return deletedPatient;
    } catch (error) {
      console.error("Erro ao deletar paciente:", error);
      throw error;
    }
  }
}
