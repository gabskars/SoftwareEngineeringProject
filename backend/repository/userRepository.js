import prisma from "../prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserRepository {
  async createUser(userData) {
    try {
      const { senha, ...rest } = userData;
      const hashedPassword = await bcrypt.hash(senha, 10);

      const newUser = await prisma.usuario.create({
        data: {
          ...rest,
          senha: hashedPassword,
        },
      });

      return newUser;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  async loginUser(email, senha) {
    try {
      const user = await prisma.usuario.findUnique({
        where: { email: email },
      });

      if (!user) {
        throw new Error("Usuário não encontrado!");
      }

      const isPasswordValid = await bcrypt.compare(senha, user.senha);

      if (!isPasswordValid) {
        throw new Error("Senha incorreta!");
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, admin: user.admin },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return { token, user };
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error(`Erro ao fazer login: ${error.message}`);
    }
  }

  async getUserById(userId) {
    try {
      const user = await prisma.usuario.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("Usuário não encontrado!");
      }

      return user;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }
}
