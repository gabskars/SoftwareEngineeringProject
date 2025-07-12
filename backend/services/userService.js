import UserRepository from "../repository/userRepository.js";

const repository = new UserRepository();

export default class UserService {
  async createUser(userData) {
    try {
      const newUser = await repository.createUser(userData);
      return newUser;
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  async loginUser(email, senha) {
    try {
      const { token, user } = await repository.loginUser(email, senha);
      return { token, user };
    } catch (error) {
      throw new Error(`Erro ao fazer login: ${error.message}`);
    }
  }

  async getUserById(userId) {
    try {
      return await repository.getUserById(userId);
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }
}
