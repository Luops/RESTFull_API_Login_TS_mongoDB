import { Router, Request, Response } from "express";

// Controller
import { createUser, login } from "./controllers/userController";

const router = Router();

export default router
  .get("/test", (req: Request, res: Response) => {
    res.status(200).send("API Working!!!"); // Resposta no POSTMAN quando der certo (200), ou seja, entrar na rota de test
  })
  .post("/user", createUser) // Criar usuário de acordo com a função do createUser do controller.
  .post("/login", login);
