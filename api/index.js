// /api/index.js

// Dados iniciais da aplicação
const usuarios = [
  {
    nome: "Jonathan Teles Roberto",
    email: "jonathan@exemplo.com",
    funcao: "administrador",
    avatar: "https://i.pravatar.cc/100?img=12",
    bio: "Administrador do sistema.",
    ativo: true
  },
  {
    nome: "Rafael de Oliveira",
    email: "rafael@exemplo.com",
    funcao: "desenvolvedor",
    avatar: "https://i.pravatar.cc/100?img=32",
    bio: "Desenvolvedor principal.",
    ativo: true
  }
];

// Endpoint principal da API
export default function handler(req, res) {
  // Contagem de usuários ativos
  const usuariosAtivos = usuarios.filter(u => u.ativo).length;

  // Estatísticas da infraestrutura
  const estatisticas = {
    ec2: { tipo: "t2.micro", status: "Ativa" },
    rds: { tipo: "MySQL 8.0", conexoes: 12 },
    s3: { uso: "2,3 GB", percentual: 45 },
    usuarios: { total: usuarios.length, ativos: usuariosAtivos }
  };

  // Resposta JSON
  res.status(200).json({
    status: "online",
    mensagem: "API da Prática Extensionista IV rodando com sucesso!",
    estatisticas,
    usuarios
  });
}
