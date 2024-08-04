//________________________________________________________
//  IFMG-Handbook
//  Author - Leandro Lima Fagundes Maia
//  Created Date: 2/09/2024
//________________________________________________________

// Seleciona o elemento de mensagens do chat
const chatMessages = document.getElementById('chatMessages');

// Seleciona o elemento de seleção de perguntas
const questionSelect = document.getElementById('questionSelect');

// Seleciona o botão de enviar
const sendButton = document.getElementById('sendButton');

const body = document.body;

// Objeto com respostas predefinidas para diferentes perguntas
const answers = {
    testRepose: "Para solicitar uma nova prova, você precisa enviar um pedido formal ao seu professor dentro de 48 horas após a data original da prova. Forneça uma razão válida e qualquer documentação de apoio, se disponível.",
    library: "Você pode acessar a biblioteca usando seu cartão de estudante. A biblioteca está aberta de segunda a sexta das 8h às 20h e aos sábados das 9h às 13h.",
    schedule: "O seu horário de aulas pode ser encontrado no portal do estudante do IFMG. Faça login com suas credenciais, navegue até 'Informações Acadêmicas' e selecione 'Horário das Aulas'.",
    advisorMeeting: "Para agendar uma reunião com seu orientador, use o sistema de agendamento online no site do IFMG. Vá para 'Serviços ao Estudante', depois 'Orientação' e siga as instruções para marcar um horário disponível.",
};

// Adiciona um evento ao botão de enviar que é ativado ao ser clicado
sendButton.addEventListener('click', () => {
    // Obtém a pergunta selecionada pelo usuário
    const selectedQuestion = questionSelect.value;
    if (selectedQuestion) {
        // Obtém o texto da pergunta selecionada
        const userMessage = questionSelect.options[questionSelect.selectedIndex].text;
        // Adiciona a mensagem do usuário ao chat
        addMessage(userMessage, 'user-message');
        
        // Define um tempo de espera de 500ms antes de adicionar a resposta do bot
        setTimeout(() => {
            // Obtém a resposta correspondente à pergunta selecionada
            const botResponse = answers[selectedQuestion];
            // Adiciona a resposta do bot ao chat
            addMessage(botResponse, 'bot-message');
        }, 500);

        // Limpa a seleção de perguntas
        questionSelect.value = "";
    }
});

// Função para adicionar uma mensagem ao chat
function addMessage(text, className) {
    // Cria um novo elemento de div para a mensagem
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    
    // Cria uma div para o conteúdo da mensagem
    const contentDiv = document.createElement('div');
    
    // Cria um elemento para o texto da mensagem
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = text;
    
    // Cria uma div para mostrar o horário da mensagem
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('time');
    timeDiv.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Adiciona o conteúdo da mensagem e o horário à div de conteúdo
    contentDiv.appendChild(messageContent);
    contentDiv.appendChild(timeDiv);
    
    // Adiciona o conteúdo à mensagem com base na classe (usuário ou bot)
    if (className === 'user-message') {
        messageDiv.appendChild(contentDiv);
    } else {
        messageDiv.appendChild(contentDiv);
    }
    
    // Adiciona a mensagem ao chat e rola para o final
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Função para configurar o modo escuro ou claro
function setDarkMode(isDark) {
    if (isDark) {
        // Adiciona a classe de modo escuro ao corpo
        body.classList.add('dark-mode');
    } else {
        // Remove a classe de modo escuro do corpo
        body.classList.remove('dark-mode');
    }
    // Alterna a visibilidade dos logos
    toggleLogos(isDark);
}

// Função para alternar a visibilidade dos logos dependendo do modo
function toggleLogos(isDark) {
    const logoLight = document.querySelector('.logo-light');
    const logoDark = document.querySelector('.logo-dark');
    if (isDark) {
        logoLight.style.display = 'none';
        logoDark.style.display = 'block';
    } else {
        logoLight.style.display = 'block';
        logoDark.style.display = 'none';
    }
}

// Verifica a preferência do sistema para o modo de cor
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
setDarkMode(prefersDarkScheme.matches);

// Adiciona um ouvinte para mudanças na preferência do sistema
prefersDarkScheme.addEventListener('change', event => {
    setDarkMode(event.matches);
});