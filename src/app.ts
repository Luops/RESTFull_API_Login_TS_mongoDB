// ENV variaveis
require("dotenv").config();

import express from "express";
import config from "config";

const app = express();

// JSON middleware
app.use(express.json());

// Conexão do DB
import db from "../config/db";

// Routes
import router from "./router";

// Logger
import Logger from "../config/logger";

// Middlewares
import morganMiddleware from "./middleware/morganMiddleware";
// Toda vez que tiver requisição será acionado o middleware, imprimindo no console
app.use(morganMiddleware);

// Prefixo de URL. Todas as URLs conterão /api/ como algo fixado, e após isto será algo variado (tudo de função do router)
app.use("/api/", router); // Isso é importante para utilizar o POSTMAN

// Variável para a porta da API
const port = config.get<number>("port"); // Pegar o número do "port"

// Configuração da porta do express
app.listen(port, async () => {
  await db(); // Aguardar a conexão com o banco

  Logger.info(`Aplicação rodando na porta: ${port}.`);
});
