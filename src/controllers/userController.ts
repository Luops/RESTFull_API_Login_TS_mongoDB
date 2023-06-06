// Lógica do backend
import { Request, Response } from "express";

// Model
import { UserModel } from "../models/User";

// Logger
import Logger from "../../config/logger";

import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function createUser(req: Request, res: Response) {
  // return res.status(200).send("Deu certo o controller"); // Retornar a mensagem quando entrar na rota pelo POSTMAN
  try {
    const data = req.body; // Receber todos dados da requisição http (tudo em relação aos dados do usuário)
    // Gerar o hash da senha
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(data.password, salt);

    // Substituir a senha original pelo hash
    data.password = hash;

    // Linkar o id do usuário com o uuidv4
    data.id = uuidv4();

    const user = await UserModel.create(data); // Aguardando um input do model, e criar o usuário com os dados da requisição
    return res.status(201).json(user); // Retornar o status 201 (algo criado no sistema) e mandar os dados via json
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
  }
}

export async function login(req: Request, res: Response) {
  try {
    // Coletar somente email
    const userEmail: String = req.body.email; // Receber todos dados da requisição http (tudo em relação aos dados do usuário)

    // Verificar se o email existe no banco de dados de acordo com a requisição, levando a requisição para o email do model
    const checkEmail = await UserModel.findOne({ email: userEmail });

    if (!checkEmail) {
      return res.status(404).json({ message: "Email não encontrado!" });
    }

    // O email existe no banco de dados, continue com a lógica de login

    return res.status(200).json({ message: "Email encontrado." });
  } catch (error) {
    Logger.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro no servidor." });
  }
}
