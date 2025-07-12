import UserService from "../services/userService.js";

const service = new UserService();

export class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await service.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).json({
        msg: "Erro ao buscar usuários",
        error: error.message || error.toString(),
      });
    }
  }

  async createUser(req, res) {
    try {
      const userData = req.body;

      const user = await service.createUser(userData);

      res.status(201).json(user);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({
        msg: "Erro ao criar usuário",
        error: error.message || error.toString(),
      });
    }
  }
}
