
// script.js

// Função para carregar os dados da API
async function carregarDados() {
    try {
        const res = await fetch("/api");
        const data = await res.json();

        // Atualizar estatísticas
        document.querySelector(".stat-card:nth-child(1) .stat-value").innerText = data.estatisticas.ec2.tipo;
        document.querySelector(".stat-card:nth-child(1) .status-active").innerText = data.estatisticas.ec2.status;

        document.querySelector(".stat-card:nth-child(2) .stat-value").innerText = data.estatisticas.rds.tipo;
        document.querySelector(".stat-card:nth-child(2) .status-active").innerText = data.estatisticas.rds.conexoes;

        document.querySelector(".stat-card:nth-child(3) .stat-value").innerText = data.estatisticas.s3.uso;
        document.querySelector(".stat-card:nth-child(3) .status-warning").innerText = data.estatisticas.s3.percentual + "%";

        document.getElementById("userCount").innerText = data.estatisticas.usuarios.total;
        document.getElementById("activeUsers").innerText = data.estatisticas.usuarios.ativos;

        // Atualizar cards de usuários
        const userGrid = document.querySelector(".user-grid");
        userGrid.innerHTML = ""; // limpa antes de adicionar

        data.usuarios.forEach(usuario => {
            const roleClass = usuario.funcao === "administrador" ? "role-admin" :
                              usuario.funcao === "desenvolvedor" ? "role-developer" : "role-user";

            const card = document.createElement("div");
            card.className = "user-card";
            card.innerHTML = `
                <div class="user-header">
                    <div class="user-avatar">
                        <img src="${usuario.avatar}" alt="${usuario.nome}">
                    </div>
                    <h3 class="user-name">${usuario.nome}</h3>
                    <p class="user-email">${usuario.email}</p>
                </div>
                <div class="user-body">
                    <span class="user-role ${roleClass}">${usuario.funcao}</span>
                    <p class="user-bio">${usuario.bio}</p>
                </div>
            `;
            userGrid.appendChild(card);
        });

    } catch (error) {
        console.error("Erro ao carregar dados da API:", error);
    }
}

// Executa a função ao carregar a página
window.addEventListener("DOMContentLoaded", carregarDados);
