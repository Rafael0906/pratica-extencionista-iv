// ============================================
// ARQUIVO: script.js
// Sistema de Gerenciamento de Usuários - CloudSystem
// Práticas Extensionistas IV
// Integrantes: Jonathan Teles Roberto e Rafael de Oliveira
// ============================================

// Dados mockados de usuários (simulando API)
const mockUsers = [
    {
        id: 1,
        name: "Jonathan Teles Roberto",
        email: "jonathan@cloudsystem.com",
        role: "admin",
        bio: "Desenvolvedor backend com foco em arquitetura cloud.",
        avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
        id: 2,
        name: "Rafael de Oliveira",
        email: "rafael@cloudsystem.com",
        role: "developer",
        bio: "Especialista em frontend e UI/UX responsivo.",
        avatar: "https://i.pravatar.cc/1502?img="
    },
    {
        id: 3,
        name: "Maria Silva",
        email: "maria@cloudsystem.com",
        role: "user",
        bio: "Analista de sistemas com experiência em AWS.",
        avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
        id: 4,
        name: "Carlos Santos",
        email: "carlos@cloudsystem.com",
        role: "user",
        bio: "Gerente de projetos cloud.",
        avatar: "https://i.pravatar.cc/150?img=4"
    },
    {
        id: 5,
        name: "Ana Costa",
        email: "ana@cloudsystem.com",
        role: "admin",
        bio: "Arquiteta de soluções AWS certificada.",
        avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
        id: 6,
        name: "Pedro Almeida",
        email: "pedro@cloudsystem.com",
        role: "developer",
        bio: "DevOps engineer com foco em CI/CD.",
        avatar: "https://i.pravatar.cc/150?img=6"
    }
];

// ============================================
// VARIÁVEIS GLOBAIS E ELEMENTOS DOM
// ============================================

// Estado da aplicação
let users = [...mockUsers];

// Elementos DOM
let menuToggle, navMenu, userGrid, loading, userForm, userCount, activeUsers, screenSize;

// ============================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplicação iniciada - CloudSystem');
    
    // Inicializar referências dos elementos DOM
    initializeDOMReferences();
    
    // Configurar funcionalidades
    setupMenuToggle();
    loadUsers();
    updateStats();
    updateScreenSize();
    
    // Configurar listeners de eventos
    setupEventListeners();
});

// ============================================
// FUNÇÕES DE INICIALIZAÇÃO
// ============================================

function initializeDOMReferences() {
    menuToggle = document.getElementById('menuToggle');
    navMenu = document.getElementById('navMenu');
    userGrid = document.getElementById('userGrid');
    loading = document.getElementById('loading');
    userForm = document.getElementById('userForm');
    userCount = document.getElementById('userCount');
    activeUsers = document.getElementById('activeUsers');
    screenSize = document.getElementById('screenSize');
    
    console.log('Elementos DOM carregados:', {
        menuToggle: !!menuToggle,
        navMenu: !!navMenu,
        userGrid: !!userGrid,
        loading: !!loading,
        userForm: !!userForm
    });
}

function setupEventListeners() {
    // Atualizar tamanho da tela quando redimensionar
    window.addEventListener('resize', updateScreenSize);
    
    // Formulário de novo usuário
    if (userForm) {
        userForm.addEventListener('submit', handleAddUser);
    }
    
    // Fechar menu ao clicar fora (para mobile)
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active') && 
            !event.target.closest('.nav-menu') && 
            !event.target.closest('.menu-toggle')) {
            closeMobileMenu();
        }
    });
}

// ============================================
// FUNÇÕES DO MENU RESPONSIVO
// ============================================

function setupMenuToggle() {
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleMobileMenu();
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
}

function closeMobileMenu() {
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

// ============================================
// FUNÇÕES DE GERENCIAMENTO DE USUÁRIOS
// ============================================

function loadUsers() {
    if (!userGrid || !loading) return;
    
    loading.style.display = 'block';
    userGrid.innerHTML = '';
    
    // Simular delay de API (800ms)
    setTimeout(() => {
        if (users.length === 0) {
            userGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <h3>Nenhum usuário cadastrado</h3>
                    <p>Adicione seu primeiro usuário usando o formulário abaixo.</p>
                </div>
            `;
        } else {
            users.forEach(user => {
                const userCard = createUserCard(user);
                userGrid.appendChild(userCard);
            });
        }
        
        loading.style.display = 'none';
        updateStats();
    }, 800);
}

function createUserCard(user) {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.dataset.userId = user.id;
    
    // Determinar classe e texto do perfil
    let roleClass, roleText;
    switch(user.role) {
        case 'admin':
            roleClass = 'role-admin';
            roleText = 'Administrador';
            break;
        case 'developer':
            roleClass = 'role-developer';
            roleText = 'Desenvolvedor';
            break;
        default:
            roleClass = 'role-user';
            roleText = 'Usuário';
    }
    
    card.innerHTML = `
        <div class="user-header">
            <div class="user-avatar">
                <img src="${user.avatar}" alt="${user.name}" loading="lazy">
            </div>
            <h3 class="user-name">${user.name}</h3>
            <p class="user-email">${user.email}</p>
        </div>
        <div class="user-body">
            <div class="user-info">
                <span class="user-role ${roleClass}">${roleText}</span>
                <p class="user-bio">${user.bio}</p>
            </div>
            <div class="user-actions">
                <button class="btn btn-secondary btn-edit" onclick="editUser(${user.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-secondary btn-delete" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash"></i> Remover
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function handleAddUser(event) {
    event.preventDefault();
    
    // Validar formulário
    if (!validateForm()) {
        return;
    }
    
    // Coletar dados do formulário
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const role = document.getElementById('role').value;
    const avatarInput = document.getElementById('avatar').value.trim();
    const bio = document.getElementById('bio').value.trim() || 'Usuário do sistema CloudSystem.';
    
    // Gerar avatar se não fornecido
    const avatar = avatarInput || `https://i.pravatar.cc/150?img=${users.length + 7}&t=${Date.now()}`;
    
    // Criar novo usuário
    const newUser = {
        id: generateUserId(),
        name,
        email,
        role,
        avatar,
        bio,
        createdAt: new Date().toISOString()
    };
    
    // Adicionar à lista
    users.push(newUser);
    
    // Atualizar interface
    loadUsers();
    userForm.reset();
    
    // Feedback ao usuário
    showNotification('Usuário adicionado com sucesso!', 'success');
    
    // Rolar para a lista de usuários
    document.getElementById('usuarios').scrollIntoView({ behavior: 'smooth' });
}

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!name) {
        showNotification('Por favor, informe o nome do usuário.', 'warning');
        document.getElementById('name').focus();
        return false;
    }
    
    if (!email) {
        showNotification('Por favor, informe o e-mail do usuário.', 'warning');
        document.getElementById('email').focus();
        return false;
    }
    
    // Validação simples de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor, informe um e-mail válido.', 'warning');
        document.getElementById('email').focus();
        return false;
    }
    
    return true;
}

function generateUserId() {
    return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
}

function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) {
        showNotification('Usuário não encontrado.', 'warning');
        return;
    }
    
    // Preencher formulário com dados do usuário
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('role').value = user.role;
    document.getElementById('avatar').value = user.avatar;
    document.getElementById('bio').value = user.bio;
    
    // Alterar comportamento do formulário para edição
    const form = document.getElementById('userForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Armazenar ID do usuário sendo editado
    form.dataset.editingUserId = userId;
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Atualizar Usuário';
    
    // Remover listener antigo e adicionar novo para edição
    form.removeEventListener('submit', handleAddUser);
    form.addEventListener('submit', handleUpdateUser);
    
    // Rolar para o formulário
    document.getElementById('config').scrollIntoView({ behavior: 'smooth' });
    
    showNotification(`Editando usuário: ${user.name}`, 'info');
}

function handleUpdateUser(event) {
    event.preventDefault();
    
    const form = event.target;
    const userId = parseInt(form.dataset.editingUserId);
    
    if (!userId) return;
    
    // Coletar dados atualizados
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const role = document.getElementById('role').value;
    const avatar = document.getElementById('avatar').value.trim();
    const bio = document.getElementById('bio').value.trim();
    
    // Encontrar e atualizar usuário
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = {
            ...users[userIndex],
            name,
            email,
            role,
            avatar: avatar || users[userIndex].avatar,
            bio: bio || users[userIndex].bio,
            updatedAt: new Date().toISOString()
        };
        
        // Atualizar interface
        loadUsers();
        form.reset();
        
        // Restaurar comportamento normal do formulário
        delete form.dataset.editingUserId;
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-plus"></i> Adicionar Usuário';
        
        form.removeEventListener('submit', handleUpdateUser);
        form.addEventListener('submit', handleAddUser);
        
        showNotification('Usuário atualizado com sucesso!', 'success');
    }
}

function deleteUser(userId) {
    if (!confirm('Tem certeza que deseja remover este usuário?')) {
        return;
    }
    
    const userName = users.find(u => u.id === userId)?.name || 'Usuário';
    
    // Remover usuário
    users = users.filter(user => user.id !== userId);
    
    // Atualizar interface
    loadUsers();
    showNotification(`"${userName}" removido com sucesso!`, 'warning');
}

// ============================================
// FUNÇÕES DE UTILIDADE
// ============================================

function updateStats() {
    if (userCount) userCount.textContent = users.length;
    if (activeUsers) activeUsers.textContent = users.length;
}

function updateScreenSize() {
    if (!screenSize) return;
    
    const width = window.innerWidth;
    let sizeCategory = '';
    
    if (width >= 1200) {
        sizeCategory = 'Desktop Grande (> 1200px)';
    } else if (width >= 1024) {
        sizeCategory = 'Desktop Médio (1024px - 1199px)';
    } else if (width >= 768) {
        sizeCategory = 'Tablet (768px - 1023px)';
    } else if (width >= 480) {
        sizeCategory = 'Mobile Grande (480px - 767px)';
    } else {
        sizeCategory = 'Mobile Pequeno (< 480px)';
    }
    
    screenSize.textContent = `${width}px - ${sizeCategory}`;
    
    // Adicionar classe ao body para CSS baseado no tamanho
    document.body.classList.remove('mobile-view', 'tablet-view', 'desktop-view');
    if (width < 768) {
        document.body.classList.add('mobile-view');
    } else if (width < 1024) {
        document.body.classList.add('tablet-view');
    } else {
        document.body.classList.add('desktop-view');
    }
}

function showNotification(message, type = 'info') {
    // Remover notificações anteriores
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Ícone baseado no tipo
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    if (type === 'error') icon = 'fa-times-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 4 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 4000);
}

// ============================================
// FUNÇÕES DE DEBUG E TESTE (opcional)
// ============================================

// Função para testar a aplicação
function testApplication() {
    console.log('=== TESTE DA APLICAÇÃO ===');
    console.log('Total de usuários:', users.length);
    console.log('Elementos DOM carregados:', {
        menuToggle: !!menuToggle,
        userGrid: !!userGrid,
        userForm: !!userForm
    });
    console.log('Tamanho da tela:', window.innerWidth, 'x', window.innerHeight);
    console.log('=== FIM DO TESTE ===');
}

// Expor funções globais para uso no HTML
window.editUser = editUser;
window.deleteUser = deleteUser;
window.testApplication = testApplication;

// ============================================
// INICIALIZAÇÃO ADICIONAL (opcional)
// ============================================

// Verificar se há dados salvos no localStorage
function loadFromLocalStorage() {
    try {
        const savedUsers = localStorage.getItem('cloudsystem_users');
        if (savedUsers) {
            users = JSON.parse(savedUsers);
            console.log('Usuários carregados do localStorage:', users.length);
        }
    } catch (error) {
        console.error('Erro ao carregar do localStorage:', error);
    }
}

// Salvar dados no localStorage
function saveToLocalStorage() {
    try {
        localStorage.setItem('cloudsystem_users', JSON.stringify(users));
        console.log('Usuários salvos no localStorage:', users.length);
    } catch (error) {
        console.error("Erro ao salvar no localStorage:", error);
    }
}

// Carregar dados do localStorage quando a página carregar
window.addEventListener('load', function() {
    loadFromLocalStorage();
    
    // Salvar automaticamente quando a página for fechada
    window.addEventListener('beforeunload', saveToLocalStorage);})
