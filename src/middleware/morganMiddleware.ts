// O Morgan é um middleware para registro de solicitações HTTP em aplicativos Node.js
import morgan, { StreamOptions } from "morgan";

import config from "config";

import Logger from "../../config/logger";

// Criar variável para ler req HTTP
const stream: StreamOptions = {
  write: (message) => Logger.http(message),
};

// Deixar imprimir as mensagens caso chegue na produção
const skip = () => {
  const env = config.get<string>("env") || "development";
  return env !== "development"; // retornar caso for diferente de um ambiente de desenvolvimento
};

// Formato da mensagem da requisição
const morganMiddleware = morgan(
  ":method :url :status :res[content-lenght] - :response-time ms",
  { stream, skip } // sabe como imprimir a mensagem por causa do stream e saben quando por causa do skip (somente quando for development)
);

export default morganMiddleware;
