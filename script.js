// ==================== GERENCIAMENTO DE TEMA ====================

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        if (themeToggle) themeToggle.textContent = '🌙';
    }
}

// ==================== SELEÇÃO DE PAPEL ====================

function selectRole(role) {
    // Salvar a escolha no localStorage
    localStorage.setItem('userRole', role);
    localStorage.setItem('roleSelected', 'true');
    
    // Marcar que o usuário passou pela introdução na primeira vez
    localStorage.setItem('firstTimeIntro', 'shown');
    
    // Redirecionar para a página principal
    window.location.href = 'main.html';
}

// ==================== MENU HAMBÚRGUER ====================

function toggleMenu() {
    const menu = document.getElementById('sidebar-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// ==================== INTRODUÇÃO ====================

function skipIntro() {
    const introChar = document.getElementById('intro-character');
    const mainContent = document.getElementById('main-content');
    
    if (introChar) introChar.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
    
    // Mostrar configurações após alguns segundos (simulando animação)
    setTimeout(() => {
        showSettingsPanel();
    }, 1000);
}

function showSettingsPanel() {
    // Aqui você pode fazer com que a ferramenta de configurações apareça
    // Por exemplo, mostrar um botão flutuante ou abrir um modal
    console.log('Painel de configurações pronto');
}

// ==================== INICIALIZAÇÃO PÁGINA PRINCIPAL ====================

function initMainPage() {
    // Recuperar o papel do usuário
    const userRole = localStorage.getItem('userRole') || 'Não selecionado';
    const roleElement = document.getElementById('user-role');
    
    if (roleElement) {
        roleElement.textContent = userRole;
    }
    
    // Verificar se é a primeira vez que o usuário entra
    const firstTime = localStorage.getItem('firstTimeIntro');
    if (firstTime !== 'shown') {
        // Mostrar introdução
        const introChar = document.getElementById('intro-character');
        const mainContent = document.getElementById('main-content');
        
        if (introChar) introChar.style.display = 'block';
        if (mainContent) mainContent.style.display = 'none';
        
        // Auto-pular após 4 segundos
        setTimeout(() => {
            skipIntro();
        }, 4000);
    } else {
        // Usuário já passou pela introdução
        const introChar = document.getElementById('intro-character');
        const mainContent = document.getElementById('main-content');
        
        if (introChar) introChar.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';
    }
    
    // Verificar se está logado
    checkLoginStatus();
    
    // Detectar AdBlock
    detectAdBlock();
}

// ==================== NAVEGAÇÃO ====================

function openSettings() {
    window.location.href = 'config.html';
}

function goHome() {
    window.location.href = 'main.html';
}

function logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('vipStatus');
    localStorage.removeItem('firstTimeIntro');
    alert('Você foi desconectado. Seu progresso será perdido se não fizer login novamente!');
}

// ==================== LOGIN E REGISTRO ====================

function toggleSignup() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm && signupForm) {
        loginForm.classList.toggle('hidden');
        signupForm.classList.toggle('hidden');
    }
}

function loginWithGoogle() {
    console.log('Iniciando login com Google...');
    // Integrar com Google OAuth2
    // Aqui você implementará a lógica de autenticação com Google
}

function handleCredentialResponse(response) {
    console.log('Credencial recebida:', response);
    // Enviar o JWT para o servidor para verificação
    // localStorage.setItem('userToken', response.credential);
}

function checkLoginStatus() {
    const userToken = localStorage.getItem('userToken');
    const userEmail = localStorage.getItem('userEmail');
    
    if (userToken && userEmail) {
        const loginStatusDiv = document.getElementById('login-status');
        if (loginStatusDiv) {
            loginStatusDiv.innerHTML = `<p>Logado como: <strong>${userEmail}</strong></p><button onclick="logout()">Desconectar</button>`;
        }
    }
}

// ==================== PLANO VIP ====================

function selectVipPlan(plan) {
    const planName = plan === 'monthly' ? 'VIP Mensal' : 'VIP Anual';
    const price = plan === 'monthly' ? 'R$ 9,99/mês' : 'R$ 99,99/ano';
    
    // Salvar plano selecionado
    localStorage.setItem('vipPlan', plan);
    localStorage.setItem('vipStatus', 'active');
    
    alert(`Plano ${planName} (${price}) selecionado! Redirecionando para pagamento...`);
    
    // Aqui você integraria com um gateway de pagamento (Stripe, PayPal, etc)
    // window.location.href = 'payment.html?plan=' + plan;
}

function saveSettings() {
    const emailNotifications = document.getElementById('email-notifications').checked;
    const publicProfile = document.getElementById('public-profile').checked;
    
    localStorage.setItem('emailNotifications', emailNotifications);
    localStorage.setItem('publicProfile', publicProfile);
    
    alert('Preferências salvas com sucesso!');
}

// ==================== DETECÇÃO DE ADBLOCK ====================

function detectAdBlock() {
    // Verificação simples usando fetch de um ad
    fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', { 
        method: 'HEAD', 
        mode: 'no-cors' 
    })
    .then(response => {
        // Se conseguiu conectar, não tem adblock
        console.log('AdBlock: Não detectado');
    })
    .catch(() => {
        // Se falhou, provavelmente tem adblock
        const adBlockWarning = document.getElementById('adblock-warning');
        if (adBlockWarning) {
            adBlockWarning.style.display = 'block';
        }
        console.log('AdBlock: Detectado');
    });
}

// ==================== ANÚNCIOS (NÃO AGRESSIVOS) ====================

function initializeAds() {
    const vipStatus = localStorage.getItem('vipStatus');
    
    // Se usuário tem VIP, não mostra pop-ups
    if (vipStatus === 'active') {
        return;
    }
    
    // Mostrar pop-up raramente (2% de chance por página visitada)
    const random = Math.random();
    if (random < 0.02) {
        setTimeout(() => {
            showAdPopup();
        }, 3000); // Mostrar após 3 segundos na página
    }
}

function showAdPopup() {
    const popup = document.createElement('div');
    popup.id = 'ad-popup';
    popup.innerHTML = `
        <div style="border: 1px solid #ccc; padding: 10px; background: #fff;">
            <p>[ANÚNCIO POP-UP]</p>
            <p>Obtenha VIP para remover anúncios!</p>
            <button onclick="this.parentElement.parentElement.remove()">Fechar</button>
            <button onclick="window.location.href='config.html'">Saber Mais</button>
        </div>
    `;
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.zIndex = '10000';
    popup.style.backgroundColor = 'rgba(0,0,0,0.5)';
    popup.style.padding = '20px';
    
    document.body.appendChild(popup);
}

// ==================== ANIMAÇÃO DE LOGO ====================

function showLogoAnimation() {
    // Criar elemento de logo animado
    const logoScroller = document.createElement('div');
    logoScroller.id = 'logo-scroller';
    logoScroller.innerHTML = `
        <div style="white-space: nowrap; animation: scrollText 15s linear forwards;">
            <span style="display: inline-block; margin-right: 50px;">🎭 GILDA DOS AVENTUREIROS 🎭</span>
            <span style="display: inline-block; margin-right: 50px;">Por: Criadores Anônimos</span>
            <span style="display: inline-block; margin-right: 50px;">🎭 GILDA DOS AVENTUREIROS 🎭</span>
            <span style="display: inline-block;">Por: Criadores Anônimos</span>
        </div>
    `;
    logoScroller.style.position = 'fixed';
    logoScroller.style.top = '15%';
    logoScroller.style.left = '0';
    logoScroller.style.width = '100%';
    logoScroller.style.height = '60px';
    logoScroller.style.overflow = 'hidden';
    logoScroller.style.zIndex = '100';
    logoScroller.style.opacity = '0.2';
    logoScroller.style.pointerEvents = 'none';
    
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes scrollText {
            from {
                transform: translateX(100%);
            }
            to {
                transform: translateX(-100%);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(logoScroller);
    
    // Remover após a animação
    setTimeout(() => {
        logoScroller.remove();
    }, 15000);
}

// ==================== INICIALIZAÇÃO ====================

// Executar ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    // Carregar tema salvo
    loadTheme();
    
    // Configurar event listeners de formulário
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            console.log('Login com email:', email);
            
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userToken', 'fake_token_' + Date.now());
            
            alert('Login realizado com sucesso!');
            window.location.href = 'main.html';
        });
    }
    
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }
            
            console.log('Registrando:', username, email);
            
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userToken', 'fake_token_' + Date.now());
            
            alert('Conta criada com sucesso! Bem-vindo, ' + username);
            window.location.href = 'main.html';
        });
    }
    
    // Se estamos na página principal
    if (window.location.href.includes('main.html')) {
        initMainPage();
        showLogoAnimation();
        initializeAds();
    }
    
    // Se estamos em config.html
    if (window.location.href.includes('config.html')) {
        checkLoginStatus();
        detectAdBlock();
        initializeAds();
    }
});

// ==================== PERSISTÊNCIA DE DADOS ====================

// Avisar sobre perda de progresso ao sair sem estar logado
window.addEventListener('beforeunload', function(e) {
    const userToken = localStorage.getItem('userToken');
    const roleSelected = localStorage.getItem('roleSelected');
    
    if (roleSelected && !userToken) {
        e.preventDefault();
        e.returnValue = 'Você não está logado! Seu progresso será perdido. Tem certeza que deseja sair?';
    }
});
