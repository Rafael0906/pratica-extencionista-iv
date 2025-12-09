export default function handler(req, res) {
  res.status(200).json({
    status: "online",
    mensagem: "API da Prática Extensionista IV rodando com sucesso!"
  });
}
