import prisma from "../prismaClient.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUserRepository = async (userData) => {
  const { senha, ...rest } = userData;

  const hashedPassword = await bcrypt.hash(senha, 10);

  return await prisma.usuario.create({
    data: {
      ...rest,
      senha: hashedPassword,
    },
  });
};

export const loginUserRepository = async (email, senha) => {
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
};
