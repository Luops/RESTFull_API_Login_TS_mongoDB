// winston auxilia nos loggs (erros do sistema)
import winston from "winston";
import config from "config";

// Que tipo é o erro
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Resgatar qual é o ambiente
const level = () => {
  const env = config.get<string>("env") || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn"; // Se for um tipo de erro de desenvolvimento, tratar como debug, se não será um aviso
};

// Cores das frases
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors); // Enviar as cores selecionadas para cada tipo de mensagem

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Formato para tempo
  winston.format.colorize({ all: true }), // Ativar as cores
  winston.format.printf(
    (info) => `${info.timestamp} - ${info.level}: ${info.message}` // Formato da mensagem
  )
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new winston.transports.File({ filename: "logs/all.log" }),
];

// Instancia de log
const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default Logger;
