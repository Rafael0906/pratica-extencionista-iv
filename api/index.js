// /api/index.js

// Dados iniciais da aplicação
let users = [
  {
    name: "Jonathan Teles Roberto",
    email: "jonathan@exemplo.com",
    role: "admin",
    avatar: "https://i.pravatar.cc/100?img=12",
    bio: "Administrador do sistema.",
    active: true
  },
  {
    name: "Rafael de Oliveira",
    email: "rafael@exemplo.com",
    role: "developer",
    avatar: "https://i.pravatar.cc/100?img=32",
    bio: "Desenvolvedor principal.",
    active: true
  }
];

// Endpoint principal
export default function handler(req, res) {
  // Contagem de usuários ativos
  const activeUsers = users.filter(u => u.active).length;

  // Estatísticas da infraestrutura
  const stats = {
    ec2: { type: "t2.micro", status: "Ativa" },
    rds: { type: "MySQL 8.0", connections: 12 },
    s3: { usage: "2,3 GB", percent: 45 },
    users: { total: users.length, active: activeUsers }
  };

  // Resposta JSON
  res.status(200).json({
    status: "online",
    mensagem: "API da Prática Extensionista IV rodando com sucesso!",
    stats,
    users
  });
}
