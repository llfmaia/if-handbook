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
        videoElement.src = response.video.content;
        videoElement.controls = true;
        videoContainer.appendChild(videoElement);
        
        if (response.caption) {
            const captionElement = document.createElement('div');
            captionElement.classList.add('video-caption');
            captionElement.textContent = response.video.caption;
            videoContainer.appendChild(captionElement);
        }
        
        contentDiv.appendChild(videoContainer);
    }

    if (response.image) {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add('slideshow-container');  // Slideshow container
    
        let slideIndex = 0; // Initialize slide index
        
        // Create previous and next buttons for the slideshow

        const prevButton = document.createElement("a");
        prevButton.classList.add('prev');
        prevButton.innerHTML = "&#10094;";  // Left arrow for previous
        prevButton.onclick = () => changeSlide(-1);  // Call to change slides
    
        const nextButton = document.createElement("a");
        nextButton.classList.add('next');
        nextButton.innerHTML = "&#10095;";  // Right arrow for next
        nextButton.onclick = () => changeSlide(1);  // Call to change slides
       

        // Dynamically generate and append images as slides
        response.image.forEach(generateSlides);
        
        function generateSlides(img) {
            const slideDiv = document.createElement("div");
            slideDiv.classList.add('mySlide', 'fade');  // Add slide and fade effect
            
            const imageElement = document.createElement("img");
            imageElement.classList.add('clickable-image');
            imageElement.src = img;
            imageElement.decoding = "auto";
            
            slideDiv.appendChild(imageElement);  // Append image to slide
            imageContainer.appendChild(slideDiv);  // Append slide to the container
        }
        
        if (response.image[1]) {
            imageContainer.appendChild(prevButton);  // Append previous button to container
            imageContainer.appendChild(nextButton);  // Append next button to container
        }
        
        contentDiv.appendChild(imageContainer);  // Add the entire slideshow container to the content
    
        // Display the first slide
        showSlides(slideIndex);
    
        // Function to change slides
        function changeSlide(n) {
            showSlides(slideIndex += n);
        }
    
        // Function to display slides
        function showSlides(n) {
            const slides = imageContainer.getElementsByClassName("mySlide");
            if (n >= slides.length) { slideIndex = 0 }  // Loop back to the first slide
            if (n < 0) { slideIndex = slides.length - 1 }  // Loop to the last slide
    
            // Hide all slides
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
    
            // Show the active slide
            slides[slideIndex].style.display = "block";
        }
    }
    
    if (response.link) {
        const linkDiv = document.createElement('div');
        linkDiv.classList.add('message-link');

        const linkElement = document.createElement('a');
        linkElement.href = response.link.content;
        linkElement.textContent = response.link.caption;  
        linkElement.target = '_blank';  

        linkDiv.appendChild(linkElement);
        contentDiv.appendChild(linkDiv);
    }

    if (response.download) {
        const linkDiv = document.createElement("div")
        linkDiv.classList.add('message-link')
        const linkElement = document.createElement('a')
        linkElement.href = response.download.link
        linkElement.textContent = response.download.caption;  
        linkElement.download = response.download.file_name
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
                imgElement.style.transform = 'scale(1.4)';
            }, 0);
        });
    });
}