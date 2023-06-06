import mongoose from "mongoose";
import config from "config";

// Logger
import Logger from "./logger";

async function connectDB() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    Logger.info("Conectou ao DB!");
  } catch (e) {
    Logger.error("Não foi possível se conectar com o DB!");
    Logger.error(`Erro: ${e}`);
  }
}

export default connectDB;
