const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Permitir JSON
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
    res.send({
        status: "online",
        mensagem: "API da Prática Extensionista IV rodando com sucesso!"
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log("Servidor iniciado na porta " + PORT);
});
