const dbUser = process.env.DB_USER; // Coletar usuário do DB
const dbPass = process.env.DB_PASS; // Coletar senha do DB

export default {
  port: 4000,
  // Mudar aqui a conexão do banco
  dbUri: `mongodb+srv://${dbUser}:${dbPass}@cluster0.zmaydic.mongodb.net/dbUsers?retryWrites=true&w=majority`,
  env: "development",
};
