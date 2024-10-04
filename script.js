//________________________________________________________
//  IFMG-Handbook
//  Author - Leandro Lima Fagundes Maia
//  Created Date: 2/09/2024
//________________________________________________________

import { answers } from "./model/answers.js";

const chatMessages = document.getElementById('chatMessages');
const questionSelect = document.getElementById('questionSelect');
const sendButton = document.getElementById('sendButton');
const body = document.body;


// Adiciona um evento ao botão de enviar que é ativado ao ser clicado
sendButton.addEventListener('click', () => {
    const selectedQuestion = questionSelect.value;
    if (selectedQuestion) {
        const userMessage = questionSelect.options[questionSelect.selectedIndex].text;
        addMessage({ text: userMessage }, 'user-message');
        
        setTimeout(() => {
            const botResponse = answers[selectedQuestion];
            addMessage(botResponse, 'bot-message');
        }, 500);

        questionSelect.value = "";
    }
});

// Adiciona um evento ao botão de enviar que é ativado ao clicar na Tecla Enter
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const selectedQuestion = questionSelect.value;
        if (selectedQuestion) {
            const userMessage = questionSelect.options[questionSelect.selectedIndex].text;
            addMessage({ text: userMessage }, 'user-message');
            
            setTimeout(() => {
                const botResponse = answers[selectedQuestion];
                addMessage(botResponse, 'bot-message');
            }, 500);
    
            questionSelect.value = "";
        }
    }
});


// Função para adicionar uma mensagem ao chat
function addMessage(response, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    
    // Create a div for the text
    const textDiv = document.createElement('div');
    textDiv.classList.add('message-text');
    textDiv.textContent = response.text;
    contentDiv.appendChild(textDiv);

    if (className === "bot-message") {
        const profilePic = document.createElement('img');
        profilePic.src = './assets/images/bot-img.png'
        profilePic.classList.add('profile-pic')
        messageDiv.appendChild(profilePic)
    }



    if (response.video) {
        const videoContainer = document.createElement('div');
        videoContainer.classList.add('video-container');
        
        const videoElement = document.createElement('video');
        videoElement.src = response.video;
        videoElement.controls = true;
        videoContainer.appendChild(videoElement);
        
        if (response.caption) {
            const captionElement = document.createElement('div');
            captionElement.classList.add('video-caption');
            captionElement.textContent = response.caption;
            videoContainer.appendChild(captionElement);
        }
        
        contentDiv.appendChild(videoContainer);
    }

    if (response.image) {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add('image-container');
        
        const imageElement = document.createElement("img")
        imageElement.classList.add('clickable-image')
        imageElement.src = response.image;
        imageElement.decoding = "auto"
        imageContainer.appendChild(imageElement);
        contentDiv.appendChild(imageContainer)
    }

    if (response.link) {
        const linkDiv = document.createElement('div');
        linkDiv.classList.add('message-link');

        const linkElement = document.createElement('a');
        linkElement.href = response.link;
        linkElement.textContent = response.linkCaption;  
        linkElement.target = '_blank';  

        linkDiv.appendChild(linkElement);
        contentDiv.appendChild(linkDiv);
    }

    if (response.downloadLink) {
        const linkDiv = document.createElement("div")
        linkDiv.classList.add('message-link')

        const linkElement = document.createElement('a')
        linkElement.download = response.downloadFileName
        linkElement.textContent = response.linkCaptionDownload;  
        linkElement.href = response.downloadLink

        linkDiv.appendChild(linkElement);
        contentDiv.appendChild(linkDiv);
    }
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    enableFullScreenOnClick();
}

// Função para configurar o modo escuro ou claro
function setDarkMode(isDark) {
    const logoLight = document.querySelector('.logo-light');
    const logoDark = document.querySelector('.logo-dark');
    if (isDark) {
        // Adiciona a classe de modo escuro ao corpo
        body.classList.add('dark-mode');
        logoLight.style.display = 'none';
        logoDark.style.display = 'block';
    } else {
        // Remove a classe de modo escuro do corpo
        body.classList.remove('dark-mode');
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


// Function to handle image click for full-screen mode
function enableFullScreenOnClick() {
    const images = document.querySelectorAll('.clickable-image');

    images.forEach(image => {
        image.addEventListener('click', (event) => {
            event.stopPropagation();

            // Create a full-screen container
            const fullScreenDiv = document.createElement('div');
            fullScreenDiv.classList.add('fullscreen-image');

            // Create an image element for full-screen
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.classList.add('animate-image');  // Add animation class

            // Create a close button (X)
            const closeButton = document.createElement('button');
            closeButton.classList.add('close-button');
            closeButton.textContent = 'X';

            // Add event listener for closing the full-screen
            closeButton.addEventListener('click', () => {
                imgElement.classList.remove('animate-image');  // Reverse animation
                fullScreenDiv.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(fullScreenDiv);
                    document.body.removeChild(imgElement);
                }, 300); // Wait for animation to complete before removing
                return
            });

            // Add event listener for the Escape key
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    imgElement.classList.remove('animate-image');  // Reverse animation
                    fullScreenDiv.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(fullScreenDiv);
                    }, 300); // Wait for animation to complete before removing
                }
            });

            fullScreenDiv.appendChild(imgElement);
            fullScreenDiv.appendChild(closeButton);
            document.body.appendChild(fullScreenDiv);

            // Trigger the animation after adding to the DOM
            setTimeout(() => {
                fullScreenDiv.style.opacity = '1';
                imgElement.style.transform = 'scale(1)';
            }, 0);
        });
    });
}

// Call the function to activate full-screen feature