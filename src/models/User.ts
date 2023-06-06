import { model, Schema } from "mongoose";

// Dados que compoem o usuário
const userSchema = new Schema(
  {
    id: { type: String },
    name: { type: String },
    age: { type: Number },
    email: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("User", userSchema);
