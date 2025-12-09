import express from "express";
import { createServer } from "@vercel/node";

const app = express();

// Sua rota antiga
app.get("/", (req, res) => {
  res.json({
    status: "online",
    mensagem: "API da Prática Extensionista IV rodando com sucesso!"
  });
});

// Outras rotas podem ser criadas aqui
// exemplo:
// app.get("/teste", (req, res) => res.json({ ok: true }));

export default createServer(app);
